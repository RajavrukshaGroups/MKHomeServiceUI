// import { CATEGORIES } from '../../constants';
// import * as LucideIcons from 'lucide-react';
// import { motion } from 'motion/react';
// import { Link, useNavigate } from 'react-router-dom';
// import homeServiceImage from '../../assets/home-service-logo.jpg';

// export default function ServiceCategories() {
//   const navigate = useNavigate();

//   return (
//     <section className="py-24 bg-background-app relative overflow-hidden">
//       <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
//       <div className="max-w-7xl mx-auto px-4 relative z-10">
//         <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 gap-6 text-center md:text-left">
//           <div>
//             <h2 className="text-3xl md:text-4xl font-display font-black text-primary mb-4 uppercase tracking-tighter">
//               RELIABLE <span className="text-accent font-black">SERVICE</span> CATALOG
//             </h2>
//             <p className="text-slate-500 font-medium max-w-xl">
//               From professional cleaning to expert repairs, browse our catalog of trusted home services.
//             </p>
//           </div>
//           <Link 
//             to="/services" 
//             className="px-8 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95"
//           >
//             View Full Portfolio
//           </Link>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
//           {CATEGORIES.map((category, index) => {
//             //const IconComponent = LucideIcons[category.icon];
            

//             return (
//               <motion.div
//                 key={category.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.05 }}
//                 onClick={() => navigate('/services')}
//                 className="flex flex-col items-center group cursor-pointer"
//               >
//                 <div className="relative mb-6">
//                   <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
//                   <div className={`relative w-30 h-30 rounded-[2rem] ${category.color} flex items-center justify-center transition-all duration-500 group-hover:rotate-[10deg] shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] border border-black/5`}>
//                     <img src={category.img} alt={category.name} className="w-30 h-30 object-cover rounded-[0.5rem]" />
//                   </div>
//                 </div>
//                 <span className="text-[13px] font-black text-primary uppercase tracking-widest group-hover:text-accent transition-colors text-center px-2">
//                   {category.name}
//                 </span>
//                 <div className="w-1.5 h-1.5 rounded-full bg-accent mt-3 opacity-0 group-hover:opacity-100 transition-opacity" />
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

// import { CATEGORIES } from '../../constants';
// import * as LucideIcons from 'lucide-react';
// import { motion } from 'motion/react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ChevronRight } from 'lucide-react';

// export default function ServiceCategories() {
//   const navigate = useNavigate();

//   return (
//     <section className="py-24 bg-gradient-to-b from-white to-slate-50/50 relative overflow-hidden">
//       {/* Refined background accents - more subtle and corporate */}
//       <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
//       <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Header section - refined corporate typography */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
//           <div className="space-y-4">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
//               <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
//               <span className="text-[10px] font-bold uppercase tracking-wider text-primary/70">Trusted Excellence</span>
//             </div>
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight">
//               <span className="text-slate-900">Reliable </span>
//               <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Service Catalog</span>
//             </h2>
//             <p className="text-slate-500 text-lg max-w-xl leading-relaxed">
//               From professional cleaning to expert repairs, browse our comprehensive catalogue of trusted home services.
//             </p>
//           </div>
          
//           <Link 
//             to="/services" 
//             className="group inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 rounded-full text-sm font-bold uppercase tracking-wide text-slate-700 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
//           >
//             View Full Portfolio
//             <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
//           </Link>
//         </div>

//         {/* Service Categories Grid - Modern card-based layout */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
//           {CATEGORIES.map((category, index) => {
//             // Fix: remove TypeScript "as" syntax - use plain JavaScript
//             const IconComponent = LucideIcons[category.icon];
            
//             return (
//               <motion.button
//                 key={category.id}
//                 type="button"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: "-20px" }}
//                 transition={{ delay: index * 0.03, duration: 0.4 }}
//                 onClick={() => navigate('/services')}
//                 whileTap={{ scale: 0.97 }}
//                 className="group relative flex flex-col items-center p-5 bg-white rounded-2xl border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 cursor-pointer"
//               >
//                 {/* Icon Container - Corporate with subtle depth */}
//                 <div className="relative mb-5">
//                   <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                   <div className={`relative w-16 h-16 rounded-xl ${category.color} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-md border border-white/20`}>
//                     {IconComponent ? (
//                       <IconComponent className="w-8 h-8 text-slate-700 group-hover:text-primary transition-colors duration-300" strokeWidth={1.7} />
//                     ) : (
//                       <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
//                     )}
//                   </div>
//                 </div>
                
//                 {/* Category Name - Clean typography */}
//                 <span className="text-xs font-bold text-slate-700 uppercase tracking-wide group-hover:text-primary transition-colors duration-300 text-center leading-tight">
//                   {category.name}
//                 </span>
                
//                 {/* Interactive indicator - Professional underline */}
//                 <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-8" />
                
//                 {/* Hover border effect */}
//                 <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/20 transition-colors duration-300 pointer-events-none" />
//               </motion.button>
//             );
//           })}
//         </div>
        
//         {/* Trust indicator - Corporate credibility element */}
//         <div className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap justify-center gap-6 md:gap-12">
//           <div className="flex items-center gap-2 text-slate-400">
//             <div className="w-1 h-1 rounded-full bg-primary/60" />
//             <span className="text-xs font-medium uppercase tracking-wider">100% Satisfaction</span>
//           </div>
//           <div className="flex items-center gap-2 text-slate-400">
//             <div className="w-1 h-1 rounded-full bg-primary/60" />
//             <span className="text-xs font-medium uppercase tracking-wider">Certified Professionals</span>
//           </div>
//           <div className="flex items-center gap-2 text-slate-400">
//             <div className="w-1 h-1 rounded-full bg-primary/60" />
//             <span className="text-xs font-medium uppercase tracking-wider">24/7 Support</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


// import { HOME_CATEGORIES as CATEGORIES, FEATURED_SERVICES } from '../../constants';
// import { motion } from 'motion/react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ChevronRight } from 'lucide-react';

// export default function ServiceCategories() {
//   const navigate = useNavigate();

//   return (
//     <section className="py-24 bg-gradient-to-b from-white to-slate-50/50 relative overflow-hidden">
//       <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
//       <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
//           <div className="space-y-4">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
//               <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
//               <span className="text-[10px] font-bold uppercase tracking-wider text-primary/70">Trusted Excellence</span>
//             </div>
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight">
//               <span className="text-slate-900">Reliable </span>
//               <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Service Catalog</span>
//             </h2>
//             <p className="text-slate-500 text-lg max-w-xl leading-relaxed">
//               From professional cleaning to expert repairs, browse our comprehensive catalogue of trusted home services.
//             </p>
//           </div>
          
//           <Link 
//             to="/services" 
//             className="group inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 rounded-full text-sm font-bold uppercase tracking-wide text-slate-700 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
//           >
//             Explore All Services
//             <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
//           </Link>
//         </div>

//         {/* Grid of categories */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
//           {CATEGORIES.map((category, index) => {
//             // Determine which SVG render method to use
//             const SvgComponent = category.svgComponent; // imported component (if any)
//             const svgPath = category.svgPath;           // public folder path (if any)

//             return (
//               <motion.button
//                 key={category.id}
//                 type="button"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: "-20px" }}
//                 transition={{ delay: index * 0.03, duration: 0.4 }}
//                 onClick={() => navigate('')}
//                 whileTap={{ scale: 0.97 }}
//                 className="group relative flex flex-col items-center p-5 bg-white rounded-2xl border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 cursor-pointer"
//               >
//                 <div className="relative mb-5">
//                   <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                   <div className={`relative  rounded-xl flex items-center justify-center transition-all duration-300 `}>
                   
//                       <img 
//                         src={category.img} 
//                         alt={category.name}
//                         className="w-30 h-30 object-contain transition-all duration-300 group-hover:scale-105"
//                         loading="lazy"
//                       />
                    
                      
//                   </div>
//                 </div>
                
//                 <span className="text-xs font-bold text-slate-700 uppercase tracking-wide group-hover:text-primary transition-colors duration-300 text-center leading-tight">
//                   {category.name}
//                 </span>
                
//                 <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-8" />
//                 <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/20 transition-colors duration-300 pointer-events-none" />
//               </motion.button>
//             );
//           })}
//         </div>
        
//         {/* Trust indicators */}
//         <div className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap justify-center gap-6 md:gap-12">
//           <div className="flex items-center gap-2 text-slate-400">
//             <div className="w-1 h-1 rounded-full bg-primary/60" />
//             <span className="text-xs font-medium uppercase tracking-wider">100% Satisfaction</span>
//           </div>
//           <div className="flex items-center gap-2 text-slate-400">
//             <div className="w-1 h-1 rounded-full bg-primary/60" />
//             <span className="text-xs font-medium uppercase tracking-wider">Certified Professionals</span>
//           </div>
//           <div className="flex items-center gap-2 text-slate-400">
//             <div className="w-1 h-1 rounded-full bg-primary/60" />
//             <span className="text-xs font-medium uppercase tracking-wider">24/7 Support</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// import { useState } from 'react';
// import { HOME_CATEGORIES as CATEGORIES, FEATURED_SERVICES } from '../../constants';
// import { motion } from 'motion/react';
// import { useNavigate } from 'react-router-dom';
// import { ChevronRight, X } from 'lucide-react';

// export default function ServiceCategories() {
//   const navigate = useNavigate();
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [showAllServices, setShowAllServices] = useState(false);

//   // Determine what to show
//   let displayedServices = [];
//   let groupedDisplay = {};

//   if (showAllServices) {
//     // Show ALL featured services, grouped by their main category
//     displayedServices = FEATURED_SERVICES;
//     groupedDisplay = displayedServices.reduce((groups, service) => {
//       const key = service.category;
//       if (!groups[key]) groups[key] = [];
//       groups[key].push(service);
//       return groups;
//     }, {});
//   } else if (selectedCategory) {
//     // Show only services of the selected category, grouped by subcategory
//     displayedServices = FEATURED_SERVICES.filter(
//       service => service.category === selectedCategory.name
//     );
//     groupedDisplay = displayedServices.reduce((groups, service) => {
//       const key = service.subcategory || 'General';
//       if (!groups[key]) groups[key] = [];
//       groups[key].push(service);
//       return groups;
//     }, {});
//   }

//   const handleCategoryClick = (category) => {
//     setShowAllServices(false);
//     setSelectedCategory(prev => (prev?.id === category.id ? null : category));
//   };

//   const handleShowAll = () => {
//     setSelectedCategory(null);
//     setShowAllServices(true);
//   };

//   const handleClear = () => {
//     setSelectedCategory(null);
//     setShowAllServices(false);
//   };

//   return (
//     <section className="py-24 bg-gradient-to-b from-white to-slate-50/50 relative overflow-hidden">
//       {/* Background blobs */}
//       <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
//       <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
//           <div className="space-y-4">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
//               <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
//               <span className="text-[10px] font-bold uppercase tracking-wider text-primary/70">Trusted Excellence</span>
//             </div>
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight">
//               <span className="text-slate-900">Reliable </span>
//               <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Service Catalog</span>
//             </h2>
//             <p className="text-slate-500 text-lg max-w-xl leading-relaxed">
//               From professional cleaning to expert repairs, browse our comprehensive catalogue of trusted home services.
//             </p>
//           </div>

//           {/* "Explore All Services" button – now shows all FEATURED_SERVICES */}
//           <button
//             onClick={handleShowAll}
//             className="group inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 rounded-full text-sm font-bold uppercase tracking-wide text-slate-700 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
//           >
//             Explore All Services
//             <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
//           </button>
//         </div>

//         {/* Category grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
//           {CATEGORIES.map((category, index) => {
//             const isSelected = selectedCategory?.id === category.id;
//             return (
//               <motion.button
//                 key={category.id}
//                 type="button"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: "-20px" }}
//                 transition={{ delay: index * 0.03, duration: 0.4 }}
//                 onClick={() => handleCategoryClick(category)}
//                 whileTap={{ scale: 0.97 }}
//                 className={`group relative flex flex-col items-center p-5 bg-white rounded-2xl border shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 cursor-pointer ${
//                   isSelected
//                     ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
//                     : 'border-slate-100 hover:border-slate-200 hover:shadow-lg'
//                 }`}
//               >
//                 <div className="relative mb-5">
//                   <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                   <div className="relative rounded-xl flex items-center justify-center transition-all duration-300">
//                     <img
//                       src={category.img}
//                       alt={category.name}
//                       className="w-30 h-30 object-contain transition-all duration-300 group-hover:scale-105"
//                       loading="lazy"
//                     />
//                   </div>
//                 </div>

//                 <span className={`text-xs font-bold uppercase tracking-wide text-center leading-tight transition-colors duration-300 ${
//                   isSelected ? 'text-primary' : 'text-slate-700 group-hover:text-primary'
//                 }`}>
//                   {category.name}
//                 </span>

//                 <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-8" />
//                 <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/20 transition-colors duration-300 pointer-events-none" />
//               </motion.button>
//             );
//           })}
//         </div>

//         {/* Display area – either all services or category-specific services */}
//         {(selectedCategory || showAllServices) && (
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 30 }}
//             transition={{ duration: 0.4 }}
//             className="mt-20 pt-8 border-t border-slate-200"
//           >
//             <div className="flex items-center justify-between mb-8">
//               <div>
//                 <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-800">
//                   {showAllServices ? 'All Services' : `${selectedCategory.name} Services`}
//                 </h3>
//                 <p className="text-slate-500 mt-1">
//                   {showAllServices
//                     ? 'Explore our complete range of professional home services'
//                     : `Choose from our range of professional ${selectedCategory.name.toLowerCase()} services`}
//                 </p>
//               </div>
//               <button
//                 onClick={handleClear}
//                 className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
//               >
//                 <X className="w-4 h-4" />
//                 Clear
//               </button>
//             </div>

//             {Object.keys(groupedDisplay).length === 0 ? (
//               <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
//                 <p className="text-slate-400">No services available for this selection.</p>
//               </div>
//             ) : (
//               <div className="space-y-12">
//                 {Object.entries(groupedDisplay).map(([groupName, services]) => (
//                   <div key={groupName}>
//                     <h4 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
//                       <span className="w-1.5 h-1.5 rounded-full bg-primary" />
//                       {groupName}
//                     </h4>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                       {services.map((service) => (
//                         <div
//                           key={service.id}
//                           className="group bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
//                           onClick={() => navigate(`/service/${service.id}`)}
//                         >
//                           <div className="aspect-video overflow-hidden bg-slate-100">
//                             <img
//                               src={service.image}
//                               alt={service.name}
//                               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                               loading="lazy"
//                             />
//                           </div>
//                           <div className="p-5">
//                             <div className="flex items-start justify-between gap-2 mb-2">
//                               <h5 className="font-bold text-slate-800 line-clamp-1">{service.name}</h5>
//                               <span className="text-primary font-bold text-sm whitespace-nowrap">
//                                 ₹{service.price.toLocaleString()}
//                               </span>
//                             </div>
//                             <p className="text-slate-500 text-sm line-clamp-2 mb-3">{service.description}</p>
//                             <div className="flex items-center justify-between">
//                               <div className="flex items-center gap-1 text-amber-400 text-sm">
//                                 <span>★</span>
//                                 <span className="text-slate-600 font-medium">{service.rating}</span>
//                                 <span className="text-slate-400 text-xs">({service.reviews})</span>
//                               </div>
//                               <button className="text-primary text-xs font-bold uppercase tracking-wide hover:underline">
//                                 Book Now →
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </motion.div>
//         )}

//         {/* Trust indicators */}
//         <div className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap justify-center gap-6 md:gap-12">
//           <div className="flex items-center gap-2 text-slate-400">
//             <div className="w-1 h-1 rounded-full bg-primary/60" />
//             <span className="text-xs font-medium uppercase tracking-wider">100% Satisfaction</span>
//           </div>
//           <div className="flex items-center gap-2 text-slate-400">
//             <div className="w-1 h-1 rounded-full bg-primary/60" />
//             <span className="text-xs font-medium uppercase tracking-wider">Certified Professionals</span>
//           </div>
//           <div className="flex items-center gap-2 text-slate-400">
//             <div className="w-1 h-1 rounded-full bg-primary/60" />
//             <span className="text-xs font-medium uppercase tracking-wider">24/7 Support</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


// import { useState } from 'react';
// import { HOME_CATEGORIES as CATEGORIES, FEATURED_SERVICES } from '../../constants';
// import { motion } from 'motion/react';
// import { useNavigate } from 'react-router-dom';
// import { ChevronRight, X } from 'lucide-react';

// export default function ServiceCategories() {
//   const navigate = useNavigate();
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [showAllServices, setShowAllServices] = useState(false);

//   // Determine what to show
//   let displayedServices = [];
//   let groupedDisplay = {};

//   if (showAllServices) {
//     // Show ALL featured services, grouped by their main category
//     displayedServices = FEATURED_SERVICES;
//     groupedDisplay = displayedServices.reduce((groups, service) => {
//       const key = service.category;
//       if (!groups[key]) groups[key] = [];
//       groups[key].push(service);
//       return groups;
//     }, {});
//   } else if (selectedCategory && selectedCategory.id !== 'all-services') {
//     // Show only services of the selected category (exclude the "All Services" pseudo-category)
//     displayedServices = FEATURED_SERVICES.filter(
//       service => service.category === selectedCategory.name
//     );
//     groupedDisplay = displayedServices.reduce((groups, service) => {
//       const key = service.subcategory || 'General';
//       if (!groups[key]) groups[key] = [];
//       groups[key].push(service);
//       return groups;
//     }, {});
//   }

//   const handleCategoryClick = (category) => {
//     // Special handling for "All Services" category
//     if (category.id === 'all-services') {
//       setSelectedCategory(null);
//       setShowAllServices(true);
//     } else {
//       setShowAllServices(false);
//       setSelectedCategory(prev => (prev?.id === category.id ? null : category));
//     }
//   };

//   const handleShowAll = () => {
//     setSelectedCategory(null);
//     setShowAllServices(true);
//   };

//   const handleClear = () => {
//     setSelectedCategory(null);
//     setShowAllServices(false);
//   };

//   // Determine if the "All Services" button should be highlighted
//   const isAllServicesSelected = showAllServices;

//   return (
//     <section className="py-24 bg-gradient-to-b from-white to-slate-50/50 relative overflow-hidden">
//       {/* Background blobs */}
//       <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
//       <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
//           <div className="space-y-4">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
//               <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
//               <span className="text-[10px] font-bold uppercase tracking-wider text-primary/70">Trusted Excellence</span>
//             </div>
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight">
//               <span className="text-slate-900">Reliable </span>
//               <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Service Catalog</span>
//             </h2>
//             <p className="text-slate-500 text-lg max-w-xl leading-relaxed">
//               From professional cleaning to expert repairs, browse our comprehensive catalogue of trusted home services.
//             </p>
//           </div>

//           {/* Optional "Explore All Services" button (alternative to the category) */}
//           <button
//             onClick={handleShowAll}
//             className="group inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 rounded-full text-sm font-bold uppercase tracking-wide text-slate-700 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
//           >
//             Explore All Services
//             <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
//           </button>
//         </div>

//         {/* Grid of categories (includes "All Services" now) */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
//           {CATEGORIES.map((category, index) => {
//             const isSelected = 
//               (category.id === 'all-services' && isAllServicesSelected) ||
//               (selectedCategory?.id === category.id);
//             return (
//               <motion.button
//                 key={category.id}
//                 type="button"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: "-20px" }}
//                 transition={{ delay: index * 0.03, duration: 0.4 }}
//                 onClick={() => handleCategoryClick(category)}
//                 whileTap={{ scale: 0.97 }}
//                 className={`group relative flex flex-col items-center p-5 bg-white rounded-2xl border shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 cursor-pointer ${
//                   isSelected
//                     ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
//                     : 'border-slate-100 hover:border-slate-200 hover:shadow-lg'
//                 }`}
//               >
//                 <div className="relative mb-5">
//                   <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                   <div className="relative rounded-xl flex items-center justify-center transition-all duration-300">
//                     <img
//                       src={category.img}
//                       alt={category.name}
//                       className="w-30 h-30 object-contain transition-all duration-300 group-hover:scale-105"
//                       loading="lazy"
//                     />
//                   </div>
//                 </div>

//                 <span className={`text-xs font-bold uppercase tracking-wide text-center leading-tight transition-colors duration-300 ${
//                   isSelected ? 'text-primary' : 'text-slate-700 group-hover:text-primary'
//                 }`}>
//                   {category.name}
//                 </span>

//                 <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-8" />
//                 <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/20 transition-colors duration-300 pointer-events-none" />
//               </motion.button>
//             );
//           })}
//         </div>

//         {/* Display area – either all services or category-specific services */}
//         {(selectedCategory || showAllServices) && (
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 30 }}
//             transition={{ duration: 0.4 }}
//             className="mt-20 pt-8 border-t border-slate-200"
//           >
//             <div className="flex items-center justify-between mb-8">
//               <div>
//                 <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-800">
//                   {showAllServices 
//                     ? 'All Services' 
//                     : selectedCategory?.name === 'All Services' 
//                       ? 'All Services' 
//                       : `${selectedCategory?.name} Services`}
//                 </h3>
//                 <p className="text-slate-500 mt-1">
//                   {showAllServices || selectedCategory?.id === 'all-services'
//                     ? 'Explore our complete range of professional home services'
//                     : `Choose from our range of professional ${selectedCategory?.name.toLowerCase()} services`}
//                 </p>
//               </div>
//               <button
//                 onClick={handleClear}
//                 className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
//               >
//                 <X className="w-4 h-4" />
//                 Clear
//               </button>
//             </div>

//             {Object.keys(groupedDisplay).length === 0 ? (
//               <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
//                 <p className="text-slate-400">No services available for this selection.</p>
//               </div>
//             ) : (
//               <div className="space-y-12">
//                 {Object.entries(groupedDisplay).map(([groupName, services]) => (
//                   <div key={groupName}>
//                     <h4 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
//                       <span className="w-1.5 h-1.5 rounded-full bg-primary" />
//                       {groupName}
//                     </h4>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                       {services.map((service) => (
//                         <div
//                           key={service.id}
//                           className="group bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
//                           onClick={() => navigate(`/service/${service.id}`)}
//                         >
//                           <div className="aspect-video overflow-hidden bg-slate-100">
//                             <img
//                               src={service.image}
//                               alt={service.name}
//                               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                               loading="lazy"
//                             />
//                           </div>
//                           <div className="p-5">
//                             <div className="flex items-start justify-between gap-2 mb-2">
//                               <h5 className="font-bold text-slate-800 line-clamp-1">{service.name}</h5>
//                               <span className="text-primary font-bold text-sm whitespace-nowrap">
//                                 ₹{service.price.toLocaleString()}
//                               </span>
//                             </div>
//                             <p className="text-slate-500 text-sm line-clamp-2 mb-3">{service.description}</p>
//                             <div className="flex items-center justify-between">
//                               <div className="flex items-center gap-1 text-amber-400 text-sm">
//                                 <span>★</span>
//                                 <span className="text-slate-600 font-medium">{service.rating}</span>
//                                 <span className="text-slate-400 text-xs">({service.reviews})</span>
//                               </div>
//                               <button className="text-primary text-xs font-bold uppercase tracking-wide hover:underline">
//                                 Book Now →
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </motion.div>
//         )}

//         {/* Trust indicators */}
//         <div className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap justify-center gap-6 md:gap-12">
//           <div className="flex items-center gap-2 text-slate-400">
//             <div className="w-1 h-1 rounded-full bg-primary/60" />
//             <span className="text-xs font-medium uppercase tracking-wider">100% Satisfaction</span>
//           </div>
//           <div className="flex items-center gap-2 text-slate-400">
//             <div className="w-1 h-1 rounded-full bg-primary/60" />
//             <span className="text-xs font-medium uppercase tracking-wider">Certified Professionals</span>
//           </div>
//           <div className="flex items-center gap-2 text-slate-400">
//             <div className="w-1 h-1 rounded-full bg-primary/60" />
//             <span className="text-xs font-medium uppercase tracking-wider">24/7 Support</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useState } from 'react';
import { HOME_CATEGORIES as CATEGORIES, FEATURED_SERVICES } from '../../constants';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, X } from 'lucide-react';

export default function ServiceCategories() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAllServices, setShowAllServices] = useState(true); // ✅ Default to show all

  // Determine what to show
  let displayedServices = [];
  let groupedDisplay = {};

  if (showAllServices) {
    displayedServices = FEATURED_SERVICES;
    groupedDisplay = displayedServices.reduce((groups, service) => {
      const key = service.category;
      if (!groups[key]) groups[key] = [];
      groups[key].push(service);
      return groups;
    }, {});
  } else if (selectedCategory && selectedCategory.id !== 'all-services') {
    displayedServices = FEATURED_SERVICES.filter(
      service => service.category === selectedCategory.name
    );
    groupedDisplay = displayedServices.reduce((groups, service) => {
      const key = service.subcategory || 'General';
      if (!groups[key]) groups[key] = [];
      groups[key].push(service);
      return groups;
    }, {});
  }

  const handleCategoryClick = (category) => {
    if (category.id === 'all-services') {
      setSelectedCategory(null);
      setShowAllServices(true);
    } else {
      // If this category is already selected → go back to "all services"
      if (selectedCategory?.id === category.id) {
        setSelectedCategory(null);
        setShowAllServices(true);
      } else {
        setSelectedCategory(category);
        setShowAllServices(false);
      }
    }
  };

  const handleShowAll = () => {
    setSelectedCategory(null);
    setShowAllServices(true);
  };

  const handleClear = () => {
    setSelectedCategory(null);
    setShowAllServices(true); // ✅ Clear also goes back to all services
  };

  const isAllServicesSelected = showAllServices;

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50/50 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary/70">Trusted Excellence</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight">
              <span className="text-slate-900">Reliable </span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Service Catalog</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-xl leading-relaxed">
              From professional cleaning to expert repairs, browse our comprehensive catalogue of trusted home services.
            </p>
          </div>

          <button
            onClick={handleShowAll}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 rounded-full text-sm font-bold uppercase tracking-wide text-slate-700 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
          >
            Explore All Services
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {CATEGORIES.map((category, index) => {
            const isSelected = 
              (category.id === 'all-services' && isAllServicesSelected) ||
              (selectedCategory?.id === category.id);
            return (
              <motion.button
                key={category.id}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: index * 0.03, duration: 0.4 }}
                onClick={() => handleCategoryClick(category)}
                whileTap={{ scale: 0.97 }}
                className={`group relative flex flex-col items-center p-5 bg-white rounded-2xl border shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 cursor-pointer ${
                  isSelected
                    ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                    : 'border-slate-100 hover:border-slate-200 hover:shadow-lg'
                }`}
              >
                <div className="relative mb-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative rounded-xl flex items-center justify-center transition-all duration-300">
                    <img
                      src={category.img}
                      alt={category.name}
                      className="w-30 h-30 object-contain transition-all duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>

                <span className={`text-xs font-bold uppercase tracking-wide text-center leading-tight transition-colors duration-300 ${
                  isSelected ? 'text-primary' : 'text-slate-700 group-hover:text-primary'
                }`}>
                  {category.name}
                </span>

                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-8" />
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/20 transition-colors duration-300 pointer-events-none" />
              </motion.button>
            );
          })}
        </div>

        {/* Display area */}
        {(selectedCategory || showAllServices) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            className="mt-20 pt-8 border-t border-slate-200"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-800">
                  {showAllServices 
                    ? 'All Services' 
                    : `${selectedCategory?.name} Services`}
                </h3>
                <p className="text-slate-500 mt-1">
                  {showAllServices
                    ? 'Explore our complete range of professional home services'
                    : `Choose from our range of professional ${selectedCategory?.name.toLowerCase()} services`}
                </p>
              </div>
              <button
                onClick={handleClear}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            </div>

            {Object.keys(groupedDisplay).length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
                <p className="text-slate-400">No services available for this selection.</p>
              </div>
            ) : (
              <div className="space-y-12">
                {Object.entries(groupedDisplay).map(([groupName, services]) => (
                  <div key={groupName}>
                    <h4 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {groupName}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          className="group bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                          onClick={() => navigate(`/service/${service.id}`)}
                        >
                          <div className="aspect-video overflow-hidden bg-slate-100">
                            <img
                              src={service.image}
                              alt={service.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                          </div>
                          <div className="p-5">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h5 className="font-bold text-slate-800 line-clamp-1">{service.name}</h5>
                              <span className="text-primary font-bold text-sm whitespace-nowrap">
                                ₹{service.price.toLocaleString()}
                              </span>
                            </div>
                            <p className="text-slate-500 text-sm line-clamp-2 mb-3">{service.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-amber-400 text-sm">
                                <span>★</span>
                                <span className="text-slate-600 font-medium">{service.rating}</span>
                                <span className="text-slate-400 text-xs">({service.reviews})</span>
                              </div>
                              <button className="text-primary text-xs font-bold uppercase tracking-wide hover:underline">
                                Book Now →
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Trust indicators */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap justify-center gap-6 md:gap-12">
          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-1 h-1 rounded-full bg-primary/60" />
            <span className="text-xs font-medium uppercase tracking-wider">100% Satisfaction</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-1 h-1 rounded-full bg-primary/60" />
            <span className="text-xs font-medium uppercase tracking-wider">Certified Professionals</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-1 h-1 rounded-full bg-primary/60" />
            <span className="text-xs font-medium uppercase tracking-wider">24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}