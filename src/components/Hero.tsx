import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, Heart, ShieldCheck, Award, Clock, MapPin } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  return (
    <div className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden border-b border-stone-200/50 dark:border-stone-800/50 transition-colors">
      {/* Background accents representing paper snippets */}
      <div className="absolute top-10 left-[-5%] w-40 h-40 bg-orange-100/40 dark:bg-orange-900/20 rounded-full blur-2xl pointer-events-none transition-colors" />
      <div className="absolute bottom-10 right-[-5%] w-60 h-60 bg-teal-100/30 dark:bg-teal-900/20 rounded-full blur-3xl pointer-events-none transition-colors" />
      
      {/* Decorative scrap tape at top right */}
      <div className="absolute top-4 right-10 md:right-24 bg-[#FCFAF5] dark:bg-stone-800 border border-stone-200/60 dark:border-stone-700 text-stone-600 dark:text-stone-300 text-[10px] uppercase tracking-widest px-4 py-1.5 rotate-2 font-mono shadow-sm pointer-events-none transition-colors">
        ★ Est. 2020 ★
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 flex flex-col items-start space-y-6 text-left"
        >
          
          {/* Top Badge: ★ 4.9 Rated (200+ Reviews) / Justdial parent feedback */}
          <div className="inline-flex items-center gap-2 bg-sage/10 text-sage border border-sage/20 px-3 py-1.5 rounded-sm text-xs font-bold rotate-[-1deg] shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>★ 4.9 Rated by 200+ Pet Parents on Justdial</span>
          </div>

          {/* Parlour Title with beautiful serif headings */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest font-bold text-stone-400 dark:text-stone-500 font-mono transition-colors">
              Trusted by Hyderabad pet parents
            </p>
            <h1 className="font-serif text-4xl md:text-5xl xl:text-6xl font-bold text-charcoal dark:text-stone-100 leading-[1.1] tracking-tight transition-colors">
              Premium, stress-free pet grooming in <br />
              <span className="text-sage relative inline-block mt-1">
                Saroor Nagar.
                {/* Hand drawn loop under the text */}
                <svg className="absolute left-0 bottom-[-6px] w-full h-2.5 text-sage/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,10 100,3" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h1>
          </div>

          {/* Sub-headline & Premium pet care in Hyderabad */}
          <p className="text-stone-600 dark:text-stone-300 font-sans text-sm md:text-base max-w-xl leading-relaxed transition-colors">
            Organic, hypoallergenic products and low‑stress care for dogs and cats. We provide a calm, cage-free environment where your pet's comfort and well-being always come first.
          </p>

          {/* Key Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full pt-2">
            <div className="flex items-center gap-2.5 bg-white dark:bg-stone-800/80 border border-stone-200/60 dark:border-stone-700 p-3 rounded shadow-sm transition-colors">
              <Heart className="w-5 h-5 text-terracotta shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-charcoal dark:text-stone-200 transition-colors">Stress-Free Only</p>
                <p className="text-stone-500 dark:text-stone-400 text-[10px] transition-colors">One-on-one sessions</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-white dark:bg-stone-800/80 border border-stone-200/60 dark:border-stone-700 p-3 rounded shadow-sm transition-colors">
              <ShieldCheck className="w-5 h-5 text-sage shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-charcoal dark:text-stone-200 transition-colors">100% Organic</p>
                <p className="text-stone-500 dark:text-stone-400 text-[10px] transition-colors">Biodegradable botanicals</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-white dark:bg-stone-800/80 border border-stone-200/60 dark:border-stone-700 p-3 rounded shadow-sm col-span-2 md:col-span-1 transition-colors">
              <Award className="w-5 h-5 text-amber-600 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-charcoal dark:text-stone-200 transition-colors">Est. 2020</p>
                <p className="text-stone-500 dark:text-stone-400 text-[10px] transition-colors">Trusted Choice</p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <button
              onClick={() => {
                const elem = document.getElementById('services-section');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-stone-100 dark:bg-stone-800 text-charcoal dark:text-stone-200 border border-stone-200 dark:border-stone-700 font-bold rounded shadow-sm hover:bg-stone-200 dark:hover:bg-stone-700 transition-all text-center cursor-pointer text-xs uppercase tracking-wider"
            >
              View Services
            </button>
            <button
              onClick={onBookClick}
              className="px-8 py-3.5 bg-sage text-white font-bold rounded shadow-sm hover:translate-y-[-1px] transition-all text-center cursor-pointer flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
            >
              <Calendar className="w-4 h-4" />
              Book an Appointment
            </button>
          </div>
        </motion.div>

        {/* Elegant Parlour Spotlights Board (No Stock Images) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative py-8"
        >
          {/* Main big polaroid */}
          <div className="bg-white dark:bg-stone-800 p-2 md:p-3 pb-8 md:pb-12 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-stone-100 dark:border-stone-700 transform rotate-2 relative z-20 w-4/5 mx-auto lg:ml-auto lg:mr-0 transition-colors">
            <img 
              src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80" 
              alt="Freshly groomed dog" 
              className="w-full h-auto aspect-[4/5] object-cover rounded-sm grayscale-[10%]"
            />
            <div className="absolute bottom-3 left-0 w-full text-center">
              <span className="font-serif text-charcoal dark:text-stone-200 text-sm md:text-base italic transition-colors">Fresh from the Spa</span>
            </div>
            {/* Scrap tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/40 dark:bg-stone-700/40 backdrop-blur-sm shadow-sm rotate-[-3deg]" />
          </div>
          
          {/* Small overlapping polaroid */}
          <div className="absolute top-1/2 md:top-auto md:bottom-12 -left-4 md:-left-12 bg-white dark:bg-stone-800 p-2 pb-6 shadow-[0_12px_40px_rgb(0,0,0,0.12)] border border-stone-100 dark:border-stone-700 transform -rotate-6 z-30 w-1/2 max-w-[200px] transition-colors">
            <img 
              src="https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&w=400&q=80" 
              alt="Happy pet" 
              className="w-full h-auto aspect-square object-cover rounded-sm grayscale-[20%]"
            />
            <div className="absolute bottom-1.5 left-0 w-full text-center">
              <span className="font-serif text-stone-500 dark:text-stone-300 text-xs italic transition-colors">Gentle Touch</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* About / Trust Banner (The "Paper Strip" below Hero) */}
      <div className="max-w-6xl mx-auto px-6 mt-12 md:mt-16">
        <div className="bg-[#FAF6F0] dark:bg-stone-800/80 border-y border-stone-200/80 dark:border-stone-700 p-4 md:p-6 rounded-sm shadow-sm relative overflow-hidden transition-colors">
          {/* Subtle rotation to give a scrap-paper strip look */}
          <div className="absolute -top-1 right-2 text-[24px] text-stone-300 dark:text-stone-600 opacity-20 pointer-events-none select-none transition-colors">📌</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-stone-200/60 dark:divide-stone-700 items-center transition-colors">
            <div className="py-2 md:py-0 flex flex-col items-center justify-center">
              <span className="text-lg mb-1">📍</span>
              <p className="font-bold text-charcoal dark:text-stone-200 text-xs tracking-wider uppercase font-mono transition-colors">Located in</p>
              <p className="text-stone-600 dark:text-stone-400 text-xs mt-0.5 font-semibold transition-colors">Pragati Nagar / Saroor Nagar</p>
            </div>
            <div className="py-2 md:py-0 flex flex-col items-center justify-center">
              <span className="text-lg mb-1">🗓️</span>
              <p className="font-bold text-charcoal dark:text-stone-200 text-xs tracking-wider uppercase font-mono transition-colors">Established</p>
              <p className="text-stone-600 dark:text-stone-400 text-xs mt-0.5 font-semibold transition-colors">Year 2020</p>
            </div>
            <div className="py-2 md:py-0 flex flex-col items-center justify-center px-4">
              <span className="text-lg mb-1 text-terracotta">❤️</span>
              <p className="text-xs text-stone-600 dark:text-stone-400 italic leading-relaxed font-sans font-medium transition-colors">
                "Reasonable charges and a very gentle approach"
              </p>
              <p className="text-[10px] text-stone-400 dark:text-stone-500 font-mono uppercase mt-0.5 transition-colors">— Verified Customer Review</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative torn divider at the bottom of the section */}
      <div className="absolute bottom-0 left-0 w-full h-6 bg-white dark:bg-[#1a1b26] deckled-mask opacity-90 transform translate-y-[1px] transition-colors" />
    </div>
  );
}
