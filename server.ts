import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, ThinkingLevel, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

function cleanAndParseJSON(text: string) {
  if (!text) return null;
  let cleanText = text.trim();
  if (cleanText.startsWith("```json")) {
    cleanText = cleanText.substring(7);
  } else if (cleanText.startsWith("```")) {
    cleanText = cleanText.substring(3);
  }
  if (cleanText.endsWith("```")) {
    cleanText = cleanText.substring(0, cleanText.length - 3);
  }
  cleanText = cleanText.trim();
  if (cleanText === "undefined" || cleanText === "") {
    return null;
  }
  return JSON.parse(cleanText);
}

const app = express();
const PORT = 3000;

// Set up JSON body parser with generous limit for uploaded images
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

// Initialize Google GenAI Client
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("WARNING: GEMINI_API_KEY environment variable is not set. Gemini features will fail until configured.");
}

const ai = new GoogleGenAI({
  apiKey: apiKey || "MOCK_KEY",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// ==========================================
// API ROUTES
// ==========================================

// 1. Pet Care Q&A Chatbot (Low Latency Responses) - gemini-3.1-flash-lite
app.post("/api/chat-lite", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const systemInstruction = 
      "You are a friendly, expert pet stylist and home care advisor from 'Nail to Tails' grooming parlour. " +
      "Provide lighthearted, warm, reassuring, and highly accurate advice. Keep responses concise, helpful, and under 150 words.";

    // Reconstruct chat history if provided
    const chat = ai.chats.create({
      model: "gemini-3.1-flash-lite",
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    // Send history first if any, or just send the message
    // (To keep it simple and low latency, we can just feed it as a single request with history in context or use the Chat object)
    let response;
    if (history && history.length > 0) {
      // Re-create conversation with message history
      const formattedHistory = history.map((h: any) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.text }]
      }));
      
      response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: [
          ...formattedHistory,
          { role: "user", parts: [{ text: message }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });
    } else {
      response = await chat.sendMessage({ message });
    }

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error in /api/chat-lite:", error);
    res.status(500).json({ error: error.message || "An error occurred during chat." });
  }
});

// 2. Dog Explorer & Local Guides (Search Grounding) - gemini-3.5-flash
app.post("/api/chat-search", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
      config: {
        systemInstruction: 
          "You are a local dog specialist and guide for 'Nail to Tails' grooming parlour. " +
          "Help the user find real, up-to-date dog events, local dog parks, dog-friendly cafes, pet regulations, " +
          "or the latest pet safety news. ALWAYS provide real search-grounded answers. " +
          "Format your response beautifully in clear markdown paragraphs.",
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const groundingSources = chunks
      ? chunks
          .filter((chunk) => chunk.web)
          .map((chunk) => ({
            title: chunk.web?.title || "Search Reference",
            uri: chunk.web?.uri || "",
          }))
      : [];

    res.json({ text, groundingSources });
  } catch (error: any) {
    console.error("Error in /api/chat-search:", error);
    res.status(500).json({ error: error.message || "An error occurred during grounded search." });
  }
});

// 3. AI Dog Portrait Studio & Style Lab (Image Generation) - gemini-3-pro-image or gemini-3.1-flash-image
app.post("/api/generate-style-image", async (req, res) => {
  try {
    const { prompt, aspectRatio, imageSize, model } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Determine target model
    // gemini-3-pro-image (requires paid API key) or gemini-3.1-flash-image (requires paid API key)
    // Fallback to gemini-2.5-flash-image if needed
    const targetModel = model === "pro" ? "gemini-3-pro-image" : "gemini-3.1-flash-image";

    console.log(`Generating image using ${targetModel} [Size: ${imageSize || "1K"}, Ratio: ${aspectRatio || "1:1"}]`);

    const response = await ai.models.generateContent({
      model: targetModel,
      contents: {
        parts: [
          {
            text: `${prompt}. Clean background, studio-quality, artistic photograph of a groomed pet, highly detailed, professional lighting.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio || "1:1",
          imageSize: imageSize || "1K",
        },
      },
    });

    // Find the inline data part
    let base64Image = "";
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData) {
          base64Image = part.inlineData.data;
          break;
        }
      }
    }

    if (!base64Image) {
      return res.status(500).json({ error: "Failed to extract image data from generation response." });
    }

    res.json({ imageUrl: `data:image/png;base64,${base64Image}` });
  } catch (error: any) {
    console.error("Error in /api/generate-style-image:", error);
    res.status(500).json({ error: error.message || "An error occurred during image generation." });
  }
});

// 4. Dog Photo Analyzer (Image Understanding) - gemini-3.1-pro-preview
app.post("/api/analyze-pet", async (req, res) => {
  try {
    const { imageBase64, mimeType } = req.body;
    if (!imageBase64 || !mimeType) {
      return res.status(400).json({ error: "Image base64 data and mimeType are required" });
    }

    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: imageBase64,
      },
    };

    const textPart = {
      text: "Analyze this pet photo for grooming purposes. " +
            "Estimate the breed/type, identify the coat characteristics (e.g., curly, double-coated, wire-haired, long, short), " +
            "estimate recommended grooming frequency, identify visible health observations (e.g. eye crust, matting, coat shine, overall clean or messy), " +
            "and suggest 3 styling/grooming haircut options suitable for this breed."
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: [
            "breedEstimate",
            "coatType",
            "groomingFrequency",
            "healthObservations",
            "recommendedStyles",
            "detailedAnalysis",
          ],
          properties: {
            breedEstimate: {
              type: Type.STRING,
              description: "The estimated breed or mix of the pet.",
            },
            coatType: {
              type: Type.STRING,
              description: "The estimated coat type (e.g., Curly, Double Coat, Wire, Silk, Short).",
            },
            groomingFrequency: {
              type: Type.STRING,
              description: "Recommended salon grooming frequency (e.g., Every 4-6 weeks).",
            },
            healthObservations: {
              type: Type.STRING,
              description: "Health & coat hygiene feedback (e.g., coat looks shiny, alert eyes, potential minor eye clean required).",
            },
            recommendedStyles: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3 cute grooming styles or cuts for this pet.",
            },
            detailedAnalysis: {
              type: Type.STRING,
              description: "A friendly, comprehensive analysis of the pet's aesthetic grooming requirements.",
            },
          },
        },
      },
    });

    if (!response.text) {
      return res.status(500).json({ error: "Empty analysis response received." });
    }

    try {
      const result = cleanAndParseJSON(response.text);
      if (!result) {
        throw new Error("Parsed result is empty or invalid.");
      }
      res.json(result);
    } catch (parseError: any) {
      console.error("Failed to parse response JSON. Raw text:", response.text);
      res.status(500).json({ error: `Invalid JSON response from model: ${parseError.message}` });
    }
  } catch (error: any) {
    console.error("Error in /api/analyze-pet:", error);
    res.status(500).json({ error: error.message || "An error occurred during pet analysis." });
  }
});

// 5. Grooming & Health Plan Designer (High Thinking Mode) - gemini-3.1-pro-preview
app.post("/api/grooming-plan", async (req, res) => {
  try {
    const { petName, breed, age, specialConcerns } = req.body;
    if (!petName || !breed) {
      return res.status(400).json({ error: "Pet name and breed are required" });
    }

    const systemInstruction = 
      "You are 'Nail to Tails' Master Stylist & Health Regimen Designer. " +
      "You design hyper-personalized, ultra-premium grooming and wellness plans for cherished pets. " +
      "Utilize deep, rigorous reasoning, veterinary grooming science, and tailored styling techniques. " +
      "Produce a complete structured grooming plan.";

    const prompt = `Design a comprehensive Grooming & Health Regimen for:
      - Pet Name: ${petName}
      - Breed: ${breed}
      - Age: ${age || "Unknown/Adult"}
      - Special Concerns / Behaviors: ${specialConcerns || "None specified"}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        systemInstruction,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: [
            "petName",
            "breed",
            "age",
            "groomingSchedule",
            "coatCareInstructions",
            "recommendedProducts",
            "dietWellnessAdvice",
            "stylistNotes",
          ],
          properties: {
            petName: { type: Type.STRING },
            breed: { type: Type.STRING },
            age: { type: Type.STRING },
            groomingSchedule: { 
              type: Type.STRING,
              description: "A precise, customized schedule of salon visits and home maintenance steps."
            },
            coatCareInstructions: { 
              type: Type.STRING,
              description: "Highly detailed brushing, deshedding, and washing advice tailored strictly to this breed's coat."
            },
            recommendedProducts: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 4-5 premium, organic grooming products (shampoos, balms, combs) perfect for this dog."
            },
            dietWellnessAdvice: { 
              type: Type.STRING,
              description: "Specific nutrition, hydration, and physical wellness recommendations that improve coat health from the inside out."
            },
            stylistNotes: { 
              type: Type.STRING,
              description: "Deep, rigorous thoughts from our expert master stylist regarding stress management, nail filing, and safety."
            },
          },
        },
      },
    });

    if (!response.text) {
      return res.status(500).json({ error: "Empty plan response received." });
    }

    try {
      const result = cleanAndParseJSON(response.text);
      if (!result) {
        throw new Error("Parsed result is empty or invalid.");
      }
      res.json(result);
    } catch (parseError: any) {
      console.error("Failed to parse response JSON. Raw text:", response.text);
      res.status(500).json({ error: `Invalid JSON response from model: ${parseError.message}` });
    }
  } catch (error: any) {
    console.error("Error in /api/grooming-plan:", error);
    res.status(500).json({ error: error.message || "An error occurred during wellness plan generation." });
  }
});


// ==========================================
// STATIC FILES & VITE MIDDLEWARE
// ==========================================

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite development server...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving compiled static files in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
