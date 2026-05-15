// // ServiceDetails.jsx
// import { useState, useEffect, useRef } from "react";
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
//   setSelectedMultiOptions,
//   setCustomSelectedPrice,
//   selectSelectedMultiOptions,
//   selectSelectedOptions,
//   selectSelectedItemsSummary,
// } from "../store/bookingSlice";

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
//   const hasInitialized = useRef(false);

//   const [service, setServiceState] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [localSingle, setLocalSingle] = useState({});
//   const [localMulti, setLocalMulti] = useState({});
//   const [localTotal, setLocalTotal] = useState(null);

//   const reduxSelectedSingle = useSelector(selectSelectedOptions);
//   const reduxSelectedMulti = useSelector(selectSelectedMultiOptions);
//   const selectedItemsSummary = useSelector(selectSelectedItemsSummary);
//   const hasAnySelections = selectedItemsSummary.length > 0;

//   // console.log(selectedItemsSummary)
//   // Fetch service and initialize local state (ONCE)
//   useEffect(() => {
//     const fetchService = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`http://localhost:12000/client/send-services-client/${id}`);
//         if (!res.ok) throw new Error("Failed to fetch");
//         const result = await res.json();
//         if (!result.success) throw new Error(result.message || "Not found");
//         const svc = result.data;
//         setServiceState(svc);
//         dispatch(setService(svc));

//         // Build standard price options (fallback)
//         let stdOptions = [];
//         if (svc.options?.length) {
//           const first = svc.options[0];
//           if (!first.multiSelect) stdOptions = first.values || [];
//         } else if (svc.price != null) {
//           stdOptions = [{ label: "Standard", price: svc.price }];
//         }
//         dispatch(setPriceOptions(stdOptions));

//         // Initialize local state from Redux saved selections
//         if (!hasInitialized.current && svc.options) {
//           const initSingle = {};
//           const initMulti = {};
//           svc.options.forEach((opt, idx) => {
//             const isMulti = (idx === 0) ? true : (opt.multiSelect === true);
//             if (isMulti) {
//               initMulti[idx] = reduxSelectedMulti[idx] || [];
//             } else {
//               initSingle[idx] = reduxSelectedSingle[idx] || (opt.values?.[0] || null);
//             }
//           });
//           setLocalSingle(initSingle);
//           setLocalMulti(initMulti);
//           hasInitialized.current = true;
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (id) fetchService();
//   }, [id, dispatch, reduxSelectedSingle, reduxSelectedMulti]);
//   console.log(reduxSelectedMulti)

//   // Recalculate total and sync to Redux when local selections change
//   useEffect(() => {
//     if (!service) return;
//     let total = 0;
//     Object.values(localSingle).forEach(v => { if (v?.price) total += v.price; });
//     Object.values(localMulti).forEach(arr => arr.forEach(v => { if (v?.price) total += v.price; }));
//     setLocalTotal(total);
//     dispatch(setSelectedOptions(localSingle));
//     dispatch(setSelectedMultiOptions(localMulti));
//     dispatch(setTotalPrice(total));
//     if (total > 0) {
//       const labels = [
//         ...Object.values(localSingle).map(v => v?.label),
//         ...Object.values(localMulti).flat().map(v => v?.label)
//       ].filter(Boolean);
//       const customLabel = `Custom Package (${labels.join(" + ")})`;
//       const customPkg = { label: customLabel, price: total, isCustom: true };
//       dispatch(setCustomSelectedPrice(customPkg));
//       dispatch(setSelectedPriceOption(customPkg));
//     }
//   }, [localSingle, localMulti, service, dispatch]);

//   const handleSingleChange = (idx, val) => setLocalSingle(prev => ({ ...prev, [idx]: val }));
//   const handleMultiChange = (idx, val, checked) => {
//     setLocalMulti(prev => {
//       const current = prev[idx] || [];
//       const newVals = checked ? [...current, val] : current.filter(v => v.label !== val.label);
//       return { ...prev, [idx]: newVals };
//     });
//   };
//   const handleBookNow = () => navigate(`/booking/${service._id}`);

//   if (loading) return <DetailsSkeleton />;
//   if (error || !service) return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="text-center">
//         <Gem className="w-12 h-12 text-amber-500 mx-auto mb-4" />
//         <h2 className="text-2xl font-serif">Service Unavailable</h2>
//         <p className="text-stone-500">{error || "Not found"}</p>
//         <button onClick={() => navigate(-1)} className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-full">Go Back</button>
//       </div>
//     </div>
//   );

//   const hasOptions = service.options?.length > 0;
//   const hasKeyFeatures = service.keyFeatures?.length > 0;

//   return (
//     <div className="relative">
//       <div className="relative z-50"><Navbar /></div>
//       <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/5 to-stone-50/30 pt-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
//           <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-stone-500 hover:text-amber-600 mb-8 group">
//             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
//             <span>Back to catalogue</span>
//           </button>
//           <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
//             {/* LEFT COLUMN – images & details (unchanged) */}
//             <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
//               <div className="aspect-square rounded-2xl overflow-hidden bg-stone-100 shadow-sm">
//                 <img src={service.images?.[0] } alt={service.name} className="w-full h-full object-cover" />
//               </div>
//               {service.images?.length > 1 && (
//                 <div className="flex gap-3 overflow-x-auto pb-2">
//                   {service.images.slice(1, 4).map((img, i) => (
//                     <img key={i} src={img} alt="" className="w-24 h-24 rounded-lg object-cover border border-amber-100 cursor-pointer hover:opacity-80" />
//                   ))}
//                 </div>
//               )}
//               <div>
//                 {/* <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-sm font-medium px-3 py-1 rounded-full mb-3">
//                   <ShieldCheck className="w-4 h-4" /><span>Verified Premium Service</span>
//                 </div> */}
//                 <h1 className="text-3xl md:text-4xl font-serif font-light text-stone-800">{service.name}</h1>
//                 <div className="flex items-center gap-4 mt-2">
//                   <div className="flex items-center gap-1.5 bg-stone-100 px-3 py-1.5 rounded-full">
//                     <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
//                     <span className="font-medium">{service.rating || "4.9"}</span>
//                     <span className="text-xs text-stone-400">({service.totalReviews || 0} reviews)</span>
//                   </div>
//                   {service.duration && <div className="text-sm text-stone-500 flex items-center gap-1"><Clock className="w-4 h-4" /><span>{service.duration}</span></div>}
//                 </div>
//               </div>
//               <p className="text-stone-600 leading-relaxed">{service.description || "Exceptional service crafted with meticulous attention to detail."}</p>
//               {hasKeyFeatures && (
//                 <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-amber-100/50">
//                   <div className="flex items-center gap-2 mb-3"><ListChecks className="w-5 h-5 text-amber-600" /><h3 className="font-serif text-lg">Key Features</h3></div>
//                   <ul className="space-y-2">
//                     {service.keyFeatures.map((f, i) => <li key={i} className="flex items-start gap-2 text-stone-600"><CheckCircle className="w-4 h-4 text-amber-500 mt-0.5" /><span className="text-sm">{f}</span></li>)}
//                   </ul>
//                 </div>
//               )}
//             </motion.div>
//             {/* RIGHT COLUMN – options */}
//             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
//               <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-100/50 sticky top-25">
//                 <h3 className="font-serif text-xl text-stone-800 mb-4">Pricing & Options</h3>
//                 {hasOptions ? (
//                   <>
//                     {service.options.map((opt, idx) => {
//                       const isMulti = (idx === 0) ? true : (opt.multiSelect === true);
//                       const selectedSingle = localSingle[idx];
//                       const selectedMulti = localMulti[idx] || [];
//                       return (
//                         <div key={idx} className="mb-5 last:mb-0">
//                           <label className="font-medium text-stone-700 block mb-2">
//                             {opt.optionName || opt.name}
//                             {idx === 0 && <span className="ml-2 text-xs text-amber-600">(choose any combination)</span>}
//                           </label>
//                           <div className="grid grid-cols-1 gap-2">
//                             {opt.values.map((val, vIdx) => {
//                               if (isMulti) {
//                                 const checked = selectedMulti.some(v => v.label === val.label);
//                                 return (
//                                   <label key={vIdx} className="flex items-center justify-between p-3 rounded-xl border border-stone-200 hover:border-amber-300 cursor-pointer">
//                                     <div className="flex items-center gap-2">
//                                       <input type="checkbox" checked={checked} onChange={(e) => handleMultiChange(idx, val, e.target.checked)} className="w-4 h-4 text-amber-600 rounded" />
//                                       <span>{val.label}</span>
//                                     </div>
//                                     <span className="font-semibold text-amber-700">₹{val.price.toLocaleString()}</span>
//                                   </label>
//                                 );
//                               } else {
//                                 const isSelected = selectedSingle?.label === val.label;
//                                 return (
//                                   <button key={vIdx} onClick={() => handleSingleChange(idx, val)} className={`flex justify-between items-center p-3 rounded-xl transition-all ${isSelected ? "bg-amber-100 border-2 border-amber-500" : "bg-stone-50 border border-stone-200 hover:border-amber-300"}`}>
//                                     <span>{val.label}</span>
//                                     <span className="font-semibold text-amber-700">₹{val.price.toLocaleString()}</span>
//                                   </button>
//                                 );
//                               }
//                             })}
//                           </div>
//                         </div>
//                       );
//                     })}
//                     <div className="pt-4 mt-4 border-t border-amber-100">
//                       <div className="flex justify-between items-center">
//                         <span className="text-stone-600 font-medium">Total Price</span>
//                         <span className="text-3xl font-serif font-bold text-amber-700">{localTotal !== null ? `₹${localTotal.toLocaleString()}` : "Select options"}</span>
//                       </div>
//                       {localTotal !== null && localTotal > 0 && (
//                         <div className="mt-3 pt-2 text-xs text-stone-500 border-t border-stone-100">
//                           <p className="font-medium mb-1">Your Selection:</p>
//                           {Object.values(localSingle).map((opt, i) => opt && <div key={i} className="flex justify-between"><span>{opt.label}</span><span className="text-amber-600">+₹{opt.price}</span></div>)}
//                           {Object.values(localMulti).flat().map((opt, i) => opt && <div key={i} className="flex justify-between"><span>{opt.label}</span><span className="text-amber-600">+₹{opt.price}</span></div>)}
//                         </div>
//                       )}
                      
//                     </div>
//                   </>
//                 ) : (
//                   <div className="flex items-baseline gap-2 pb-3">
//                     <span className="text-3xl font-serif font-semibold text-amber-700">₹{service.price?.toLocaleString() || "Custom"}</span>
//                     <span className="text-stone-400">flat rate</span>
//                   </div>
//                 )}
//                 <div className="flex flex-wrap gap-4 mt-6">
//                   <button onClick={handleBookNow} disabled={hasOptions && localTotal === null} className={`flex-1 py-3 rounded-full font-medium shadow-md shadow-amber-200 flex items-center justify-center gap-2 ${hasOptions && localTotal === null ? "bg-stone-300 text-stone-500 cursor-not-allowed" : "bg-amber-600 text-white hover:bg-amber-700"}`}>
//                     <span>Book Now</span><ChevronRight className="w-4 h-4" />
//                   </button>
//                   <button className="px-5 py-3 border border-stone-200 rounded-full hover:bg-stone-50 transition text-stone-700 text-sm">Request Callback</button>
//                 </div>
//                 <div className="grid grid-cols-2 gap-3 pt-6 mt-4 text-sm text-stone-500 border-t border-stone-100">
//                   <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-amber-500" /><span>100% satisfaction</span></div>
//                   <div className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-amber-500" /><span>Secure payments</span></div>
//                 </div>
//                 <div className="mt-4 text-center text-xs text-stone-400"><Phone className="w-3 h-3 inline" /> Priority support included</div>
//               </div>
//               <div className="bg-white/40 rounded-xl p-4 border border-amber-100/30 text-center text-sm text-stone-500">🎉 Free consultation • No hidden charges • Easy rescheduling</div>
//             </motion.div>
//           </div>
//           <RelatedServicesSection currentServiceId={service._id} currentParentId={service.parentId} />
//           <div className="mt-20 pt-8 border-t border-amber-100/50 grid md:grid-cols-3 gap-6 text-center">
//             <div className="flex flex-col items-center gap-2"><div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center"><Clock className="w-6 h-6 text-amber-600" /></div><p className="font-medium">Flexible Scheduling</p><p className="text-sm text-stone-400">Book at your convenience</p></div>
//             <div className="flex flex-col items-center gap-2"><div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center"><Phone className="w-6 h-6 text-amber-600" /></div><p className="font-medium">Priority Support</p><p className="text-sm text-stone-400">Dedicated 24/7 concierge</p></div>
//             <div className="flex flex-col items-center gap-2"><div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center"><MapPin className="w-6 h-6 text-amber-600" /></div><p className="font-medium">Pan‑India Coverage</p><p className="text-sm text-stone-400">Available in all major cities</p></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// ServiceDetails.jsx
// import { useState, useEffect, useRef, useMemo } from "react";
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
//   setSelectedMultiOptions,
//   setCustomSelectedPrice,
//   selectSelectedMultiOptions,
//   selectSelectedOptions,
//   selectSelectedItemsSummary,
// } from "../store/bookingSlice";

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
//   const hasInitialized = useRef(false);

//   const [service, setServiceState] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [localSingle, setLocalSingle] = useState({});
//   const [localMulti, setLocalMulti] = useState({});
//   const [localTotal, setLocalTotal] = useState(null);
//   const [bookingError, setBookingError] = useState("");

//   const reduxSelectedSingle = useSelector(selectSelectedOptions);
//   const reduxSelectedMulti = useSelector(selectSelectedMultiOptions);
//   const selectedItemsSummary = useSelector(selectSelectedItemsSummary);

//   // Group selected items by option category (using service.options)
//   const groupedSelectedItems = useMemo(() => {
//     if (!service?.options) return {};
//     const groups = {};
//     const findOptionName = (label) => {
//       for (let i = 0; i < service.options.length; i++) {
//         const opt = service.options[i];
//         const match = opt.values.find(v => v.label === label);
//         if (match) return opt.optionName || opt.name || `Option ${i + 1}`;
//       }
//       return "Previous";
//     };
//     selectedItemsSummary.forEach(item => {
//       const category = findOptionName(item.label);
//       if (!groups[category]) groups[category] = [];
//       groups[category].push(item);
//     });
//     return groups;
//   }, [selectedItemsSummary, service]);
// console.log(selectedItemsSummary)
//   // Fetch service and initialize local state (ONCE)
//   useEffect(() => {
//     const fetchService = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`http://localhost:12000/client/send-services-client/${id}`);
//         if (!res.ok) throw new Error("Failed to fetch");
//         const result = await res.json();
//         if (!result.success) throw new Error(result.message || "Not found");
//         const svc = result.data;
//         setServiceState(svc);
//         dispatch(setService(svc));

//         // Build standard price options (fallback)
//         let stdOptions = [];
//         if (svc.options?.length) {
//           const first = svc.options[0];
//           if (!first.multiSelect) stdOptions = first.values || [];
//         } else if (svc.price != null) {
//           stdOptions = [{ label: "Standard", price: svc.price }];
//         }
//         dispatch(setPriceOptions(stdOptions));

//         // Initialize local state from Redux saved selections
//         if (!hasInitialized.current && svc.options) {
//           const initSingle = {};
//           const initMulti = {};
//           svc.options.forEach((opt, idx) => {
//             const isMulti = idx === 0 ? true : opt.multiSelect === true;
//             if (isMulti) {
//               initMulti[idx] = reduxSelectedMulti[idx] || [];
//             } else {
//               initSingle[idx] = reduxSelectedSingle[idx] || (opt.values?.[0] || null);
//             }
//           });
//           setLocalSingle(initSingle);
//           setLocalMulti(initMulti);
//           hasInitialized.current = true;
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (id) fetchService();
//   }, [id, dispatch, reduxSelectedSingle, reduxSelectedMulti]);

//   // Recalculate total and sync to Redux when local selections change
//   useEffect(() => {
//     if (!service) return;
//     let total = 0;
//     Object.values(localSingle).forEach(v => {
//       if (v?.price) total += v.price;
//     });
//     Object.values(localMulti).forEach(arr =>
//       arr.forEach(v => {
//         if (v?.price) total += v.price;
//       })
//     );
//     setLocalTotal(total);
//     dispatch(setSelectedOptions(localSingle));
//     dispatch(setSelectedMultiOptions(localMulti));
//     dispatch(setTotalPrice(total));
//     if (total > 0) {
//       const labels = [
//         ...Object.values(localSingle).map(v => v?.label),
//         ...Object.values(localMulti).flat().map(v => v?.label),
//       ].filter(Boolean);
//       const customLabel = `Custom Package (${labels.join(" + ")})`;
//       const customPkg = { label: customLabel, price: total, isCustom: true };
//       dispatch(setCustomSelectedPrice(customPkg));
//       dispatch(setSelectedPriceOption(customPkg));
//     }
//   }, [localSingle, localMulti, service, dispatch]);

//   // Clear booking error when selections change
//   useEffect(() => {
//     if (bookingError) setBookingError("");
//   }, [localSingle, localMulti]);

//   const handleSingleChange = (idx, val) =>
//     setLocalSingle(prev => ({ ...prev, [idx]: val }));
//   const handleMultiChange = (idx, val, checked) => {
//     setLocalMulti(prev => {
//       const current = prev[idx] || [];
//       const newVals = checked
//         ? [...current, val]
//         : current.filter(v => v.label !== val.label);
//       return { ...prev, [idx]: newVals };
//     });
//   };

//   const handleBookNow = () => {
//     const hasOptions = service?.options?.length > 0;
//     if (hasOptions) {
//       const selectedCount =
//         Object.values(localSingle).filter(v => v != null).length +
//         Object.values(localMulti).reduce((acc, arr) => acc + arr.length, 0);
//       if (selectedCount === 0) {
//         setBookingError("❌ Please select at least one option before booking.");
//         return;
//       }
//     }
//     setBookingError("");
//     navigate(`/booking/${service._id}`);
//   };

//   if (loading) return <DetailsSkeleton />;
//   if (error || !service)
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <Gem className="w-12 h-12 text-amber-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-serif">Service Unavailable</h2>
//           <p className="text-stone-500">{error || "Not found"}</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-full"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );

//   const hasOptions = service.options?.length > 0;
//   const hasKeyFeatures = service.keyFeatures?.length > 0;

//   return (
//     <div className="relative">
//       <div className="relative z-50">
//         <Navbar />
//       </div>
//       <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/5 to-stone-50/30 pt-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-stone-500 hover:text-amber-600 mb-8 group"
//           >
//             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
//             <span>Back to catalogue</span>
//           </button>
//           <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
//             {/* LEFT COLUMN – images & details */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="space-y-6"
//             >
//               <div className="aspect-square rounded-2xl overflow-hidden bg-stone-100 shadow-sm">
//                 <img
//                   src={service.images?.[0]}
//                   alt={service.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               {service.images?.length > 1 && (
//                 <div className="flex gap-3 overflow-x-auto pb-2">
//                   {service.images.slice(1, 4).map((img, i) => (
//                     <img
//                       key={i}
//                       src={img}
//                       alt=""
//                       className="w-24 h-24 rounded-lg object-cover border border-amber-100 cursor-pointer hover:opacity-80"
//                     />
//                   ))}
//                 </div>
//               )}
//               <div>
//                 <h1 className="text-3xl md:text-4xl font-serif font-light text-stone-800">
//                   {service.name}
//                 </h1>
//                 <div className="flex items-center gap-4 mt-2">
//                   <div className="flex items-center gap-1.5 bg-stone-100 px-3 py-1.5 rounded-full">
//                     <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
//                     <span className="font-medium">{service.rating || "4.9"}</span>
//                     <span className="text-xs text-stone-400">
//                       ({service.totalReviews || 0} reviews)
//                     </span>
//                   </div>
//                   {service.duration && (
//                     <div className="text-sm text-stone-500 flex items-center gap-1">
//                       <Clock className="w-4 h-4" />
//                       <span>{service.duration}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <p className="text-stone-600 leading-relaxed">
//                 {service.description ||
//                   "Exceptional service crafted with meticulous attention to detail."}
//               </p>
//               {hasKeyFeatures && (
//                 <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-amber-100/50">
//                   <div className="flex items-center gap-2 mb-3">
//                     <ListChecks className="w-5 h-5 text-amber-600" />
//                     <h3 className="font-serif text-lg">Key Features</h3>
//                   </div>
//                   <ul className="space-y-2">
//                     {service.keyFeatures.map((f, i) => (
//                       <li
//                         key={i}
//                         className="flex items-start gap-2 text-stone-600"
//                       >
//                         <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5" />
//                         <span className="text-sm">{f}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </motion.div>

//             {/* RIGHT COLUMN – options */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="space-y-6"
//             >
//               <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-100/50 sticky top-25">
//                 <h3 className="font-serif text-xl text-stone-800 mb-4">
//                   Pricing & Options
//                 </h3>
//                 {hasOptions ? (
//                   <>
//                     {service.options.map((opt, idx) => {
//                       const isMulti = idx === 0 ? true : opt.multiSelect === true;
//                       const selectedSingle = localSingle[idx];
//                       const selectedMulti = localMulti[idx] || [];
//                       return (
//                         <div key={idx} className="mb-5 last:mb-0">
//                           <label className="font-medium text-stone-700 block mb-2">
//                             {opt.optionName || opt.name}
//                             {idx === 0 && (
//                               <span className="ml-2 text-xs text-amber-600">
//                                 (choose any combination)
//                               </span>
//                             )}
//                           </label>
//                           <div className="grid grid-cols-1 gap-2">
//                             {opt.values.map((val, vIdx) => {
//                               if (isMulti) {
//                                 const checked = selectedMulti.some(
//                                   v => v.label === val.label
//                                 );
//                                 return (
//                                   <label
//                                     key={vIdx}
//                                     className="flex items-center justify-between p-3 rounded-xl border border-stone-200 hover:border-amber-300 cursor-pointer"
//                                   >
//                                     <div className="flex items-center gap-2">
//                                       <input
//                                         type="checkbox"
//                                         checked={checked}
//                                         onChange={e =>
//                                           handleMultiChange(idx, val, e.target.checked)
//                                         }
//                                         className="w-4 h-4 text-amber-600 rounded"
//                                       />
//                                       <span>{val.label}</span>
//                                     </div>
//                                     <span className="font-semibold text-amber-700">
//                                       ₹{val.price.toLocaleString()}
//                                     </span>
//                                   </label>
//                                 );
//                               } else {
//                                 const isSelected = selectedSingle?.label === val.label;
//                                 return (
//                                   <button
//                                     key={vIdx}
//                                     onClick={() => handleSingleChange(idx, val)}
//                                     className={`flex justify-between items-center p-3 rounded-xl transition-all ${
//                                       isSelected
//                                         ? "bg-amber-100 border-2 border-amber-500"
//                                         : "bg-stone-50 border border-stone-200 hover:border-amber-300"
//                                     }`}
//                                   >
//                                     <span>{val.label}</span>
//                                     <span className="font-semibold text-amber-700">
//                                       ₹{val.price.toLocaleString()}
//                                     </span>
//                                   </button>
//                                 );
//                               }
//                             })}
//                           </div>
//                         </div>
//                       );
//                     })}
//                     <div className="pt-4 mt-4 border-t border-amber-100">
//                       <div className="flex justify-between items-center">
//                         <span className="text-stone-600 font-medium">
//                           Total Price
//                         </span>
//                         <span className="text-3xl font-serif font-bold text-amber-700">
//                           {localTotal !== null
//                             ? `₹${localTotal.toLocaleString()}`
//                             : "Select options"}
//                         </span>
//                       </div>
//                       {localTotal !== null && localTotal > 0 && (
//                         <div className="mt-3 pt-2 text-xs text-stone-500 border-t border-stone-100">
//                           <p className="font-medium mb-1">Your Selection:</p>
//                           {Object.values(localSingle).map(
//                             (opt, i) =>
//                               opt && (
//                                 <div key={i} className="flex justify-between">
//                                   <span>{opt.label}</span>
//                                   <span className="text-amber-600">
//                                     +₹{opt.price}
//                                   </span>
//                                 </div>
//                               )
//                           )}
//                           {Object.values(localMulti)
//                             .flat()
//                             .map(
//                               (opt, i) =>
//                                 opt && (
//                                   <div key={i} className="flex justify-between">
//                                     <span>{opt.label}</span>
//                                     <span className="text-amber-600">
//                                       +₹{opt.price}
//                                     </span>
//                                   </div>
//                                 )
//                             )}
//                         </div>
//                       )}
//                     </div>

//                     {/* ✅ NEW: Your Selected Options (grouped summary from Redux) */}
//                     <div className="mt-6 bg-amber-50/40 rounded-xl p-4 border border-amber-100">
//                       <h4 className="font-serif text-lg text-stone-800 flex items-center gap-2 mb-3">
//                         <CheckCircle className="w-5 h-5 text-amber-600" />
//                         Your Selected Options
//                       </h4>
//                       {selectedItemsSummary.length === 0 ? (
//                         <div className="text-center py-4 text-stone-400 text-sm">
//                           ✨ No options selected yet<br />
//                           Choose from the list above
//                         </div>
//                       ) : (
//                         <div className="space-y-3">
//                           {Object.entries(groupedSelectedItems).map(
//                             ([category, items]) => (
//                               <div key={category}>
//                                 <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1">
//                                   {category}
//                                 </p>
//                                 <ul className="space-y-1">
//                                   {items.map((item, idx) => (
//                                     <li
//                                       key={idx}
//                                       className="flex justify-between text-sm text-stone-700"
//                                     >
//                                       <span>{item.label}</span>
//                                       <span className="font-medium text-amber-600">
//                                         +₹{item.price.toLocaleString()}
//                                       </span>
//                                     </li>
//                                   ))}
//                                 </ul>
//                               </div>
//                             )
//                           )}
//                           <div className="pt-2 border-t border-amber-200 flex justify-between font-bold text-stone-800">
//                             <span>Total</span>
//                             <span className="text-amber-700">
//                               ₹
//                               {selectedItemsSummary
//                                 .reduce((s, i) => s + i.price, 0)
//                                 .toLocaleString()}
//                             </span>
//                           </div>
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

//                 {/* Book Now button – always enabled, shows error if no selection */}
//                 <div className="flex flex-wrap gap-4 mt-6">
//                   <button
//                     onClick={handleBookNow}
//                     className="flex-1 py-3 rounded-full font-medium shadow-md shadow-amber-200 flex items-center justify-center gap-2 bg-amber-600 text-white hover:bg-amber-700"
//                   >
//                     <span>Book Now</span>
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                   <button className="px-5 py-3 border border-stone-200 rounded-full hover:bg-stone-50 transition text-stone-700 text-sm">
//                     Request Callback
//                   </button>
//                 </div>
//                 {bookingError && (
//                   <div className="mt-2 text-sm text-red-600 bg-red-50 rounded-lg p-2 text-center">
//                     {bookingError}
//                   </div>
//                 )}

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
//                   <Phone className="w-3 h-3 inline" /> Priority support included
//                 </div>
//               </div>

//               <div className="bg-white/40 rounded-xl p-4 border border-amber-100/30 text-center text-sm text-stone-500">
//                 🎉 Free consultation • No hidden charges • Easy rescheduling
//               </div>
//             </motion.div>
//           </div>

//           <RelatedServicesSection
//             currentServiceId={service._id}
//             currentParentId={service.parentId}
//           />

//           <div className="mt-20 pt-8 border-t border-amber-100/50 grid md:grid-cols-3 gap-6 text-center">
//             <div className="flex flex-col items-center gap-2">
//               <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center">
//                 <Clock className="w-6 h-6 text-amber-600" />
//               </div>
//               <p className="font-medium">Flexible Scheduling</p>
//               <p className="text-sm text-stone-400">Book at your convenience</p>
//             </div>
//             <div className="flex flex-col items-center gap-2">
//               <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center">
//                 <Phone className="w-6 h-6 text-amber-600" />
//               </div>
//               <p className="font-medium">Priority Support</p>
//               <p className="text-sm text-stone-400">Dedicated 24/7 concierge</p>
//             </div>
//             <div className="flex flex-col items-center gap-2">
//               <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center">
//                 <MapPin className="w-6 h-6 text-amber-600" />
//               </div>
//               <p className="font-medium">Pan‑India Coverage</p>
//               <p className="text-sm text-stone-400">Available in all major cities</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// ServiceDetails.jsx
import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import { 
  ArrowLeft, Star, ShieldCheck, Clock, CreditCard, 
  Gem, ChevronRight, CheckCircle, Phone, MapPin, ListChecks,
  Undo2, History, Plus, Minus
} from "lucide-react";
import API from "../api/axios";
import RelatedServicesSection from "../components/services/RelatedServicesSection";
import Navbar from "../components/layout/Navbar";
import {
  setService,
  setPriceOptions,
  setSelectedPriceOption,
  setSelectedOptions,
  setTotalPrice,
  setSelectedMultiOptions,
  setCustomSelectedPrice,
  selectSelectedMultiOptions,
  selectSelectedOptions,
  selectSelectedItemsSummary,
  selectPreviousItemsSummary,
  selectSelectionDiff,
  selectHasPreviousSelections,
  selectSelectionHistory,
  selectGlobalSelectionHistory,
  revertToPreviousSelections,
  clearSelectionHistory,
  persistToLocalStorage,
  selectCurrentServiceId,
  selectSelectionsByService,
} from "../store/bookingSlice";

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
  const hasInitialized = useRef(false);

  const [service, setServiceState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localSingle, setLocalSingle] = useState({});
  const [localMulti, setLocalMulti] = useState({});
  const [localTotal, setLocalTotal] = useState(null);
  const [bookingError, setBookingError] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const currentServiceId = useSelector(selectCurrentServiceId);
  const selectionsByService = useSelector(selectSelectionsByService);

  const reduxSelectedSingle = useSelector(selectSelectedOptions);
  const reduxSelectedMulti = useSelector(selectSelectedMultiOptions);
  const selectedItemsSummary = useSelector(selectSelectedItemsSummary);
  const previousItemsSummary = useSelector(selectPreviousItemsSummary);
  const selectionDiff = useSelector(selectSelectionDiff);
  const hasPreviousSelections = useSelector(selectHasPreviousSelections);
  const selectionHistory = useSelector(selectSelectionHistory);
  const globalHistory = useSelector(selectGlobalSelectionHistory);

  // Group selected items by option category
  const groupedSelectedItems = useMemo(() => {
    if (!service?.options) return {};
    const groups = {};
    const findOptionName = (label) => {
      for (let i = 0; i < service.options.length; i++) {
        const opt = service.options[i];
        const match = opt.values.find(v => v.label === label);
        if (match) return opt.optionName || opt.name || `Option ${i + 1}`;
      }
      return "Previous";
    };
    selectedItemsSummary.forEach(item => {
      const category = findOptionName(item.label);
      if (!groups[category]) groups[category] = [];
      groups[category].push(item);
    });
    return groups;
  }, [selectedItemsSummary, service]);

  // Group previous selected items
  const groupedPreviousItems = useMemo(() => {
    if (!service?.options) return {};
    const groups = {};
    const findOptionName = (label) => {
      for (let i = 0; i < service.options.length; i++) {
        const opt = service.options[i];
        const match = opt.values.find(v => v.label === label);
        if (match) return opt.optionName || opt.name || `Option ${i + 1}`;
      }
      return "Previous";
    };
    previousItemsSummary.forEach(item => {
      const category = findOptionName(item.label);
      if (!groups[category]) groups[category] = [];
      groups[category].push(item);
    });
    return groups;
  }, [previousItemsSummary, service]);

  // Fetch service and initialize local state
  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/client/send-services-client/${id}`);
        const result = response.data;
        if (!result.success) throw new Error(result.message || "Not found");
        const svc = result.data;
        setServiceState(svc);
        dispatch(setService(svc));

        let stdOptions = [];
        if (svc.options?.length) {
          const first = svc.options[0];
          if (!first.multiSelect) stdOptions = first.values || [];
        } else if (svc.price != null) {
          stdOptions = [{ label: "Standard", price: svc.price }];
        }
        dispatch(setPriceOptions(stdOptions));

        if (!hasInitialized.current && svc.options) {
          const initSingle = {};
          const initMulti = {};
          
          // Get saved selections directly from the rehydrated map for THIS service
          const savedSelections = selectionsByService[id] || {};
          const hasSaved = Object.keys(savedSelections).length > 0;
          
          svc.options.forEach((opt, idx) => {
            const isMulti = idx === 0 ? true : opt.multiSelect === true;
            if (isMulti) {
              // Priority: 1. Saved selections for this specific service ID, 2. Current active Redux (if IDs match), 3. Empty
              const savedVals = savedSelections.selectedMultiOptions?.[idx];
              initMulti[idx] = savedVals || ((currentServiceId === id) ? reduxSelectedMulti[idx] : []) || [];
            } else {
              const savedVal = savedSelections.selectedOptions?.[idx];
              initSingle[idx] = savedVal || ((currentServiceId === id) ? reduxSelectedSingle[idx] : null) || (opt.values?.[0] || null);
            }
          });
          setLocalSingle(initSingle);
          setLocalMulti(initMulti);
          hasInitialized.current = true;
        } else if (!hasInitialized.current && svc.price) {
          // Flat rate service - auto select the standard price
          dispatch(setSelectedPriceOption({ label: "Standard", price: svc.price, isStandard: true }));
          hasInitialized.current = true;
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      hasInitialized.current = false; // Reset for new service
      fetchService();
    }
  }, [id, dispatch]);

  // Recalculate total and sync to Redux
  useEffect(() => {
    if (!service) return;
    let total = 0;
    Object.values(localSingle).forEach(v => {
      if (v?.price) total += v.price;
    });
    Object.values(localMulti).forEach(arr =>
      arr.forEach(v => {
        if (v?.price) total += v.price;
      })
    );
    const hasOptions = service.options?.length > 0;
    if (hasOptions) {
      setLocalTotal(total);
      // No longer auto-dispatching to Redux here to avoid adding to cart before "Book Now"
    } else if (service.price > 0) {
      setLocalTotal(service.price);
    }
  }, [localSingle, localMulti, service, dispatch]);

  // Clear booking error when selections change
  useEffect(() => {
    if (bookingError) setBookingError("");
  }, [localSingle, localMulti, bookingError]);

  const handleSingleChange = (idx, val) =>
    setLocalSingle(prev => ({ ...prev, [idx]: val }));
  
  const handleMultiChange = (idx, val, checked) => {
    setLocalMulti(prev => {
      const current = prev[idx] || [];
      const newVals = checked
        ? [...current, val]
        : current.filter(v => v.label !== val.label);
      return { ...prev, [idx]: newVals };
    });
  };

  const handleUndo = () => {
    dispatch(revertToPreviousSelections());
    // The useEffect will handle syncing Redux back to local state
  };

  const handleClearHistory = () => {
    dispatch(clearSelectionHistory());
    setShowHistory(false);
  };

  const handleBookNow = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const hasOptions = service?.options?.length > 0;
    if (hasOptions) {
      const selectedCount =
        Object.values(localSingle).filter(v => v != null).length +
        Object.values(localMulti).reduce((acc, arr) => acc + arr.length, 0);
      if (selectedCount === 0) {
        setBookingError("❌ Please select at least one option before booking.");
        return;
      }

      // NOW we officially sync to Redux and persist
      dispatch(setSelectedOptions(localSingle));
      dispatch(setSelectedMultiOptions(localMulti));
      dispatch(setTotalPrice(localTotal));
      
      const labels = [
        ...Object.values(localSingle).map(v => v?.label),
        ...Object.values(localMulti).flat().map(v => v?.label),
      ].filter(Boolean);
      // const customLabel = `Custom Package (${labels.join(" + ")})`;
      // const customPkg = { label: customLabel, price: localTotal, isCustom: true };
      // dispatch(setCustomSelectedPrice(customPkg));
      // dispatch(setSelectedPriceOption(customPkg));
      
    } else if (service.price > 0) {
      // Flat rate service
      dispatch(setTotalPrice(service.price));
      dispatch(setSelectedPriceOption({ label: service.name, price: service.price, isStandard: true }));
    }
    
    // Final persistence
    dispatch(persistToLocalStorage());
    setBookingError("");
    
    // Using setTimeout to give browser/extensions time to handle the message channel 
    // before the component unmounts and navigates.
    setTimeout(() => {
      navigate(`/booking/${id}`);
    }, 0);
  };

  if (loading) return <DetailsSkeleton />;
  if (error || !service)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Gem className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-serif">Service Unavailable</h2>
          <p className="text-stone-500">{error || "Not found"}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-full"
          >
            Go Back
          </button>
        </div>
      </div>
    );

  const hasOptions = service.options?.length > 0;
  const hasKeyFeatures = service.keyFeatures?.length > 0;

  return (
    <div className="relative">
      <div className="relative z-50">
        <Navbar />
      </div>
      <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/5 to-stone-50/30 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-stone-500 hover:text-amber-600 mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
            <span className='text-lg font-medium text-stone-800'>Back to catalogue</span>
          </button>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* LEFT COLUMN – images & details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
               <h1 className="text-3xl md:text-4xl font-serif font-light text-[#032042ff]">
                  {service.name}
                </h1>
              <div className="aspect-square rounded-2xl overflow-hidden bg-stone-100 shadow-sm">
                
                <img
                  src={service.images?.[0]}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {service.images?.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {service.images.slice(1, 4).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt=""
                      className="w-24 h-24 rounded-lg object-cover border border-amber-100 cursor-pointer hover:opacity-80"
                    />
                  ))}
                </div>
              )}
              <div>
                {/* <h1 className="text-3xl md:text-4xl font-serif font-light text-stone-800">
                  {service.name}
                </h1> */}
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 bg-stone-100 px-3 py-1.5 rounded-full">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{service.rating || "4.9"}</span>
                    <span className="text-xs text-stone-400">
                      ({service.totalReviews || 0} reviews)
                    </span>
                  </div>
                  {service.duration && (
                    <div className="text-sm text-stone-500 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration}</span>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-stone-600 leading-relaxed">
                {service.description ||
                  "Exceptional service crafted with meticulous attention to detail."}
              </p>
              {hasKeyFeatures && (
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-amber-100/50">
                  <div className="flex items-center gap-2 mb-3">
                    <ListChecks className="w-5 h-5 text-amber-600" />
                    <h3 className="font-serif text-lg">Key Features</h3>
                  </div>
                  <ul className="space-y-2">
                    {service.keyFeatures.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-stone-600"
                      >
                        <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5" />
                        <span className="text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CUSTOMER REVIEWS */}
              {service.feedbacks && service.feedbacks.length > 0 && (
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-100/50">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-600 fill-amber-600" />
                      <h3 className="font-serif text-xl">Customer Reviews</h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                      <span className="font-bold text-amber-700">{service.rating}</span>
                      <span className="text-stone-400">/ 5.0</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {service.feedbacks.map((fb, idx) => (
                      <div key={idx} className="border-b border-stone-100 last:border-0 pb-6 last:pb-0 group">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-stone-100 flex items-center justify-center text-amber-700 font-bold text-sm border border-white shadow-sm">
                              {fb.author.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-stone-800 text-sm group-hover:text-amber-700 transition-colors">
                                {fb.author}
                              </p>
                              <div className="flex items-center gap-0.5 mt-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < fb.rating
                                        ? "text-amber-400 fill-amber-400"
                                        : "text-stone-200 fill-stone-200"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] text-stone-400 font-medium uppercase tracking-wider">
                            {new Date(fb.createdAt).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="relative">
                          <p className="text-sm text-stone-600 italic leading-relaxed pl-4 border-l-2 border-amber-100 group-hover:border-amber-400 transition-colors">
                            "{fb.review}"
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* RIGHT COLUMN – options */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-100/50 sticky top-25">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-serif text-xl text-stone-800">
                    Pricing & Options
                  </h3>
                  {/* {hasPreviousSelections && (
                    <button
                      onClick={handleUndo}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition"
                    >
                      <Undo2 className="w-4 h-4" />
                      Undo
                    </button>
                  )} */}
                </div>
                
                {hasOptions ? (
                  <>
                    {service.options.map((opt, idx) => {
                      const isMulti = idx === 0 ? true : opt.multiSelect === true;
                      const selectedSingle = localSingle[idx];
                      const selectedMulti = localMulti[idx] || [];
                      return (
                        <div key={idx} className="mb-5 last:mb-0">
                          <label className="font-medium text-stone-700 block mb-2">
                            {opt.optionName || opt.name}
                            {idx === 0 && (
                              <span className="ml-2 text-xs text-amber-600">
                                (choose any combination)
                              </span>
                            )}
                          </label>
                          <div className="grid grid-cols-1 gap-2">
                            {opt.values.map((val, vIdx) => {
                              if (isMulti) {
                                const checked = selectedMulti.some(
                                  v => v.label === val.label
                                );
                                return (
                                  <label
                                    key={vIdx}
                                    className="flex items-center justify-between p-3 rounded-xl border border-stone-200 hover:border-amber-300 cursor-pointer transition"
                                  >
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={e =>
                                          handleMultiChange(idx, val, e.target.checked)
                                        }
                                        className="w-4 h-4 text-amber-600 rounded"
                                      />
                                      <span>{val.label}</span>
                                    </div>
                                    <span className="font-semibold text-amber-700">
                                      ₹{val.price.toLocaleString()}
                                    </span>
                                  </label>
                                );
                              } else {
                                const isSelected = selectedSingle?.label === val.label;
                                return (
                                  <button
                                    key={vIdx}
                                    onClick={() => handleSingleChange(idx, val)}
                                    className={`flex justify-between items-center p-3 rounded-xl transition-all ${
                                      isSelected
                                        ? "bg-amber-100 border-2 border-amber-500"
                                        : "bg-stone-50 border border-stone-200 hover:border-amber-300"
                                    }`}
                                  >
                                    <span>{val.label}</span>
                                    <span className="font-semibold text-amber-700">
                                      ₹{val.price.toLocaleString()}
                                    </span>
                                  </button>
                                );
                              }
                            })}
                          </div>
                        </div>
                      );
                    })}
                    
                    <div className="pt-4 mt-4 border-t border-amber-100">
                      <div className="flex justify-between items-center">
                        <span className="text-stone-600 font-medium">
                          Total Price
                        </span>
                        <span className="text-3xl font-serif font-bold text-amber-700">
                          {localTotal !== null
                            ? `₹${localTotal.toLocaleString()}`
                            : "Select options"}
                        </span>
                      </div>
                    </div>

                    {/* Selection Changes Display */}
                    {/* {hasPreviousSelections && (selectionDiff.added.length > 0 || selectionDiff.removed.length > 0) && (
                      <div className="mt-4 bg-amber-50/60 rounded-xl p-3 border border-amber-100">
                        <p className="text-xs font-semibold text-stone-600 mb-2 flex items-center gap-1">
                          <History className="w-3 h-3" />
                          Recent Changes
                        </p>
                        {selectionDiff.added.length > 0 && (
                          <div className="mb-2">
                            {selectionDiff.added.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-green-700">
                                <Plus className="w-3 h-3" />
                                <span>Added: {item.label}</span>
                                <span className="text-xs">+₹{item.price}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {selectionDiff.removed.length > 0 && (
                          <div>
                            {selectionDiff.removed.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-red-600">
                                <Minus className="w-3 h-3" />
                                <span>Removed: {item.label}</span>
                                <span className="text-xs">-₹{item.price}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )} */}

                    {/* Current Selected Options */}
                    {/* <div className="mt-6 bg-amber-50/40 rounded-xl p-4 border border-amber-100">
                      <h4 className="font-serif text-lg text-stone-800 flex items-center gap-2 mb-3">
                        <CheckCircle className="w-5 h-5 text-amber-600" />
                        Current Selection
                      </h4>
                      {selectedItemsSummary.length === 0 ? (
                        <div className="text-center py-4 text-stone-400 text-sm">
                          ✨ No options selected yet<br />
                          Choose from the list above
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {Object.entries(groupedSelectedItems).map(
                            ([category, items]) => (
                              <div key={category}>
                                <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1">
                                  {category}
                                </p>
                                <ul className="space-y-1">
                                  {items.map((item, idx) => (
                                    <li
                                      key={idx}
                                      className="flex justify-between text-sm text-stone-700"
                                    >
                                      <span>{item.label}</span>
                                      <span className="font-medium text-amber-600">
                                        ₹{item.price.toLocaleString()}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )
                          )}
                          <div className="pt-2 border-t border-amber-200 flex justify-between font-bold text-stone-800">
                            <span>Total</span>
                            <span className="text-amber-700">
                              ₹
                              {selectedItemsSummary
                                .reduce((s, i) => s + i.price, 0)
                                .toLocaleString()}
                            </span>
                          </div>
                        </div>
                      )}
                    </div> */}
                  </>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-baseline gap-2 pb-3">
                      <span className="text-3xl font-serif font-semibold text-amber-700">
                        ₹{service.price?.toLocaleString() || "Custom"}
                      </span>
                      <span className="text-stone-400">flat rate</span>
                    </div>
                  </div>
                )}

                {/* Previous Selection - Moved outside hasOptions */}
                {/* {hasPreviousSelections && previousItemsSummary.length > 0 && (
                  <div className="mt-3 bg-stone-50/80 rounded-xl p-4 border border-stone-200">
                    <h4 className="font-serif text-md text-stone-600 flex items-center gap-2 mb-2">
                      <History className="w-4 h-4 text-stone-500" />
                      Previous Selection
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(groupedPreviousItems).map(
                        ([category, items]) => (
                          <div key={category}>
                            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">
                              {category}
                            </p>
                            <ul className="space-y-1">
                              {items.map((item, idx) => (
                                <li
                                  key={idx}
                                  className="flex justify-between text-sm text-stone-500 line-through"
                                >
                                  <span>{item.label}</span>
                                  <span className="font-medium">
                                    ₹{item.price.toLocaleString()}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )} */}

                {/* History Toggle Button - Moved outside hasOptions */}
                {/* {(selectionHistory.length > 0 || globalHistory.length > 0) && (
                  <div className="mt-3">
                    <button
                      onClick={() => setShowHistory(!showHistory)}
                      className="text-xs text-stone-500 hover:text-amber-600 flex items-center gap-1"
                    >
                      <History className="w-3 h-3" />
                      {showHistory ? "Hide" : "Show"} Recent Activity ({globalHistory.length})
                    </button>
                    
                    {showHistory && (
                      <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Activity Log</p>
                        {globalHistory.slice(0, 10).map((entry, idx) => {
                          const isCurrentService = entry.serviceId === id;
                          return (
                            <div key={idx} className={`text-xs p-2 rounded border ${isCurrentService ? 'bg-amber-50/50 border-amber-100' : 'bg-white border-stone-100 opacity-80'}`}>
                              <div className="flex justify-between text-stone-500">
                                <span className={`capitalize font-medium ${isCurrentService ? 'text-amber-700' : 'text-stone-600'}`}>
                                  {isCurrentService ? entry.type : `Other Service`} Selection
                                </span>
                                <span>{new Date(entry.timestamp).toLocaleTimeString()}</span>
                              </div>
                              <div className="text-stone-500 mt-0.5 text-[10px]">
                                {isCurrentService ? 'Updated options for this service' : 'Previously visited another service'}
                              </div>
                            </div>
                          );
                        })}
                        <button
                          onClick={handleClearHistory}
                          className="text-xs text-red-500 hover:text-red-600 mt-2 w-full text-center"
                        >
                          Clear All History
                        </button>
                      </div>
                    )}
                  </div>
                )} */}

                {/* Book Now button */}
                <div className="flex flex-wrap gap-4 mt-6">
                  <button
                    onClick={(e) => handleBookNow(e)}
                    className="flex-1 py-3 rounded-full font-medium shadow-md shadow-amber-200 flex items-center justify-center gap-2 bg-amber-600 text-white hover:bg-amber-700 transition"
                  >
                    <span>Book Now</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button className="px-5 py-3 border border-stone-200 rounded-full hover:bg-stone-50 transition text-stone-700 text-sm">
                    Request Callback
                  </button>
                </div>
                {bookingError && (
                  <div className="mt-2 text-sm text-red-600 bg-red-50 rounded-lg p-2 text-center">
                    {bookingError}
                  </div>
                )}

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
                  <Phone className="w-3 h-3 inline" /> Priority support included
                </div>
              </div>

              <div className="bg-white/40 rounded-xl p-4 border border-amber-100/30 text-center text-sm text-stone-500">
                🎉 Free consultation • No hidden charges • Easy rescheduling
              </div>
            </motion.div>
          </div>

          <RelatedServicesSection
            currentServiceId={service._id}
            currentParentId={service.parentId}
          />

          <div className="mt-20 pt-8 border-t border-amber-100/50 grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <p className="font-medium">Flexible Scheduling</p>
              <p className="text-sm text-stone-400">Book at your convenience</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-amber-600" />
              </div>
              <p className="font-medium">Priority Support</p>
              <p className="text-sm text-stone-400">Dedicated 24/7 concierge</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-amber-600" />
              </div>
              <p className="font-medium">Pan‑India Coverage</p>
              <p className="text-sm text-stone-400">Available in all major cities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}