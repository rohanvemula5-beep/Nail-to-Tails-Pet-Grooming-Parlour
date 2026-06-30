import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, Heart, ShieldCheck, Award, Clock, MapPin } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
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
            Experience premium pet care in Hyderabad with our customized, low-stress luxury sessions, pairing classic artisanal methods with dedicated wellness regimens.
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
              className="px-8 py-3.5 bg-terracotta text-white font-bold rounded-sm shadow-flat-terracotta hover:translate-y-[-1px] transition-all btn-stamp text-center cursor-pointer flex items-center justify-center gap-2 text-xs uppercase tracking-wider animate-pulse"
              id="hero-book-btn"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </button>
          </div>
        </div>

        {/* Elegant Parlour Spotlights Board (No Stock Images) */}
        <div className="lg:col-span-5 relative py-8">
          {/* Background scrap cardboard drop shadow look */}
          <div className="absolute top-[20px] left-[15px] w-full h-[380px] bg-stone-200/40 rounded border border-stone-300/20 rotate-[-2deg] -z-10 pointer-events-none" />
          
          <motion.div 
            className="paper-card bg-[#FCFAF6] border border-stone-200 p-8 rounded-sm shadow-md rotate-[1deg] relative text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
          >
            {/* Stamp decoration */}
            <div className="absolute top-4 right-4 bg-sage/10 text-sage text-[10px] px-3 py-1 rounded font-mono font-bold uppercase border border-sage/20 rotate-3">
              Premium Care
            </div>

            <h3 className="font-serif text-2xl font-normal italic text-charcoal mb-6 border-b border-stone-200/60 pb-3 flex items-center gap-2">
              <span>📍</span> Parlour Spotlight
            </h3>

            <div className="space-y-5">
              {/* Working Hours status */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-sage/10 border border-sage/20 flex items-center justify-center text-sage shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-charcoal">Daily Grooming Hours</h4>
                  <p className="text-stone-500 text-xs mt-0.5">8:30 AM – 9:00 PM (Tuesdays until 9:30 PM)</p>
                </div>
              </div>

              {/* Quiet environment */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-terracotta/10 border border-terracotta/20 flex items-center justify-center text-terracotta shrink-0 mt-0.5">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-charcoal">Low-Stress, Cage-Free</h4>
                  <p className="text-stone-500 text-xs mt-0.5">Spacious, calm setup tailored specifically to alleviate vet or grooming anxieties.</p>
                </div>
              </div>

              {/* Ingredients */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-charcoal">Biodegradable Botanicals</h4>
                  <p className="text-stone-500 text-xs mt-0.5">We use strictly premium, hypo-allergenic organic shampoos and nourishing skin balms.</p>
                </div>
              </div>

              {/* Location pin */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E6E0D4] border border-stone-300 flex items-center justify-center text-stone-600 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-charcoal">Saroor Nagar, Hyderabad</h4>
                  <p className="text-stone-500 text-xs mt-0.5">Conveniently situated at Pragati Nagar, near Sharada Theatre Road.</p>
                </div>
              </div>
            </div>

            {/* Handwriting stamp signature at the bottom */}
            <div className="mt-8 border-t border-dashed border-stone-200 pt-4 flex items-center justify-between text-[11px] text-stone-400 font-mono">
              <span>ESTD. 2020 • HYDERABAD</span>
              <span className="text-terracotta font-semibold">🐾 Nail to Tails Parlour</span>
            </div>
          </motion.div>
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
