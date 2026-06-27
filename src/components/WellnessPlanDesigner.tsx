import React, { useState } from 'react';
import { PetWellnessPlan } from '../types';
import { FileText, Award, HelpCircle, Loader2, RefreshCw, Printer, AlertTriangle } from 'lucide-react';

export default function WellnessPlanDesigner() {
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [specialConcerns, setSpecialConcerns] = useState('');
  const [plan, setPlan] = useState<PetWellnessPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!petName.trim() || !breed.trim()) {
      setErrorMsg("Pet Name and Breed are required to design a custom wellness plan.");
      return;
    }

    setIsGenerating(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/grooming-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          petName: petName.trim(),
          breed: breed.trim(),
          age: age.trim() || undefined,
          specialConcerns: specialConcerns.trim() || undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Grooming wellness plan generation failed.");
      }

      setPlan(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to compile the plan. Check that your API key is configured.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setPlan(null);
    setPetName('');
    setBreed('');
    setAge('');
    setSpecialConcerns('');
    setErrorMsg('');
  };

  return (
    <div className="py-20 max-w-7xl mx-auto px-6 border-b border-stone-200/50" id="wellness-section">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-16 relative">
        <div className="inline-block bg-[#FDF2E9] text-amber-900 border border-amber-200 text-xs uppercase tracking-widest px-4 py-1.5 rounded rotate-[1.5deg] mb-4 font-mono shadow-xs">
          📜 High Thinking Engine 📜
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-normal italic text-charcoal">
          Grooming Wellness &amp; Style Designer
        </h2>
        <p className="text-stone-500 font-sans mt-3 text-sm md:text-base">
          Unlock highly reasoned veterinary-grooming science. Our AI builds comprehensive, breed-specific wellness, diet, and stress-reduction plans.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
        {/* Form Column */}
        <div className="lg:col-span-5 paper-card bg-white p-8 rounded-sm border border-stone-200/60 relative shadow-xs">
          <div className="inline-flex items-center gap-1.5 text-sage font-mono text-xs font-semibold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Wellness Planner Intake</span>
          </div>
          <h3 className="font-serif text-xl font-normal italic text-charcoal mb-4">Regimen Creator</h3>

          {errorMsg && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-800 rounded-md text-xs">
              <p className="font-bold flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Planner Issue</span>
              </p>
              <p className="mt-1 leading-relaxed">{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 font-bold mb-1.5">
                Pet Name *
              </label>
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="e.g. Cleo"
                className="w-full bg-stone-50 border border-stone-200 focus:border-sage focus:ring-1 focus:ring-sage rounded p-2.5 text-xs text-charcoal outline-none transition-all"
                required
                disabled={isGenerating}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 font-bold mb-1.5">
                  Breed Mix *
                </label>
                <input
                  type="text"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  placeholder="e.g. Shih Tzu"
                  className="w-full bg-stone-50 border border-stone-200 focus:border-sage focus:ring-1 focus:ring-sage rounded p-2.5 text-xs text-charcoal outline-none transition-all"
                  required
                  disabled={isGenerating}
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 font-bold mb-1.5">
                  Age / Stage
                </label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 2 Years"
                  className="w-full bg-stone-50 border border-stone-200 focus:border-sage focus:ring-1 focus:ring-sage rounded p-2.5 text-xs text-charcoal outline-none transition-all"
                  disabled={isGenerating}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 font-bold mb-1.5">
                Special Behaviors, Allergies, or Concerns
              </label>
              <textarea
                value={specialConcerns}
                onChange={(e) => setSpecialConcerns(e.target.value)}
                placeholder="e.g. Skin redness after bathing, hates nail trimmers, easily startled by loud noises, senior joints..."
                rows={4}
                className="w-full bg-stone-50 border border-stone-200 focus:border-sage focus:ring-1 focus:ring-sage rounded p-2.5 text-xs text-charcoal outline-none transition-all resize-none"
                disabled={isGenerating}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-3 bg-terracotta hover:bg-terracotta/95 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-bold rounded-sm shadow-flat-terracotta hover:translate-y-[-1px] transition-all btn-stamp text-center cursor-pointer flex items-center justify-center gap-2 text-sm"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Stylist is Thinking deeply...</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4.5 h-4.5" />
                    <span>Design Personalized Plan</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Prompt explaining High Thinking mode */}
          <div className="mt-5 p-4 bg-orange-50/50 border border-orange-200/50 rounded-sm text-stone-500 leading-relaxed text-[11px]">
            <p className="font-bold text-charcoal flex items-center gap-1 mb-1">
              <span>🧠</span> About thinking mode:
            </p>
            <p>
              This scheduler leverages <strong>gemini-3.1-pro-preview</strong> with thinking level set to <strong>HIGH</strong>. It performs multi-step diagnostic reasoning, considering breed health predispositions and organic styling logic before returning the report.
            </p>
          </div>
        </div>

        {/* Display Document Column */}
        <div className="lg:col-span-7">
          {isGenerating && (
            <div className="paper-card bg-white p-12 rounded-sm border border-stone-200/60 min-h-[500px] flex flex-col items-center justify-center text-center">
              <RefreshCw className="w-10 h-10 text-terracotta animate-spin mb-4" />
              <h4 className="font-serif text-xl font-normal italic text-charcoal">Compiling Wellness Ledger...</h4>
              <p className="text-stone-500 text-xs mt-2 max-w-sm leading-relaxed">
                Gemini is processing veterinary coat guidelines, evaluating shampoo chemistry suitability, and designing tailored lifestyle tips. This detailed reasoning takes about 10-15 seconds.
              </p>
            </div>
          )}

          {!plan && !isGenerating && (
            <div className="paper-card bg-[#F4EFE6]/30 border border-dashed border-stone-300 rounded-sm p-16 text-center min-h-[500px] flex flex-col items-center justify-center">
              <FileText className="w-12 h-12 text-stone-300 mb-3" />
              <h4 className="font-serif text-lg font-normal italic text-stone-400">Regimen Document Drawer</h4>
              <p className="text-stone-400 text-xs mt-1 max-w-md">
                Input your pet's specifications on the left to initiate planning. Our Master Stylist's compiled report will display here as a printable parchment.
              </p>
            </div>
          )}

          {plan && !isGenerating && (
            <div 
              className="bg-parchment p-8 md:p-10 rounded-sm text-left border-4 border-double border-stone-300 relative shadow-sm max-w-3xl mx-auto print:border-none print:shadow-none animate-fade-in"
              id="wellness-print-area"
            >
              {/* Retro stamp element in corner */}
              <div className="absolute top-6 right-6 border-2 border-dashed border-terracotta/40 text-terracotta/50 font-mono text-[9px] uppercase tracking-wider px-3 py-1 rotate-6 select-none pointer-events-none">
                N&amp;T Certified 2026
              </div>

              {/* Title Header block */}
              <div className="text-center border-b border-stone-300 pb-6 mb-6">
                <h4 className="font-serif text-xs uppercase tracking-widest text-stone-400 font-bold mb-1">Salon Medical &amp; Styling Ledger</h4>
                <h3 className="font-serif text-3xl font-normal italic text-charcoal">Grooming &amp; Health Plan</h3>
                <p className="text-stone-500 font-mono text-[10px] mt-1.5 uppercase font-semibold">For: {plan.petName} • Breed: {plan.breed} • Stage: {plan.age}</p>
              </div>

              {/* Custom sections */}
              <div className="space-y-6">
                <div>
                  <h5 className="font-serif text-base font-normal italic text-charcoal border-b border-stone-200 pb-1 mb-2">I. Recommended Salon Schedule</h5>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">{plan.groomingSchedule}</p>
                </div>

                <div>
                  <h5 className="font-serif text-base font-normal italic text-charcoal border-b border-stone-200 pb-1 mb-2">II. Specialized Coat &amp; Brushing Guide</h5>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">{plan.coatCareInstructions}</p>
                </div>

                {/* Products */}
                <div>
                  <h5 className="font-serif text-base font-normal italic text-charcoal border-b border-stone-200 pb-1 mb-2">III. Recommended Botanicals &amp; Grooming Tools</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {plan.recommendedProducts.map((prod, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 bg-stone-100/50 p-2 border border-stone-200/40 rounded-sm text-xs text-stone-700">
                        <span className="text-sage select-none font-bold">✓</span>
                        <span>{prod}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-serif text-base font-normal italic text-charcoal border-b border-stone-200 pb-1 mb-2">IV. Internal Hydration &amp; Coat-Nutrition</h5>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">{plan.dietWellnessAdvice}</p>
                </div>

                <div className="p-4 bg-orange-50/40 border border-orange-200/40 rounded-sm italic">
                  <h5 className="font-serif text-sm font-normal italic text-terracotta mb-1">V. Master Stylist's Behavior &amp; Stress Notes</h5>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">{plan.stylistNotes}</p>
                </div>
              </div>

              {/* Ledger footer */}
              <div className="mt-8 pt-6 border-t border-stone-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-stone-400 font-mono">
                <span>COMPILED VIA DEEP THINKING REGIMEN DESIGNER</span>
                <span>SIGNATURE: ____________________</span>
              </div>

              {/* Printable actions */}
              <div className="mt-8 pt-4 border-t border-stone-200 flex justify-end gap-3 print:hidden">
                <button
                  onClick={handleReset}
                  className="px-4 py-1.5 border border-stone-300 hover:bg-stone-50 rounded-sm text-xs font-bold text-stone-600 transition-colors cursor-pointer"
                >
                  Create New Plan
                </button>
                <button
                  onClick={handlePrint}
                  className="px-4 py-1.5 bg-sage text-white rounded-sm text-xs font-bold hover:bg-sage/95 shadow-flat-sage transition-all btn-stamp flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save Plan</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
