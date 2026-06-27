import React, { useState, useEffect } from 'react';
import { Appointment } from '../types';
import { Calendar, Clock, Smile, Sparkles, Clipboard, ShieldAlert, CheckCircle, Trash2 } from 'lucide-react';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface BookingFormProps {
  selectedServiceId: 'bath_brush' | 'full_groom' | 'spa_package' | 'nail_trim' | '';
  onServiceBooked?: () => void;
}

export default function BookingForm({ selectedServiceId, onServiceBooked }: BookingFormProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [ownerName, setOwnerName] = useState('');
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petType, setPetType] = useState<'dog' | 'cat' | 'other'>('dog');
  const [serviceType, setServiceType] = useState<'bath_brush' | 'full_groom' | 'spa_package' | 'nail_trim'>('bath_brush');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sync with prop from services section
  useEffect(() => {
    if (selectedServiceId) {
      setServiceType(selectedServiceId);
    }
  }, [selectedServiceId]);

  // Load appointments on mount
  useEffect(() => {
    // 1. Try loading from localStorage first for instant UI response
    const saved = localStorage.getItem('nail_tails_appointments');
    if (saved) {
      try {
        setAppointments(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse appointments", e);
      }
    }

    // 2. Load from Firestore
    const fetchAppointments = async () => {
      try {
        const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetched: Appointment[] = [];
        querySnapshot.forEach((docSnapshot) => {
          fetched.push({
            id: docSnapshot.id,
            ...docSnapshot.data()
          } as Appointment);
        });
        
        if (fetched.length > 0) {
          setAppointments(fetched);
          localStorage.setItem('nail_tails_appointments', JSON.stringify(fetched));
        }
      } catch (err) {
        console.warn("Firestore loading failed; using localStorage fallback", err);
      }
    };

    fetchAppointments();
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSuccess(false);

    // Simple validation
    if (!ownerName.trim() || !petName.trim() || !petBreed.trim() || !date || !time) {
      setErrorMessage('Please fill in all the required fields marked with an asterisk (*)');
      return;
    }

    const newAppointmentData = {
      ownerName: ownerName.trim(),
      petName: petName.trim(),
      petBreed: petBreed.trim(),
      petType,
      serviceType,
      date,
      time,
      notes: notes.trim(),
      status: 'confirmed' as const,
      createdAt: new Date().toISOString()
    };

    // Save to Firestore and update state
    const saveToFirestoreAndState = async () => {
      try {
        const docRef = await addDoc(collection(db, 'appointments'), newAppointmentData);
        const newAppointment: Appointment = {
          id: docRef.id,
          ...newAppointmentData
        };
        const updated = [newAppointment, ...appointments];
        setAppointments(updated);
        localStorage.setItem('nail_tails_appointments', JSON.stringify(updated));
      } catch (err) {
        console.warn("Firestore save failed, saving locally:", err);
        // Fallback to local save
        const fallbackApt: Appointment = {
          id: 'apt_' + Date.now(),
          ...newAppointmentData
        };
        const updated = [fallbackApt, ...appointments];
        setAppointments(updated);
        localStorage.setItem('nail_tails_appointments', JSON.stringify(updated));
      }
    };

    saveToFirestoreAndState();

    // Reset Form
    setOwnerName('');
    setPetName('');
    setPetBreed('');
    setNotes('');
    setIsSuccess(true);
    
    if (onServiceBooked) {
      onServiceBooked();
    }

    // Auto-dismiss success message after 5 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  const handleDeleteAppointment = async (id: string) => {
    // Optimistic state update
    const filtered = appointments.filter((apt) => apt.id !== id);
    setAppointments(filtered);
    localStorage.setItem('nail_tails_appointments', JSON.stringify(filtered));

    try {
      if (!id.startsWith('apt_')) {
        await deleteDoc(doc(db, 'appointments', id));
      }
    } catch (err) {
      console.error("Failed to delete appointment from Firestore", err);
    }
  };

  const getServiceName = (id: string) => {
    switch (id) {
      case 'bath_brush': return 'Essential Bath & Brush';
      case 'full_groom': return 'Tailored Styling & Cut';
      case 'spa_package': return 'Royal Herbal Spa Treatment';
      case 'nail_trim': return 'Nail & Paw Pedicure';
      default: return id;
    }
  };

  return (
    <div className="py-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-stone-200/50" id="booking-section">
      
      {/* Interactive Booking Booklet */}
      <div className="lg:col-span-7 paper-card bg-white rounded-sm p-8 relative overflow-hidden" style={{ border: '1px solid #E6DFD3' }}>
        
        {/* Ribbon decoration */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sage via-terracotta to-amber-400" />
        
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 text-sage font-mono text-xs font-semibold uppercase tracking-wider mb-1">
            <Clipboard className="w-3.5 h-3.5" />
            <span>Secure Salon Reservation</span>
          </div>
          <h3 className="font-serif text-2xl font-normal italic text-charcoal">
            Book an Appointment
          </h3>
          <p className="text-stone-500 text-xs mt-1">
            Reserve your pet's premium experience. No prepayment needed — pay only after care is completed.
          </p>
        </div>

        {isSuccess && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg flex items-start gap-3 text-sm animate-fade-in" id="booking-success-banner">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Reservation Confirmed!</p>
              <p className="text-xs text-emerald-700 mt-1">
                We have registered your booking. A stylist from Nail to Tails will contact you shortly to confirm your pet's arrival time window.
              </p>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-start gap-3 text-sm" id="booking-error-banner">
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="font-medium">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleBookingSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 font-bold mb-1.5">
                Owner Name *
              </label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="e.g. Eleanor Vance"
                className="w-full bg-stone-50 border border-stone-200 focus:border-sage focus:ring-1 focus:ring-sage rounded p-2.5 text-sm text-charcoal outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 font-bold mb-1.5">
                Pet Name *
              </label>
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="e.g. Biscuit"
                className="w-full bg-stone-50 border border-stone-200 focus:border-sage focus:ring-1 focus:ring-sage rounded p-2.5 text-sm text-charcoal outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 font-bold mb-1.5">
                Pet Type
              </label>
              <select
                value={petType}
                onChange={(e) => setPetType(e.target.value as any)}
                className="w-full bg-stone-50 border border-stone-200 focus:border-sage focus:ring-1 focus:ring-sage rounded p-2.5 text-sm text-charcoal outline-none transition-all"
              >
                <option value="dog">🐶 Dog</option>
                <option value="cat">🐱 Cat</option>
                <option value="other">🐰 Other Pet</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 font-bold mb-1.5">
                Breed / Mix *
              </label>
              <input
                type="text"
                value={petBreed}
                onChange={(e) => setPetBreed(e.target.value)}
                placeholder="e.g. Cavalier King Charles Spaniel"
                className="w-full bg-stone-50 border border-stone-200 focus:border-sage focus:ring-1 focus:ring-sage rounded p-2.5 text-sm text-charcoal outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-1">
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 font-bold mb-1.5">
                Service Package
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value as any)}
                className="w-full bg-stone-50 border border-stone-200 focus:border-sage focus:ring-1 focus:ring-sage rounded p-2.5 text-sm text-charcoal outline-none transition-all font-medium text-charcoal"
              >
                <option value="bath_brush">Bath &amp; Brush</option>
                <option value="full_groom">Tailored Styling &amp; Cut</option>
                <option value="spa_package">Royal Herbal Spa</option>
                <option value="nail_trim">Nail &amp; Paw Pedicure</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 font-bold mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                Select Date *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full bg-stone-50 border border-stone-200 focus:border-sage focus:ring-1 focus:ring-sage rounded p-2.5 text-sm text-charcoal outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 font-bold mb-1.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                Arrival Window *
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 focus:border-sage focus:ring-1 focus:ring-sage rounded p-2.5 text-sm text-charcoal outline-none transition-all"
                required
              >
                <option value="">Select window...</option>
                <option value="08:30">Morning Early (08:30 AM)</option>
                <option value="10:30">Morning Mid (10:30 AM)</option>
                <option value="13:00">Early Afternoon (01:00 PM)</option>
                <option value="15:00">Late Afternoon (03:00 PM)</option>
                <option value="17:00">Evening Express (05:00 PM)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 font-bold mb-1.5">
              Special Styling Instructions or Allergies (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Sensitive to lavender, prefers round teddy bear face cuts, nervous around hair dryers..."
              rows={3}
              className="w-full bg-stone-50 border border-stone-200 focus:border-sage focus:ring-1 focus:ring-sage rounded p-2.5 text-sm text-charcoal outline-none transition-all resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-terracotta text-white font-bold rounded-sm shadow-flat-terracotta hover:translate-y-[-1px] transition-all btn-stamp text-center cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4.5 h-4.5" />
              Secure My Salon Reservation
            </button>
          </div>
        </form>
      </div>

      {/* Appointment Registry Display */}
      <div className="lg:col-span-5 flex flex-col space-y-6">
        
        {/* Salon Info Ticket */}
        <div className="paper-card bg-amber-50/40 p-6 rounded-sm relative overflow-hidden text-left border border-amber-200/40 shadow-xs">
          {/* Simulated punch holes on side */}
          <div className="absolute top-0 right-4 h-full flex flex-col justify-between py-4 pointer-events-none opacity-20">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-stone-200 rounded-full border border-stone-300" />
            ))}
          </div>

          <div className="flex items-center gap-1 text-xs text-amber-800 font-mono font-bold tracking-wider uppercase mb-2">
            <Smile className="w-4 h-4" />
            <span>Nails to Tails Registry</span>
          </div>
          <h4 className="font-serif text-lg font-normal italic text-charcoal mb-3">Salon Guidelines</h4>
          <ul className="space-y-2 text-xs text-stone-600 list-inside">
            <li className="flex items-start gap-1.5"><span className="text-terracotta">🌸</span> <span>Appointments can be rearranged or canceled free of charge up to 12 hours prior.</span></li>
            <li className="flex items-start gap-1.5"><span className="text-terracotta">🌸</span> <span>First-time pets receive a gentle 15-minute acclimatization walk before being placed on tables.</span></li>
            <li className="flex items-start gap-1.5"><span className="text-terracotta">🌸</span> <span>All organic treatments include free complimentary nail grinding.</span></li>
          </ul>
        </div>

        {/* Live Appointment List */}
        <div className="paper-card bg-[#FCFAF6] p-6 rounded-sm text-left" style={{ border: '1px solid #E6DFD3' }}>
          <h4 className="font-serif text-lg font-normal italic text-charcoal border-b border-stone-200/60 pb-3 mb-4 flex items-center justify-between">
            <span>Your Active Bookings</span>
            <span className="font-mono text-xs text-sage bg-sage/10 px-2.5 py-0.5 rounded-full font-bold">
              {appointments.length} Registered
            </span>
          </h4>

          {appointments.length === 0 ? (
            <div className="py-10 text-center text-stone-400">
              <Calendar className="w-10 h-10 mx-auto text-stone-300 mb-2" />
              <p className="text-sm font-medium">No active appointments found.</p>
              <p className="text-xs mt-1">Book a premium session on the left to populate your salon registry.</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[340px] overflow-y-auto pr-1">
              {appointments.map((apt) => (
                <div 
                  key={apt.id} 
                  className="bg-white border border-stone-200/70 p-4 rounded-md relative shadow-xs hover:border-sage transition-colors"
                >
                  <button
                    onClick={() => handleDeleteAppointment(apt.id)}
                    className="absolute top-3 right-3 text-stone-400 hover:text-red-500 p-1 rounded-sm transition-colors cursor-pointer"
                    title="Cancel Appointment"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="text-xs font-mono uppercase tracking-widest text-sage font-bold mb-1">
                    {getServiceName(apt.serviceType)}
                  </div>
                  <h5 className="font-serif text-base font-bold text-charcoal">
                    {apt.petName} <span className="text-stone-400 font-sans text-xs font-normal">({apt.petBreed})</span>
                  </h5>
                  <p className="text-xs text-stone-500 mt-1">Owner: {apt.ownerName}</p>

                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-dashed border-stone-100 text-xs font-mono text-stone-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      {apt.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      {apt.time} AM/PM
                    </span>
                  </div>

                  {apt.notes && (
                    <div className="mt-2 bg-stone-50 border border-stone-100 rounded px-2.5 py-1.5 text-[11px] text-stone-500 leading-relaxed italic">
                      “{apt.notes}”
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
