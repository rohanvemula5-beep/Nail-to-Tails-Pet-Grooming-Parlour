import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Gallery from './components/Gallery';
import Team from './components/Team';
import BookingForm from './components/BookingForm';
import { Moon, Sun } from 'lucide-react';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<'bath_brush' | 'full_groom' | 'spa_package' | 'nail_trim' | ''>('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

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

  const reviewsList = [
    {
      petName: "Puppy Rocky",
      location: "Saroor Nagar",
      review: "Absolutely magical! Rocky usually shakes when entering groomers, but the calm environment at Nail to Tails had him relaxed during his brushing. 10/10!",
      parent: "Theresa M.",
    },
    {
      petName: "Mittens",
      location: "LB Nagar",
      review: "Our stylist did a masterpiece on Mittens! The gentle bath was incredibly neat and fluffy. They take such gentle and slow care of her.",
      parent: "David K.",
    },
    {
      petName: "Winston",
      location: "Dilsukhnagar",
      review: "Highly recommend their spa treatment! The detailed product and dietary advice totally solved Winston's itchy summer skin. True artisanal care.",
      parent: "Clara V.",
    },
    {
      petName: "Bella",
      location: "Saroor Nagar",
      review: "A beautiful space for grooming. Cage-free and stress-free. I will definitely be bringing Bella back for her regular trims.",
      parent: "Kiran R.",
    }
  ];

  return (
    <div className="min-h-screen flex flex-col relative" id="app-root">
      
      {/* Top Header Navigation Bar */}
      <header className="sticky top-0 bg-white/90 dark:bg-[#1a1b26]/90 backdrop-blur-md border-b border-stone-200/50 dark:border-stone-800/50 z-50 py-3.5 px-6 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Elegant Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-terracotta rounded-full flex items-center justify-center text-white shadow-sm font-bold text-lg animate-pulse">
              🐾
            </div>
            <span className="text-xl font-bold text-charcoal dark:text-stone-100 tracking-tight font-serif transition-colors">
              Nail to Tails Pet Grooming Parlour
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest transition-colors">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-sage transition-colors cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={() => handleScrollToSection('about-section')}
              className="hover:text-sage transition-colors cursor-pointer"
            >
              About
            </button>
            <button 
              onClick={() => handleScrollToSection('services-section')}
              className="hover:text-sage transition-colors cursor-pointer"
            >
              Services
            </button>
            <button 
              onClick={() => handleScrollToSection('pricing-section')}
              className="hover:text-sage transition-colors cursor-pointer"
            >
              Pricing
            </button>
            <button 
              onClick={() => handleScrollToSection('gallery-section')}
              className="hover:text-sage transition-colors cursor-pointer"
            >
              Gallery
            </button>
            <button 
              onClick={() => handleScrollToSection('booking-section')}
              className="hover:text-sage transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-stone-500 hover:text-charcoal dark:hover:text-stone-300 transition-colors cursor-pointer rounded-full hover:bg-stone-100 dark:hover:bg-stone-800"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {/* Top Book Button */}
            <button
              onClick={() => handleScrollToSection('booking-section')}
              className="hidden sm:block px-6 py-2.5 bg-sage text-white text-xs font-bold rounded shadow-sm hover:-translate-y-[1px] transition-all uppercase tracking-wider cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>
      </header>

      {/* Hero Module */}
      <Hero 
        onBookClick={() => handleScrollToSection('booking-section')}
      />

      {/* About Module */}
      <About />

      {/* Services Module */}
      <Services />

      {/* Pricing Module */}
      <Pricing />

      {/* Gallery Module */}
      <Gallery />

      {/* Team / Parlour Module */}
      <Team />

      {/* Testimonials */}
      <div className="py-24 bg-white dark:bg-[#1a1b26] border-b border-stone-200/50 dark:border-stone-800/50 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="inline-block bg-[#FAF0E6] dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-700/30 text-xs uppercase tracking-widest px-4 py-1.5 rounded mb-4 font-mono shadow-sm transition-colors">
              Testimonials
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal dark:text-stone-100 transition-colors">
              Loved by Hyderabad pet parents
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviewsList.map((rev, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700 p-6 rounded relative hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500 text-sm">
                    ★★★★★
                  </div>
                </div>

                <p className="text-sm text-stone-600 dark:text-stone-300 font-sans leading-relaxed mb-6 transition-colors">
                  "{rev.review}"
                </p>

                <div className="mt-auto border-t border-stone-200 dark:border-stone-700 pt-4 transition-colors">
                  <p className="font-bold text-charcoal dark:text-stone-200 text-sm transition-colors">{rev.petName}</p>
                  <p className="text-[10px] uppercase font-mono text-stone-500 dark:text-stone-400 transition-colors">{rev.location}</p>
                  <p className="text-[10px] uppercase font-mono text-stone-400 dark:text-stone-500 mt-1 transition-colors">Parent: {rev.parent}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Form Module */}
      <BookingForm selectedServiceId={selectedServiceId} />

      {/* Footer */}
      <footer className="bg-charcoal text-white py-16 px-6 relative mt-auto font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
          
          <div className="space-y-4">
            <div className="font-bold text-lg font-serif">
              Nail to Tails Pet Grooming Parlour
            </div>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              Premium, stress-free grooming in Saroor Nagar, Hyderabad. We believe in gentle patience, organic ingredients, and custom-styled luxury for your beloved pets.
            </p>
          </div>

          <div className="space-y-4 text-sm text-stone-300">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-mono">Location</h4>
            <p className="leading-relaxed">
              11-110 P&T Colony, Pragati Nagar,<br />
              Sharada Theatre Rd, Saroor Nagar,<br />
              Hyderabad – 500035, Telangana.
            </p>
          </div>

          <div className="space-y-4 text-sm text-stone-300">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-mono">Contact</h4>
            <p className="leading-relaxed flex flex-col gap-1">
              <span>Phone: +91 90000 12345</span>
              <span>WhatsApp: +91 90000 12345</span>
            </p>
          </div>

          <div className="space-y-4 text-sm text-stone-300">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-mono">Social</h4>
            <a 
              href="https://instagram.com/nailtotails" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              Instagram @nailtotails
            </a>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-stone-700/50 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-stone-500 uppercase tracking-widest font-mono">
          <div>
            &copy; {new Date().getFullYear()} Nail to Tails Pet Grooming Parlour – All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-stone-300">Privacy Policy</a>
            <a href="#" className="hover:text-stone-300">Terms &amp; Conditions</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
