import { X, CheckCircle2, Calendar, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import LocationModal from './LocationModal';

export default function BookingModal({ service, isOpen, onClose }) {
  const [location, setLocation] = useState('Select Location');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  useEffect(() => {
    const savedLocation = localStorage.getItem('user_location');
    if (savedLocation) setLocation(savedLocation);
  }, [isOpen]);

  const handleLocationUpdate = (newLocation) => {
    setLocation(newLocation);
    localStorage.setItem('user_location', newLocation);
    setIsLocationModalOpen(false);
  };

  if (!service) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-primary/80 backdrop-blur-md"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden border border-white/20"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 border border-white/30 flex items-center justify-center transition-all z-20 group"
              >
                <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform" />
              </button>

              {/* Image */}
              <div className="h-56 relative">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                <div className="absolute top-6 left-6">
        <span className="bg-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
                    {service.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-10 -mt-16 relative">
                <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-black/5 border border-slate-100 mb-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-bl-[2rem]" />
                  <h3 className="text-2xl font-black text-primary mb-2 uppercase tracking-tighter">
                    {service.name}
                  </h3>

                  <p className="text-slate-500 text-sm mb-6 font-medium leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Total Price</span>
                      <span className="text-3xl font-black text-primary">
                        ₹{service.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-tight border border-emerald-100">
                      <CheckCircle2 className="w-4 h-4" />
                      Best Price
                    </div>
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-4 p-5 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-primary/20 transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                        Schedule Date
                      </p>
                      <p className="text-sm font-black text-slate-900 uppercase">
                        Tomorrow, 21st April
                      </p>
                    </div>
                    <button className="text-[10px] font-black text-accent uppercase tracking-widest hover:underline">
                      Edit
                    </button>
                  </div>

                  <div className="flex items-center gap-4 p-5 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-primary/20 transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                        Slot Timing
                      </p>
                      <p className="text-sm font-black text-slate-900 uppercase">
                        10:00 AM - 12:00 PM
                      </p>
                    </div>
                    <button className="text-[10px] font-black text-accent uppercase tracking-widest hover:underline">
                      Edit
                    </button>
                  </div>

                  <div className="flex items-center gap-4 p-5 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-primary/20 transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                        Arrival Address
                      </p>
                      <p className="text-sm font-black text-slate-900 truncate uppercase">
                        {location}
                      </p>
                    </div>
                    <button 
                      onClick={() => setIsLocationModalOpen(true)}
                      className="text-[10px] font-black text-accent uppercase tracking-widest hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* Confirm Button */}
                <button className="w-full bg-primary hover:bg-primary-dark text-white py-6 rounded-2xl font-black text-[15px] uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-[0.98]">
                  Confirm Booking
                </button>

                <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-6">
                  Pay after service <span className="text-primary">completion</span>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <LocationModal 
        isOpen={isLocationModalOpen}
        onSelect={handleLocationUpdate}
      />
    </>
  );
}
