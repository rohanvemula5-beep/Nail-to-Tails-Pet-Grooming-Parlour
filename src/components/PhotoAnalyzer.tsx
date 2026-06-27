import React, { useState, useRef } from 'react';
import { PetAnalysisResult } from '../types';
import { Upload, HelpCircle, RefreshCw, Loader2, Footprints, ClipboardCheck, AlertTriangle } from 'lucide-react';

export default function PhotoAnalyzer() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<PetAnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag and drop event handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Invalid file type. Please upload a JPEG or PNG pet photo.');
      return;
    }

    // Limit size to ~5MB for fast base64 upload
    if (file.size > 8 * 1024 * 1024) {
      setErrorMsg('Image size too large. Please select a photo under 8MB.');
      return;
    }

    setSelectedFile(file);
    setErrorMsg('');
    setAnalysisResult(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = async () => {
    if (!imagePreview || !selectedFile) return;

    setIsAnalyzing(true);
    setErrorMsg('');

    try {
      // Extract clean base64 data (strip prefix data:image/png;base64,)
      const base64Data = imagePreview.split(',')[1];
      const mimeType = selectedFile.type;

      const response = await fetch('/api/analyze-pet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Data,
          mimeType: mimeType,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Pet photo analysis failed.");
      }

      setAnalysisResult(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Could not analyze the photo. Verify that your API key is configured.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setAnalysisResult(null);
    setErrorMsg('');
  };

  return (
    <div className="py-20 max-w-7xl mx-auto px-6 border-b border-stone-200/50" id="analyzer-section">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 relative">
        <div className="inline-block bg-[#FDF2E9] text-amber-900 border border-amber-200 text-xs uppercase tracking-widest px-4 py-1.5 rounded rotate-[-1.5deg] mb-4 font-mono shadow-xs">
          🔍 Instant Diagnosis 🔍
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-normal italic text-charcoal">
          AI Coat Analyzer &amp; Breed Estimator
        </h2>
        <p className="text-stone-500 font-sans mt-3 text-sm md:text-base">
          Upload a high-quality, clear photo of your pet. Our AI Grooming Desk will diagnose coat texture, evaluate sanitary hygiene, and suggest optimal haircuts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
        {/* Upload Slot Column */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={imagePreview ? undefined : triggerFileInput}
            className={`paper-card bg-white p-8 rounded-sm min-h-[320px] border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer relative transition-colors ${
              dragActive ? 'border-sage bg-sage/5' : 'border-stone-300 hover:border-sage'
            } ${imagePreview ? 'cursor-default' : ''}`}
          >
            {/* Hidden Input */}
            <input 
              ref={fileInputRef}
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleFileInput}
            />

            {imagePreview ? (
              <div className="w-full relative">
                {/* Image Polaroid preview container */}
                <div className="polaroid aspect-video overflow-hidden rounded-sm shadow-md border border-stone-100 bg-stone-50">
                  <img 
                    src={imagePreview} 
                    alt="Pet Upload Preview" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Actions once file loaded */}
                <div className="flex gap-3 mt-4 justify-center">
                  <button
                    onClick={handleClear}
                    disabled={isAnalyzing}
                    className="py-1.5 px-4 border border-stone-300 text-xs font-bold text-stone-600 rounded-sm hover:bg-stone-50 cursor-pointer disabled:opacity-50"
                  >
                    Clear Photo
                  </button>
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="py-1.5 px-5 bg-sage text-white text-xs font-bold rounded-sm shadow-flat-sage hover:translate-y-[-1px] transition-all btn-stamp cursor-pointer flex items-center gap-1.5"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Footprints className="w-3.5 h-3.5" />
                        <span>Diagnose Coat</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-stone-100 border border-stone-200/60 shadow-inner rounded-sm flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-stone-400" />
                </div>
                <h4 className="font-serif text-lg font-bold text-charcoal">Drag &amp; Drop Pet Image</h4>
                <p className="text-stone-400 text-xs mt-1 max-w-xs">
                  Or click to browse from local files. Supporting standard JPEG, PNG format photos of dogs/cats.
                </p>
                <button
                  type="button"
                  className="mt-4 px-4 py-2 bg-stone-100 border border-stone-200 text-xs font-bold rounded-sm text-charcoal shadow-sm hover:bg-stone-200/60 transition-colors cursor-pointer"
                >
                  Browse Files
                </button>
              </div>
            )}
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-sm text-xs">
              <p className="font-bold flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                <span>Upload Issue</span>
              </p>
              <p className="mt-1">{errorMsg}</p>
            </div>
          )}

          {/* Guidelines on ideal photos */}
          <div className="p-5 bg-[#FAF7F2] border border-stone-200/60 rounded-sm text-xs leading-relaxed text-stone-500">
            <h5 className="font-bold text-charcoal font-serif mb-2 flex items-center gap-1">
              <HelpCircle className="w-4 h-4 text-stone-400" />
              For accurate analysis:
            </h5>
            <ul className="space-y-1.5 list-disc list-inside">
              <li>Use bright, well-lit spaces with minimal background clutter.</li>
              <li>Ensure your pet is centered, with their full coat and head clearly visible.</li>
              <li>Avoid motion blur or highly compressed, grain-saturated file uploads.</li>
            </ul>
          </div>
        </div>

        {/* Diagnostic Sheet Column */}
        <div className="lg:col-span-7">
          {isAnalyzing && (
            <div className="paper-card bg-white p-12 rounded-sm border border-stone-200/60 min-h-[420px] flex flex-col items-center justify-center text-center">
              <RefreshCw className="w-10 h-10 text-sage animate-spin mb-4" />
              <h4 className="font-serif text-xl font-normal italic text-charcoal">AI Grooming Desk Analyzing...</h4>
              <p className="text-stone-500 text-xs mt-2 max-w-sm leading-relaxed">
                Evaluating structural skeletal breed markers, detecting follicle density, and scanning for visible hygiene indications using the Google Gemini model. Please hold.
              </p>
            </div>
          )}

          {!analysisResult && !isAnalyzing && (
            <div className="paper-card bg-[#F4EFE6]/30 border border-dashed border-stone-300 rounded-sm p-16 text-center min-h-[420px] flex flex-col items-center justify-center">
              <ClipboardCheck className="w-12 h-12 text-stone-300 mb-3" />
              <h4 className="font-serif text-lg font-normal italic text-stone-400">Diagnosis Desk Awaiting</h4>
              <p className="text-stone-400 text-xs mt-1 max-w-md">
                Load a pet image and click &ldquo;Diagnose Coat&rdquo; on the left. The master grooming desk will render custom advice here.
              </p>
            </div>
          )}

          {analysisResult && !isAnalyzing && (
            <div className="paper-card bg-white p-8 rounded-sm relative overflow-hidden text-left border border-stone-200/60 shadow-sm animate-fade-in">
              {/* Ribbon tag */}
              <div className="absolute top-4 right-4 bg-sage/10 text-sage text-[10px] px-3 py-1 rounded-sm font-mono font-bold uppercase select-none border border-sage/20">
                ✔️ Diagnosis Active
              </div>

              <div className="border-b border-dashed border-stone-200 pb-5 mb-5">
                <h3 className="font-serif text-2xl font-normal italic text-charcoal">AI Coat Diagnosis</h3>
                <p className="text-stone-400 text-xs font-mono mt-1">Nail to Tails Grooming Desk • Report #{Math.floor(Math.random() * 9000) + 1000}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <h5 className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold mb-1">Estimated Breed Mix</h5>
                  <p className="text-sm font-semibold text-charcoal font-serif">{analysisResult.breedEstimate}</p>
                </div>
                <div>
                  <h5 className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold mb-1">Coat Texture / Classification</h5>
                  <p className="text-sm font-semibold text-charcoal font-serif">{analysisResult.coatType}</p>
                </div>
                <div>
                  <h5 className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold mb-1">Recommended Service Frequency</h5>
                  <p className="text-sm font-semibold text-sage font-mono">{analysisResult.groomingFrequency}</p>
                </div>
                <div>
                  <h5 className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold mb-1">Hygiene Observations</h5>
                  <p className="text-xs font-medium text-stone-600 leading-relaxed">{analysisResult.healthObservations}</p>
                </div>
              </div>

              {/* Recommended Haircuts */}
              <div className="mb-6 p-4 bg-[#FEFDF9] border border-orange-100 rounded-lg">
                <h5 className="text-[10px] font-mono uppercase tracking-widest text-terracotta font-bold mb-2">Recommended Haircuts</h5>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.recommendedStyles.map((style, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200/55 rounded text-xs font-medium"
                    >
                      ✂️ {style}
                    </span>
                  ))}
                </div>
              </div>

              {/* Detailed narrative analysis */}
              <div>
                <h5 className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold mb-1.5">Detailed Salon Narrative</h5>
                <p className="text-xs text-stone-600 leading-relaxed whitespace-pre-line bg-stone-50 border border-stone-100 p-4 rounded-md italic">
                  &ldquo;{analysisResult.detailedAnalysis}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-dashed border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-mono">
                <span>Model: gemini-3.1-pro-preview</span>
                <span>Certified Nail to Tails AI Stylist Desk</span>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
