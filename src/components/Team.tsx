import React from 'react';
import { motion } from 'motion/react';

export default function Team() {
  return (
    <div id="team-section" className="py-24 bg-[#FBF9F5] dark:bg-stone-900/50 relative border-b border-stone-200/50 dark:border-stone-800/50 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&w=1200&q=80" 
                alt="Our Parlour Setup" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded bg-white dark:bg-stone-800 p-2 shadow-lg hidden md:block transition-colors">
              <img 
                src="https://images.unsplash.com/photo-1587764379873-97837921fd44?auto=format&fit=crop&w=400&q=80" 
                alt="Meet your groomer" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-sage/10 text-sage border border-sage/20 px-3 py-1.5 rounded-sm text-xs font-bold font-mono tracking-widest uppercase transition-colors">
              <span>Our Parlour</span>
            </div>
            
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal dark:text-stone-100 leading-tight transition-colors">
              Meet your groomers
            </h2>
            
            <div className="space-y-4 text-stone-600 dark:text-stone-300 font-sans text-sm md:text-base leading-relaxed transition-colors">
              <p>
                Hello! We are passionate pet lovers dedicated to providing the best grooming experience in Saroor Nagar. Our parlour is designed to be a safe, calming sanctuary for your pets.
              </p>
              <p>
                Equipped with top-of-the-line tools, professional bathing stations, and premium organic products, we ensure every session is both effective and relaxing. We believe in building trust with every dog and cat that walks through our doors.
              </p>
            </div>
            
            <div className="pt-4 flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-terracotta font-serif transition-colors">5+</div>
                <div className="text-xs uppercase font-mono tracking-widest text-stone-400 dark:text-stone-500 mt-1 transition-colors">Years Exp.</div>
              </div>
              <div className="w-px bg-stone-200 dark:bg-stone-700 transition-colors"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-terracotta font-serif transition-colors">1000+</div>
                <div className="text-xs uppercase font-mono tracking-widest text-stone-400 dark:text-stone-500 mt-1 transition-colors">Happy Pets</div>
              </div>
            </div>

          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
