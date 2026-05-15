// import { useState } from 'react';
// import { HOME_CATEGORIES as CATEGORIES, FEATURED_SERVICES } from '../../constants';
// import { motion } from 'motion/react';
// import { useNavigate } from 'react-router-dom';
// import { ChevronRight, X } from 'lucide-react';

// export default function ServiceCategories() {
//   const navigate = useNavigate();
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [showAllServices, setShowAllServices] = useState(true); // ✅ Default to show all

//   // Determine what to show
//   let displayedServices = [];
//   let groupedDisplay = {};

//   if (showAllServices) {
//     displayedServices = FEATURED_SERVICES;
//     groupedDisplay = displayedServices.reduce((groups, service) => {
//       const key = service.category;
//       if (!groups[key]) groups[key] = [];
//       groups[key].push(service);
//       return groups;
//     }, {});
//   } else if (selectedCategory && selectedCategory.id !== 'all-services') {
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
//     if (category.id === 'all-services') {
//       setSelectedCategory(null);
//       setShowAllServices(true);
//     } else {
//       // If this category is already selected → go back to "all services"
//       if (selectedCategory?.id === category.id) {
//         setSelectedCategory(null);
//         setShowAllServices(true);
//       } else {
//         setSelectedCategory(category);
//         setShowAllServices(false);
//       }
//     }
//   };

//   const handleShowAll = () => {
//     setSelectedCategory(null);
//     setShowAllServices(true);
//   };

//   const handleClear = () => {
//     setSelectedCategory(null);
//     setShowAllServices(true); // ✅ Clear also goes back to all services
//   };

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

//         {/* Display area */}
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
//                     : `${selectedCategory?.name} Services`}
//                 </h3>
//                 <p className="text-slate-500 mt-1">
//                   {showAllServices
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


// import { useState, useEffect } from "react";
// import { motion } from "motion/react";
// import { useNavigate } from "react-router-dom";
// import { ChevronRight, X } from "lucide-react";

// export default function ServiceCategories() {
//   const navigate = useNavigate();

//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [showAllServices, setShowAllServices] = useState(true);

//   const [services, setServices] = useState([]);
//   const [categories, setCategories] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // ✅ FETCH DATA
//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const res = await fetch(
//           "http://localhost:12000/client/send-services-client"
//         );

//         if (!res.ok) throw new Error("Failed to fetch");

//         const result = await res.json();

//         if (result.success) {
//           const activeData = result.data.filter((item) => item.isActive);

//           setServices(activeData);

//           // Extract top-level categories
//           const dbCategories = activeData.filter(
//             (item) => item.type === "category" && item.parentId === null
//           );

//           // Add "All Services" at first
//           const allCategory = {
//             _id: "all-services",
//             name: "All Services",
//           };

//           setCategories([allCategory, ...dbCategories]);
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchServices();
//   }, []);

//   // 🔥 RECURSIVE FUNCTION
//   const getAllChildServices = (allServices, parentId) => {
//     let result = [];

//     const children = allServices.filter(
//       (item) => item.parentId === parentId && item.isActive
//     );

//     for (let child of children) {
//       result.push(child);
//       const nested = getAllChildServices(allServices, child._id);
//       result = result.concat(nested);
//     }

//     return result;
//   };

//   // ✅ BUILD CATEGORY-WISE DATA
//   let categorizedData = [];

//   if (showAllServices || selectedCategory?._id === "all-services") {
//     categorizedData = categories
//       .filter((cat) => cat._id !== "all-services")
//       .map((cat) => {
//         const children = getAllChildServices(services, cat._id);

//         const onlyServices = children.filter(
//           (item) => item.type === "service" && item.isActive
//         );

//         return {
//           categoryName: cat.name,
//           services: onlyServices,
//         };
//       })
//       .filter((group) => group.services.length > 0);
//   } else if (selectedCategory) {
//     const children = getAllChildServices(services, selectedCategory._id);

//     categorizedData = [
//       {
//         categoryName: selectedCategory.name,
//         services: children.filter(
//           (item) => item.type === "service" && item.isActive
//         ),
//       },
//     ];
//   }

//   // HANDLERS
//   const handleCategoryClick = (category) => {
//     if (category._id === "all-services") {
//       setSelectedCategory(null);
//       setShowAllServices(true);
//     } else {
//       setSelectedCategory(category);
//       setShowAllServices(false);
//     }
//   };

//   const handleClear = () => {
//     setSelectedCategory(null);
//     setShowAllServices(true);
//   };

//   // LOADING
//   if (loading) {
//     return (
//       <div className="text-center py-20 text-lg font-semibold">
//         Loading services...
//       </div>
//     );
//   }

//   // ERROR
//   if (error) {
//     return (
//       <div className="text-center py-20 text-red-500 font-semibold">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <section className="py-24 bg-gradient-to-b from-white to-slate-50/50">
//       <div className="max-w-7xl mx-auto px-4">

//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
//           <div>
//             <h2 className="text-3xl md:text-4xl font-bold">
//               Service Catalog
//             </h2>
//             <p className="text-gray-500 mt-2">
//               Browse our professional services
//             </p>
//           </div>

//           <button
//             onClick={handleClear}
//             className="flex items-center gap-2 px-5 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
//           >
//             <X size={16} />
//             Clear
//           </button>
//         </div>

//         {/* CATEGORY GRID */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//           {categories.map((cat) => {
//             const isSelected =
//               (cat._id === "all-services" && showAllServices) ||
//               selectedCategory?._id === cat._id;

//             return (
//               <motion.button
//                 key={cat._id}
//                 onClick={() => handleCategoryClick(cat)}
//                 whileTap={{ scale: 0.95 }}
//                 className={`p-4 rounded-xl border text-center ${
//                   isSelected
//                     ? "border-primary bg-primary/10"
//                     : "border-gray-200 hover:border-primary"
//                 }`}
//               >
//                 <p className="text-sm font-semibold">{cat.name}</p>
//               </motion.button>
//             );
//           })}
//         </div>

//         {/* SERVICES DISPLAY */}
//         <div className="mt-16">
//           {categorizedData.length === 0 ? (
//             <p className="text-center text-gray-400">
//               No services available
//             </p>
//           ) : (
//             categorizedData.map((group, index) => (
//               <div key={index} className="mb-14">

//                 {/* CATEGORY HEADING */}
//                 <h3 className="text-xl font-bold mb-6 text-slate-800">
//                   {group.categoryName}
//                 </h3>

//                 {/* SERVICES GRID */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {group.services.map((service) => (
//                     <div
//                       key={service._id}
//                       onClick={() => navigate(`/service/${service._id}`)}
//                       className="bg-white border rounded-xl overflow-hidden hover:shadow-md transition cursor-pointer"
//                     >
//                       <div className="h-40 bg-gray-100 overflow-hidden">
//                         <img
//                           src={
//                             service.images?.[0] ||
//                             "https://via.placeholder.com/300"
//                           }
//                           alt={service.name}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>

//                       <div className="p-4">
//                         <h4 className="font-semibold text-gray-800">
//                           {service.name}
//                         </h4>

//                         <p className="text-sm text-gray-500 mt-1 line-clamp-2">
//                           {service.description}
//                         </p>

//                         <div className="flex justify-between mt-3">
//                           <span className="font-bold text-primary">
//                             {service.price
//                               ? `₹${service.price}`
//                               : "Custom Price"}
//                           </span>

//                           <span className="text-sm text-gray-500">
//                             ⭐ {service.rating || 0} (
//                             {service.totalReviews || 0})
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//               </div>
//             ))
//           )}
//         </div>

//       </div>
//     </section>
//   );
// }

// import { useState, useEffect } from "react";
// import { motion } from "motion/react";
// import { useNavigate } from "react-router-dom";
// import { X } from "lucide-react";

// export default function ServiceCategories() {
//   const navigate = useNavigate();

//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [showAllServices, setShowAllServices] = useState(true);

//   const [services, setServices] = useState([]);
//   const [categories, setCategories] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // ✅ FETCH DATA
//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const res = await fetch(
//           "http://localhost:12000/client/send-services-client"
//         );

//         if (!res.ok) throw new Error("Failed to fetch");

//         const result = await res.json();

//         if (result.success) {
//           const activeData = result.data.filter((item) => item.isActive);

//           setServices(activeData);

//           // Extract top-level categories
//           const dbCategories = activeData.filter(
//             (item) => item.type === "category" && item.parentId === null
//           );

//           // Add "All Services"
//           const allCategory = {
//             _id: "all-services",
//             name: "All Services",
//           };

//           setCategories([allCategory, ...dbCategories]);
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchServices();
//   }, []);

//   // 🔥 RECURSIVE FUNCTION (GET ALL CHILDREN)
//   const getAllChildServices = (allServices, parentId) => {
//     let result = [];

//     const children = allServices.filter(
//       (item) => item.parentId === parentId && item.isActive
//     );

//     for (let child of children) {
//       result.push(child);
//       const nested = getAllChildServices(allServices, child._id);
//       result = result.concat(nested);
//     }

//     return result;
//   };

//   // ✅ NEW: CHECK IF ITEM IS LEAF NODE (NO CHILDREN)
//   const isLeafService = (item) => {
//     const hasChildren = services.some(
//       (s) => s.parentId === item._id && s.isActive
//     );
//     return !hasChildren;
//   };

//   // ✅ BUILD CATEGORY-WISE DATA
//   let categorizedData = [];

//   if (showAllServices || selectedCategory?._id === "all-services") {
//     categorizedData = categories
//       .filter((cat) => cat._id !== "all-services")
//       .map((cat) => {
//         const children = getAllChildServices(services, cat._id);

//         const onlyServices = children.filter(
//           (item) => item.isActive && isLeafService(item)
//         );

//         return {
//           categoryName: cat.name,
//           services: onlyServices,
//         };
//       })
//       .filter((group) => group.services.length > 0);
//   } else if (selectedCategory) {
//     const children = getAllChildServices(services, selectedCategory._id);

//     categorizedData = [
//       {
//         categoryName: selectedCategory.name,
//         services: children.filter(
//           (item) => item.isActive && isLeafService(item)
//         ),
//       },
//     ];
//   }

//   // HANDLERS
//   const handleCategoryClick = (category) => {
//     if (category._id === "all-services") {
//       setSelectedCategory(null);
//       setShowAllServices(true);
//     } else {
//       setSelectedCategory(category);
//       setShowAllServices(false);
//     }
//   };

//   const handleClear = () => {
//     setSelectedCategory(null);
//     setShowAllServices(true);
//   };

//   // LOADING
//   if (loading) {
//     return (
//       <div className="text-center py-20 text-lg font-semibold">
//         Loading services...
//       </div>
//     );
//   }

//   // ERROR
//   if (error) {
//     return (
//       <div className="text-center py-20 text-red-500 font-semibold">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <section className="py-24 bg-gradient-to-b from-white to-slate-50/50">
//       <div className="max-w-7xl mx-auto px-4">

//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
//           <div>
//             <h2 className="text-3xl md:text-4xl font-bold">
//               Service Catalog
//             </h2>
//             <p className="text-gray-500 mt-2">
//               Browse our professional services
//             </p>
//           </div>

//           <button
//             onClick={handleClear}
//             className="flex items-center gap-2 px-5 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
//           >
//             <X size={16} />
//             Clear
//           </button>
//         </div>

//         {/* CATEGORY GRID */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//           {categories.map((cat) => {
//             const isSelected =
//               (cat._id === "all-services" && showAllServices) ||
//               selectedCategory?._id === cat._id;

//             return (
//               <motion.button
//                 key={cat._id}
//                 onClick={() => handleCategoryClick(cat)}
//                 whileTap={{ scale: 0.95 }}
//                 className={`p-4 rounded-xl border text-center ${
//                   isSelected
//                     ? "border-primary bg-primary/10"
//                     : "border-gray-200 hover:border-primary"
//                 }`}
//               >
//                 <p className="text-sm font-semibold">{cat.name}</p>
//               </motion.button>
//             );
//           })}
//         </div>

//         {/* SERVICES DISPLAY */}
//         <div className="mt-16">
//           {categorizedData.length === 0 ? (
//             <p className="text-center text-gray-400">
//               No services available
//             </p>
//           ) : (
//             categorizedData.map((group, index) => (
//               <div key={index} className="mb-14">

//                 {/* CATEGORY HEADING */}
//                 <h3 className="text-xl font-bold mb-6 text-slate-800">
//                   {group.categoryName}
//                 </h3>

//                 {/* SERVICES GRID */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {group.services.map((service) => (
//                     <div
//                       key={service._id}
//                       onClick={() => navigate(`/service/${service._id}`)}
//                       className="bg-white border rounded-xl overflow-hidden hover:shadow-md transition cursor-pointer"
//                     >
//                       <div className="h-40 bg-gray-100 overflow-hidden">
//                         <img
//                           src={
//                             service.images?.[0] ||
//                             "https://via.placeholder.com/300"
//                           }
//                           alt={service.name}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>

//                       <div className="p-4">
//                         <h4 className="font-semibold text-gray-800">
//                           {service.name}
//                         </h4>

//                         <p className="text-sm text-gray-500 mt-1 line-clamp-2">
//                           {service.description}
//                         </p>

//                         <div className="flex justify-between mt-3">
//                           <span className="font-bold text-primary">
//                             {service.price
//                               ? `₹${service.price}`
//                               : "Custom Price"}
//                           </span>

//                           <span className="text-sm text-gray-500">
//                             ⭐ {service.rating || 0} (
//                             {service.totalReviews || 0})
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//               </div>
//             ))
//           )}
//         </div>

//       </div>
//     </section>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { useNavigate } from "react-router-dom";
// import { 
//   X, 
//   Search, 
//   Star, 
//   Sparkles, 
//   Layers, 
//   ChevronRight,
//   ShieldCheck,
//   Award,
//   Clock,
//   CreditCard,
//   ArrowRight
// } from "lucide-react";

// // ============================================================
// // Helper Functions
// // ============================================================

// const getAllDescendants = (allServices, parentId) => {
//   let results = [];
//   const directChildren = allServices.filter(
//     (item) => item.parentId === parentId && item.isActive
//   );
//   for (const child of directChildren) {
//     results.push(child);
//     results.push(...getAllDescendants(allServices, child._id));
//   }
//   return results;
// };

// const isLeafService = (item, allServices) => {
//   return !allServices.some((s) => s.parentId === item._id && s.isActive);
// };

// const buildCategoryGroups = (services, categories, selectedCategory, showAllServices) => {
//   const getLeafServicesForCategory = (categoryId) => {
//     const descendants = getAllDescendants(services, categoryId);
//     return descendants.filter((item) => isLeafService(item, services));
//   };

//   if (showAllServices) {
//     return categories
//       .filter((cat) => cat._id !== "all-services")
//       .map((cat) => ({
//         id: cat._id,
//         categoryName: cat.name,
//         services: getLeafServicesForCategory(cat._id),
//       }))
//       .filter((group) => group.services.length > 0);
//   }

//   if (selectedCategory && selectedCategory._id !== "all-services") {
//     return [{
//       id: selectedCategory._id,
//       categoryName: selectedCategory.name,
//       services: getLeafServicesForCategory(selectedCategory._id),
//     }];
//   }
//   return [];
// };

// // ============================================================
// // Skeleton Loader
// // ============================================================
// const PremiumSkeleton = () => (
//   <div className="space-y-12">
//     <div className="flex flex-wrap gap-4 justify-center">
//       {[...Array(6)].map((_, i) => (
//         <div key={i} className="w-32 h-12 bg-amber-100/50 rounded-full animate-pulse" />
//       ))}
//     </div>
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//       {[...Array(6)].map((_, i) => (
//         <div key={i} className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden">
//           <div className="h-56 bg-gradient-to-br from-amber-50 to-stone-100 animate-pulse" />
//           <div className="p-6 space-y-3">
//             <div className="h-6 bg-amber-100 rounded w-3/4 animate-pulse" />
//             <div className="h-4 bg-stone-100 rounded w-full animate-pulse" />
//             <div className="h-4 bg-stone-100 rounded w-2/3 animate-pulse" />
//             <div className="flex justify-between pt-3">
//               <div className="h-6 bg-amber-100 rounded w-24 animate-pulse" />
//               <div className="h-6 bg-stone-100 rounded w-16 animate-pulse" />
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// // ============================================================
// // Main Component
// // ============================================================
// export default function ServiceCategories() {
//   const navigate = useNavigate();

//   const [services, setServices] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [showAllServices, setShowAllServices] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Fetch data
//   useEffect(() => {
//     const abortController = new AbortController();
//     const fetchServices = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(
//           "http://localhost:12000/client/send-services-client",
//           { signal: abortController.signal }
//         );
//         if (!res.ok) throw new Error("Unable to load services");
//         const result = await res.json();
//         if (result.success) {
//           const activeData = result.data.filter((item) => item.isActive);
//           setServices(activeData);
//           const dbCategories = activeData.filter(
//             (item) => item.type === "category" && item.parentId === null
//           );
//           const allCategory = { _id: "all-services", name: "All Services" };
//           setCategories([allCategory, ...dbCategories]);
//         } else {
//           throw new Error(result.message || "Failed to load");
//         }
//       } catch (err) {
//         if (err.name !== "AbortError") setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchServices();
//     return () => abortController.abort();
//   }, []);

//   const rawGroups = useMemo(() => {
//     if (!services.length) return [];
//     return buildCategoryGroups(services, categories, selectedCategory, showAllServices);
//   }, [services, categories, selectedCategory, showAllServices]);

//   const filteredGroups = useMemo(() => {
//     if (!searchQuery.trim()) return rawGroups;
//     const q = searchQuery.toLowerCase();
//     return rawGroups
//       .map((g) => ({
//         ...g,
//         services: g.services.filter(
//           (s) => s.name.toLowerCase().includes(q) || (s.description || "").toLowerCase().includes(q)
//         ),
//       }))
//       .filter((g) => g.services.length > 0);
//   }, [rawGroups, searchQuery]);

//   const totalServicesCount = useMemo(() => 
//     filteredGroups.reduce((acc, g) => acc + g.services.length, 0), [filteredGroups]
//   );

//   const handleCategoryClick = (category) => {
//     setSearchQuery("");
//     if (category._id === "all-services") {
//       setSelectedCategory(null);
//       setShowAllServices(true);
//     } else {
//       setSelectedCategory(category);
//       setShowAllServices(false);
//     }
//   };

//   const handleClearAll = () => {
//     setSelectedCategory(null);
//     setShowAllServices(true);
//     setSearchQuery("");
//   };

//   const getCategoryServiceCount = (category) => {
//     if (category._id === "all-services") {
//       const allGroups = buildCategoryGroups(services, categories, null, true);
//       return allGroups.reduce((acc, g) => acc + g.services.length, 0);
//     }
//     const descendants = getAllDescendants(services, category._id);
//     return descendants.filter((item) => isLeafService(item, services)).length;
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <section className="min-h-screen bg-gradient-to-b from-white to-amber-50/30 py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full text-amber-800 text-sm font-medium mb-4">
//               <Sparkles className="w-4 h-4" />
//               <span>Curated Excellence</span>
//             </div>
//             <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-stone-800">
//               Our Services
//             </h2>
//             <p className="text-stone-500 mt-3">Loading exceptional offerings...</p>
//           </div>
//           <PremiumSkeleton />
//         </div>
//       </section>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <section className="min-h-screen bg-gradient-to-b from-white to-amber-50/30 py-20">
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-rose-100 rounded-full mb-6">
//             <X className="w-10 h-10 text-rose-500" />
//           </div>
//           <h3 className="text-2xl font-serif text-stone-800 mb-2">Service Unavailable</h3>
//           <p className="text-stone-500 mb-6">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-6 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition shadow-sm"
//           >
//             Refresh
//           </button>
//         </div>
//       </section>
//     );
//   }

//   // Main render
//   return (
//     <section className="min-h-screen bg-gradient-to-b from-white via-white to-amber-50/20 py-16 md:py-24">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Hero Header */}
//         <div className="text-center mb-14">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="inline-flex items-center gap-2 px-5 py-2 bg-amber-50 rounded-full text-amber-700 text-sm font-medium mb-5 border border-amber-100"
//           >
//             <Award className="w-4 h-4" />
//             <span>Trusted by 10,000+ clients</span>
//           </motion.div>
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="text-4xl md:text-6xl font-serif font-semibold tracking-tight text-stone-800"
//           >
//             Our Service Catalogue
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="text-stone-500 mt-4 max-w-2xl mx-auto text-lg"
//           >
//             Handpicked premium services delivered with unparalleled expertise and care.
//           </motion.p>
//         </div>

//         {/* Search & Filter Bar */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="flex flex-col md:flex-row gap-5 justify-between items-center mb-12"
//         >
//           <div className="relative w-full md:w-96">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
//             <input
//               type="text"
//               placeholder="Search for a service..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-12 pr-4 py-3.5 bg-white border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-300/50 focus:border-amber-300 shadow-sm text-stone-700 placeholder-stone-400"
//             />
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery("")}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             )}
//           </div>
//           <button
//             onClick={handleClearAll}
//             className="flex items-center gap-2 px-6 py-3.5 bg-white border border-stone-200 rounded-full hover:bg-stone-50 hover:border-stone-300 transition text-stone-600 text-sm font-medium shadow-sm"
//           >
//             <X size={16} />
//             Reset filters
//           </button>
//         </motion.div>

//         {/* Categories */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="mb-14"
//         >
//           <div className="flex flex-wrap gap-3 justify-center md:justify-start">
//             {categories.map((cat, idx) => {
//               const isSelected =
//                 (cat._id === "all-services" && showAllServices) ||
//                 selectedCategory?._id === cat._id;
//               const count = getCategoryServiceCount(cat);
//               return (
//                 <motion.button
//                   key={cat._id}
//                   onClick={() => handleCategoryClick(cat)}
//                   whileHover={{ y: -2 }}
//                   whileTap={{ scale: 0.97 }}
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: idx * 0.02 }}
//                   className={`
//                     relative px-6 py-2.5 rounded-full font-medium transition-all duration-200
//                     ${isSelected 
//                       ? "bg-amber-600 text-white shadow-md shadow-amber-200" 
//                       : "bg-white text-stone-600 hover:bg-amber-50 border border-stone-200"
//                     }
//                   `}
//                 >
//                   <span className="flex items-center gap-2">
//                     {cat._id === "all-services" ? (
//                       <Layers className="w-4 h-4" />
//                     ) : (
//                       <ChevronRight className="w-4 h-4" />
//                     )}
//                     {cat.name}
//                     <span className={`
//                       text-xs px-2 py-0.5 rounded-full ml-1
//                       ${isSelected ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"}
//                     `}>
//                       {count}
//                     </span>
//                   </span>
//                 </motion.button>
//               );
//             })}
//           </div>
//         </motion.div>

//         {/* Results Info */}
//         {(searchQuery || !showAllServices) && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="flex items-center justify-between mb-8 pb-2 border-b border-amber-100"
//           >
//             <div className="flex items-center gap-2 text-sm text-stone-500">
//               <Sparkles className="w-4 h-4 text-amber-500" />
//               <span>
//                 {totalServicesCount} {totalServicesCount === 1 ? "result" : "results"}
//                 {searchQuery && ` for “${searchQuery}”`}
//                 {!showAllServices && selectedCategory && ` in ${selectedCategory.name}`}
//               </span>
//             </div>
//           </motion.div>
//         )}

//         {/* Services Grid */}
//         <AnimatePresence mode="wait">
//           {filteredGroups.length === 0 ? (
//             <motion.div
//               key="empty"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="text-center py-20 bg-white/60 rounded-3xl border border-amber-100"
//             >
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-50 rounded-full mb-4">
//                 <Search className="w-8 h-8 text-amber-400" />
//               </div>
//               <h3 className="text-xl font-serif text-stone-700 mb-1">No services found</h3>
//               <p className="text-stone-400">Please try a different category or search term</p>
//               <button
//                 onClick={handleClearAll}
//                 className="mt-6 px-6 py-2 bg-amber-50 text-amber-700 rounded-full hover:bg-amber-100 transition"
//               >
//                 Clear filters
//               </button>
//             </motion.div>
//           ) : (
//             <motion.div
//               key="results"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="space-y-16"
//             >
//               {filteredGroups.map((group, groupIdx) => (
//                 <motion.div
//                   key={group.id || groupIdx}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: groupIdx * 0.08 }}
//                 >
//                   {/* Category Header with luxury accent */}
//                   <div className="flex items-center gap-4 mb-8">
//                     <div className="w-10 h-0.5 bg-amber-300 rounded-full" />
//                     <h2 className="text-2xl md:text-3xl font-serif font-medium tracking-wide text-stone-800">
//                       {group.categoryName}
//                     </h2>
//                     <div className="w-10 h-0.5 bg-amber-300 rounded-full" />
//                     <span className="text-sm text-stone-400 ml-auto">
//                       {group.services.length} offerings
//                     </span>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {group.services.map((service, idx) => (
//                       <motion.div
//                         key={service._id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: idx * 0.05 }}
//                         whileHover={{ y: -6 }}
//                         onClick={() => navigate(`/service/${service._id}`)}
//                         className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-amber-100/80 overflow-hidden cursor-pointer transition-all duration-300"
//                       >
//                         {/* Image with refined overlay */}
//                         <div className="relative h-56 overflow-hidden bg-gradient-to-br from-stone-100 to-amber-50">
//                           <img
//                             src={
//                               service.images?.[0] ||
//                               "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&auto=format"
//                             }
//                             alt={service.name}
//                             className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
//                             onError={(e) => {
//                               e.target.onerror = null;
//                               e.target.src = "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&auto=format";
//                             }}
//                           />
//                           {/* Trust badge */}
//                           <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-amber-700 shadow-sm">
//                             <span className="flex items-center gap-1">
//                               <ShieldCheck className="w-3 h-3" />
//                               Verified
//                             </span>
//                           </div>
//                           {service.rating >= 4.5 && (
//                             <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
//                               Premium
//                             </div>
//                           )}
//                           <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
//                         </div>

//                         <div className="p-6">
//                           <h3 className="font-serif text-xl font-semibold text-stone-800 group-hover:text-amber-700 transition line-clamp-1">
//                             {service.name}
//                           </h3>
//                           <p className="text-stone-500 text-sm mt-2 leading-relaxed line-clamp-2">
//                             {service.description || "Exceptional service tailored to your needs."}
//                           </p>
                          
//                           <div className="flex justify-between items-center mt-5 pt-4 border-t border-stone-100">
//                             <div>
//                               <span className="text-xs text-stone-400 uppercase tracking-wide">from</span>
//                               <p className="font-serif text-2xl font-semibold text-amber-700">
//                                 {service.price ? `₹${service.price.toLocaleString()}` : "Custom"}
//                               </p>
//                             </div>
//                             <div className="flex items-center gap-1.5 bg-stone-50 px-3 py-1.5 rounded-full">
//                               <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
//                               <span className="text-sm font-medium text-stone-700">
//                                 {service.rating || "4.8"}
//                               </span>
//                               <span className="text-xs text-stone-400">
//                                 ({service.totalReviews || 128})
//                               </span>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Elegant hover arrow */}
//                         <div className="absolute bottom-6 right-6 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
//                           <ArrowRight className="w-4 h-4 text-amber-700" />
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Trust Footer */}
//         <div className="mt-24 pt-8 border-t border-amber-100">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//             <div className="flex flex-col items-center gap-2">
//               <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center">
//                 <ShieldCheck className="w-6 h-6 text-amber-600" />
//               </div>
//               <p className="font-medium text-stone-700">100% Satisfaction</p>
//               <p className="text-sm text-stone-400">Quality assured, vetted professionals</p>
//             </div>
//             <div className="flex flex-col items-center gap-2">
//               <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center">
//                 <Clock className="w-6 h-6 text-amber-600" />
//               </div>
//               <p className="font-medium text-stone-700">On-Time Delivery</p>
//               <p className="text-sm text-stone-400">Punctual and reliable service</p>
//             </div>
//             <div className="flex flex-col items-center gap-2">
//               <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center">
//                 <CreditCard className="w-6 h-6 text-amber-600" />
//               </div>
//               <p className="font-medium text-stone-700">Secure Payments</p>
//               <p className="text-sm text-stone-400">Protected transactions, total peace of mind</p>
//             </div>
//           </div>
//           <p className="text-center text-stone-400 text-sm mt-8">
//             © {new Date().getFullYear()} — Premium Service Catalogue. Exclusively curated.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }


// import { useState, useEffect, useMemo } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { useNavigate } from "react-router-dom";
// import { 
//   X, 
//   Search, 
//   Star, 
//   Sparkles, 
//   Layers, 
//   ChevronRight,
//   ShieldCheck,
//   Award,
//   Clock,
//   CreditCard,
//   ArrowRight,
//   Gem,
//   ThumbsUp,
//   Headphones,
//   Building2,
//   Quote
// } from "lucide-react";



// const getAllDescendants = (allServices, parentId) => {
//   let results = [];
//   const directChildren = allServices.filter(
//     (item) => item.parentId === parentId && item.isActive
//   );
//   for (const child of directChildren) {
//     results.push(child);
//     results.push(...getAllDescendants(allServices, child._id));
//   }
//   return results;
// };

// const isLeafService = (item, allServices) => {
//   return !allServices.some((s) => s.parentId === item._id && s.isActive);
// };

// const buildCategoryGroups = (services, categories, selectedCategory, showAllServices) => {
//   const getLeafServicesForCategory = (categoryId) => {
//     const descendants = getAllDescendants(services, categoryId);
//     return descendants.filter((item) => isLeafService(item, services));
//   };

//   if (showAllServices) {
//     return categories
//       .filter((cat) => cat._id !== "all-services")
//       .map((cat) => ({
//         id: cat._id,
//         categoryName: cat.name,
//         services: getLeafServicesForCategory(cat._id),
//       }))
//       .filter((group) => group.services.length > 0);
//   }

//   if (selectedCategory && selectedCategory._id !== "all-services") {
//     return [{
//       id: selectedCategory._id,
//       categoryName: selectedCategory.name,
//       services: getLeafServicesForCategory(selectedCategory._id),
//     }];
//   }
//   return [];
// };


// const PremiumSkeleton = () => (
//   <div className="space-y-16">
//     <div className="flex flex-wrap gap-4 justify-center">
//       {[...Array(6)].map((_, i) => (
//         <div key={i} className="w-36 h-12 bg-gradient-to-r from-amber-100/50 to-stone-100/50 rounded-full animate-pulse" />
//       ))}
//     </div>
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//       {[...Array(6)].map((_, i) => (
//         <div key={i} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-amber-100/50 overflow-hidden">
//           <div className="h-60 bg-gradient-to-br from-amber-50/50 to-stone-100/50 animate-pulse" />
//           <div className="p-6 space-y-4">
//             <div className="h-6 bg-amber-100/50 rounded w-3/4 animate-pulse" />
//             <div className="h-4 bg-stone-100 rounded w-full animate-pulse" />
//             <div className="h-4 bg-stone-100 rounded w-2/3 animate-pulse" />
//             <div className="flex justify-between pt-3">
//               <div className="h-7 bg-amber-100/50 rounded w-28 animate-pulse" />
//               <div className="h-7 bg-stone-100 rounded w-20 animate-pulse" />
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );


// export default function ServiceCategories() {
//   const navigate = useNavigate();

//   const [services, setServices] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [showAllServices, setShowAllServices] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [hoveredService, setHoveredService] = useState(null);

//   // Fetch data
//   useEffect(() => {
//     const abortController = new AbortController();
//     const fetchServices = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(
//           "http://localhost:12000/client/send-services-client",
//           { signal: abortController.signal }
//         );
//         if (!res.ok) throw new Error("Unable to load services");
//         const result = await res.json();
//         if (result.success) {
//           const activeData = result.data.filter((item) => item.isActive);
//           setServices(activeData);
//           const dbCategories = activeData.filter(
//             (item) => item.type === "category" && item.parentId === null
//           );
//           const allCategory = { _id: "all-services", name: "All Services" };
//           setCategories([allCategory, ...dbCategories]);
//         } else {
//           throw new Error(result.message || "Failed to load");
//         }
//       } catch (err) {
//         if (err.name !== "AbortError") setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchServices();
//     return () => abortController.abort();
//   }, []);

//   const rawGroups = useMemo(() => {
//     if (!services.length) return [];
//     return buildCategoryGroups(services, categories, selectedCategory, showAllServices);
//   }, [services, categories, selectedCategory, showAllServices]);

//   const filteredGroups = useMemo(() => {
//     if (!searchQuery.trim()) return rawGroups;
//     const q = searchQuery.toLowerCase();
//     return rawGroups
//       .map((g) => ({
//         ...g,
//         services: g.services.filter(
//           (s) => s.name.toLowerCase().includes(q) || (s.description || "").toLowerCase().includes(q)
//         ),
//       }))
//       .filter((g) => g.services.length > 0);
//   }, [rawGroups, searchQuery]);

//   const totalServicesCount = useMemo(() => 
//     filteredGroups.reduce((acc, g) => acc + g.services.length, 0), [filteredGroups]
//   );

//   const handleCategoryClick = (category) => {
//     setSearchQuery("");
//     if (category._id === "all-services") {
//       setSelectedCategory(null);
//       setShowAllServices(true);
//     } else {
//       setSelectedCategory(category);
//       setShowAllServices(false);
//     }
//   };

//   const handleClearAll = () => {
//     setSelectedCategory(null);
//     setShowAllServices(true);
//     setSearchQuery("");
//   };

//   const getCategoryServiceCount = (category) => {
//     if (category._id === "all-services") {
//       const allGroups = buildCategoryGroups(services, categories, null, true);
//       return allGroups.reduce((acc, g) => acc + g.services.length, 0);
//     }
//     const descendants = getAllDescendants(services, category._id);
//     return descendants.filter((item) => isLeafService(item, services)).length;
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/10 to-stone-50/40 py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full text-amber-700 text-sm font-medium mb-6 border border-amber-200/50">
//               <Gem className="w-4 h-4" />
//               <span>Exceptional Services</span>
//             </div>
//             <h2 className="text-5xl md:text-6xl font-serif font-light tracking-tight text-stone-800">
//               Curated Excellence
//             </h2>
//             <div className="w-24 h-0.5 bg-amber-300 mx-auto mt-6" />
//             <p className="text-stone-500 mt-6 max-w-md mx-auto">Loading our premium catalogue...</p>
//           </div>
//           <PremiumSkeleton />
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-white to-stone-50 py-20">
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <div className="inline-flex items-center justify-center w-24 h-24 bg-amber-50 rounded-full mb-6">
//             <Building2 className="w-12 h-12 text-amber-500" />
//           </div>
//           <h3 className="text-2xl font-serif text-stone-800 mb-2">Service Unavailable</h3>
//           <p className="text-stone-500 mb-6 max-w-md mx-auto">
//             We're experiencing technical difficulties. Our team has been notified.
//           </p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-8 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition shadow-md shadow-amber-200"
//           >
//             Refresh Page
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/5 to-stone-50/30">
//       {/* Decorative abstract shapes */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/20 rounded-full blur-3xl" />
//         <div className="absolute bottom-0 left-0 w-80 h-80 bg-stone-100/30 rounded-full blur-3xl" />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
//         {/* Hero Section */}
//         <div className="text-center mb-16">
         
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="text-4xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight text-stone-800"
//           >
//             Our Service Catalogue
//           </motion.h1>
//           <motion.div
//             initial={{ width: 0 }}
//             animate={{ width: "80px" }}
//             transition={{ delay: 0.2, duration: 0.6 }}
//             className="h-0.5 bg-gradient-to-r from-amber-300 to-amber-500 mx-auto mt-6"
//           />
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="text-stone-500 mt-6 max-w-2xl mx-auto text-lg leading-relaxed"
//           >
//             Discover meticulously curated premium services, delivered with unwavering quality and discretion.
//           </motion.p>
//         </div>

//         {/* Trust Indicators Row */}
       

//         {/* Search & Filter */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//           className="flex flex-col md:flex-row gap-5 justify-between items-center mb-12"
//         >
//           <div className="relative w-full md:w-96">
//             <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
//             <input
//               type="text"
//               placeholder="Search for a service..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-12 pr-5 py-4 bg-white/70 backdrop-blur-sm border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-300/60 focus:border-amber-300 shadow-sm text-stone-700 placeholder-stone-400 transition"
//             />
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery("")}
//                 className="absolute right-5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             )}
//           </div>
//           <button
//             onClick={handleClearAll}
//             className="flex items-center gap-2 px-6 py-4 bg-white/70 backdrop-blur-sm border border-stone-200 rounded-full hover:bg-stone-50 hover:border-stone-300 transition text-stone-600 text-sm font-medium shadow-sm"
//           >
//             <X size={16} />
//             Reset Filters
//           </button>
//         </motion.div>

//         {/* Categories */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6 }}
//           className="mb-16"
//         >
//           <div className="flex flex-wrap gap-3 justify-center md:justify-start">
//             {categories.map((cat, idx) => {
//               const isSelected =
//                 (cat._id === "all-services" && showAllServices) ||
//                 selectedCategory?._id === cat._id;
//               const count = getCategoryServiceCount(cat);
//               return (
//                 <motion.button
//                   key={cat._id}
//                   onClick={() => handleCategoryClick(cat)}
//                   whileHover={{ y: -3 }}
//                   whileTap={{ scale: 0.97 }}
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: idx * 0.02 }}
//                   className={`
//                     relative px-7 py-2.5 rounded-full font-medium transition-all duration-300
//                     ${isSelected 
//                       ? "bg-amber-600 text-white shadow-lg shadow-amber-200/50" 
//                       : "bg-white/60 backdrop-blur-sm text-stone-600 hover:bg-amber-50 border border-stone-200"
//                     }
//                   `}
//                 >
//                   <span className="flex items-center gap-2">
//                     {cat._id === "all-services" ? (
//                       <Layers className="w-4 h-4" />
//                     ) : (
//                       <ChevronRight className="w-4 h-4" />
//                     )}
//                     {cat.name}
//                     <span className={`
//                       text-xs px-2 py-0.5 rounded-full ml-1
//                       ${isSelected ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"}
//                     `}>
//                       {count}
//                     </span>
//                   </span>
//                 </motion.button>
//               );
//             })}
//           </div>
//         </motion.div>

//         {/* Results Count */}
//         {(searchQuery || !showAllServices) && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="flex items-center justify-between mb-8 pb-3 border-b border-amber-100/50"
//           >
//             <div className="flex items-center gap-2 text-sm text-stone-500">
//               <Sparkles className="w-4 h-4 text-amber-500" />
//               <span className="tracking-wide">
//                 {totalServicesCount} exquisite {totalServicesCount === 1 ? "service" : "services"}
//                 {searchQuery && ` matching “${searchQuery}”`}
//                 {!showAllServices && selectedCategory && ` in ${selectedCategory.name}`}
//               </span>
//             </div>
//           </motion.div>
//         )}

//         {/* Services Grid */}
//         <AnimatePresence mode="wait">
//           {filteredGroups.length === 0 ? (
//             <motion.div
//               key="empty"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="text-center py-28 bg-white/40 backdrop-blur-sm rounded-3xl border border-amber-100/50"
//             >
//               <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-50 rounded-full mb-5">
//                 <Search className="w-10 h-10 text-amber-400" />
//               </div>
//               <h3 className="text-2xl font-serif text-stone-700 mb-2">No services found</h3>
//               <p className="text-stone-400 max-w-sm mx-auto">
//                 Please refine your selection or explore other categories.
//               </p>
//               <button
//                 onClick={handleClearAll}
//                 className="mt-6 px-7 py-2.5 bg-amber-50 text-amber-700 rounded-full hover:bg-amber-100 transition font-medium"
//               >
//                 Browse all services
//               </button>
//             </motion.div>
//           ) : (
//             <motion.div
//               key="results"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="space-y-20"
//             >
//               {filteredGroups.map((group, groupIdx) => (
//                 <motion.div
//                   key={group.id || groupIdx}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: groupIdx * 0.1 }}
//                 >
//                   {/* Category Header */}
//                   <div className="flex items-center gap-5 mb-10">
//                     <div className="w-12 h-0.5 bg-amber-300/70 rounded-full" />
//                     <h2 className="text-2xl md:text-3xl font-serif font-light tracking-wide text-stone-800">
//                       {group.categoryName}
//                     </h2>
//                     <div className="flex-1 h-0.5 bg-gradient-to-r from-amber-300/70 to-transparent rounded-full" />
//                     <span className="text-sm text-stone-400 font-mono">
//                       {group.services.length} offerings
//                     </span>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {group.services.map((service, idx) => (
//                       <motion.div
//                         key={service._id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: idx * 0.05 }}
//                         whileHover={{ y: -8 }}
//                         onHoverStart={() => setHoveredService(service._id)}
//                         onHoverEnd={() => setHoveredService(null)}
//                         onClick={() => navigate(`/service/${service._id}`)}
//                         className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-amber-100/60 overflow-hidden cursor-pointer transition-all duration-500"
//                       >
//                         {/* Image Container */}
//                         <div className="relative h-64 overflow-hidden bg-gradient-to-br from-stone-100 to-amber-50/30">
//                           <img
//                             src={
//                               service.images?.[0] ||
//                               "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&auto=format"
//                             }
//                             alt={service.name}
//                             className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
//                             onError={(e) => {
//                               e.target.onerror = null;
//                               e.target.src = "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&auto=format";
//                             }}
//                           />
//                           {/* Hover overlay */}
//                           <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                          
//                           {/* Premium Badges */}
                          
                         
//                         </div>

//                         <div className="p-6">
//                           <h3 className="font-serif text-xl font-medium text-stone-800 group-hover:text-amber-700 transition line-clamp-1">
//                             {service.name}
//                           </h3>
//                           <p className="text-stone-500 text-sm mt-2 leading-relaxed line-clamp-2">
//                             {service.description || "Exceptional service crafted to exceed expectations."}
//                           </p>
                          
//                           <div className="flex justify-between items-center mt-5 pt-4 border-t border-stone-100">
//                             <div>
//                               <span className="text-xs text-stone-400 uppercase tracking-wider">Investment from</span>
//                               <p className="font-serif text-2xl font-semibold text-amber-700">
//                                 {service.price ? `₹${service.price.toLocaleString()}` : "Custom Quote"}
//                               </p>
//                             </div>
//                             <div className="flex items-center gap-1.5 bg-stone-50/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
//                               <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
//                               <span className="text-sm font-medium text-stone-700">
//                                 {service.rating || "4.9"}
//                               </span>
//                               <span className="text-xs text-stone-400">
//                                 ({service.totalReviews || 247})
//                               </span>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Elegant Arrow on Hover */}
//                         <motion.div
//                           initial={{ opacity: 0, x: 10 }}
//                           animate={{ 
//                             opacity: hoveredService === service._id ? 1 : 0,
//                             x: hoveredService === service._id ? 0 : 10
//                           }}
//                           transition={{ duration: 0.2 }}
//                           className="absolute bottom-6 right-6 w-9 h-9 bg-amber-100 rounded-full flex items-center justify-center shadow-sm"
//                         >
//                           <ArrowRight className="w-4 h-4 text-amber-700" />
//                         </motion.div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Trust Footer with Client Quote */}
//         <div className="mt-28 pt-12 border-t border-amber-100/50">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//             <div className="text-center">
//               <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <ShieldCheck className="w-7 h-7 text-amber-600" />
//               </div>
//               <h4 className="font-serif text-lg text-stone-800 mb-1">Rigorous Vetting</h4>
//               <p className="text-stone-400 text-sm">Every expert undergoes a 5-step verification</p>
//             </div>
//             <div className="text-center">
//               <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Clock className="w-7 h-7 text-amber-600" />
//               </div>
//               <h4 className="font-serif text-lg text-stone-800 mb-1">Guaranteed Punctuality</h4>
//               <p className="text-stone-400 text-sm">On-time delivery or your money back</p>
//             </div>
//             <div className="text-center">
//               <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <CreditCard className="w-7 h-7 text-amber-600" />
//               </div>
//               <h4 className="font-serif text-lg text-stone-800 mb-1">100% Secure</h4>
//               <p className="text-stone-400 text-sm">Bank-grade encryption & fraud protection</p>
//             </div>
//           </div>

//           {/* Testimonial */}
          
         
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  Gem,
  Building2,
  Bug,
  Wrench,
  Paintbrush,
  Home,
  ChefHat,
  Smartphone,
  Zap,
  Fan,
  X,
  Search,
  Star,
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck,
  Clock,
  CreditCard,
  ArrowRight,
  Users,
  Leaf,
  Bath,
  Armchair,
  Grid2x2,
  BrushCleaning,
  Building,
  BedDouble
} from "lucide-react";
import HeroSection from "../services/Hero"
import API from "../../api/axios";

// ============================================================
// Icon Mapping
// ============================================================
const getCategoryIcon = (categoryName) => {
  const name = categoryName.toLowerCase();
  if (name.includes('villa') || name.includes('house')) return <Home className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
  if (name.includes('duplex')) return <Building2 className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
  if (name.includes('kitchen')) return <ChefHat className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
  if (name.includes('pest')) return <Bug className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
  if (name.includes('repair')) return <Wrench className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
  if (name.includes('paint')) return <Paintbrush className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
  if (name.includes('electric')) return <Zap className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
  if (name.includes('bathroom')) return <Bath className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
  if (name.includes('sofa')) return <Armchair className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
  //if (name.includes('cleaning')) return <Sparkles className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
  if (name.includes('window')) return <Grid2x2 className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
  if (name.includes('office')) return <Building className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
  if (name.includes('mattress')) return <BedDouble className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
  return <Building2 className="w-8 h-8 text-emerald-800" strokeWidth={1.5} />;
};

const getBadge = (index) => {
  const badges = [
    { text: "Trusted Professionals", icon: <ShieldCheck className="w-4 h-4 text-white" /> },
    { text: "Expert Team", icon: <Users className="w-4 h-4 text-white" /> },
    { text: "Deep Clean Assurance", icon: <Sparkles className="w-4 h-4 text-white" /> }
  ];
  return badges[index % badges.length];
};

// ============================================================
// Helper Functions
// ============================================================

const getAllDescendants = (allServices, parentId) => {
  let results = [];
  const directChildren = allServices.filter(
    (item) => item.parentId === parentId && item.isActive
  );
  for (const child of directChildren) {
    results.push(child);
    results.push(...getAllDescendants(allServices, child._id));
  }
  return results;
};

const isLeafService = (item, allServices) => {
  return !allServices.some((s) => s.parentId === item._id && s.isActive);
};

const buildCategoryGroups = (services, categories, selectedCategory, showAllServices) => {
  const getLeafServicesForCategory = (categoryId) => {
    const descendants = getAllDescendants(services, categoryId);
    return descendants.filter((item) => isLeafService(item, services));
  };

  if (showAllServices) {
    return categories
      .filter((cat) => cat._id !== "all-services")
      .map((cat) => ({
        id: cat._id,
        categoryName: cat.name,
        services: getLeafServicesForCategory(cat._id),
      }))
      .filter((group) => group.services.length > 0);
  }

  if (selectedCategory && selectedCategory._id !== "all-services") {
    return [{
      id: selectedCategory._id,
      categoryName: selectedCategory.name,
      services: getLeafServicesForCategory(selectedCategory._id),
    }];
  }
  return [];
};

// Helper: Extract display info from service options
const getServicePriceInfo = (service) => {
  // If direct price exists and no options
  if (service.price !== null && service.price !== undefined && (!service.options || service.options.length === 0)) {
    return { type: "fixed", price: service.price, minPrice: service.price, variants: null };
  }

  // If options exist
  if (service.options && service.options.length > 0) {
    // Collect all unique option value labels and find min price
    let allVariantLabels = [];
    let minPrice = Infinity;

    for (const opt of service.options) {
      if (opt.values && Array.isArray(opt.values)) {
        for (const val of opt.values) {
          if (val.label) allVariantLabels.push(val.label);
          if (val.price !== undefined && val.price !== null && val.price < minPrice) {
            minPrice = val.price;
          }
        }
      }
    }

    // Remove duplicates while preserving order
    const uniqueLabels = [...new Map(allVariantLabels.map(l => [l, l])).values()];
    
    // Truncate for display (first 3 unique variant names)
    let displayVariants = uniqueLabels.slice(0, 3);
    let extraCount = uniqueLabels.length - 3;
    
    return {
      type: "options",
      minPrice: minPrice !== Infinity ? minPrice : null,
      variants: uniqueLabels,
      displayVariants,
      extraCount,
    };
  }

  // No price and no options
  return { type: "custom", price: null, minPrice: null, variants: null };
};

// ============================================================
// Premium Skeleton Loader
// ============================================================
const PremiumSkeleton = () => (
  <div className="space-y-16">
    <div className="flex flex-wrap gap-4 justify-center">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="w-36 h-12 bg-gradient-to-r from-amber-100/50 to-stone-100/50 rounded-full animate-pulse" />
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-amber-100/50 overflow-hidden">
          <div className="h-60 bg-gradient-to-br from-amber-50/50 to-stone-100/50 animate-pulse" />
          <div className="p-6 space-y-4">
            <div className="h-6 bg-amber-100/50 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-stone-100 rounded w-full animate-pulse" />
            <div className="h-4 bg-stone-100 rounded w-2/3 animate-pulse" />
            <div className="flex justify-between pt-3">
              <div className="h-7 bg-amber-100/50 rounded w-28 animate-pulse" />
              <div className="h-7 bg-stone-100 rounded w-20 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ============================================================
// Main Component
// ============================================================




export default function ServiceCategories({ hideHero = false }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAllServices, setShowAllServices] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || "");
  const [hoveredService, setHoveredService] = useState(null);

  // Sync with URL parameter
  useEffect(() => {
    const query = searchParams.get('q');
    if (query !== null) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  // Fetch data
  // useEffect(() => {
  //   const abortController = new AbortController();
  //   const fetchServices = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await API.get("/client/send-services-client", {
  //         signal: abortController.signal,
  //       });
  //       const result = response.data;
  //       if (result.success) {
  //         const activeData = result.data.filter((item) => item.isActive);
  //         setServices(activeData);
  //         const dbCategories = activeData.filter(
  //           (item) => item.type === "category" && item.parentId === null
  //         );
  //         const allCategory = { _id: "all-services", name: "All Services" };
  //         setCategories([allCategory, ...dbCategories]);
  //       } else {
  //         throw new Error(result.message || "Failed to load");
  //       }
  //     } catch (err) {
  //       if (err.name !== "AbortError") setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchServices();
  //   return () => abortController.abort();
  // }, []);

  //  useEffect(() => {
  //   const abortController = new AbortController();
  //   const fetchServices = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await fetch(
  //        "http://localhost:12000/client/send-services-client",
  //        // "https://server.mkhomeservice.in/client/send-services-client",
  //         { signal: abortController.signal }
  //       );
  //       if (!res.ok) throw new Error("Unable to load services");
  //       const result = await res.json();
  //       if (result.success) {
  //         const activeData = result.data.filter((item) => item.isActive);
  //         setServices(activeData);
  //         const dbCategories = activeData.filter(
  //           (item) => item.type === "category" && item.parentId === null
  //         );
  //         const allCategory = { _id: "all-services", name: "All Services" };
  //         setCategories([allCategory, ...dbCategories]);
  //       } else {
  //         throw new Error(result.message || "Failed to load");
  //       }
  //     } catch (err) {
  //       if (err.name !== "AbortError") setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchServices();
  //   return () => abortController.abort();
  // }, []);

useEffect(() => {
  const fetchServices = async () => {
    try {
      setLoading(true);

      const response = await API.get(
        "/client/send-services-client"
      );

      const result = response.data;

      if (result.success) {
        const activeData = result.data.filter(
          (item) => item.isActive
        );

        setServices(activeData);

        const dbCategories = activeData.filter(
          (item) =>
            item.type === "category" &&
            item.parentId === null
        );

        setCategories([
          {
            _id: "all-services",
            name: "All Services",
          },
          ...dbCategories,
        ]);
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchServices();
}, []);
  
  const rawGroups = useMemo(() => {
    if (!services.length) return [];
    return buildCategoryGroups(services, categories, selectedCategory, showAllServices);
  }, [services, categories, selectedCategory, showAllServices]);

  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return rawGroups;
    const q = searchQuery.toLowerCase();
    return rawGroups
      .map((g) => ({
        ...g,
        services: g.services.filter(
          (s) => s.name.toLowerCase().includes(q) || (s.description || "").toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.services.length > 0);
  }, [rawGroups, searchQuery]);

  const totalServicesCount = useMemo(() => 
    filteredGroups.reduce((acc, g) => acc + g.services.length, 0), [filteredGroups]
  );

  const handleCategoryClick = (category) => {
    setSearchQuery("");
    if (category._id === "all-services") {
      setSelectedCategory(null);
      setShowAllServices(true);
    } else {
      setSelectedCategory(category);
      setShowAllServices(false);
    }
  };

  const handleClearAll = () => {
    setSelectedCategory(null);
    setShowAllServices(true);
    setSearchQuery("");
  };

  const getCategoryServiceCount = (category) => {
    if (category._id === "all-services") {
      const allGroups = buildCategoryGroups(services, categories, null, true);
      return allGroups.reduce((acc, g) => acc + g.services.length, 0);
    }
    const descendants = getAllDescendants(services, category._id);
    return descendants.filter((item) => isLeafService(item, services)).length;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/10 to-stone-50/40 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full text-amber-700 text-sm font-medium mb-6 border border-amber-200/50">
              <Gem className="w-4 h-4" />
              <span>Exceptional Services</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif font-light tracking-tight text-stone-800">
              Curated Excellence
            </h2>
            <div className="w-24 h-0.5 bg-amber-300 mx-auto mt-6" />
            <p className="text-stone-500 mt-6 max-w-md mx-auto">Loading our premium catalogue...</p>
          </div>
          <PremiumSkeleton />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-stone-50 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-amber-50 rounded-full mb-6">
            <Building2 className="w-12 h-12 text-amber-500" />
          </div>
          <h3 className="text-2xl font-serif text-stone-800 mb-2">Service Unavailable</h3>
          <p className="text-stone-500 mb-6 max-w-md mx-auto">
            We're experiencing technical difficulties. Our team has been notified.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition shadow-md shadow-amber-200"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-white via-amber-50/5 to-stone-50/30"
    >
      {/* Decorative abstract shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-stone-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        {/* Hero Section */}
        {!hideHero && <HeroSection />}

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row gap-5 justify-between items-center mb-12"
        >
          <div className="relative w-full md:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
            <input
              type="text"
              placeholder="Search for a service..."
              value={searchQuery}
              onChange={(e) => {
                const val = e.target.value;
                setSearchQuery(val);
                if (val.trim()) {
                  setSearchParams({ q: val.trim() });
                } else {
                  setSearchParams({});
                }
              }}
              className="w-full pl-12 pr-5 py-3 md:py-4 bg-white/70 backdrop-blur-sm border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-300/60 focus:border-amber-300 shadow-sm text-stone-700 placeholder-stone-400 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={handleClearAll}
            className="flex flex-row hidden md:flex items-center gap-2 px-6 py-4 bg-white/70 backdrop-blur-sm border border-stone-200 rounded-full hover:bg-stone-50 hover:border-stone-300 transition text-stone-600 text-sm font-medium shadow-sm"
          >
            <X size={16} />
            Reset Filters
          </button>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-10 md:mb-16"
        >
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
            {categories.map((cat, idx) => {
              const isSelected =
                (cat._id === "all-services" && showAllServices) ||
                selectedCategory?._id === cat._id;
              const count = getCategoryServiceCount(cat);
              return (
                <motion.button
                  key={cat._id}
                  onClick={() => handleCategoryClick(cat)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.02 }}
                  className={`
                    relative md:text-sm text-xs md:px-7 px-2 md:py-2.5 py-1 rounded-full md:font-medium font-light transition-all duration-300
                    ${isSelected 
                      ? "bg-amber-600 text-white shadow-lg shadow-amber-200/50" 
                      : "bg-white/60 backdrop-blur-sm text-stone-600 hover:bg-amber-50 border border-stone-200"
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    {cat._id === "all-services" ? (
                      <Layers className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    {cat.name}
                    <span className={`
                      text-xs px-2 py-0.5 rounded-full ml-1
                      ${isSelected ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"}
                    `}>
                      {count}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Results Count */}
        {(searchQuery || !showAllServices) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between mb-8 pb-3 border-b border-amber-100/50"
          >
            <div className="flex items-center gap-2 text-sm text-stone-500">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="tracking-wide">
                {totalServicesCount} exquisite {totalServicesCount === 1 ? "service" : "services"}
                {searchQuery && ` matching “${searchQuery}”`}
                {!showAllServices && selectedCategory && ` in ${selectedCategory.name}`}
              </span>
            </div>
          </motion.div>
        )}

        {/* Services Grid */}
        <AnimatePresence mode="wait">
          {filteredGroups.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-28 bg-white/40 backdrop-blur-sm rounded-3xl border border-amber-100/50"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-50 rounded-full mb-5">
                <Search className="w-10 h-10 text-amber-400" />
              </div>
              <h3 className="text-2xl font-serif text-stone-700 mb-2">No services found</h3>
              <p className="text-stone-400 max-w-sm mx-auto">
                Please refine your selection or explore other categories.
              </p>
              <button
                onClick={handleClearAll}
                className="mt-6 px-7 py-2.5 bg-amber-50 text-amber-700 rounded-full hover:bg-amber-100 transition font-medium"
              >
                Browse all services
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-20"
            >
              {filteredGroups.map((group, groupIdx) => (
                <motion.div
                  key={group.id || groupIdx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: groupIdx * 0.1 }}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-5 mb-10">
                    <div className="w-12 h-0.5 bg-amber-300/70 rounded-full" />
                    <h2 className="text-xl md:text-3xl font-serif font-light tracking-wide text-stone-800">
                      {group.categoryName}
                    </h2>
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-amber-300/70 to-transparent rounded-full" />
                    <span className="text-sm text-stone-400 font-mono">
                      {group.services.length} offerings
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {group.services.map((service, idx) => {
                      const priceInfo = getServicePriceInfo(service);
                      const badge = getBadge(idx);
                      return (
                        <motion.div
                          key={service._id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ y: -8 }}
                          onHoverStart={() => setHoveredService(service._id)}
                          onHoverEnd={() => setHoveredService(null)}
                          onClick={() => navigate(`/service/${service._id}`)}
                          className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden cursor-pointer transition-all duration-500 max-w-sm mx-auto w-full flex flex-col h-full"
                        >
                          {/* Image Container */}
                          <div className="relative h-64 overflow-hidden shrink-0">
                            <img
                              src={service.images?.[0] || "https://images.unsplash.com/photo-1581578731548-c64695cc6954?q=80&w=2070&auto=format&fit=crop"}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            {/* Dynamic Badge */}
                            <div className="absolute top-4 right-4 bg-[#2d4a43] text-white rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-lg opacity-90">
                              {badge.icon}
                              <span className="text-[10px] font-bold tracking-tight">{badge.text}</span>
                            </div>
                          </div>

                          {/* Floating Category Icon */}
                          <div className="absolute top-[14rem] left-6 w-16 h-16 bg-[#f8fafc] rounded-2xl flex items-center justify-center border-4 border-white shadow-md z-10">
                            {getCategoryIcon(service.name || group.categoryName)}
                          </div>

                          <div className="px-6 pt-10 pb-6 flex-1 flex flex-col">
                            <div className="mb-4">
                              <h3 className="text-xl font-bold text-[#1f2937] leading-tight">
                                {service.name}
                              </h3>
                              <div className="w-10 h-[3px] bg-[#fbbf24] mt-3" />
                            </div>

                            <p className="text-gray-500 text-[13px] leading-relaxed mb-6 line-clamp-2 min-h-[40px]">
                              {service.description || "Comprehensive professional service tailored to your specific needs and ensuring a healthier environment."}
                            </p>

                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-50">
                              <div className="space-y-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                  Starting From
                                </span>
                                <div className="text-3xl font-bold text-[#0a3622]">
                                  ₹{priceInfo.minPrice ? priceInfo.minPrice.toLocaleString() : 'N/A'}
                                </div>
                              </div>
                              <div className="flex items-center gap-1 bg-[#f9fafb] px-3 py-1.5 rounded-full border border-gray-100">
                                <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                                <span className="text-sm font-bold text-[#374151]">{service.rating || "5.0"}</span>
                                <span className="text-xs text-gray-400">({service.totalReviews || 5})</span>
                              </div>
                            </div>

                            {/* Service Options Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                               {priceInfo.variants && priceInfo.variants.length > 0 ? (
                                  <>
                                    {priceInfo.displayVariants.map((variant, vIdx) => (
                                      <span key={vIdx} className="text-[11px] font-medium bg-[#f3f4f6] text-[#6b7280] px-3 py-1 rounded-full border border-gray-100">
                                        {variant}
                                      </span>
                                    ))}
                                    {priceInfo.extraCount > 0 && (
                                      <span className="text-[11px] font-medium bg-gray-50 text-gray-400 px-3 py-0 rounded-full border border-gray-100">
                                        +{priceInfo.extraCount} More
                                      </span>
                                    )}
                                  </>
                               ) : (
                                  <></>
                               )}
                            </div>

                            {/* Action Button - Pushed to bottom */}
                            <div className="mt-auto">
                              <div className="flex items-center justify-between p-1 pl-6 border border-[#d1d5db] rounded-xl hover:border-[#0a3622] transition-colors duration-300">
                                <span className="text-[#374151] font-bold text-sm">
                                  View Details
                                </span>
                                <div className="w-10 h-10 bg-[#2d4a43] rounded-lg flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                                  <ArrowRight className="w-5 h-5 text-white" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust Indicators Bar - Exact Image Style */}
        <div className="mt-20 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 p-8 hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-4 px-4 border-r border-gray-100 last:border-0">
              <div className="w-14 h-14 bg-[#f0f9f6] rounded-full flex items-center justify-center shrink-0">
                <ShieldCheck className="w-7 h-7 text-[#2d4a43]" />
              </div>
              <div>
                <h4 className="font-bold text-[#1f2937] text-[14px]">Verified Professionals</h4>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">Background-checked & trained cleaning experts</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-4 border-r border-gray-100 last:border-0">
              <div className="w-14 h-14 bg-[#f0f9f6] rounded-full flex items-center justify-center shrink-0">
                <Leaf className="w-7 h-7 text-[#2d4a43]" />
              </div>
              <div>
                <h4 className="font-bold text-[#1f2937] text-[14px]">Eco-Friendly Products</h4>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">Safe for your family, pets & the environment</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-4 border-r border-gray-100 last:border-0">
              <div className="w-14 h-14 bg-[#f0f9f6] rounded-full flex items-center justify-center shrink-0">
                <Clock className="w-7 h-7 text-[#2d4a43]" />
              </div>
              <div>
                <h4 className="font-bold text-[#1f2937] text-[14px]">On-Time Service</h4>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">Punctual, reliable & hassle-free experience</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-4 border-r border-gray-100 last:border-0">
              <div className="w-14 h-14 bg-[#f0f9f6] rounded-full flex items-center justify-center shrink-0">
                <Star className="w-7 h-7 text-[#2d4a43]" />
              </div>
              <div>
                <h4 className="font-bold text-[#1f2937] text-[14px]">100% Satisfaction</h4>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">Quality service you can trust every time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}