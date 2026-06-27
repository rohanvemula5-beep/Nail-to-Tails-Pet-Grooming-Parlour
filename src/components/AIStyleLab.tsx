import React, { useState, useEffect } from 'react';
import { StyledPetImage } from '../types';
import { Sparkles, Sliders, Image as ImageIcon, Download, RefreshCw, Loader2, Wand2, Star } from 'lucide-react';

export default function AIStyleLab() {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [imageSize, setImageSize] = useState('1K');
  const [qualityModel, setQualityModel] = useState<'pro' | 'flash'>('pro');
  const [generatedImages, setGeneratedImages] = useState<StyledPetImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  // Comforting, creative status messages to show during video/image generation
  const loadingStatusTips = [
    "Priming the brushes and canvas...",
    "Selecting organic color highlights...",
    "Drafting the dog's coat textures...",
    "Styling with studio-grade warm lighting...",
    "Developing the high-fidelity portrait details...",
    "Finalizing the artisanal paper gloss finish..."
  ];

  useEffect(() => {
    // Load existing styles
    const saved = localStorage.getItem('nail_tails_style_lab');
    if (saved) {
      try {
        setGeneratedImages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load generated images", e);
      }
    } else {
      // Seed initial mock generated portraits to make the page instantly gorgeous
      const seedPortraits: StyledPetImage[] = [
        {
          id: 'seed_1',
          prompt: 'A majestic Golden Retriever wearing a tiny vintage brass crown and a hand-knitted emerald green scarf, soft-focus painting',
          imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=600',
          aspectRatio: '1:1',
          imageSize: '1K',
          model: 'Studio Quality (Gemini 3 Pro)',
          createdAt: new Date().toISOString()
        },
        {
          id: 'seed_2',
          prompt: 'A tiny Toy Poodle wearing vintage brass aviator goggles sitting inside a tiny leather picnic basket, detailed retro oil portrait',
          imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600',
          aspectRatio: '1:1',
          imageSize: '1K',
          model: 'Studio Quality (Gemini 3 Pro)',
          createdAt: new Date().toISOString()
        }
      ];
      setGeneratedImages(seedPortraits);
      localStorage.setItem('nail_tails_style_lab', JSON.stringify(seedPortraits));
    }
  }, []);

  const saveImages = (list: StyledPetImage[]) => {
    setGeneratedImages(list);
    localStorage.setItem('nail_tails_style_lab', JSON.stringify(list));
  };

  // Preset prompts to inspire users
  const stylePresets = [
    { name: "👑 Royal Crown", text: "A fluffy Samoyed wearing a delicate gold leaf royal crown and a vintage lace collar, oil painting style" },
    { name: "🎩 Steampunk", text: "A dapper French Bulldog wearing a tiny brass top hat and a bow tie, cinematic lighting, steampunk aesthetic" },
    { name: "🧣 Cozy Winter", text: "A cute Pembroke Welsh Corgi wrapped in a giant thick red hand-knit wool winter scarf, snowy pine background" },
    { name: "🕶️ Retro Aviator", text: "A cool Golden Retriever wearing retro leather aviator goggles, sitting in a sidecar of a vintage motorcycle" },
    { name: "🌊 Beach Surfer", text: "A happy Australian Shepherd with a tiny floral lei necklace, sitting next to a retro surfboard on a sunny beach" }
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setErrorMsg("Please enter a description for your pet portrait.");
      return;
    }

    setIsGenerating(true);
    setErrorMsg('');
    setStatusMessage(loadingStatusTips[0]);

    // Alternate loading text every 2.5 seconds
    let statusIdx = 0;
    const interval = setInterval(() => {
      statusIdx = (statusIdx + 1) % loadingStatusTips.length;
      setStatusMessage(loadingStatusTips[statusIdx]);
    }, 2500);

    try {
      // Map unsupported aspect ratios to close standard ones to protect the API call
      let mappedRatio = aspectRatio;
      if (aspectRatio === '2:3') mappedRatio = '3:4';
      if (aspectRatio === '3:2') mappedRatio = '4:3';
      if (aspectRatio === '21:9') mappedRatio = '16:9';

      const response = await fetch('/api/generate-style-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          aspectRatio: mappedRatio,
          imageSize,
          model: qualityModel,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Génération d'image a échoué.");
      }

      const newImage: StyledPetImage = {
        id: 'img_' + Date.now(),
        prompt: prompt.trim(),
        imageUrl: data.imageUrl,
        aspectRatio,
        imageSize,
        model: qualityModel === 'pro' ? 'Studio Quality (Gemini 3 Pro)' : 'Creative Flash (Gemini 3.1 Flash)',
        createdAt: new Date().toISOString()
      };

      const updated = [newImage, ...generatedImages];
      saveImages(updated);
      setPrompt('');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An error occurred during portrait development. Check that your API key is configured.");
    } finally {
      clearInterval(interval);
      setIsGenerating(false);
      setStatusMessage('');
    }
  };

  const handleDeleteImage = (id: string) => {
    const filtered = generatedImages.filter((img) => img.id !== id);
    saveImages(filtered);
  };

  return (
    <div className="py-20 max-w-7xl mx-auto px-6 border-b border-stone-200/50" id="ai-lab-section">
      
      {/* Section Title */}
      <div className="text-center max-w-2xl mx-auto mb-16 relative">
        <div className="inline-block bg-[#FAF0E6] text-amber-800 border border-amber-200 text-xs uppercase tracking-widest px-4 py-1.5 rounded rotate-[-1.5deg] mb-4 font-mono shadow-xs">
          🎨 Co-Create with AI 🎨
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-normal italic text-charcoal">
          The AI Dog Style Lab &amp; Portrait Studio
        </h2>
        <p className="text-stone-500 font-sans mt-3 text-sm md:text-base">
          Envision the perfect groom. Customize the haircut, styling theme, size, and photo aspect ratio to create a studio-quality digital painting of your pet.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
        {/* Controls Column */}
        <div className="lg:col-span-5 paper-card bg-white p-8 rounded-sm relative border border-stone-200/60 shadow-xs">
          <div className="inline-flex items-center gap-1.5 text-sage font-mono text-xs font-semibold uppercase tracking-wider mb-2">
            <Sliders className="w-3.5 h-3.5" />
            <span>Studio Control Desk</span>
          </div>
          <h3 className="font-serif text-xl font-normal italic text-charcoal mb-4">Portrait Customizer</h3>

          {errorMsg && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-800 rounded-md text-xs">
              <p className="font-semibold">Generation Error:</p>
              <p className="mt-1 leading-relaxed">{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleGenerate} className="space-y-5">
            {/* Model Quality Selection */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 font-bold mb-2">
                Portrait Studio Model
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setQualityModel('pro')}
                  className={`py-2 px-3 text-xs rounded border font-semibold flex flex-col items-center gap-1 cursor-pointer transition-all ${
                    qualityModel === 'pro'
                      ? 'border-terracotta bg-terracotta/5 text-terracotta shadow-xs'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  <Star className="w-4 h-4 shrink-0" />
                  <span>Studio Quality (Pro)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setQualityModel('flash')}
                  className={`py-2 px-3 text-xs rounded border font-semibold flex flex-col items-center gap-1 cursor-pointer transition-all ${
                    qualityModel === 'flash'
                      ? 'border-sage bg-sage/5 text-sage shadow-xs'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  <Wand2 className="w-4 h-4 shrink-0" />
                  <span>Creative Flash</span>
                </button>
              </div>
            </div>

            {/* Prompt Text Input */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 font-bold mb-1.5">
                Describe the Portrait Styling *
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your pet's appearance, costume, accessories, background, or artistic style (e.g. 'Watercolor painting of a cheerful Bichon Frise with a pink collar playing in cherry blossoms')..."
                rows={4}
                className="w-full bg-stone-50 border border-stone-200 focus:border-sage focus:ring-1 focus:ring-sage rounded p-3 text-xs text-charcoal outline-none transition-all resize-none"
                required
              />
            </div>

            {/* Inspiration Presets */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold mb-2">
                Preset Styling Inspirations
              </label>
              <div className="flex flex-wrap gap-2">
                {stylePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPrompt(preset.text)}
                    className="py-1 px-2.5 bg-stone-100 hover:bg-sage/10 hover:text-sage text-[10px] rounded-md text-stone-600 transition-colors cursor-pointer border border-stone-200/40"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Configuration Selectors */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 font-bold mb-1.5">
                  Aspect Ratio
                </label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 focus:border-sage focus:ring-1 focus:ring-sage rounded p-2 text-xs text-charcoal outline-none cursor-pointer"
                >
                  <option value="1:1">Standard square (1:1)</option>
                  <option value="3:4">Classic Portrait (3:4)</option>
                  <option value="2:3">Artistic Tall (2:3)</option>
                  <option value="9:16">Mobile Poster (9:16)</option>
                  <option value="4:3">Landscape (4:3)</option>
                  <option value="3:2">Creative Wide (3:2)</option>
                  <option value="16:9">Widescreen (16:9)</option>
                  <option value="21:9">Ultra-Panoramic (21:9)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 font-bold mb-1.5">
                  Resolution / Size
                </label>
                <select
                  value={imageSize}
                  onChange={(e) => setImageSize(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 focus:border-sage focus:ring-1 focus:ring-sage rounded p-2 text-xs text-charcoal outline-none cursor-pointer"
                >
                  <option value="1K">High Def (1K)</option>
                  <option value="2K">Retina HD (2K)</option>
                  <option value="4K">Studio Print (4K)</option>
                </select>
              </div>
            </div>

            {/* Generate Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-3 bg-sage hover:bg-sage/95 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-bold rounded-sm shadow-flat-sage hover:translate-y-[-1px] transition-all btn-stamp text-center cursor-pointer flex items-center justify-center gap-2 text-sm"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Portrait is Baking...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4.5 h-4.5" />
                    <span>Co-Create Digital Portrait</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Gallery / Interactive Portrait Frame Board */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          {/* Active Generation Loader Backdrop */}
          {isGenerating && (
            <div className="paper-card bg-amber-50/20 border border-dashed border-amber-300 rounded-sm p-10 flex flex-col items-center justify-center text-center animate-pulse">
              <div className="relative mb-4">
                <RefreshCw className="w-10 h-10 text-terracotta animate-spin" />
                <Sparkles className="w-5 h-5 text-amber-500 absolute top-[-5px] right-[-5px] animate-bounce" />
              </div>
              <h4 className="font-serif text-lg font-normal italic text-charcoal">Studio Easel Engaged</h4>
              <p className="text-stone-500 text-xs mt-1 italic">{statusMessage}</p>
              <div className="w-48 bg-stone-200/60 h-1.5 rounded-full overflow-hidden mt-4">
                <div className="bg-terracotta h-full w-1/3 rounded-full animate-[loading_1.5s_infinite]" style={{ animationDuration: '2s' }} />
              </div>
            </div>
          )}

          {/* Style Board Polaroid Deck */}
          <div className="paper-card bg-[#FAF6F0] p-6 rounded-sm min-h-[460px] border border-stone-200/60 relative">
            <div className="absolute top-2 right-4 bg-orange-100/60 border border-orange-200/40 text-stone-500 text-[10px] px-3 py-0.5 rounded font-mono select-none">
              📌 Style Board Canvas
            </div>

            <h4 className="font-serif text-lg font-normal italic text-charcoal border-b border-stone-200/40 pb-3 mb-6 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-terracotta" />
              <span>Artistic Portrait Gallery</span>
            </h4>

            {generatedImages.length === 0 && !isGenerating ? (
              <div className="py-24 text-center text-stone-400">
                <ImageIcon className="w-12 h-12 mx-auto text-stone-300 mb-2" />
                <p className="text-sm font-medium">No portraits created yet.</p>
                <p className="text-xs mt-1">Configure your styling wishes in the control panel to start the canvas.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {generatedImages.map((img, idx) => (
                  <div 
                    key={img.id}
                    className="polaroid relative hover:scale-102 transition-transform duration-300"
                    style={{
                      // Slight alternating angles to give the paper clippings feel
                      transform: `rotate(${idx % 2 === 0 ? '1.5deg' : '-1.5deg'})`,
                    }}
                  >
                    {/* Portrait Image frame */}
                    <div className="relative aspect-square overflow-hidden rounded-sm border border-stone-100 bg-stone-50">
                      <img 
                        src={img.imageUrl} 
                        alt={img.prompt} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Technical Details Badge */}
                      <div className="absolute top-2 left-2 bg-stone-900/60 backdrop-blur-xs text-white text-[9px] px-2 py-0.5 rounded font-mono">
                        {img.model} • {img.imageSize} • {img.aspectRatio}
                      </div>

                      {/* Floating Download Stamp Button */}
                      <a 
                        href={img.imageUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="absolute bottom-2 right-2 p-1.5 bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 rounded-full shadow-md transition-colors cursor-pointer"
                        title="Open Full Image"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* Handwriting tag */}
                    <div className="mt-4 text-left">
                      <p className="text-xs font-serif text-stone-700 leading-relaxed font-semibold italic">
                        “{img.prompt.length > 80 ? img.prompt.substring(0, 80) + '...' : img.prompt}”
                      </p>
                      <div className="flex justify-between items-center mt-3 pt-2 border-t border-dashed border-stone-100 text-[10px] text-stone-400 font-mono">
                        <span>PORTRAIT NO: #{img.id.split('_')[1] || img.id}</span>
                        <button
                          onClick={() => handleDeleteImage(img.id)}
                          className="hover:text-red-500 font-bold cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
