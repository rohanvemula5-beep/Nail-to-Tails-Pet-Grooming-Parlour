import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import BookingForm from './components/BookingForm';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<'bath_brush' | 'full_groom' | 'spa_package' | 'nail_trim' | ''>('');

  useEffect(() => {
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    
    // Clear URL hash to prevent browser auto-scrolling to an element on load
    if (window.location.hash) {
      try {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch (e) {
        console.warn('Could not clear URL hash:', e);
      }
    }

    // Secondary delayed scroll to ensure any late-rendering components don't push the viewport down
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSelectService = (serviceId: 'bath_brush' | 'full_groom' | 'spa_package' | 'nail_trim') => {
    setSelectedServiceId(serviceId);
    
    // Smooth scroll directly to booking section
    const elem = document.getElementById('booking-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Testimonials modeled as scrap sticky notes
  const reviewsList = [
    {
      petName: "Barnaby",
      breed: "Golden Retriever",
      review: "Absolutely magical! Barnaby usually shakes when entering groomers, but the slow, lavender-scented environment at Nail to Tails had him sleeping during his brushing. 10/10!",
      parent: "Theresa M.",
      tilt: "rotate-[-1.5deg]"
    },
    {
      petName: "Penelope",
      breed: "Bichon Frise Mix",
      review: "Our stylist did an absolute masterpiece on Penelope! The hand-scissored rounded Teddy cut is incredibly neat, fluffy, and stylish. They take such gentle and slow care of her.",
      parent: "David K.",
      tilt: "rotate-[2deg]"
    },
    {
      petName: "Winston",
      breed: "Cockapoo",
      review: "Highly recommend the High Thinking Wellness Plan! The detailed product and dietary advice totally solved Winston's itchy summer skin. True artisanal care.",
      parent: "Clara V.",
      tilt: "rotate-[-1deg]"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col relative" id="app-root">
      
      {/* Top Scrapbook Header Navigation Bar */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-stone-200/50 z-50 py-3.5 px-6 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Elegant Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-terracotta rounded-full flex items-center justify-center text-white shadow-sm font-bold text-lg animate-pulse">
              🐾
            </div>
            <span className="text-xl font-bold text-charcoal tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
              Nail to Tails
            </span>
          </div>

          {/* Quick scroll list to comply with single view boundaries */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono font-bold text-stone-500 uppercase tracking-widest">
            <button 
              onClick={() => handleScrollToSection('services-section')}
              className="hover:text-sage transition-colors cursor-pointer"
            >
              Services
            </button>
            <button 
              onClick={() => handleScrollToSection('booking-section')}
              className="hover:text-sage transition-colors cursor-pointer"
            >
              Bookings
            </button>
          </nav>

          {/* Dynamic Top Book Button */}
          <button
            onClick={() => handleScrollToSection('booking-section')}
            className="px-6 py-2 bg-sage text-white text-xs font-bold rounded-sm shadow-flat-sage hover:translate-y-[-1px] transition-all btn-stamp cursor-pointer"
          >
            Book Visit
          </button>
        </div>
      </header>

      {/* Hero Module */}
      <Hero 
        onBookClick={() => handleScrollToSection('booking-section')}
      />

      {/* Services Module */}
      <Services onSelectService={handleSelectService} />

      {/* Testimonials Deck (Styled as colorful pinned scrap-paper stickies) */}
      <div className="py-20 bg-[#FCFAF6] border-b border-stone-200/50 relative">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-16 relative">
            <div className="inline-block bg-orange-100/50 text-amber-800 border border-orange-200 text-xs uppercase tracking-widest px-3 py-1 rounded rotate-[1deg] mb-3 font-mono">
              ❤️ Family Love Notes ❤️
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-charcoal">
              Pinned Salon Feedback
            </h3>
            <p className="text-stone-500 text-xs font-sans mt-2">
              Real opinions pinned to our corkboard by local pet parents. We prioritize comfort above all.
            </p>
          </div>

          {/* corkboard grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {reviewsList.map((rev, idx) => (
              <div 
                key={idx} 
                className={`sticky-note p-6 rounded relative min-h-[220px] flex flex-col justify-between text-left ${rev.tilt} hover:scale-103 hover:shadow-lg transition-transform duration-300`}
                style={{
                  backgroundColor: idx % 2 === 0 ? '#FEFDF0' : '#F6FAF7',
                  borderLeftColor: idx % 2 === 0 ? 'var(--color-terracotta)' : 'var(--color-sage)'
                }}
              >
                {/* Decorative pushed push-pin in the center top */}
                <div className="absolute top-[-8px] left-[50%] transform translate-x-[-50%] w-4 h-4 bg-red-500 rounded-full border border-red-600 shadow-md flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-red-300 rounded-full" />
                </div>

                <div>
                  {/* Paw Print Badge */}
                  <div className="flex items-center gap-1.5 mb-3 border-b border-dashed border-stone-300 pb-2">
                    <span className="text-base select-none">🐾</span>
                    <span className="font-serif font-bold text-sm text-charcoal">{rev.petName}</span>
                    <span className="text-[10px] font-mono text-stone-400">({rev.breed})</span>
                  </div>

                  <p className="text-xs text-stone-600 font-sans italic leading-relaxed">
                    &ldquo;{rev.review}&rdquo;
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-dashed border-stone-200/50 flex justify-between items-center text-[10px] text-stone-400 font-mono">
                  <span>PARENT: {rev.parent}</span>
                  <span className="text-amber-500 text-xs">★★★★★</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Booking Form Module */}
      <BookingForm selectedServiceId={selectedServiceId} />

      {/* Beautiful Printed Footer */}
      <footer className="bg-white border-t border-stone-200/40 py-16 px-6 relative mt-auto font-sans overflow-hidden">
        {/* Dynamic torn zigzag edge representing the scrapbook paper tear */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-[#FBF9F5] torn-zigzag"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 mt-4 text-left">
          {/* Logo & Description */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-1.5 font-bold text-charcoal text-base" style={{ fontFamily: 'Georgia, serif' }}>
              <span>🐾</span>
              <span>Nail to Tails Pet Grooming Parlour</span>
            </div>
            <p className="text-stone-500 text-xs leading-relaxed">
              Premium, stress-free grooming in Saroor Nagar, Hyderabad. We believe that professional, hand-scissored styling should always come with gentle patience, organic ingredients, and custom-styled luxury. Est. 2020.
            </p>
            <div className="pt-2">
              <a 
                href="https://instagram.com/nailtotails" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-terracotta font-mono font-bold"
              >
                <span className="text-sm">📸</span>
                @nailtotails on Instagram
              </a>
            </div>
          </div>

          {/* Exact Address & Contact */}
          <div className="lg:col-span-4 space-y-4 text-xs font-mono">
            <h4 className="font-bold text-charcoal uppercase tracking-wider text-[10px] border-b border-dashed border-stone-200 pb-2">📍 Parlour Location</h4>
            <p className="text-stone-600 leading-relaxed font-sans text-xs">
              <strong>Nail to Tails Pet Grooming Parlour</strong><br />
              11-110 P&T Colony, Pragati Nagar,<br />
              Sharada Theatre Rd, Saroor Nagar,<br />
              Hyderabad – 500035, Telangana.
            </p>
            <div className="pt-2 font-sans">
              <span className="font-mono font-bold text-[10px] uppercase block text-stone-400 mb-1">🕒 Working Hours</span>
              <p className="text-stone-600 text-xs font-medium">Monday – Sunday | 8:30 AM to 9:00 PM</p>
              <p className="text-[11px] text-terracotta italic mt-0.5">(Note: Tuesdays open until 9:30 PM)</p>
            </div>
          </div>

          {/* Action CTA & Copyright */}
          <div className="lg:col-span-4 flex flex-col justify-between items-start lg:items-end space-y-6">
            <div className="w-full text-left lg:text-right">
              <h4 className="font-mono font-bold text-[10px] uppercase text-stone-400 tracking-wider mb-2">Book via phone or WhatsApp</h4>
              <a
                href="tel:+919000012345"
                className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta text-white font-bold rounded-sm shadow-flat-terracotta hover:translate-y-[-1px] transition-all btn-stamp uppercase tracking-widest text-xs cursor-pointer"
              >
                📞 Call Now to Book
              </a>
            </div>

            <div className="text-[11px] text-stone-400 font-mono text-left lg:text-right">
              &copy; {new Date().getFullYear()} Nail to Tails. Crafted with organic love.<br />
              Hyderabad's Premier Pet Care Sanctuary.
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
