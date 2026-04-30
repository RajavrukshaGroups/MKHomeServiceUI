// import { useParams, useNavigate } from 'react-router-dom';
// import { FEATURED_SERVICES, PROVIDERS, REVIEWS } from '../constants';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import LocationModal from '../components/common/LocationModal';
// import { Star, ShieldCheck, Clock, MapPin, Calendar, CheckCircle2, ChevronLeft, Share2, Heart, ShoppingCart } from 'lucide-react';
// import { motion } from 'motion/react';
// import { useState, useEffect } from 'react';
// import { useCart } from '../context/CartContext';
// import { cn } from '../lib/utils';
// import BookingModal from '../components/common/BookingModal';

// export default function ServiceDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { addToCart, cartItems } = useCart();
//   const [location, setLocation] = useState('Select Location');
//   const [isAdded, setIsAdded] = useState(false);
//   const [isBookingOpen, setIsBookingOpen] = useState(false);
//   const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  
//   const service = FEATURED_SERVICES.find(s => s.id === id) || FEATURED_SERVICES[0];
//   const provider = PROVIDERS[0];
//   const isInCart = cartItems.some(item => item.id === service.id);

//   useEffect(() => {
//     const savedLocation = localStorage.getItem('user_location');
//     if (savedLocation) setLocation(savedLocation);
//     window.scrollTo(0, 0);
//   }, []);

//   const handleAddToCart = () => {
//     addToCart(service);
//     setIsAdded(true);
//     setTimeout(() => setIsAdded(false), 2000);
//   };

//   const handleLocationSelect = (cityName) => {
//     setLocation(cityName);
//     localStorage.setItem('user_location', cityName);
//     setIsLocationModalOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-background-app font-sans selection:bg-primary/10 selection:text-primary">
//       <Navbar location={location} onLocationClick={() => setIsLocationModalOpen(true)} />
      
//       <main className="pt-32 pb-20">
//         <div className="max-w-7xl mx-auto px-4">
//           {/* Breadcrumbs & Actions */}
//           <div className="flex items-center justify-between mb-8">
//             <button 
//               onClick={() => navigate(-1)}
//               className="flex items-center gap-2 text-slate-500 hover:text-primary font-black uppercase text-xs tracking-widest transition-all group"
//             >
//               <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
//                 <ChevronLeft className="w-4 h-4" />
//               </div>
//               Back to Services
//             </button>
//             <div className="flex gap-3">
//               <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
//                 <Share2 className="w-4 h-4 text-slate-600" />
//               </button>
//               <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
//                 <Heart className="w-4 h-4 text-slate-600" />
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//             {/* Left Column: Details */}
//             <div className="lg:col-span-2 space-y-12">
//               {/* Service Header */}
//               <section>
//                 <div className="relative h-[450px] rounded-[3rem] overflow-hidden mb-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-8 border-white">
//                   <img 
//                     src={service.image} 
//                     alt={service.name} 
//                     className="w-full h-full object-cover"
//                     referrerPolicy="no-referrer"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
//                   <div className="absolute bottom-10 left-10 text-white right-10">
//                     <div className="flex items-center gap-3 mb-4">
//                       <span className="bg-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
//                         {service.category}
//                       </span>
//                       <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider border border-white/20">
//                         <Star className="w-3.5 h-3.5 fill-accent text-accent" />
//                         {service.rating} ({service.reviews} reviews)
//                       </div>
//                     </div>
//                     <h1 className="text-3xl md:text-5xl font-black mb-2 uppercase tracking-tighter leading-none">{service.name}</h1>
//                   </div>
//                 </div>

//                 <div className="bg-white rounded-[1.5rem] p-10 shadow-sm border border-slate-100">
//                   <h2 className="text-xl font-black text-primary mb-6 uppercase tracking-tight underline decoration-accent decoration-4 underline-offset-8">Service Overview</h2>
//                   <p className="text-slate-500 font-medium leading-relaxed text-lg mb-8">
//                     {service.description} Our professional team delivers consistent, high-quality results using industry-standard products and proven techniques. We guarantee your satisfaction on every job.
//                   </p>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8">
//                     {[
//                       'Professional & Trained Staff',
//                       'Eco-friendly Products',
//                       'Satisfaction Guaranteed',
//                       'Transparent Pricing',
//                       'On-time Arrival',
//                       'Post-service Support'
//                     ].map((item, i) => (
//                       <div key={i} className="flex items-center gap-4 text-slate-700 font-black uppercase text-[13px] tracking-tight group">
//                         <div className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
//                           <CheckCircle2 className="w-4 h-4 text-emerald-600" />
//                         </div>
//                         {item}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </section>

//               {/* Provider Details */}
//               <section className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
//                 <div className="flex items-center justify-between mb-8">
//                   <h2 className="text-xl font-black text-primary uppercase tracking-tight">Service Provider</h2>
//                   <div className="px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-black uppercase tracking-widest border border-accent/20">
//                     Host Partner
//                   </div>
//                 </div>
//                 <div className="flex flex-col md:flex-row items-center gap-8">
//                   <div className="relative group">
//                     <img 
//                       src={provider.image} 
//                       alt={provider.name} 
//                       className="w-24 h-24 rounded-3xl object-cover shadow-xl border-4 border-white group-hover:scale-105 transition-transform"
//                     />
//                     {provider.verified && (
//                       <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-2xl border-4 border-white flex items-center justify-center text-white">
//                         <ShieldCheck className="w-4 h-4" />
//                       </div>
//                     )}
//                   </div>
//                   <div className="flex-1 text-center md:text-left">
//                     <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
//                       <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{provider.name}</h3>
//                     </div>
//                     <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[13px] font-bold text-slate-400">
//                       <div className="flex items-center gap-1.5 text-slate-800">
//                         <Star className="w-4 h-4 fill-accent text-accent" />
//                         <span>{provider.rating} Rating</span>
//                       </div>
//                       <span className="opacity-30">•</span>
//                       <span>{provider.jobs} Jobs completed</span>
//                       <span className="opacity-30">•</span>
//                       <span>{provider.experience} Exp</span>
//                     </div>
//                   </div>
//                   <button className="px-8 py-4 rounded-2xl border-2 border-slate-100 font-black text-[13px] uppercase tracking-widest text-slate-900 hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95 shadow-sm">
//                     View Profile
//                   </button>
//                 </div>
//               </section>

//               {/* Reviews */}
//               <section className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
//                 <div className="flex items-center justify-between mb-10">
//                   <h2 className="text-xl font-black text-primary uppercase tracking-tight">Customer Reviews</h2>
//                   <button className="text-primary font-black uppercase text-[12px] tracking-widest hover:underline decoration-2">See all reviews</button>
//                 </div>
//                 <div className="space-y-10">
//                   {REVIEWS.map((review) => (
//                     <div key={review.id} className="border-b border-slate-50 last:border-0 pb-10 last:pb-0">
//                       <div className="flex items-center justify-between mb-5">
//                         <div className="flex items-center gap-4">
//                           <img src={review.avatar} alt={review.user} className="w-12 h-12 rounded-2xl object-cover border-2 border-slate-100" />
//                           <div>
//                             <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm">{review.user}</h4>
//                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{review.date}</p>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
//                           {[...Array(5)].map((_, i) => (
//                             <Star 
//                               key={i} 
//                               className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-accent text-accent' : 'text-slate-200'}`} 
//                             />
//                           ))}
//                         </div>
//                       </div>
//                       <p className="text-slate-500 font-medium leading-relaxed">{review.comment}</p>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             </div>

//             {/* Right Column: Booking Form */}
//             <div className="lg:col-span-1">
//               <div className="sticky top-32 space-y-8">
//                 <div className="bg-white rounded-[3rem] p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 relative overflow-hidden">
//                   <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[4rem]" />
                  
//                   <div className="mb-10">
//                     <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2">Starting from</span>
//                     <div className="flex items-baseline gap-3">
//                       <span className="text-5xl font-black text-primary tracking-tighter">₹{service.price}</span>
//                       <span className="text-slate-300 line-through text-lg font-bold">₹{service.price + 500}</span>
//                     </div>
//                   </div>

//                   <div className="space-y-5 mb-10">
//                     <div className="p-5 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:border-primary/20 transition-colors">
//                       <div className="flex items-center gap-3 mb-2">
//                         <Calendar className="w-4 h-4 text-primary" />
//                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Date</span>
//                       </div>
//                       <select className="w-full bg-transparent font-black text-slate-900 outline-none uppercase text-[13px] tracking-tight cursor-pointer">
//                         <option>Tomorrow, 21st April</option>
//                         <option>Wednesday, 22nd April</option>
//                         <option>Thursday, 23rd April</option>
//                       </select>
//                     </div>

//                     <div className="p-5 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:border-primary/20 transition-colors">
//                       <div className="flex items-center gap-3 mb-2">
//                         <Clock className="w-4 h-4 text-primary" />
//                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Time</span>
//                       </div>
//                       <select className="w-full bg-transparent font-black text-slate-900 outline-none uppercase text-[13px] tracking-tight cursor-pointer">
//                         <option>10:00 AM - 12:00 PM</option>
//                         <option>01:00 PM - 03:00 PM</option>
//                         <option>04:00 PM - 06:00 PM</option>
//                       </select>
//                     </div>

//                     <div 
//                       onClick={() => setIsLocationModalOpen(true)}
//                       className="p-5 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:border-primary/20 transition-all cursor-pointer active:scale-[0.98]"
//                     >
//                       <div className="flex items-center gap-3 mb-2">
//                         <MapPin className="w-4 h-4 text-primary" />
//                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Service Location</span>
//                       </div>
//                       <p className="font-black text-slate-900 truncate uppercase text-[13px] tracking-tight">{location}</p>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <button 
//                       onClick={() => setIsBookingOpen(true)}
//                       className="w-full bg-primary hover:bg-primary-dark text-white py-6 rounded-2xl font-black text-[15px] uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
//                     >
//                       Instant Book
//                     </button>
//                     <button 
//                       onClick={handleAddToCart}
//                       disabled={isInCart}
//                       className={cn(
//                         "w-full py-5 rounded-2xl font-black uppercase text-[13px] tracking-widest flex items-center justify-center gap-3 transition-all border-2",
//                         isInCart 
//                           ? "bg-emerald-50 border-emerald-100 text-emerald-600 cursor-default" 
//                           : "bg-white border-slate-100 text-slate-900 hover:border-primary hover:text-primary shadow-sm"
//                       )}
//                     >
//                       {isInCart ? (
//                         <>
//                           <CheckCircle2 className="w-5 h-5" />
//                           In Basket
//                         </>
//                       ) : (
//                         <>
//                           <ShoppingCart className="w-5 h-5" />
//                           {isAdded ? 'Adding...' : 'Add to Basket'}
//                         </>
//                       )}
//                     </button>
//                   </div>
//                   <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-6">
//                     Zero cancellation fee up to 24hrs
//                   </p>
//                 </div>

//                 {/* Offer Card */}
//                 <div className="bg-accent/5 rounded-[2.5rem] p-8 border-2 border-dashed border-accent/20 relative group overflow-hidden">
//                   <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/10 rounded-full group-hover:scale-150 transition-transform duration-700" />
//                   <div className="flex items-center gap-5 relative z-10">
//                     <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center text-primary font-black text-xl shadow-lg shadow-accent/20 rotate-3 group-hover:rotate-0 transition-transform">
//                       %
//                     </div>
//                     <div>
//                       <h4 className="font-black text-primary uppercase tracking-tight text-sm">Special Launch Offer</h4>
//                       <p className="text-[11px] text-accent font-black uppercase tracking-widest mt-0.5">Use code <span className="text-primary">AIO-100</span> for ₹100 OFF</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />

//       <BookingModal 
//         service={service}
//         isOpen={isBookingOpen}
//         onClose={() => setIsBookingOpen(false)}
//       />

//       <LocationModal 
//         isOpen={isLocationModalOpen}
//         onSelect={handleLocationSelect}
//       />
//     </div>
//   );
// }

// import { useParams, useNavigate } from 'react-router-dom';
// import { useState, useEffect, useCallback } from 'react';
// import { 
//   Star, ShieldCheck, Clock, MapPin, Calendar, CheckCircle2, 
//   ChevronLeft, Share2, Heart, ShoppingCart 
// } from 'lucide-react';
// import { cn } from '../lib/utils';
// import { useCart } from '../context/CartContext';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import LocationModal from '../components/common/LocationModal';
// import BookingModal from '../components/common/BookingModal';
// import { FEATURED_SERVICES, PROVIDERS, REVIEWS } from '../constants';

// // ----------------------------------------------------------------------
// // Custom hooks (keep logic out of the main render)
// // ----------------------------------------------------------------------

// function useServiceFromParams() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const service = FEATURED_SERVICES.find(s => s.id === id);

//   useEffect(() => {
//     if (!service && FEATURED_SERVICES.length > 0) {
//       navigate('/404', { replace: true });
//     }
//   }, [service, navigate]);

//   return service;
// }

// function useLocationSync() {
//   const [location, setLocation] = useState('Select Location');

//   useEffect(() => {
//     const saved = localStorage.getItem('user_location');
//     if (saved) setLocation(saved);
//   }, []);

//   const updateLocation = useCallback((cityName) => {
//     setLocation(cityName);
//     localStorage.setItem('user_location', cityName);
//   }, []);

//   return { location, updateLocation };
// }

// function useAddToCartFeedback(service, isInCart) {
//   const { addToCart } = useCart();
//   const [isAdded, setIsAdded] = useState(false);

//   const handleAddToCart = useCallback(() => {
//     if (isInCart) return;
//     addToCart(service);
//     setIsAdded(true);
//     setTimeout(() => setIsAdded(false), 2000);
//   }, [addToCart, service, isInCart]);

//   return { isAdded, handleAddToCart };
// }

// // ----------------------------------------------------------------------
// // Main component (original structure preserved)
// // ----------------------------------------------------------------------

// export default function ServiceDetail() {
//   const navigate = useNavigate();
//   const service = useServiceFromParams();
//   const { location, updateLocation } = useLocationSync();
//   const { cartItems } = useCart();
//   const [isBookingOpen, setIsBookingOpen] = useState(false);
//   const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState('Tomorrow, 21st April');
//   const [selectedTime, setSelectedTime] = useState('10:00 AM - 12:00 PM');

//   // If service not found, the hook redirects – render nothing during redirect
//   if (!service) return null;

//   const provider = PROVIDERS[0];
//   const isInCart = cartItems.some(item => item.id === service.id);
//   const { isAdded, handleAddToCart } = useAddToCartFeedback(service, isInCart);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleLocationSelect = (cityName) => {
//     updateLocation(cityName);
//     setIsLocationModalOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-background-app font-sans selection:bg-primary/10 selection:text-primary">
//       <Navbar location={location} onLocationClick={() => setIsLocationModalOpen(true)} />

//       <main className="pt-32 pb-20">
//         <div className="max-w-7xl mx-auto px-4">
//           {/* Breadcrumbs & Actions */}
//           <div className="flex items-center justify-between mb-8">
//             <button
//               onClick={() => navigate(-1)}
//               className="flex items-center gap-2 text-slate-500 hover:text-primary font-black uppercase text-xs tracking-widest transition-all group"
//             >
//               <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
//                 <ChevronLeft className="w-4 h-4" />
//               </div>
//               Back to Services
//             </button>
//             <div className="flex gap-3">
//               <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
//                 <Share2 className="w-4 h-4 text-slate-600" />
//               </button>
//               <button className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
//                 <Heart className="w-4 h-4 text-slate-600" />
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//             {/* Left Column: Details */}
//             <div className="lg:col-span-2 space-y-12">
//               {/* Service Header */}
//               <section>
//                 <div className="relative h-[450px] rounded-[3rem] overflow-hidden mb-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-8 border-white">
//                   <img
//                     src={service.image}
//                     alt={service.name}
//                     className="w-full h-full object-cover"
//                     referrerPolicy="no-referrer"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
//                   <div className="absolute bottom-10 left-10 text-white right-10">
//                     <div className="flex items-center gap-3 mb-4">
//                       <span className="bg-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
//                         {service.category}
//                       </span>
//                       <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider border border-white/20">
//                         <Star className="w-3.5 h-3.5 fill-accent text-accent" />
//                         {service.rating} ({service.reviews} reviews)
//                       </div>
//                     </div>
//                     <h1 className="text-3xl md:text-5xl font-black mb-2 uppercase tracking-tighter leading-none">
//                       {service.name}
//                     </h1>
//                   </div>
//                 </div>

//                 <div className="bg-white rounded-[1.5rem] p-10 shadow-sm border border-slate-100">
//                   <h2 className="text-xl font-black text-primary mb-6 uppercase tracking-tight underline decoration-accent decoration-4 underline-offset-8">
//                     Service Overview
//                   </h2>
//                   <p className="text-slate-500 font-medium leading-relaxed text-lg mb-8">
//                     {service.description} Our professional team delivers consistent, high-quality results using industry-standard products and proven techniques. We guarantee your satisfaction on every job.
//                   </p>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8">
//                     {[
//                       'Professional & Trained Staff',
//                       'Eco-friendly Products',
//                       'Satisfaction Guaranteed',
//                       'Transparent Pricing',
//                       'On-time Arrival',
//                       'Post-service Support'
//                     ].map((item, i) => (
//                       <div key={i} className="flex items-center gap-4 text-slate-700 font-black uppercase text-[13px] tracking-tight group">
//                         <div className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
//                           <CheckCircle2 className="w-4 h-4 text-emerald-600" />
//                         </div>
//                         {item}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </section>

//               {/* Provider Details */}
//               <section className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
//                 <div className="flex items-center justify-between mb-8">
//                   <h2 className="text-xl font-black text-primary uppercase tracking-tight">Service Provider</h2>
//                   <div className="px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-black uppercase tracking-widest border border-accent/20">
//                     Host Partner
//                   </div>
//                 </div>
//                 <div className="flex flex-col md:flex-row items-center gap-8">
//                   <div className="relative group">
//                     <img
//                       src={provider.image}
//                       alt={provider.name}
//                       className="w-24 h-24 rounded-3xl object-cover shadow-xl border-4 border-white group-hover:scale-105 transition-transform"
//                     />
//                     {provider.verified && (
//                       <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-2xl border-4 border-white flex items-center justify-center text-white">
//                         <ShieldCheck className="w-4 h-4" />
//                       </div>
//                     )}
//                   </div>
//                   <div className="flex-1 text-center md:text-left">
//                     <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
//                       <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{provider.name}</h3>
//                     </div>
//                     <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[13px] font-bold text-slate-400">
//                       <div className="flex items-center gap-1.5 text-slate-800">
//                         <Star className="w-4 h-4 fill-accent text-accent" />
//                         <span>{provider.rating} Rating</span>
//                       </div>
//                       <span className="opacity-30">•</span>
//                       <span>{provider.jobs} Jobs completed</span>
//                       <span className="opacity-30">•</span>
//                       <span>{provider.experience} Exp</span>
//                     </div>
//                   </div>
//                   <button className="px-8 py-4 rounded-2xl border-2 border-slate-100 font-black text-[13px] uppercase tracking-widest text-slate-900 hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95 shadow-sm">
//                     View Profile
//                   </button>
//                 </div>
//               </section>

//               {/* Reviews */}
//               <section className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
//                 <div className="flex items-center justify-between mb-10">
//                   <h2 className="text-xl font-black text-primary uppercase tracking-tight">Customer Reviews</h2>
//                   <button className="text-primary font-black uppercase text-[12px] tracking-widest hover:underline decoration-2">
//                     See all reviews
//                   </button>
//                 </div>
//                 <div className="space-y-10">
//                   {REVIEWS.map((review) => (
//                     <div key={review.id} className="border-b border-slate-50 last:border-0 pb-10 last:pb-0">
//                       <div className="flex items-center justify-between mb-5">
//                         <div className="flex items-center gap-4">
//                           <img src={review.avatar} alt={review.user} className="w-12 h-12 rounded-2xl object-cover border-2 border-slate-100" />
//                           <div>
//                             <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm">{review.user}</h4>
//                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{review.date}</p>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
//                           {[...Array(5)].map((_, i) => (
//                             <Star
//                               key={i}
//                               className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-accent text-accent' : 'text-slate-200'}`}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                       <p className="text-slate-500 font-medium leading-relaxed">{review.comment}</p>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             </div>

//             {/* Right Column: Booking Form */}
//             <div className="lg:col-span-1">
//               <div className="sticky top-32 space-y-8">
//                 <div className="bg-white rounded-[3rem] p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 relative overflow-hidden">
//                   <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[4rem]" />

//                   <div className="mb-10">
//                     <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2">Starting from</span>
//                     <div className="flex items-baseline gap-3">
//                       <span className="text-5xl font-black text-primary tracking-tighter">₹{service.price}</span>
//                       <span className="text-slate-300 line-through text-lg font-bold">₹{service.price + 500}</span>
//                     </div>
//                   </div>

//                   <div className="space-y-5 mb-10">
//                     <div className="p-5 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:border-primary/20 transition-colors">
//                       <div className="flex items-center gap-3 mb-2">
//                         <Calendar className="w-4 h-4 text-primary" />
//                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Date</span>
//                       </div>
//                       <select
//                         value={selectedDate}
//                         onChange={(e) => setSelectedDate(e.target.value)}
//                         className="w-full bg-transparent font-black text-slate-900 outline-none uppercase text-[13px] tracking-tight cursor-pointer"
//                       >
//                         <option>Tomorrow, 21st April</option>
//                         <option>Wednesday, 22nd April</option>
//                         <option>Thursday, 23rd April</option>
//                       </select>
//                     </div>

//                     <div className="p-5 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:border-primary/20 transition-colors">
//                       <div className="flex items-center gap-3 mb-2">
//                         <Clock className="w-4 h-4 text-primary" />
//                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Time</span>
//                       </div>
//                       <select
//                         value={selectedTime}
//                         onChange={(e) => setSelectedTime(e.target.value)}
//                         className="w-full bg-transparent font-black text-slate-900 outline-none uppercase text-[13px] tracking-tight cursor-pointer"
//                       >
//                         <option>10:00 AM - 12:00 PM</option>
//                         <option>01:00 PM - 03:00 PM</option>
//                         <option>04:00 PM - 06:00 PM</option>
//                       </select>
//                     </div>

//                     <div
//                       onClick={() => setIsLocationModalOpen(true)}
//                       className="p-5 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:border-primary/20 transition-all cursor-pointer active:scale-[0.98]"
//                     >
//                       <div className="flex items-center gap-3 mb-2">
//                         <MapPin className="w-4 h-4 text-primary" />
//                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Service Location</span>
//                       </div>
//                       <p className="font-black text-slate-900 truncate uppercase text-[13px] tracking-tight">{location}</p>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <button
//                       onClick={() => setIsBookingOpen(true)}
//                       className="w-full bg-primary hover:bg-primary-dark text-white py-6 rounded-2xl font-black text-[15px] uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
//                     >
//                       Instant Book
//                     </button>
//                     <button
//                       onClick={handleAddToCart}
//                       disabled={isInCart}
//                       className={cn(
//                         "w-full py-5 rounded-2xl font-black uppercase text-[13px] tracking-widest flex items-center justify-center gap-3 transition-all border-2",
//                         isInCart
//                           ? "bg-emerald-50 border-emerald-100 text-emerald-600 cursor-default"
//                           : "bg-white border-slate-100 text-slate-900 hover:border-primary hover:text-primary shadow-sm"
//                       )}
//                     >
//                       {isInCart ? (
//                         <>
//                           <CheckCircle2 className="w-5 h-5" />
//                           In Basket
//                         </>
//                       ) : (
//                         <>
//                           <ShoppingCart className="w-5 h-5" />
//                           {isAdded ? 'Adding...' : 'Add to Basket'}
//                         </>
//                       )}
//                     </button>
//                   </div>
//                   <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-6">
//                     Zero cancellation fee up to 24hrs
//                   </p>
//                 </div>

//                 {/* Offer Card */}
//                 <div className="bg-accent/5 rounded-[2.5rem] p-8 border-2 border-dashed border-accent/20 relative group overflow-hidden">
//                   <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/10 rounded-full group-hover:scale-150 transition-transform duration-700" />
//                   <div className="flex items-center gap-5 relative z-10">
//                     <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center text-primary font-black text-xl shadow-lg shadow-accent/20 rotate-3 group-hover:rotate-0 transition-transform">
//                       %
//                     </div>
//                     <div>
//                       <h4 className="font-black text-primary uppercase tracking-tight text-sm">Special Launch Offer</h4>
//                       <p className="text-[11px] text-accent font-black uppercase tracking-widest mt-0.5">
//                         Use code <span className="text-primary">AIO-100</span> for ₹100 OFF
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />

//       <BookingModal
//         service={service}
//         isOpen={isBookingOpen}
//         onClose={() => setIsBookingOpen(false)}
//       />

//       <LocationModal
//         isOpen={isLocationModalOpen}
//         onSelect={handleLocationSelect}
//       />
//     </div>
//   );
// }

// ServiceDetails.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { 
  ArrowLeft, Star, ShieldCheck, Clock, CreditCard, 
  Gem, ChevronRight, CheckCircle, Phone, MapPin, ListChecks
} from "lucide-react";
import RelatedServicesSection from "../components/services/RelatedServicesSection"; // adjust path if needed
import Navbar from "../components/layout/Navbar"

// Helper: extracts price info (for the main pricing area)
const getServicePriceInfo = (service) => {
  if (service.price !== null && service.price !== undefined && (!service.options || service.options.length === 0)) {
    return { type: "fixed", price: service.price };
  }
  if (service.options && service.options.length > 0) {
    let minPrice = Infinity;
    for (const opt of service.options) {
      if (opt.values && Array.isArray(opt.values)) {
        for (const val of opt.values) {
          if (val.price !== undefined && val.price !== null && val.price < minPrice) {
            minPrice = val.price;
          }
        }
      }
    }
    return { type: "options", minPrice: minPrice !== Infinity ? minPrice : null };
  }
  return { type: "custom" };
};

// Skeleton loader for the details page
const DetailsSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/5 to-stone-50/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="h-8 w-32 bg-amber-100 rounded-full animate-pulse mb-8" />
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="aspect-square bg-gradient-to-br from-amber-100/50 to-stone-100/50 rounded-2xl animate-pulse" />
          <div className="h-24 bg-stone-100 rounded-lg animate-pulse" />
        </div>
        <div className="space-y-6">
          <div className="h-10 bg-stone-100 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-stone-100 rounded w-full animate-pulse" />
          <div className="h-4 bg-stone-100 rounded w-2/3 animate-pulse" />
          <div className="h-12 bg-amber-100 rounded-full w-40 animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);

export default function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalPrice, setTotalPrice] = useState(null);

  // Fetch current service details
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:12000/client/send-services-client/${id}`);
        if (!response.ok) throw new Error("Failed to fetch service details");
        const result = await response.json();
        if (result.success) {
          setService(result.data);
          if (result.data.options && result.data.options.length > 0) {
            const initial = {};
            result.data.options.forEach((opt, idx) => {
              if (opt.values && opt.values.length > 0) {
                initial[idx] = opt.values[0];
              }
            });
            setSelectedOptions(initial);
          }
        } else {
          throw new Error(result.message || "Service not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchServiceDetails();
  }, [id]);

  // Update total price when options change
  useEffect(() => {
    if (!service) return;
    if (service.price !== null && service.price !== undefined && (!service.options || service.options.length === 0)) {
      setTotalPrice(service.price);
      return;
    }
    if (service.options && service.options.length > 0) {
      let sum = 0;
      let allSelected = true;
      for (let i = 0; i < service.options.length; i++) {
        const selected = selectedOptions[i];
        if (selected && selected.price !== undefined) {
          sum += selected.price;
        } else {
          allSelected = false;
          break;
        }
      }
      setTotalPrice(allSelected ? sum : null);
    } else {
      setTotalPrice(null);
    }
  }, [service, selectedOptions]);

  const handleOptionChange = (optionIndex, valueObj) => {
    setSelectedOptions(prev => ({ ...prev, [optionIndex]: valueObj }));
  };

  if (loading) return <DetailsSkeleton />;
  if (error || !service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-50 rounded-full mb-4">
            <Gem className="w-10 h-10 text-amber-500" />
          </div>
          <h2 className="text-2xl font-serif text-stone-800">Service Unavailable</h2>
          <p className="text-stone-500 mt-2">{error || "Could not load the requested service."}</p>
          <button onClick={() => navigate(-1)} className="mt-6 px-6 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const hasOptions = service.options && service.options.length > 0;
  const hasKeyFeatures = service.keyFeatures && service.keyFeatures.length > 0;

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/5 to-stone-50/30 py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-stone-500 hover:text-amber-600 transition mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
          <span>Back to catalogue</span>
        </button>

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* LEFT COLUMN: Image, title, description, key features */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            {/* Main Image */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-stone-100 shadow-sm">
              <img
                src={service.images?.[0] || "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format"}
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnails */}
            {service.images?.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {service.images.slice(1, 4).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${service.name} view ${idx + 2}`}
                    className="w-24 h-24 rounded-lg object-cover border border-amber-100 cursor-pointer hover:opacity-80 transition"
                  />
                ))}
              </div>
            )}

            {/* Title & Meta */}
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-sm font-medium px-3 py-1 rounded-full mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Premium Service</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-light tracking-tight text-stone-800">
                {service.name}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5 bg-stone-100 px-3 py-1.5 rounded-full">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium text-stone-700">{service.rating || "4.9"}</span>
                  <span className="text-xs text-stone-400">({service.totalReviews || 0} reviews)</span>
                </div>
                {service.duration && (
                  <div className="text-sm text-stone-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-stone-600 leading-relaxed text-base">
              {service.description || "Exceptional service crafted with meticulous attention to detail."}
            </p>

            {/* Key Features */}
            {hasKeyFeatures && (
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-amber-100/50">
                <div className="flex items-center gap-2 mb-3">
                  <ListChecks className="w-5 h-5 text-amber-600" />
                  <h3 className="font-serif text-lg text-stone-800">Key Features</h3>
                </div>
                <ul className="space-y-2">
                  {service.keyFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-stone-600">
                      <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {/* RIGHT COLUMN: Sticky pricing & options */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-100/50 sticky top-6">
              <h3 className="font-serif text-xl text-stone-800 mb-4">Pricing & Options</h3>
              
              {hasOptions ? (
                <>
                  {service.options.map((opt, idx) => (
                    <div key={idx} className="mb-5 last:mb-0">
                      <label className="font-medium text-stone-700 block mb-2">{opt.name}</label>
                      <div className="grid grid-cols-1 gap-2">
                        {opt.values.map((val, vIdx) => {
                          const isSelected = selectedOptions[idx]?.label === val.label;
                          return (
                            <button
                              key={vIdx}
                              onClick={() => handleOptionChange(idx, val)}
                              className={`flex justify-between items-center p-3 rounded-xl transition-all ${
                                isSelected
                                  ? "bg-amber-100 border-2 border-amber-500 shadow-sm"
                                  : "bg-stone-50 border border-stone-200 hover:border-amber-300"
                              }`}
                            >
                              <span className="text-stone-700">{val.label}</span>
                              <span className="font-semibold text-amber-700">₹{val.price.toLocaleString()}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 mt-4 border-t border-amber-100">
                    <div className="flex justify-between items-center">
                      <span className="text-stone-600 font-medium">Total Price</span>
                      <span className="text-3xl font-serif font-bold text-amber-700">
                        {totalPrice !== null ? `₹${totalPrice.toLocaleString()}` : "Select all options"}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-baseline gap-2 pb-3">
                  <span className="text-3xl font-serif font-semibold text-amber-700">
                    ₹{service.price?.toLocaleString() || "Custom"}
                  </span>
                  <span className="text-stone-400">flat rate</span>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mt-6">
                <button 
                  className="flex-1 bg-amber-600 text-white py-3 rounded-full font-medium hover:bg-amber-700 transition shadow-md shadow-amber-200 flex items-center justify-center gap-2"
                  disabled={hasOptions && totalPrice === null}
                >
                  <span>Book Now</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="px-5 py-3 border border-stone-200 rounded-full hover:bg-stone-50 transition text-stone-700 text-sm">
                  Request Callback
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 pt-6 mt-4 text-sm text-stone-500 border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-500" />
                  <span>100% satisfaction</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-500" />
                  <span>Secure payments</span>
                </div>
              </div>
              <div className="mt-4 text-center text-xs text-stone-400">
                <span className="inline-flex items-center gap-1">
                  <Phone className="w-3 h-3" /> Priority support included
                </span>
              </div>
            </div>

            {/* Extra highlight */}
            <div className="bg-white/40 rounded-xl p-4 border border-amber-100/30 text-center">
              <p className="text-stone-500 text-sm">
                🎉 Free consultation • No hidden charges • Easy rescheduling
              </p>
            </div>
          </motion.div>
        </div>

        {/* ========== RELATED SERVICES SECTION (separate component) ========== */}
        <RelatedServicesSection 
          currentServiceId={service._id}
          currentParentId={service.parentId}
        />

        {/* Bottom Trust Row */}
        <div className="mt-20 pt-8 border-t border-amber-100/50 grid md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <p className="font-medium text-stone-700">Flexible Scheduling</p>
            <p className="text-sm text-stone-400">Book at your convenience</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6 text-amber-600" />
            </div>
            <p className="font-medium text-stone-700">Priority Support</p>
            <p className="text-sm text-stone-400">Dedicated 24/7 concierge</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-amber-600" />
            </div>
            <p className="font-medium text-stone-700">Pan‑India Coverage</p>
            <p className="text-sm text-stone-400">Available in all major cities</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}