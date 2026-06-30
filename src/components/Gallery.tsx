import React from 'react';
import { motion } from 'motion/react';

export default function Gallery() {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
      alt: "Dog Bathing"
    },
    {
      url: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&w=800&q=80",
      alt: "Poodle Grooming"
    },
    {
      url: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80",
      alt: "Happy Groomed Dog"
    },
    {
      url: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=800&q=80",
      alt: "Beautiful Cat"
    }
  ];

  return (
    <div id="gallery-section" className="py-24 bg-white dark:bg-[#1a1b26] relative border-b border-stone-200/50 dark:border-stone-800/50 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-block bg-[#FAF0E6] dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-700/30 text-xs uppercase tracking-widest px-4 py-1.5 rounded mb-4 font-mono shadow-sm transition-colors">
            Before & After
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal dark:text-stone-100 transition-colors">
            Our Grooming Gallery
          </h2>
          <p className="text-stone-500 dark:text-stone-400 font-sans mt-4 text-sm md:text-base leading-relaxed transition-colors">
            See the transformations. We take pride in making every pet look and feel their absolute best.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group overflow-hidden rounded shadow-sm relative aspect-square"
            >
              <img 
                src={img.url} 
                alt={img.alt} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white font-bold text-sm tracking-wider font-sans">
                  {img.alt}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
