import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Heart, Leaf, Users } from 'lucide-react';

export default function About() {
  return (
    <div id="about-section" className="py-24 bg-white dark:bg-[#1a1b26] relative border-b border-stone-200/50 dark:border-stone-800/50 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/50 px-3 py-1.5 rounded-sm text-xs font-bold font-mono tracking-widest uppercase transition-colors">
              <span>Why Nail to Tails</span>
            </div>
            
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-charcoal dark:text-stone-100 leading-tight transition-colors">
              Pet grooming with <span className="italic text-terracotta">love & patience.</span>
            </h2>
            
            <div className="space-y-4 text-stone-600 dark:text-stone-300 font-sans text-sm md:text-base leading-relaxed transition-colors">
              <p>
                At Nail to Tails Pet Grooming Parlour, we believe that grooming shouldn't be a stressful chore for your furry family members. We focus entirely on the mental well-being of pets by providing a calm, low-stress handling experience from start to finish.
              </p>
              <p>
                Every pet receives one-on-one attention in a cage-free environment. We take our time to ensure they feel safe, secure, and loved. We exclusively use premium organic, hypoallergenic, and biodegradable products that are safe for both your pets and the environment.
              </p>
              <p>
                With transparent pricing and honest communication, we strive to build a lasting bond of trust with pet parents across Hyderabad.
              </p>
            </div>

            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-sage/10 text-sage flex items-center justify-center shrink-0">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal dark:text-stone-200 text-sm transition-colors">Organic Products</h4>
                  <p className="text-stone-500 dark:text-stone-400 text-xs mt-0.5 transition-colors">Hypoallergenic & biodegradable shampoos.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal dark:text-stone-200 text-sm transition-colors">Cage-Free Waiting</h4>
                  <p className="text-stone-500 dark:text-stone-400 text-xs mt-0.5 transition-colors">No long, stressful cage confinement.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal dark:text-stone-200 text-sm transition-colors">Experienced Groomers</h4>
                  <p className="text-stone-500 dark:text-stone-400 text-xs mt-0.5 transition-colors">Gentle, one-on-one handling for every pet.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal dark:text-stone-200 text-sm transition-colors">Transparent Pricing</h4>
                  <p className="text-stone-500 dark:text-stone-400 text-xs mt-0.5 transition-colors">Honest communication, no hidden fees.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Soft decorative background block */}
            <div className="absolute inset-0 bg-[#FBF9F5] dark:bg-stone-800/80 rounded-sm transform rotate-3 scale-105 -z-10 border border-stone-200 dark:border-stone-700 transition-colors"></div>
            
            <div className="bg-white dark:bg-stone-900 p-8 border border-stone-200 dark:border-stone-700 shadow-sm rounded-sm text-center flex flex-col items-center justify-center min-h-[400px] space-y-6 transition-colors">
               <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center text-sage mb-2">
                 <ShieldCheck className="w-10 h-10" />
               </div>
               <h3 className="font-serif text-2xl font-bold text-charcoal dark:text-stone-100 italic transition-colors">Our Promise</h3>
               <p className="text-stone-500 dark:text-stone-300 text-sm max-w-sm leading-relaxed transition-colors">
                 We never rush our grooming sessions. Your pet's comfort and safety always come first. That means if a pet is stressed, we slow down. True luxury is patience.
               </p>
               <div className="text-[10px] uppercase font-mono font-bold tracking-widest text-stone-400 dark:text-stone-500 border-t border-dashed border-stone-200 dark:border-stone-700 pt-4 mt-4 w-full transition-colors">
                 Nail to Tails Philosophy
               </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
