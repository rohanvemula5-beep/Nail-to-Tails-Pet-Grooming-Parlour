import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

export default function ScrapbookGallery() {
  const galleryItems = [
    {
      url: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&q=80&w=600",
      title: "Shih Tzu Full Groom",
      description: "Coco, pampered with a customized scissor teddy-cut in Saroor Nagar.",
      rotation: "rotate-[-2deg]",
      sticker: "✨ Fluffy"
    },
    {
      url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600",
      title: "Feline Spa Day",
      description: "Persian cat getting a relaxed, gentle lavender sponge bath.",
      rotation: "rotate-[3deg]",
      sticker: "🐾 Low Stress"
    },
    {
      url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600",
      title: "Essential Bath & Blow-Dry",
      description: "Happy Golden Retriever, fully de-shedded and smelling of sweet chamomile.",
      rotation: "rotate-[-1deg]",
      sticker: "❤️ Silky Smooth"
    }
  ];

  return (
    <div className="py-20 bg-[#FAF7F2] relative border-b border-stone-200/50 overflow-hidden" id="gallery-section">
      {/* Background paper accents */}
      <div className="absolute top-0 right-10 w-32 h-32 bg-orange-100/30 rounded-full blur-xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-44 h-44 bg-teal-100/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header section styled as pinned paper strip */}
        <div className="text-center max-w-2xl mx-auto mb-16 relative">
          <div className="inline-block bg-[#F5E6D3] text-stone-700 border border-stone-300 text-xs uppercase tracking-widest px-4 py-1.5 rounded rotate-1 mb-4 font-mono shadow-xs">
            📸 Our Pinned Salon Board
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-normal italic text-charcoal">
            Recent Happy Guests
          </h2>
          <p className="text-stone-500 font-sans mt-3 text-sm md:text-base">
            Real photos of local pets groomed by our talented hands. No hotlink locks—fully optimized, responsive high-end visuals.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              className={`polaroid relative ${item.rotation} hover:rotate-0 hover:scale-103 transition-all duration-300 cursor-pointer`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              {/* Scrap tape overlay at the top */}
              <div className="absolute top-[-15px] left-[50%] transform translate-x-[-50%] w-24 h-6 bg-stone-100/80 border border-dashed border-stone-300/40 opacity-75 rotate-[-1deg] z-20 pointer-events-none flex items-center justify-center text-[8px] font-mono tracking-widest uppercase text-stone-400">
                ★ SECURED ★
              </div>

              {/* Main Image Frame with fine border */}
              <div className="relative overflow-hidden aspect-[4/3] rounded-xs bg-stone-100 border border-stone-200/40">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover filter contrast-[1.02] grayscale-[5%] hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual sticker detail */}
                <div className="absolute bottom-2 right-2 bg-stone-900/70 backdrop-blur-xs text-white text-[9px] px-2 py-0.5 rounded font-mono font-bold">
                  {item.sticker}
                </div>
              </div>

              {/* Polaroid Annotation Text */}
              <div className="mt-5 text-left border-t border-dashed border-stone-200 pt-4 px-1">
                <h4 className="font-serif italic text-charcoal text-base font-bold flex items-center justify-between">
                  {item.title}
                  <span className="text-xs text-stone-300 font-bold">🐾</span>
                </h4>
                <p className="text-stone-500 text-xs font-sans mt-1.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instantly book banner under the gallery */}
        <div className="mt-14 text-center">
          <p className="text-xs text-stone-400 font-mono uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-terracotta fill-terracotta" />
            Every session is custom-styled to fit your pet's aesthetic
          </p>
        </div>

      </div>
    </div>
  );
}
