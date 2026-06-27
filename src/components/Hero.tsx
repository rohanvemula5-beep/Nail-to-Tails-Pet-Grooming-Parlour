import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, Heart, ShieldCheck, Award } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onExploreLabClick: () => void;
}

export default function Hero({ onBookClick, onExploreLabClick }: HeroProps) {
  return (
    <div className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden border-b border-stone-200/50">
      {/* Background accents representing paper snippets */}
      <div className="absolute top-10 left-[-5%] w-40 h-40 bg-orange-100/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 right-[-5%] w-60 h-60 bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />
      
      {/* Decorative scrap tape at top right */}
      <div className="absolute top-4 right-10 md:right-24 bg-[#FCFAF5] border border-stone-200/60 text-stone-600 text-[10px] uppercase tracking-widest px-4 py-1.5 rotate-2 font-mono shadow-sm pointer-events-none">
        ★ Est. 2020 ★
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text Area */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
          
          {/* Top Badge: ★ 4.9 Rated (200+ Reviews) / Justdial parent feedback */}
          <div className="inline-flex items-center gap-2 bg-sage/10 text-sage border border-sage/20 px-3 py-1.5 rounded-sm text-xs font-bold rotate-[-1deg] shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>★ 4.9 Rated by 200+ Pet Parents on Justdial</span>
          </div>

          {/* Parlour Title with beautiful serif headings */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest font-bold text-stone-400 font-mono">
              Nail to Tails Pet Grooming Parlour
            </p>
            <h1 className="font-serif text-4xl md:text-5xl xl:text-6xl font-normal italic text-charcoal leading-[1.1] tracking-tight">
              Premium, stress-free grooming in <br />
              <span className="text-sage not-italic font-bold relative inline-block mt-1">
                Saroor Nagar.
                {/* Hand drawn loop under the text */}
                <svg className="absolute left-0 bottom-[-6px] w-full h-2.5 text-sage/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,10 100,3" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h1>
          </div>

          {/* Sub-headline & Premium pet care in Hyderabad */}
          <p className="text-stone-600 font-sans text-sm md:text-base max-w-xl leading-relaxed">
            Gentle, hygienic care for all breeds. Proudly grooming Hyderabad's pets since <strong className="text-charcoal font-semibold">2020</strong>. 
            Experience premium pet care in Hyderabad with our customized, low-stress luxury sessions, pairing classic artisanal methods with our interactive 
            <span className="text-sage font-bold"> AI Grooming & Style Lab</span>.
          </p>

          {/* Key Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full pt-2">
            <div className="flex items-center gap-2.5 bg-white border border-stone-200/60 p-3 rounded-sm shadow-paper">
              <Heart className="w-5 h-5 text-terracotta shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-charcoal">Stress-Free Only</p>
                <p className="text-stone-500 text-[10px]">One-on-one sessions</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-white border border-stone-200/60 p-3 rounded-sm shadow-paper">
              <ShieldCheck className="w-5 h-5 text-sage shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-charcoal">100% Organic</p>
                <p className="text-stone-500 text-[10px]">Biodegradable botanicals</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-white border border-stone-200/60 p-3 rounded-sm shadow-paper col-span-2 md:col-span-1">
              <Award className="w-5 h-5 text-amber-600 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-charcoal">Est. 2020</p>
                <p className="text-stone-500 text-[10px]">Hyderabad's Trusted Choice</p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <button
              onClick={onBookClick}
              className="px-8 py-3.5 bg-terracotta text-white font-bold rounded-sm shadow-flat-terracotta hover:translate-y-[-1px] transition-all btn-stamp text-center cursor-pointer flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
              id="hero-book-btn"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </button>
            <button
              onClick={onExploreLabClick}
              className="px-8 py-3.5 bg-sage text-white font-bold rounded-sm shadow-flat-sage hover:translate-y-[-1px] transition-all btn-stamp text-center cursor-pointer flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
              id="hero-lab-btn"
            >
              <Sparkles className="w-4 h-4" />
              Interactive Style Lab
            </button>
          </div>
        </div>

        {/* Polaroid Graphic Area */}
        <div className="lg:col-span-5 relative flex justify-center py-8">
          {/* Background torn cardboard frame piece */}
          <div className="absolute top-[20px] left-[15px] w-full h-[380px] bg-stone-200/40 rounded border border-stone-300/20 rotate-[-4deg] -z-10 pointer-events-none" />
          
          {/* Main Polaroid */}
          <motion.div 
            className="polaroid rotate-[2deg] relative z-10 w-full max-w-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
          >
            {/* Soft-focus golden retriever being groomed, custom torn-paper style frame wrapper */}
            <div className="relative overflow-hidden aspect-square rounded-sm border border-stone-100 bg-stone-50">
              <img 
                src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=600" 
                alt="Groomed Happy Golden Retriever" 
                className="w-full h-full object-cover grayscale-[10%] hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-700/5 mix-blend-multiply" />
              
              {/* Overlaid simulated hand-written marker label */}
              <div className="absolute bottom-2 left-2 bg-stone-900/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded font-mono">
                Happy client after a lavender spa cut
              </div>
            </div>
            
            {/* Write-on polaroid label */}
            <div className="mt-5 text-center">
              <p className="font-serif italic text-stone-700 text-lg">“Nail to Tails signature finish”</p>
              <p className="text-[11px] text-stone-400 font-mono mt-1 uppercase tracking-wider">Premium Bath &amp; Style Session</p>
            </div>
          </motion.div>

          {/* Secondary mini polaroid popping out from bottom-left */}
          <motion.div 
            className="polaroid absolute bottom-[-10px] left-[-20px] w-36 rotate-[-12deg] z-20 hidden sm:block shadow-lg"
            initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="aspect-square bg-stone-50 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=300" 
                alt="Happy Dog after bath"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-2 text-center">
              <p className="font-mono text-[9px] text-stone-500 uppercase">Leo (Teddy Cut)</p>
            </div>
          </motion.div>

          {/* Secondary sticker detail */}
          <div className="absolute top-0 right-4 bg-[#FEF9E7] border border-orange-200 shadow-md px-4 py-2 rotate-[-8deg] z-20 text-[11px] font-sans font-semibold text-terracotta rounded">
            ✨ Organic Lavender Bath
          </div>
        </div>
      </div>

      {/* About / Trust Banner (The "Paper Strip" below Hero) */}
      <div className="max-w-6xl mx-auto px-6 mt-12 md:mt-16">
        <div className="paper-card bg-[#FAF6F0] border-y border-stone-200/80 p-4 md:p-6 rounded-sm shadow-sm relative overflow-hidden">
          {/* Subtle rotation to give a scrap-paper strip look */}
          <div className="absolute -top-1 right-2 text-[24px] text-stone-300 opacity-20 pointer-events-none select-none">📌</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-stone-200/60 items-center">
            <div className="py-2 md:py-0 flex flex-col items-center justify-center">
              <span className="text-lg mb-1">📍</span>
              <p className="font-bold text-charcoal text-xs tracking-wider uppercase font-mono">Located in</p>
              <p className="text-stone-600 text-xs mt-0.5 font-semibold">Pragati Nagar / Saroor Nagar</p>
            </div>
            <div className="py-2 md:py-0 flex flex-col items-center justify-center">
              <span className="text-lg mb-1">🗓️</span>
              <p className="font-bold text-charcoal text-xs tracking-wider uppercase font-mono">Established</p>
              <p className="text-stone-600 text-xs mt-0.5 font-semibold">Year 2020</p>
            </div>
            <div className="py-2 md:py-0 flex flex-col items-center justify-center px-4">
              <span className="text-lg mb-1 text-terracotta">❤️</span>
              <p className="text-xs text-stone-600 italic leading-relaxed font-sans font-medium">
                "Reasonable charges and a very gentle approach"
              </p>
              <p className="text-[10px] text-stone-400 font-mono uppercase mt-0.5">— Verified Customer Review</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative torn divider at the bottom of the section */}
      <div className="absolute bottom-0 left-0 w-full h-6 bg-white deckled-mask opacity-90 transform translate-y-[1px]" />
    </div>
  );
}
