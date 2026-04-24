import { Star, ChevronRight } from 'lucide-react';
import { FEATURED_SERVICES } from '../../constants';
import { motion } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import BookingModal from '../common/BookingModal';

export default function FeaturedServices() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceClick = (id) => {
    navigate(`/service/${id}`);
  };

  const handleBookQuickly = (e, service) => {
    e.stopPropagation();
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 gap-6 text-center md:text-left">
          <div>
            <span className="text-[10px] font-bold text-accent uppercase tracking-[0.4em] mb-4 block">Top Rated Services</span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-primary uppercase tracking-tighter">
              POPULAR <span className="text-accent font-black">SERVICES</span>
            </h2>
          </div>
          <Link 
            to="/services"
            className="flex items-center gap-3 text-primary font-black uppercase text-xs tracking-widest hover:gap-4 transition-all group border-b-2 border-accent pb-1"
          >
            Explore Complete Catalog
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURED_SERVICES.slice(0, 4).map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleServiceClick(service.id)}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100 cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-primary uppercase tracking-widest shadow-sm">
                  {service.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-sm font-bold text-slate-800">{service.rating}</span>
                  <span className="text-xs text-slate-400">({service.reviews})</span>
                </div>
                
                <h3 className="text-lg font-black text-primary mb-2 line-clamp-1 group-hover:text-accent transition-colors leading-tight uppercase tracking-tight">
                  {service.name}
                </h3>
                <p className="text-sm text-slate-500 mb-6 line-clamp-2 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between pt-5 border-t border-slate-50">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Starting from</span>
                    <span className="text-2xl font-black text-primary">₹{service.price}</span>
                  </div>
                  <button 
                    onClick={(e) => handleBookQuickly(e, service)}
                    className="bg-primary text-white px-5 py-2.5 rounded-xl text-[13px] font-black uppercase tracking-wider hover:bg-accent transition-all shadow-sm active:scale-95"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BookingModal 
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}


// import { Star, ChevronRight } from 'lucide-react';
// import { FEATURED_SERVICES } from '../../constants';
// import { motion } from 'motion/react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useState } from 'react';
// import BookingModal from '../common/BookingModal';

// export default function FeaturedServices() {
//   const navigate = useNavigate();
//   const [selectedService, setSelectedService] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [imageErrors, setImageErrors] = useState({});

//   const handleServiceClick = (id) => {
//     navigate(`/service/${id}`);
//   };

//   const handleBookQuickly = (e, service) => {
//     e.stopPropagation();
//     setSelectedService(service);
//     setIsModalOpen(true);
//   };

//   const handleImageError = (serviceId) => {
//     setImageErrors(prev => ({ ...prev, [serviceId]: true }));
//   };

//   return (
//     <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
//       {/* Subtle background decoration */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Header with refined corporate styling */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
//           <div>
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 border border-accent/10 mb-4">
//               <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
//               <span className="text-[10px] font-bold uppercase tracking-wider text-accent/80">Top Rated Services</span>
//             </div>
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight">
//               <span className="text-slate-900">Popular </span>
//               <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Services</span>
//             </h2>
//             <p className="text-slate-500 mt-3 max-w-lg">
//               Hand‑picked, highly‑rated services trusted by thousands of homeowners.
//             </p>
//           </div>
          
//           <Link 
//             to="/services"
//             className="group inline-flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider hover:text-accent transition-colors border-b-2 border-accent pb-1"
//           >
//             Explore Complete Catalog
//             <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
//           </Link>
//         </div>

//         {/* Services Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
//           {FEATURED_SERVICES.slice(0, 4).map((service, index) => (
//             <motion.div
//               key={service.id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: false, amount: 0.2 }} // replay when scrolled back into view
//               transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
//               onClick={() => handleServiceClick(service.id)}
//               className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-primary/20 cursor-pointer"
//             >
//               {/* Image Container with fallback */}
//               <div className="relative h-56 overflow-hidden bg-slate-100">
//                 {!imageErrors[service.id] ? (
//                   <img 
//                     src={service.image} 
//                     alt={service.name} 
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                     referrerPolicy="no-referrer"
//                     onError={() => handleImageError(service.id)}
//                     loading="lazy"
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
//                     <span className="text-sm font-medium">Image unavailable</span>
//                   </div>
//                 )}
//                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-primary uppercase tracking-wider shadow-sm border border-white/20">
//                   {service.category}
//                 </div>
//                 {/* Overlay gradient on hover */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </div>
              
//               <div className="p-5">
//                 {/* Rating */}
//                 <div className="flex items-center gap-1 mb-3">
//                   <Star className="w-4 h-4 fill-accent text-accent" />
//                   <span className="text-sm font-bold text-slate-800">{service.rating}</span>
//                   <span className="text-xs text-slate-400">({service.reviews} reviews)</span>
//                 </div>
                
//                 {/* Title */}
//                 <h3 className="text-lg font-black text-primary mb-2 line-clamp-1 group-hover:text-accent transition-colors leading-tight uppercase tracking-tight">
//                   {service.name}
//                 </h3>
                
//                 {/* Description */}
//                 <p className="text-sm text-slate-500 mb-5 line-clamp-2 leading-relaxed">
//                   {service.description}
//                 </p>
                
//                 {/* Price & CTA */}
//                 <div className="flex items-center justify-between pt-4 border-t border-slate-100">
//                   <div>
//                     <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Starting from</span>
//                     <span className="text-2xl font-black text-primary">₹{service.price}</span>
//                   </div>
//                   <button 
//                     onClick={(e) => handleBookQuickly(e, service)}
//                     className="bg-primary text-white px-5 py-2.5 rounded-xl text-[12px] font-black uppercase tracking-wider hover:bg-accent transition-all shadow-sm active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
//                     aria-label={`Book ${service.name} now`}
//                   >
//                     Book Now
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
        
//         {/* Trust Badge (corporate credibility) */}
//         <div className="mt-16 text-center">
//           <div className="inline-flex items-center gap-4 px-6 py-3 bg-white rounded-full shadow-sm border border-slate-100">
//             <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Trusted by 10,000+ customers</span>
//             <div className="w-px h-4 bg-slate-200" />
//             <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">⭐ 4.9 average rating</span>
//           </div>
//         </div>
//       </div>

//       <BookingModal 
//         service={selectedService}
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       />
//     </section>
//   );
// }


// import { Star, ChevronRight, Eye, Clock, Award, Users, Sparkles } from 'lucide-react';
// import { FEATURED_SERVICES } from '../../constants';
// import { motion, useInView } from 'motion/react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useState, useRef, useEffect } from 'react';
// import BookingModal from '../common/BookingModal';

// export default function FeaturedServices() {
//   const navigate = useNavigate();
//   const [selectedService, setSelectedService] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [imageErrors, setImageErrors] = useState({});
//   const [activeCategory, setActiveCategory] = useState('all');

//   // Stats animation (count-up)
//   const statsRef = useRef(null);
//   const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
//   const [counts, setCounts] = useState({ customers: 0, rating: 0, professionals: 0, years: 0 });

//   useEffect(() => {
//     if (isStatsInView) {
//       const duration = 2000;
//       const step = 20;
//       const targetCustomers = 12450;
//       const targetRating = 4.9;
//       const targetProfessionals = 580;
//       const targetYears = 12;
//       let start = 0;
//       const interval = setInterval(() => {
//         start += step;
//         setCounts({
//           customers: Math.min(targetCustomers, Math.floor((start / duration) * targetCustomers)),
//           rating: Math.min(targetRating, Number(((start / duration) * targetRating).toFixed(1))),
//           professionals: Math.min(targetProfessionals, Math.floor((start / duration) * targetProfessionals)),
//           years: Math.min(targetYears, Math.floor((start / duration) * targetYears)),
//         });
//         if (start >= duration) clearInterval(interval);
//       }, 20);
//       return () => clearInterval(interval);
//     }
//   }, [isStatsInView]);

//   // Derive unique categories from services
//   const categories = ['all', ...new Set(FEATURED_SERVICES.map(s => s.category))];
  
//   const filteredServices = activeCategory === 'all' 
//     ? FEATURED_SERVICES 
//     : FEATURED_SERVICES.filter(s => s.category === activeCategory);

//   const handleServiceClick = (id) => {
//     navigate(`/service/${id}`);
//   };

//   const handleBookQuickly = (e, service) => {
//     e.stopPropagation();
//     setSelectedService(service);
//     setIsModalOpen(true);
//   };

//   const handleImageError = (serviceId) => {
//     setImageErrors(prev => ({ ...prev, [serviceId]: true }));
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.08, delayChildren: 0.2 }
//     }
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 40 },
//     visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
//   };

//   return (
//     <section className="relative py-28 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
//       {/* Animated background blobs */}
//       <div className="absolute top-0 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
//       <div className="absolute bottom-0 -right-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl" />
      
//       {/* Subtle noise texture for corporate depth */}
//       <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjciIG51bU9jdGF2ZXM9IjMiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjZikiLz48L3N2Zz4=')]" />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Header with animated badge */}
//         <div className="text-center md:text-left md:flex md:items-end md:justify-between mb-12 gap-8">
//           <div className="space-y-4">
//             <motion.div 
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5 }}
//               className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 backdrop-blur-sm"
//             >
//               <Sparkles className="w-3.5 h-3.5 text-accent" />
//               <span className="text-[11px] font-black uppercase tracking-wider text-primary/80">Hand‑picked excellence</span>
//             </motion.div>
//             <motion.h2 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1, duration: 0.5 }}
//               className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight"
//             >
//               <span className="text-slate-900">Premium </span>
//               <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Home Services</span>
//             </motion.h2>
//             <motion.p 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2, duration: 0.5 }}
//               className="text-slate-500 text-lg max-w-2xl mx-auto md:mx-0"
//             >
//               Curated solutions from certified professionals – backed by thousands of 5‑star reviews.
//             </motion.p>
//           </div>
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.3, type: "spring" }}
//           >
//             <Link 
//               to="/services"
//               className="group inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 rounded-full text-sm font-bold uppercase tracking-wide text-slate-700 hover:bg-primary hover:border-primary hover:text-white transition-all shadow-md hover:shadow-xl active:scale-95"
//             >
//               Full Catalog
//               <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </motion.div>
//         </div>

//         {/* Category Tabs - Interactive */}
//         <div className="flex flex-wrap justify-center gap-2 mb-16">
//           {categories.map((cat) => (
//             <motion.button
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
//               whileTap={{ scale: 0.96 }}
//               className={`px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 ${
//                 activeCategory === cat
//                   ? 'bg-primary text-white shadow-lg shadow-primary/30'
//                   : 'bg-white/80 text-slate-600 hover:bg-slate-100 border border-slate-200'
//               }`}
//             >
//               {cat === 'all' ? 'All Services' : cat}
//             </motion.button>
//           ))}
//         </div>

//         {/* Services Grid with staggered animations */}
//         <motion.div 
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-50px" }}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7"
//         >
//           {filteredServices.map((service, idx) => (
//             <motion.div
//               key={service.id}
//               variants={cardVariants}
//               whileHover={{ y: -8, transition: { duration: 0.2 } }}
//               onClick={() => handleServiceClick(service.id)}
//               className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-100 hover:border-primary/30"
//             >
//               {/* Image Container with overlay effect */}
//               <div className="relative h-52 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-100">
//                 {!imageErrors[service.id] ? (
//                   <img 
//                     src={service.image} 
//                     alt={service.name} 
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                     onError={() => handleImageError(service.id)}
//                     loading="lazy"
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center text-slate-400">
//                     <span className="text-sm font-medium">No preview</span>
//                   </div>
//                 )}
//                 {/* Category badge */}
//                 <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-wider shadow-lg">
//                   {service.category}
//                 </div>
//                 {/* Quick view overlay on hover */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
//                   <button 
//                     onClick={(e) => handleBookQuickly(e, service)}
//                     className="bg-white text-primary px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-accent hover:text-white transition-all shadow-lg"
//                   >
//                     Book instantly
//                   </button>
//                 </div>
//               </div>

//               <div className="p-5">
//                 {/* Rating with stars */}
//                 <div className="flex items-center gap-1 mb-3">
//                   <Star className="w-4 h-4 fill-accent text-accent" />
//                   <span className="text-sm font-bold text-slate-800">{service.rating}</span>
//                   <span className="text-xs text-slate-400">({service.reviews} reviews)</span>
//                 </div>
//                 {/* Title */}
//                 <h3 className="text-xl font-black text-primary mb-2 line-clamp-1 group-hover:text-accent transition-colors">
//                   {service.name}
//                 </h3>
//                 {/* Description */}
//                 <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">
//                   {service.description}
//                 </p>
//                 {/* Price and CTA */}
//                 <div className="flex items-center justify-between pt-4 border-t border-slate-100">
//                   <div>
//                     <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Starting from</span>
//                     <span className="text-2xl font-black text-primary block leading-tight">₹{service.price.toLocaleString()}</span>
//                   </div>
//                   <button 
//                     onClick={(e) => handleBookQuickly(e, service)}
//                     className="bg-slate-100 hover:bg-primary text-slate-700 hover:text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all shadow-sm hover:shadow-md"
//                   >
//                     Book Now
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Interactive Stats Section (Corporate Trust) */}
//         <div ref={statsRef} className="mt-24 pt-12 border-t border-slate-200">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//             <motion.div 
//               initial={{ opacity: 0, y: 30 }}
//               animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               className="space-y-2"
//             >
//               <Users className="w-8 h-8 mx-auto text-primary/70" />
//               <div className="text-3xl md:text-4xl font-black text-slate-800">{counts.customers.toLocaleString()}+</div>
//               <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Happy Customers</div>
//             </motion.div>
//             <motion.div 
//               initial={{ opacity: 0, y: 30 }}
//               animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="space-y-2"
//             >
//               <Award className="w-8 h-8 mx-auto text-accent/70" />
//               <div className="text-3xl md:text-4xl font-black text-slate-800">{counts.rating}<span className="text-xl">★</span></div>
//               <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Average Rating</div>
//             </motion.div>
//             <motion.div 
//               initial={{ opacity: 0, y: 30 }}
//               animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.5, delay: 0.3 }}
//               className="space-y-2"
//             >
//               <Clock className="w-8 h-8 mx-auto text-primary/70" />
//               <div className="text-3xl md:text-4xl font-black text-slate-800">{counts.professionals}+</div>
//               <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Certified Pros</div>
//             </motion.div>
//             <motion.div 
//               initial={{ opacity: 0, y: 30 }}
//               animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.5, delay: 0.4 }}
//               className="space-y-2"
//             >
//               <Sparkles className="w-8 h-8 mx-auto text-accent/70" />
//               <div className="text-3xl md:text-4xl font-black text-slate-800">{counts.years}+</div>
//               <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Years of Excellence</div>
//             </motion.div>
//           </div>
//         </div>

//         {/* Bottom CTA Banner */}
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.95 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="mt-20 bg-gradient-to-r from-primary to-accent rounded-3xl p-8 md:p-12 text-white shadow-2xl"
//         >
//           <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//             <div className="space-y-2 text-center md:text-left">
//               <h3 className="text-2xl md:text-3xl font-black">Need a custom solution?</h3>
//               <p className="text-white/80 max-w-md">Our experts are ready to tailor any service to your home's unique needs.</p>
//             </div>
//             <Link 
//               to="/contact"
//               className="group bg-white text-primary px-8 py-3 rounded-full text-sm font-black uppercase tracking-wider hover:bg-slate-100 transition-all shadow-lg flex items-center gap-2"
//             >
//               Request Consultation
//               <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </div>
//         </motion.div>
//       </div>

//       {/* Booking Modal */}
//       <BookingModal 
//         service={selectedService}
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       />
//     </section>
//   );
// }