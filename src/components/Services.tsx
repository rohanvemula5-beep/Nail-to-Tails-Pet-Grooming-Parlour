import React from 'react';
import { motion } from 'motion/react';
import { Bath, Scissors, Sparkles, Heart } from 'lucide-react';

export default function Services() {
  const servicesList = [
    {
      id: 'dog_basic',
      name: 'Dog Grooming – Basic Groom',
      description: 'Essential hygiene and refreshing care for your dog.',
      includes: [
        'Bath with organic shampoo',
        'Blow dry & thorough brushing',
        'Nail trimming & ear cleaning',
      ],
      note: 'Ideal for regular upkeep.',
      icon: <Bath className="w-6 h-6 text-sage" />,
      image: 'https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'dog_advanced',
      name: 'Dog Grooming – Full Groom',
      description: 'Comprehensive styling and full body treatment.',
      includes: [
        'Everything in Basic Groom',
        'Full body haircut & styling',
        'Sanitary trim & paw pad clearing',
      ],
      note: 'Perfect for long‑coated dogs.',
      icon: <Scissors className="w-6 h-6 text-terracotta" />,
      image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'spa_wellness',
      name: 'Spa & Wellness Treatments',
      description: 'Specialized therapies for skin, coat, and relaxation.',
      includes: [
        'Aromatherapy & deep conditioning',
        'Paw butter massage',
        'Safe tick & flea treatments',
      ],
      note: 'A luxurious treat for stressed skin.',
      icon: <Heart className="w-6 h-6 text-amber-600" />,
      image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'cat_grooming',
      name: 'Cat Grooming',
      description: 'Quiet, low-stress handling tailored for felines.',
      includes: [
        'Waterless or gentle bath',
        'De-matting & brushing',
        'Nail trim & ear cleaning',
      ],
      note: 'Calm approach for sensitive cats.',
      icon: <Sparkles className="w-6 h-6 text-indigo-500" />,
      image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <div id="services-section" className="py-24 bg-white dark:bg-[#1a1b26] relative border-b border-stone-200/50 dark:border-stone-800/50 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 relative"
        >
          <div className="inline-block bg-[#FAF0E6] dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-700/30 text-xs uppercase tracking-widest px-4 py-1.5 rounded mb-4 font-mono shadow-sm transition-colors">
            Our Offerings
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal dark:text-stone-100 transition-colors">
            Premium Salon Services
          </h2>
          <p className="text-stone-500 dark:text-stone-400 font-sans mt-4 text-sm md:text-base leading-relaxed transition-colors">
            We use only 100% organic, hypoallergenic products. Every session is cage-free and focuses on your pet's comfort and well-being.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service, idx) => (
            <motion.div 
              key={service.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700 rounded flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group overflow-hidden"
            >
              {/* Thumbnail Image */}
              <div className="h-48 w-full relative overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white dark:bg-stone-800 flex items-center justify-center shadow-md transition-colors">
                  {service.icon}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-serif text-xl font-bold text-charcoal dark:text-stone-100 leading-snug mb-2 transition-colors">
                  {service.name}
                </h3>

                <p className="text-stone-500 dark:text-stone-400 text-xs italic mb-4 font-serif transition-colors">
                  {service.note}
                </p>

                <div className="space-y-3 flex-1 mb-6">
                  {service.includes.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-stone-600 dark:text-stone-300 transition-colors">
                      <span className="text-terracotta select-none font-bold text-xs pt-0.5">🐾</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
