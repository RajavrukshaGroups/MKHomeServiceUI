import { useParams, useNavigate } from 'react-router-dom';
import { FEATURED_SERVICES, PROVIDERS, REVIEWS } from '../constants';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import LocationModal from '../components/common/LocationModal';
import { Star, ShieldCheck, Clock, MapPin, Calendar, CheckCircle2, ChevronLeft, Share2, Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';
import BookingModal from '../components/common/BookingModal';

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const [location, setLocation] = useState('Select Location');
  const [isAdded, setIsAdded] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  
  const service = FEATURED_SERVICES.find(s => s.id === id) || FEATURED_SERVICES[0];
  const provider = PROVIDERS[0];
  const isInCart = cartItems.some(item => item.id === service.id);

  useEffect(() => {
    const savedLocation = localStorage.getItem('user_location');
    if (savedLocation) setLocation(savedLocation);
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = () => {
    addToCart(service);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleLocationSelect = (cityName) => {
    setLocation(cityName);
    localStorage.setItem('user_location', cityName);
    setIsLocationModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background-app font-sans selection:bg-primary/10 selection:text-primary">
      <Navbar location={location} onLocationClick={() => setIsLocationModalOpen(true)} />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumbs & Actions */}
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-500 hover:text-primary font-black uppercase text-xs tracking-widest transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ChevronLeft className="w-4 h-4" />
              </div>
              Back to Services
            </button>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                <Share2 className="w-4 h-4 text-slate-600" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                <Heart className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* Service Header */}
              <section>
                <div className="relative h-[450px] rounded-[3rem] overflow-hidden mb-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-8 border-white">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-10 left-10 text-white right-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {service.category}
                      </span>
                      <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider border border-white/20">
                        <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                        {service.rating} ({service.reviews} reviews)
                      </div>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black mb-2 uppercase tracking-tighter leading-none">{service.name}</h1>
                  </div>
                </div>

                <div className="bg-white rounded-[1.5rem] p-10 shadow-sm border border-slate-100">
                  <h2 className="text-xl font-black text-primary mb-6 uppercase tracking-tight underline decoration-accent decoration-4 underline-offset-8">Service Overview</h2>
                  <p className="text-slate-500 font-medium leading-relaxed text-lg mb-8">
                    {service.description} Our professional team delivers consistent, high-quality results using industry-standard products and proven techniques. We guarantee your satisfaction on every job.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8">
                    {[
                      'Professional & Trained Staff',
                      'Eco-friendly Products',
                      'Satisfaction Guaranteed',
                      'Transparent Pricing',
                      'On-time Arrival',
                      'Post-service Support'
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 text-slate-700 font-black uppercase text-[13px] tracking-tight group">
                        <div className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Provider Details */}
              <section className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-black text-primary uppercase tracking-tight">Service Provider</h2>
                  <div className="px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-black uppercase tracking-widest border border-accent/20">
                    Host Partner
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative group">
                    <img 
                      src={provider.image} 
                      alt={provider.name} 
                      className="w-24 h-24 rounded-3xl object-cover shadow-xl border-4 border-white group-hover:scale-105 transition-transform"
                    />
                    {provider.verified && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-2xl border-4 border-white flex items-center justify-center text-white">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{provider.name}</h3>
                    </div>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[13px] font-bold text-slate-400">
                      <div className="flex items-center gap-1.5 text-slate-800">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span>{provider.rating} Rating</span>
                      </div>
                      <span className="opacity-30">•</span>
                      <span>{provider.jobs} Jobs completed</span>
                      <span className="opacity-30">•</span>
                      <span>{provider.experience} Exp</span>
                    </div>
                  </div>
                  <button className="px-8 py-4 rounded-2xl border-2 border-slate-100 font-black text-[13px] uppercase tracking-widest text-slate-900 hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95 shadow-sm">
                    View Profile
                  </button>
                </div>
              </section>

              {/* Reviews */}
              <section className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-xl font-black text-primary uppercase tracking-tight">Customer Reviews</h2>
                  <button className="text-primary font-black uppercase text-[12px] tracking-widest hover:underline decoration-2">See all reviews</button>
                </div>
                <div className="space-y-10">
                  {REVIEWS.map((review) => (
                    <div key={review.id} className="border-b border-slate-50 last:border-0 pb-10 last:pb-0">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-4">
                          <img src={review.avatar} alt={review.user} className="w-12 h-12 rounded-2xl object-cover border-2 border-slate-100" />
                          <div>
                            <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm">{review.user}</h4>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-accent text-accent' : 'text-slate-200'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-500 font-medium leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Booking Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">
                <div className="bg-white rounded-[3rem] p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[4rem]" />
                  
                  <div className="mb-10">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2">Starting from</span>
                    <div className="flex items-baseline gap-3">
                      <span className="text-5xl font-black text-primary tracking-tighter">₹{service.price}</span>
                      <span className="text-slate-300 line-through text-lg font-bold">₹{service.price + 500}</span>
                    </div>
                  </div>

                  <div className="space-y-5 mb-10">
                    <div className="p-5 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:border-primary/20 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Date</span>
                      </div>
                      <select className="w-full bg-transparent font-black text-slate-900 outline-none uppercase text-[13px] tracking-tight cursor-pointer">
                        <option>Tomorrow, 21st April</option>
                        <option>Wednesday, 22nd April</option>
                        <option>Thursday, 23rd April</option>
                      </select>
                    </div>

                    <div className="p-5 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:border-primary/20 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Time</span>
                      </div>
                      <select className="w-full bg-transparent font-black text-slate-900 outline-none uppercase text-[13px] tracking-tight cursor-pointer">
                        <option>10:00 AM - 12:00 PM</option>
                        <option>01:00 PM - 03:00 PM</option>
                        <option>04:00 PM - 06:00 PM</option>
                      </select>
                    </div>

                    <div 
                      onClick={() => setIsLocationModalOpen(true)}
                      className="p-5 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:border-primary/20 transition-all cursor-pointer active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Service Location</span>
                      </div>
                      <p className="font-black text-slate-900 truncate uppercase text-[13px] tracking-tight">{location}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button 
                      onClick={() => setIsBookingOpen(true)}
                      className="w-full bg-primary hover:bg-primary-dark text-white py-6 rounded-2xl font-black text-[15px] uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
                    >
                      Instant Book
                    </button>
                    <button 
                      onClick={handleAddToCart}
                      disabled={isInCart}
                      className={cn(
                        "w-full py-5 rounded-2xl font-black uppercase text-[13px] tracking-widest flex items-center justify-center gap-3 transition-all border-2",
                        isInCart 
                          ? "bg-emerald-50 border-emerald-100 text-emerald-600 cursor-default" 
                          : "bg-white border-slate-100 text-slate-900 hover:border-primary hover:text-primary shadow-sm"
                      )}
                    >
                      {isInCart ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          In Basket
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5" />
                          {isAdded ? 'Adding...' : 'Add to Basket'}
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-6">
                    Zero cancellation fee up to 24hrs
                  </p>
                </div>

                {/* Offer Card */}
                <div className="bg-accent/5 rounded-[2.5rem] p-8 border-2 border-dashed border-accent/20 relative group overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/10 rounded-full group-hover:scale-150 transition-transform duration-700" />
                  <div className="flex items-center gap-5 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center text-primary font-black text-xl shadow-lg shadow-accent/20 rotate-3 group-hover:rotate-0 transition-transform">
                      %
                    </div>
                    <div>
                      <h4 className="font-black text-primary uppercase tracking-tight text-sm">Special Launch Offer</h4>
                      <p className="text-[11px] text-accent font-black uppercase tracking-widest mt-0.5">Use code <span className="text-primary">AIO-100</span> for ₹100 OFF</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <BookingModal 
        service={service}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <LocationModal 
        isOpen={isLocationModalOpen}
        onSelect={handleLocationSelect}
      />
    </div>
  );
}
