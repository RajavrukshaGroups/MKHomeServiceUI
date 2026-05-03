// // ServiceDetails.jsx
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { motion } from "motion/react";
// import { 
//   ArrowLeft, Star, ShieldCheck, Clock, CreditCard, 
//   Gem, ChevronRight, CheckCircle, Phone, MapPin, ListChecks
// } from "lucide-react";
// import RelatedServicesSection from "../components/services/RelatedServicesSection";
// import Navbar from "../components/layout/Navbar";
// import {
//   setService,
//   setPriceOptions,
//   setSelectedPriceOption,
//   setSelectedOptions,
//   setTotalPrice,
//   resetSelections,
//   selectSelectedPriceOption,
//   selectSelectedOptions,
//   selectTotalPrice,
// } from "../store/bookingSlice";

// // Helper: extracts price info (for the main pricing area)
// const getServicePriceInfo = (service) => {
//   if (service.price !== null && service.price !== undefined && (!service.options || service.options.length === 0)) {
//     return { type: "fixed", price: service.price };
//   }
//   if (service.options && service.options.length > 0) {
//     let minPrice = Infinity;
//     for (const opt of service.options) {
//       if (opt.values && Array.isArray(opt.values)) {
//         for (const val of opt.values) {
//           if (val.price !== undefined && val.price !== null && val.price < minPrice) {
//             minPrice = val.price;
//           }
//         }
//       }
//     }
//     return { type: "options", minPrice: minPrice !== Infinity ? minPrice : null };
//   }
//   return { type: "custom" };
// };

// // Skeleton loader for the details page
// const DetailsSkeleton = () => (
//   <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/5 to-stone-50/30">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <div className="h-8 w-32 bg-amber-100 rounded-full animate-pulse mb-8" />
//       <div className="grid md:grid-cols-2 gap-12">
//         <div className="space-y-4">
//           <div className="aspect-square bg-gradient-to-br from-amber-100/50 to-stone-100/50 rounded-2xl animate-pulse" />
//           <div className="h-24 bg-stone-100 rounded-lg animate-pulse" />
//         </div>
//         <div className="space-y-6">
//           <div className="h-10 bg-stone-100 rounded w-3/4 animate-pulse" />
//           <div className="h-4 bg-stone-100 rounded w-full animate-pulse" />
//           <div className="h-4 bg-stone-100 rounded w-2/3 animate-pulse" />
//           <div className="h-12 bg-amber-100 rounded-full w-40 animate-pulse" />
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default function ServiceDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   const [service, setServiceState] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Local state for UI
//   const [localSelectedOptions, setLocalSelectedOptions] = useState({});
//   const [localTotalPrice, setLocalTotalPrice] = useState(null);

//   // Redux selectors for persisted data
//   const reduxSelectedOptions = useSelector(selectSelectedOptions);
//   const reduxTotalPrice = useSelector(selectTotalPrice);

//   // Fetch current service details
//   useEffect(() => {
//     const fetchServiceDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`http://localhost:12000/client/send-services-client/${id}`);
//         if (!response.ok) throw new Error("Failed to fetch service details");
//         const result = await response.json();
//         if (result.success) {
//           setServiceState(result.data);
//           dispatch(setService(result.data));
          
//           // Extract price options for Redux
//           let options = [];
//           if (result.data.options && result.data.options.length > 0) {
//             options = result.data.options[0]?.values || [];
//           } else if (result.data.price != null) {
//             options = [{ label: "Standard", price: result.data.price }];
//           }
//           dispatch(setPriceOptions(options));
          
//           // Initialize selected options
//           if (result.data.options && result.data.options.length > 0) {
//             const initial = {};
//             result.data.options.forEach((opt, idx) => {
//               if (opt.values && opt.values.length > 0) {
//                 initial[idx] = opt.values[0];
//               }
//             });
            
//             // If there are saved options in Redux, use them
//             if (reduxSelectedOptions && Object.keys(reduxSelectedOptions).length > 0) {
//               setLocalSelectedOptions(reduxSelectedOptions);
//               // Recalculate total price from saved options
//               let sum = 0;
//               for (let i = 0; i < result.data.options.length; i++) {
//                 const selected = reduxSelectedOptions[i];
//                 if (selected && selected.price !== undefined) {
//                   sum += selected.price;
//                 }
//               }
//               setLocalTotalPrice(sum);
//               dispatch(setTotalPrice(sum));
//               dispatch(setSelectedPriceOption({ 
//                 label: `Custom Package (${Object.values(reduxSelectedOptions).map(v => v.label).join(' + ')})`,
//                 price: sum,
//                 options: reduxSelectedOptions 
//               }));
//             } else {
//               setLocalSelectedOptions(initial);
//             }
//           } else if (result.data.price != null) {
//             // For fixed price services, set the price option in Redux
//             dispatch(setSelectedPriceOption({ label: "Standard", price: result.data.price }));
//             setLocalTotalPrice(result.data.price);
//             dispatch(setTotalPrice(result.data.price));
//           }
//         } else {
//           throw new Error(result.message || "Service not found");
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (id) fetchServiceDetails();
//   }, [id, dispatch, reduxSelectedOptions]);

//   // Update total price when options change
//   useEffect(() => {
//     if (!service) return;
    
//     if (service.price !== null && service.price !== undefined && (!service.options || service.options.length === 0)) {
//       setLocalTotalPrice(service.price);
//       dispatch(setTotalPrice(service.price));
//       return;
//     }
    
//     if (service.options && service.options.length > 0) {
//       let sum = 0;
//       let allSelected = true;
//       for (let i = 0; i < service.options.length; i++) {
//         const selected = localSelectedOptions[i];
//         if (selected && selected.price !== undefined) {
//           sum += selected.price;
//         } else {
//           allSelected = false;
//           break;
//         }
//       }
//       const newTotal = allSelected ? sum : null;
//       setLocalTotalPrice(newTotal);
//       dispatch(setTotalPrice(newTotal));
      
//       // Also update selected price option in Redux for fixed price display
//       if (newTotal !== null) {
//         dispatch(setSelectedPriceOption({ 
//           label: `Custom Package (${Object.values(localSelectedOptions).map(v => v.label).join(' + ')})`,
//           price: newTotal,
//           options: localSelectedOptions 
//         }));
//         dispatch(setSelectedOptions(localSelectedOptions));
//       }
//     } else {
//       setLocalTotalPrice(null);
//       dispatch(setTotalPrice(null));
//     }
//   }, [service, localSelectedOptions, dispatch]);

//   const handleOptionChange = (optionIndex, valueObj) => {
//     const newSelectedOptions = { ...localSelectedOptions, [optionIndex]: valueObj };
//     setLocalSelectedOptions(newSelectedOptions);
    
//     // Store in Redux to persist across navigation
//     dispatch(setSelectedOptions(newSelectedOptions));
    
//     // Calculate and store total price
//     if (service && service.options && service.options.length > 0) {
//       let sum = 0;
//       let allSelected = true;
//       for (let i = 0; i < service.options.length; i++) {
//         const selected = newSelectedOptions[i];
//         if (selected && selected.price !== undefined) {
//           sum += selected.price;
//         } else {
//           allSelected = false;
//           break;
//         }
//       }
//       const newTotal = allSelected ? sum : null;
//       setLocalTotalPrice(newTotal);
//       dispatch(setTotalPrice(newTotal));
      
//       if (newTotal !== null) {
//         dispatch(setSelectedPriceOption({ 
//           label: `Custom Package (${Object.values(newSelectedOptions).map(v => v.label).join(' + ')})`,
//           price: newTotal,
//           options: newSelectedOptions 
//         }));
//       }
//     }
//   };

//   const handleBookNow = () => {
//     // Save all selections to Redux before navigating
//     if (service && service.options && service.options.length > 0) {
//       dispatch(setSelectedOptions(localSelectedOptions));
//       dispatch(setTotalPrice(localTotalPrice));
//       if (localTotalPrice !== null) {
//         dispatch(setSelectedPriceOption({ 
//           label: `Custom Package (${Object.values(localSelectedOptions).map(v => v.label).join(' + ')})`,
//           price: localTotalPrice,
//           options: localSelectedOptions 
//         }));
//       }
//     }
    
//     // Navigate to booking page with service ID
//     navigate(`/booking/${service._id}`);
//   };

//   if (loading) return <DetailsSkeleton />;
//   if (error || !service) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-white to-stone-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-50 rounded-full mb-4">
//             <Gem className="w-10 h-10 text-amber-500" />
//           </div>
//           <h2 className="text-2xl font-serif text-stone-800">Service Unavailable</h2>
//           <p className="text-stone-500 mt-2">{error || "Could not load the requested service."}</p>
//           <button onClick={() => navigate(-1)} className="mt-6 px-6 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition">
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const hasOptions = service.options && service.options.length > 0;
//   const hasKeyFeatures = service.keyFeatures && service.keyFeatures.length > 0;

//   return (
//     <div className="relative">
//       {/* Navbar wrapper – ensures it stays on top (z-50) */}
//       <div className="relative z-50">
//         <Navbar />
//       </div>

//       {/* Main content area – pt-20 prevents overlap if Navbar is fixed/sticky */}
//       <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/5 to-stone-50/30 pt-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
//           {/* Back Button */}
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-stone-500 hover:text-amber-600 transition mb-8 group"
//           >
//             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
//             <span>Back to catalogue</span>
//           </button>

//           {/* TWO-COLUMN LAYOUT */}
//           <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
//             {/* LEFT COLUMN: Image, title, description, key features */}
//             <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
//               {/* Main Image */}
//               <div className="aspect-square rounded-2xl overflow-hidden bg-stone-100 shadow-sm">
//                 <img
//                   src={service.images?.[0] || "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format"}
//                   alt={service.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               {/* Thumbnails */}
//               {service.images?.length > 1 && (
//                 <div className="flex gap-3 overflow-x-auto pb-2">
//                   {service.images.slice(1, 4).map((img, idx) => (
//                     <img
//                       key={idx}
//                       src={img}
//                       alt={`${service.name} view ${idx + 2}`}
//                       className="w-24 h-24 rounded-lg object-cover border border-amber-100 cursor-pointer hover:opacity-80 transition"
//                     />
//                   ))}
//                 </div>
//               )}

//               {/* Title & Meta */}
//               <div>
//                 <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-sm font-medium px-3 py-1 rounded-full mb-3">
//                   <ShieldCheck className="w-4 h-4" />
//                   <span>Verified Premium Service</span>
//                 </div>
//                 <h1 className="text-3xl md:text-4xl font-serif font-light tracking-tight text-stone-800">
//                   {service.name}
//                 </h1>
//                 <div className="flex items-center gap-4 mt-2">
//                   <div className="flex items-center gap-1.5 bg-stone-100 px-3 py-1.5 rounded-full">
//                     <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
//                     <span className="font-medium text-stone-700">{service.rating || "4.9"}</span>
//                     <span className="text-xs text-stone-400">({service.totalReviews || 0} reviews)</span>
//                   </div>
//                   {service.duration && (
//                     <div className="text-sm text-stone-500 flex items-center gap-1">
//                       <Clock className="w-4 h-4" />
//                       <span>{service.duration}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Description */}
//               <p className="text-stone-600 leading-relaxed text-base">
//                 {service.description || "Exceptional service crafted with meticulous attention to detail."}
//               </p>

//               {/* Key Features */}
//               {hasKeyFeatures && (
//                 <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-amber-100/50">
//                   <div className="flex items-center gap-2 mb-3">
//                     <ListChecks className="w-5 h-5 text-amber-600" />
//                     <h3 className="font-serif text-lg text-stone-800">Key Features</h3>
//                   </div>
//                   <ul className="space-y-2">
//                     {service.keyFeatures.map((feature, idx) => (
//                       <li key={idx} className="flex items-start gap-2 text-stone-600">
//                         <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
//                         <span className="text-sm leading-relaxed">{feature}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </motion.div>

//             {/* RIGHT COLUMN: Sticky pricing & options */}
//             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
//               {/* Sticky pricing card – added z-10 to stay below navbar (z-50) */}
//               <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-100/50 sticky top-25 z-10">
//                 <h3 className="font-serif text-xl text-stone-800 mb-4">Pricing & Options</h3>
                
//                 {hasOptions ? (
//                   <>
//                     {service.options.map((opt, idx) => (
//                       <div key={idx} className="mb-5 last:mb-0">
//                         <label className="font-medium text-stone-700 block mb-2">{opt.optionName || opt.name}</label>
//                         <div className="grid grid-cols-1 gap-2">
//                           {opt.values.map((val, vIdx) => {
//                             const isSelected = localSelectedOptions[idx]?.label === val.label;
//                             return (
//                               <button
//                                 key={vIdx}
//                                 onClick={() => handleOptionChange(idx, val)}
//                                 className={`flex justify-between items-center p-3 rounded-xl transition-all ${
//                                   isSelected
//                                     ? "bg-amber-100 border-2 border-amber-500 shadow-sm"
//                                     : "bg-stone-50 border border-stone-200 hover:border-amber-300"
//                                 }`}
//                               >
//                                 <span className="text-stone-700">{val.label}</span>
//                                 <span className="font-semibold text-amber-700">₹{val.price.toLocaleString()}</span>
//                               </button>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     ))}
//                     <div className="pt-4 mt-4 border-t border-amber-100">
//                       <div className="flex justify-between items-center">
//                         <span className="text-stone-600 font-medium">Total Price</span>
//                         <span className="text-3xl font-serif font-bold text-amber-700">
//                           {localTotalPrice !== null ? `₹${localTotalPrice.toLocaleString()}` : "Select all options"}
//                         </span>
//                       </div>
//                       {/* Show selected options summary */}
//                       {Object.keys(localSelectedOptions).length > 0 && localTotalPrice !== null && (
//                         <div className="mt-3 pt-2 text-xs text-stone-500 border-t border-stone-100">
//                           <p className="font-medium mb-1">Selected Package:</p>
//                           {Object.values(localSelectedOptions).map((opt, idx) => (
//                             <div key={idx} className="flex justify-between">
//                               <span>{opt.label}</span>
//                               <span className="text-amber-600">+₹{opt.price}</span>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </>
//                 ) : (
//                   <div className="flex items-baseline gap-2 pb-3">
//                     <span className="text-3xl font-serif font-semibold text-amber-700">
//                       ₹{service.price?.toLocaleString() || "Custom"}
//                     </span>
//                     <span className="text-stone-400">flat rate</span>
//                   </div>
//                 )}

//                 {/* CTA Buttons */}
//                 <div className="flex flex-wrap gap-4 mt-6">
//                   <button
//                     onClick={handleBookNow}
//                     disabled={hasOptions && localTotalPrice === null}
//                     className={`flex-1 py-3 rounded-full font-medium transition shadow-md shadow-amber-200 flex items-center justify-center gap-2 ${
//                       hasOptions && localTotalPrice === null
//                         ? "bg-stone-300 text-stone-500 cursor-not-allowed"
//                         : "bg-amber-600 text-white hover:bg-amber-700"
//                     }`}
//                   >
//                     <span>Book Now</span>
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                   <button className="px-5 py-3 border border-stone-200 rounded-full hover:bg-stone-50 transition text-stone-700 text-sm">
//                     Request Callback
//                   </button>
//                 </div>

//                 {/* Trust Badges */}
//                 <div className="grid grid-cols-2 gap-3 pt-6 mt-4 text-sm text-stone-500 border-t border-stone-100">
//                   <div className="flex items-center gap-2">
//                     <CheckCircle className="w-4 h-4 text-amber-500" />
//                     <span>100% satisfaction</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <CreditCard className="w-4 h-4 text-amber-500" />
//                     <span>Secure payments</span>
//                   </div>
//                 </div>
//                 <div className="mt-4 text-center text-xs text-stone-400">
//                   <span className="inline-flex items-center gap-1">
//                     <Phone className="w-3 h-3" /> Priority support included
//                   </span>
//                 </div>
//               </div>

//               {/* Extra highlight */}
//               <div className="bg-white/40 rounded-xl p-4 border border-amber-100/30 text-center">
//                 <p className="text-stone-500 text-sm">
//                   🎉 Free consultation • No hidden charges • Easy rescheduling
//                 </p>
//               </div>
//             </motion.div>
//           </div>

//           {/* RELATED SERVICES SECTION */}
//           <RelatedServicesSection 
//             currentServiceId={service._id}
//             currentParentId={service.parentId}
//           />

//           {/* Bottom Trust Row */}
//           <div className="mt-20 pt-8 border-t border-amber-100/50 grid md:grid-cols-3 gap-6 text-center">
//             <div className="flex flex-col items-center gap-2">
//               <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center">
//                 <Clock className="w-6 h-6 text-amber-600" />
//               </div>
//               <p className="font-medium text-stone-700">Flexible Scheduling</p>
//               <p className="text-sm text-stone-400">Book at your convenience</p>
//             </div>
//             <div className="flex flex-col items-center gap-2">
//               <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center">
//                 <Phone className="w-6 h-6 text-amber-600" />
//               </div>
//               <p className="font-medium text-stone-700">Priority Support</p>
//               <p className="text-sm text-stone-400">Dedicated 24/7 concierge</p>
//             </div>
//             <div className="flex flex-col items-center gap-2">
//               <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center">
//                 <MapPin className="w-6 h-6 text-amber-600" />
//               </div>
//               <p className="font-medium text-stone-700">Pan‑India Coverage</p>
//               <p className="text-sm text-stone-400">Available in all major cities</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// ServiceDetails.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import { 
  ArrowLeft, Star, ShieldCheck, Clock, CreditCard, 
  Gem, ChevronRight, CheckCircle, Phone, MapPin, ListChecks
} from "lucide-react";
import RelatedServicesSection from "../components/services/RelatedServicesSection";
import Navbar from "../components/layout/Navbar";
import {
  setService,
  setPriceOptions,
  setSelectedPriceOption,
  setSelectedOptions,
  setTotalPrice,
  resetSelections,
  selectSelectedPriceOption,
  selectSelectedOptions,
  selectTotalPrice,
} from "../store/bookingSlice";

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
  const dispatch = useDispatch();
  
  const [service, setServiceState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Local state for UI
  const [localSelectedOptions, setLocalSelectedOptions] = useState({});
  const [localTotalPrice, setLocalTotalPrice] = useState(null);

  // Redux selectors for persisted data
  const reduxSelectedOptions = useSelector(selectSelectedOptions);
  const reduxTotalPrice = useSelector(selectTotalPrice);

  // Fetch current service details
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:12000/client/send-services-client/${id}`);
        if (!response.ok) throw new Error("Failed to fetch service details");
        const result = await response.json();
        if (result.success) {
          setServiceState(result.data);
          dispatch(setService(result.data));
          
          // Extract price options for Redux
          let options = [];
          if (result.data.options && result.data.options.length > 0) {
            options = result.data.options[0]?.values || [];
          } else if (result.data.price != null) {
            options = [{ label: "Standard", price: result.data.price }];
          }
          dispatch(setPriceOptions(options));
          
          // Initialize selected options
          if (result.data.options && result.data.options.length > 0) {
            const initial = {};
            result.data.options.forEach((opt, idx) => {
              if (opt.values && opt.values.length > 0) {
                initial[idx] = opt.values[0];
              }
            });
            
            // If there are saved options in Redux, use them
            if (reduxSelectedOptions && Object.keys(reduxSelectedOptions).length > 0) {
              setLocalSelectedOptions(reduxSelectedOptions);
              // Recalculate total price from saved options
              let sum = 0;
              for (let i = 0; i < result.data.options.length; i++) {
                const selected = reduxSelectedOptions[i];
                if (selected && selected.price !== undefined) {
                  sum += selected.price;
                }
              }
              setLocalTotalPrice(sum);
              dispatch(setTotalPrice(sum));
              dispatch(setSelectedPriceOption({ 
                label: `Custom Package (${Object.values(reduxSelectedOptions).map(v => v.label).join(' + ')})`,
                price: sum,
                options: reduxSelectedOptions 
              }));
            } else {
              setLocalSelectedOptions(initial);
            }
          } else if (result.data.price != null) {
            // For fixed price services, set the price option in Redux
            dispatch(setSelectedPriceOption({ label: "Standard", price: result.data.price }));
            setLocalTotalPrice(result.data.price);
            dispatch(setTotalPrice(result.data.price));
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
  }, [id, dispatch, reduxSelectedOptions]);

  // Update total price when options change
  useEffect(() => {
    if (!service) return;
    
    if (service.price !== null && service.price !== undefined && (!service.options || service.options.length === 0)) {
      setLocalTotalPrice(service.price);
      dispatch(setTotalPrice(service.price));
      return;
    }
    
    if (service.options && service.options.length > 0) {
      let sum = 0;
      let allSelected = true;
      for (let i = 0; i < service.options.length; i++) {
        const selected = localSelectedOptions[i];
        if (selected && selected.price !== undefined) {
          sum += selected.price;
        } else {
          allSelected = false;
          break;
        }
      }
      const newTotal = allSelected ? sum : null;
      setLocalTotalPrice(newTotal);
      dispatch(setTotalPrice(newTotal));
      
      // Also update selected price option in Redux for fixed price display
      if (newTotal !== null) {
        dispatch(setSelectedPriceOption({ 
          label: `Custom Package (${Object.values(localSelectedOptions).map(v => v.label).join(' + ')})`,
          price: newTotal,
          options: localSelectedOptions 
        }));
        dispatch(setSelectedOptions(localSelectedOptions));
      }
    } else {
      setLocalTotalPrice(null);
      dispatch(setTotalPrice(null));
    }
  }, [service, localSelectedOptions, dispatch]);

  const handleOptionChange = (optionIndex, valueObj) => {
    const newSelectedOptions = { ...localSelectedOptions, [optionIndex]: valueObj };
    setLocalSelectedOptions(newSelectedOptions);
    
    // Store in Redux to persist across navigation
    dispatch(setSelectedOptions(newSelectedOptions));
    
    // Calculate and store total price
    if (service && service.options && service.options.length > 0) {
      let sum = 0;
      let allSelected = true;
      for (let i = 0; i < service.options.length; i++) {
        const selected = newSelectedOptions[i];
        if (selected && selected.price !== undefined) {
          sum += selected.price;
        } else {
          allSelected = false;
          break;
        }
      }
      const newTotal = allSelected ? sum : null;
      setLocalTotalPrice(newTotal);
      dispatch(setTotalPrice(newTotal));
      
      if (newTotal !== null) {
        dispatch(setSelectedPriceOption({ 
          label: `Custom Package (${Object.values(newSelectedOptions).map(v => v.label).join(' + ')})`,
          price: newTotal,
          options: newSelectedOptions 
        }));
      }
    }
  };

  const handleBookNow = () => {
    // Save all selections to Redux before navigating
    if (service && service.options && service.options.length > 0) {
      dispatch(setSelectedOptions(localSelectedOptions));
      dispatch(setTotalPrice(localTotalPrice));
      if (localTotalPrice !== null) {
        dispatch(setSelectedPriceOption({ 
          label: `Custom Package (${Object.values(localSelectedOptions).map(v => v.label).join(' + ')})`,
          price: localTotalPrice,
          options: localSelectedOptions 
        }));
      }
    }
    
    // Navigate to booking page with service ID
    navigate(`/booking/${service._id}`);
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
    <div className="relative">
      {/* Navbar wrapper – ensures it stays on top (z-50) */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Main content area – pt-20 prevents overlap if Navbar is fixed/sticky */}
      <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/5 to-stone-50/30 pt-20">
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
              {/* Sticky pricing card – added z-10 to stay below navbar (z-50) */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-100/50 sticky top-25 z-10">
                <h3 className="font-serif text-xl text-stone-800 mb-4">Pricing & Options</h3>
                
                {hasOptions ? (
                  <>
                    {service.options.map((opt, idx) => (
                      <div key={idx} className="mb-5 last:mb-0">
                        <label className="font-medium text-stone-700 block mb-2">{opt.optionName || opt.name}</label>
                        <div className="grid grid-cols-1 gap-2">
                          {opt.values.map((val, vIdx) => {
                            const isSelected = localSelectedOptions[idx]?.label === val.label;
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
                          {localTotalPrice !== null ? `₹${localTotalPrice.toLocaleString()}` : "Select all options"}
                        </span>
                      </div>
                      {/* Show selected options summary */}
                      {Object.keys(localSelectedOptions).length > 0 && localTotalPrice !== null && (
                        <div className="mt-3 pt-2 text-xs text-stone-500 border-t border-stone-100">
                          <p className="font-medium mb-1">Selected Package:</p>
                          {Object.values(localSelectedOptions).map((opt, idx) => (
                            <div key={idx} className="flex justify-between">
                              <span>{opt.label}</span>
                              <span className="text-amber-600">+₹{opt.price}</span>
                            </div>
                          ))}
                        </div>
                      )}
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
                    onClick={handleBookNow}
                    disabled={hasOptions && localTotalPrice === null}
                    className={`flex-1 py-3 rounded-full font-medium transition shadow-md shadow-amber-200 flex items-center justify-center gap-2 ${
                      hasOptions && localTotalPrice === null
                        ? "bg-stone-300 text-stone-500 cursor-not-allowed"
                        : "bg-amber-600 text-white hover:bg-amber-700"
                    }`}
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

          {/* RELATED SERVICES SECTION */}
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
    </div>
  );
}