import React from 'react';
import { Scissors, Bath, Sparkles, Footprints, Clock, HelpCircle } from 'lucide-react';

interface Service {
  id: 'bath_brush' | 'full_groom' | 'spa_package' | 'nail_trim';
  name: string;
  price: string;
  duration: string;
  description: string;
  includes: string[];
  icon: React.ReactNode;
  tag?: string;
  targetBreedSize?: string;
}

interface ServicesProps {
  onSelectService: (serviceId: 'bath_brush' | 'full_groom' | 'spa_package' | 'nail_trim') => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const servicesList: Service[] = [
    {
      id: 'bath_brush',
      name: 'Basic Bath & Brush',
      targetBreedSize: 'Small / Medium / Large',
      price: '₹600 – ₹1,400+',
      duration: '45 – 60 mins',
      description: 'Perfect for regular maintenance, coat shedding reduction, and a clean, fresh-scented pet.',
      includes: [
        'Professional bathing with organic shampoo',
        'Complete high-velocity blow-dry',
        'Comprehensive full brush-out',
        'Nail trim & claw clipping',
        'Ear cleaning & sanitation'
      ],
      icon: <Bath className="w-6 h-6 text-sage" />,
    },
    {
      id: 'full_groom',
      name: 'Full Grooming',
      targetBreedSize: 'Small / Medium / Large',
      price: '₹900 – ₹2,200+',
      duration: '90 – 120 mins',
      description: 'Our full signature pamper package. Includes custom structural haircut designed specifically for breed or lifestyle.',
      includes: [
        'Gentle bath & blow-dry',
        'Custom breed-specific haircut & styling',
        'Nail clipping & diamond dremel filing',
        'Ear cleaning & internal hair trim',
        'Sanitary area clip & paw balm hydration'
      ],
      icon: <Scissors className="w-6 h-6 text-terracotta" />,
      tag: 'Most Popular',
    },
    {
      id: 'spa_package',
      name: 'Feline Full Groom',
      targetBreedSize: 'Cats (All Sizes)',
      price: '₹1,400 – ₹2,000+',
      duration: '75 – 90 mins',
      description: 'The ultimate therapeutic renewal for cats. Gentle, low-stress handling with quiet specialized tools.',
      includes: [
        'Gentle botanical water-less or warm-water bath',
        'Full trim or stylish lion cut',
        'Safety claw trimming',
        'Gentle ear care & wax clearing',
        'Scentless skin-soothing conditioning'
      ],
      icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
      tag: 'Feline Special',
    },
    {
      id: 'nail_trim',
      name: 'Essential Add-ons',
      targetBreedSize: 'All Pets',
      price: 'From ₹150+',
      duration: '15 – 30 mins',
      description: 'Quick-access care focusing exclusively on keeping feet, ears, and skin healthy, clean, and irritation-free.',
      includes: [
        'Gentle nail trimming (₹150)',
        'Detailed ear cleaning & wash (₹150)',
        'Medicated tick & flea skin rinse (₹300)',
        'Express sanitary scissor trim (₹250)'
      ],
      icon: <Footprints className="w-6 h-6 text-amber-600" />,
    }
  ];

  return (
    <div className="py-20 bg-stone-50 relative border-b border-stone-200/50" id="services-section">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header with paper ribbon decoration */}
        <div className="text-center max-w-2xl mx-auto mb-16 relative">
          <div className="inline-block bg-[#FAF0E6] text-amber-800 border border-amber-200 text-xs uppercase tracking-widest px-4 py-1.5 rounded rotate-[-2deg] mb-4 font-mono shadow-xs">
            ✨ Artisanal Parlour Offerings ✨
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-normal italic text-charcoal">
            Tailored Grooming Packages
          </h2>
          <p className="text-stone-500 font-sans mt-3 text-sm md:text-base">
            We use only 100% biodegradable, hypoallergenic extracts. Each appointment is scheduled with a spacious time window to eliminate rush.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesList.map((service) => (
            <div 
              key={service.id} 
              className="paper-card rounded-sm flex flex-col justify-between h-full relative overflow-hidden"
              style={{
                background: '#FFFFFF',
              }}
            >
              {service.tag && (
                <div className={`absolute top-4 right-[-35px] rotate-[40deg] text-[8px] font-mono font-bold tracking-wider text-white uppercase px-10 py-1 ${
                  service.id === 'spa_package' ? 'bg-sage' : 'bg-terracotta'
                } shadow-sm`}>
                  {service.tag}
                </div>
              )}

              <div className="p-6">
                {/* Vintage Line Stamp Icon border */}
                <div className="w-12 h-12 rounded-sm bg-stone-50 flex items-center justify-center border border-stone-200/60 shadow-inner mb-4">
                  {service.icon}
                </div>

                <h3 className="font-serif text-xl font-bold text-charcoal leading-snug mb-1">
                  {service.name}
                </h3>

                {service.targetBreedSize && (
                  <p className="text-[10px] uppercase font-mono tracking-wider text-stone-400 font-bold mb-2">
                    Breeds: {service.targetBreedSize}
                  </p>
                )}

                <div className="flex items-center gap-4 text-xs font-mono text-stone-500 mb-4 border-b border-dashed border-stone-200 pb-3">
                  <span className="font-bold text-charcoal text-sm">{service.price}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {service.duration}
                  </span>
                </div>

                <p className="text-stone-600 text-xs leading-relaxed mb-6 min-h-[48px]">
                  {service.description}
                </p>

                {/* Checklist with bullet stars */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold tracking-wider text-stone-400 uppercase font-mono mb-2">Service details:</p>
                  {service.includes.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                      <span className="text-terracotta select-none font-bold text-[10px] pt-0.5">🐾</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stamp button to book */}
              <div className="p-6 pt-0 border-t border-stone-100/60 mt-6">
                <button
                  onClick={() => onSelectService(service.id)}
                  className="w-full py-2.5 bg-sage text-white text-xs font-bold rounded-sm shadow-flat-sage hover:translate-y-[-1px] transition-all btn-stamp text-center cursor-pointer"
                >
                  Select &amp; Schedule
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Help note shaped as custom cardstock tag */}
        <div className="mt-12 bg-amber-50/50 border border-amber-200/50 rounded-sm p-6 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4 shadow-xs">
          <HelpCircle className="w-8 h-8 text-amber-700 shrink-0" />
          <div className="text-left">
            <h4 className="font-bold text-charcoal text-sm font-serif">Pricing &amp; Size Note:</h4>
            <p className="text-stone-500 text-xs leading-relaxed mt-1">
              Prices are market estimates. Final charges may vary based on pet size, coat condition, and behavior. Please confirm with us at the time of booking. Base grooming rates are determined by weight and coat density. Let our stylists analyze your pet's photo in the AI Lab below for a precise recommendation!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
