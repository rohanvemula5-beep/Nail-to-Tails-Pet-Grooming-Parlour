import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export default function Pricing() {
  const packages = [
    {
      title: "Basic Groom (Dog)",
      price: "₹999",
      description: "Essential care to keep your dog clean and refreshed.",
      features: [
        "Organic Bath & Blow Dry",
        "Thorough Brushing",
        "Nail Trimming",
        "Ear Cleaning",
        "Sanitary Trim"
      ]
    },
    {
      title: "Full Groom (Dog)",
      price: "₹1,499",
      description: "Complete styling and hygiene package for your dog.",
      features: [
        "Everything in Basic Groom",
        "Full Body Haircut / Styling",
        "De-shedding Treatment",
        "Paw Pad Trimming",
        "Premium Cologne Spritz"
      ],
      isPopular: true
    },
    {
      title: "Cat Grooming",
      price: "₹1,199",
      description: "Gentle, stress-free grooming tailored specifically for felines.",
      features: [
        "Waterless / Gentle Bath",
        "De-matting & Brushing",
        "Nail Trimming",
        "Ear & Eye Cleaning",
        "Lion Cut (if requested)"
      ]
    },
    {
      title: "Spa & Wellness",
      price: "₹1,999",
      description: "Luxurious therapies for ultimate pet relaxation and skin health.",
      features: [
        "Aromatherapy Bath",
        "Deep Conditioning Treatment",
        "Flea & Tick Treatment (Safe)",
        "Paw Butter Massage",
        "Teeth Cleaning/Wiping"
      ]
    }
  ];

  return (
    <div id="pricing-section" className="py-24 bg-[#FBF9F5] dark:bg-[#13141c] border-b border-stone-200/50 dark:border-stone-800/50 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center justify-center bg-sage/10 text-sage border border-sage/20 px-3 py-1.5 rounded-sm text-xs font-bold font-mono tracking-widest uppercase mb-4 transition-colors">
            Transparent Pricing
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal dark:text-stone-100 mb-4 transition-colors">
            Our Grooming Packages
          </h2>
          <p className="text-stone-500 dark:text-stone-400 text-sm transition-colors">
            Honest pricing with no hidden surprises. Prices marked as "Starting from". Final price depends on your pet's size, breed, coat condition, and behavior during the session.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {packages.map((pkg, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`bg-white dark:bg-stone-900 border rounded-sm p-6 flex flex-col relative transition-transform hover:-translate-y-2 hover:shadow-xl ${pkg.isPopular ? 'border-sage shadow-md' : 'border-stone-200 dark:border-stone-700 shadow-sm'}`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sage text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-sm whitespace-nowrap shadow-sm">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="font-serif font-bold text-lg text-charcoal dark:text-stone-100 mb-2 transition-colors">{pkg.title}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-xs text-stone-400 dark:text-stone-500 font-mono transition-colors">Starting from</span>
                  <span className="text-2xl font-bold text-terracotta">{pkg.price}</span>
                </div>
                <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed transition-colors">{pkg.description}</p>
              </div>

              <div className="space-y-3 mb-8 flex-1">
                {pkg.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                    <span className="text-sm text-stone-600 dark:text-stone-300 font-sans transition-colors">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => {
                  const elem = document.getElementById('booking-section');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors btn-stamp ${
                  pkg.isPopular 
                    ? 'bg-sage text-white shadow-flat-sage hover:bg-sage/90' 
                    : 'bg-stone-100 text-charcoal border border-stone-200 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-200 dark:border-stone-700 dark:hover:bg-stone-700'
                }`}
              >
                Book Package
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
