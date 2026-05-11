// // BookingSlot.jsx
// import { useState, useEffect, useRef, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector, shallowEqual } from "react-redux";
// import {
//   ArrowLeft, CheckCircle, Clock, MapPin, Phone, Mail, User, Calendar,
//   ChevronRight, ChevronLeft, CreditCard, Edit2, AlertCircle, XCircle
// } from "lucide-react";
// import {
//   setService,
//   setPriceOptions,
//   setSelectedPriceOption,
//   setSelectedDate,
//   setAvailableTimeSlots,
//   setSelectedSlot,
//   setAllTimeSlots,
//   setLoadingSlots,
//   setSlotError,
//   setIsDateFullyBooked,
//   setCustomerField,
//   setValidationError,
//   setValidationErrors,
//   setTouched,
//   setAllTouched,
//   nextStep,
//   previousStep,
//   setBookingSummary,
//   persistToLocalStorage,
//   loadFromLocalStorage,
//   selectService,
//   selectPriceOptions,
//   selectSelectedPriceOption,
//   selectSelectedDate,
//   selectAvailableTimeSlots,
//   selectSelectedSlot,
//   selectAllTimeSlots,
//   selectLoadingSlots,
//   selectSlotError,
//   selectIsDateFullyBooked,
//   selectCustomer,
//   selectValidationErrors,
//   selectTouched,
//   selectCurrentStep,
//   selectCanProceedToStep2,
//   selectCanConfirm,
//   selectSelectedOptions,
//   selectSelectedMultiOptions,
//   selectSelectedItemsSummary,
//   selectTotalPriceComputed,
// } from "../../store/bookingSlice";

// const DEFAULT_SLOTS = ["09:00-10:00", "12:00-13:00", "15:00-16:00", "17:00-18:00"];

// const formatTimeRange = (range) => {
//   if (!range) return "";
//   const [s, e] = range.split("-");
//   const f = (t) => {
//     let [h, m] = t.split(":");
//     h = parseInt(h);
//     const ampm = h >= 12 ? "PM" : "AM";
//     const hh = h % 12 || 12;
//     return `${hh}:${m} ${ampm}`;
//   };
//   return `${f(s)} - ${f(e)}`;
// };

// const formatDateDisplay = (dateString) => {
//   if (!dateString) return "";
//   const d = new Date(dateString);
//   return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
// };

// const isTimeSlotOutdated = (slotTime, date) => {
//   if (!date || !slotTime) return false;
//   const now = new Date();
//   const selected = new Date(date);
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);
//   if (selected < today) return true;
//   if (selected.toDateString() === today.toDateString()) {
//     const [start] = slotTime.split("-");
//     const [h, m] = start.split(":");
//     const slotDateTime = new Date(date);
//     slotDateTime.setHours(parseInt(h), parseInt(m), 0, 0);
//     return slotDateTime < now;
//   }
//   return false;
// };

// export default function BookingSlot() {
//   const { serviceId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const service = useSelector(selectService, shallowEqual);
//   const priceOptions = useSelector(selectPriceOptions, shallowEqual);
//   const selectedPriceOption = useSelector(selectSelectedPriceOption, shallowEqual);
//   const selectedDate = useSelector(selectSelectedDate);
//   const availableTimeSlots = useSelector(selectAvailableTimeSlots, shallowEqual);
//   const selectedSlot = useSelector(selectSelectedSlot, shallowEqual);
//   const allTimeSlots = useSelector(selectAllTimeSlots, shallowEqual);
//   const loadingSlots = useSelector(selectLoadingSlots);
//   const slotError = useSelector(selectSlotError);
//   const customer = useSelector(selectCustomer, shallowEqual);
//   const validationErrors = useSelector(selectValidationErrors, shallowEqual);
//   const touched = useSelector(selectTouched, shallowEqual);
//   const currentStep = useSelector(selectCurrentStep);
//   const canProceed = useSelector(selectCanProceedToStep2);
//   const canConfirm = useSelector(selectCanConfirm);
//   const selectedOptions = useSelector(selectSelectedOptions, shallowEqual);
//   const selectedMultiOptions = useSelector(selectSelectedMultiOptions, shallowEqual);
//   const selectedItemsSummary = useSelector(selectSelectedItemsSummary);
//   const computedTotalPrice = useSelector(selectTotalPriceComputed);

//   const [autoAddressLoading, setAutoAddressLoading] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [hasCustomPackage, setHasCustomPackage] = useState(false);

//   const hasFetchedServiceRef = useRef(false);
//   const hasFetchedAllSlotsRef = useRef(false);
//   const isSlotLoadingRef = useRef(false);
//   const lastSelectedDateRef = useRef(null);

//   const hasAnySelections = selectedItemsSummary.length > 0;

//   // validation functions (same as before)
//   const validateName = useCallback((name) => {
//     if (!name?.trim()) return "Full name is required";
//     if (name.trim().length < 2) return "Name must be at least 2 characters";
//     if (name.trim().length > 50) return "Name too long";
//     if (!/^[a-zA-Z\s\-']+$/.test(name.trim())) return "Invalid characters";
//     return "";
//   }, []);
//   const validatePhone = useCallback((phone) => {
//     if (!phone?.trim()) return "Phone number is required";
//     const clean = phone.replace(/\D/g, "");
//     if (clean.length < 10) return "At least 10 digits";
//     if (clean.length > 15) return "Too many digits";
//     if (!/^[0-9+\-\s()]+$/.test(phone)) return "Invalid characters";
//     return "";
//   }, []);
//   const validateEmail = useCallback((email) => {
//     if (!email?.trim()) return "Email is required";
//     const re = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
//     if (!re.test(email.trim())) return "Enter a valid email";
//     if (email.trim().length > 100) return "Too long";
//     return "";
//   }, []);
//   const validateAddress = useCallback((addr) => {
//     if (!addr?.trim()) return "Address is required";
//     if (addr.trim().length < 5) return "Address too short";
//     if (addr.trim().length > 500) return "Address too long";
//     return "";
//   }, []);

//   // fetch service once
//   useEffect(() => {
//     if (hasFetchedServiceRef.current) return;
//     hasFetchedServiceRef.current = true;
//     const fetchService = async () => {
//       try {
//         const res = await fetch(`http://localhost:12000/client/send-services-client/${serviceId}`);
//         const data = await res.json();
//         //console.log(data)
//         if (data.success) {
//           dispatch(setService(data.data));
//           let stdOptions = [];
//           if (data.data.options?.length) {
//             const firstGroup = data.data.options[0];
//             if (!firstGroup.multiSelect) stdOptions = firstGroup.values || [];
//           } else if (data.data.price != null) {
//             stdOptions = [{ label: data.data.name, price: data.data.price }];
//           }
//           dispatch(setPriceOptions(stdOptions));
//         } else setError("Service not found");
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     dispatch(loadFromLocalStorage());
//     fetchService();
//   }, [serviceId, dispatch]);

//   // update custom package flag when selections change (after mount)
//   useEffect(() => {
//     setHasCustomPackage(hasAnySelections || selectedPriceOption?.isCustom);
//   }, [hasAnySelections, selectedPriceOption?.isCustom]);

//   // fetch all time slots once
//   useEffect(() => {
//     if (hasFetchedAllSlotsRef.current) return;
//     hasFetchedAllSlotsRef.current = true;
//     const fetchAllSlots = async () => {
//       try {
//         const res = await fetch(`http://localhost:12000/client/send-time-slot/${serviceId}`);
//         const data = await res.json();
//         dispatch(setAllTimeSlots(data?.data || []));
//       } catch (err) {
//         console.error(err);
//         dispatch(setAllTimeSlots([]));
//       }
//     };
//     fetchAllSlots();
//   }, [serviceId, dispatch]);

//   // load slots for selected date
//   useEffect(() => {
//     if (!selectedDate) return;
//     if (lastSelectedDateRef.current === selectedDate && isSlotLoadingRef.current) return;
//     lastSelectedDateRef.current = selectedDate;
//     if (isSlotLoadingRef.current) return;
//     const loadSlotsForDate = async () => {
//       isSlotLoadingRef.current = true;
//       dispatch(setLoadingSlots(true));
//       dispatch(setSlotError(null));
//       dispatch(setSelectedSlot(null));
//       dispatch(setIsDateFullyBooked(false));
//       try {
//         const dayData = allTimeSlots.find(
//           (slot) => new Date(slot.date).toISOString().split("T")[0] === selectedDate
//         );
//         let formatted = [];
//         if (!dayData) {
//           formatted = DEFAULT_SLOTS.map(t => ({
//             time: t, capacity: 5, isDefault: true,
//             isOutdated: isTimeSlotOutdated(t, selectedDate)
//           }));
//           dispatch(setAvailableTimeSlots(formatted));
//           const firstValid = formatted.find(s => !s.isOutdated);
//           if (firstValid) dispatch(setSelectedSlot(firstValid));
//           return;
//         }
//         if (dayData.isBlocked) {
//           dispatch(setAvailableTimeSlots([]));
//           dispatch(setIsDateFullyBooked(true));
//           dispatch(setSlotError("This day is not available for booking."));
//           return;
//         }
//         if (!dayData.slots?.length) {
//           dispatch(setAvailableTimeSlots([]));
//           dispatch(setSlotError("No slots available for this date."));
//           return;
//         }
//         const available = dayData.slots.filter(s => (s.capacity ?? 0) > 0);
//         if (!available.length) {
//           dispatch(setAvailableTimeSlots([]));
//           dispatch(setSlotError("All slots are fully booked."));
//           return;
//         }
//         formatted = available.map(s => ({
//           time: s.time, capacity: s.capacity, isDefault: false,
//           isOutdated: isTimeSlotOutdated(s.time, selectedDate)
//         }));
//         dispatch(setAvailableTimeSlots(formatted));
//         const firstValid = formatted.find(s => !s.isOutdated);
//         if (firstValid) dispatch(setSelectedSlot(firstValid));
//         if (formatted.length && !firstValid) {
//           dispatch(setSlotError("All available slots for today have passed."));
//         }
//       } catch (err) {
//         dispatch(setSlotError("Error loading slots."));
//       } finally {
//         dispatch(setLoadingSlots(false));
//         isSlotLoadingRef.current = false;
//       }
//     };
//     loadSlotsForDate();
//   }, [selectedDate, serviceId, dispatch]);

//   // auto-save
//   useEffect(() => {
//     if (selectedPriceOption || selectedDate || selectedSlot || customer.name) {
//       dispatch(persistToLocalStorage());
//     }
//   }, [selectedPriceOption, selectedDate, selectedSlot, customer, dispatch]);

//   // handlers
//   const handleInputChange = useCallback((field, value) => {
//     dispatch(setCustomerField({ field, value }));
//     dispatch(setTouched({ field, value: true }));
//     let err = "";
//     if (field === "name") err = validateName(value);
//     else if (field === "phone") err = validatePhone(value);
//     else if (field === "email") err = validateEmail(value);
//     else if (field === "address") err = validateAddress(value);
//     dispatch(setValidationError({ field, error: err }));
//   }, [dispatch, validateName, validatePhone, validateEmail, validateAddress]);

//   const handleSlotSelection = useCallback((slot) => {
//     if (slot.isOutdated) return alert("This time slot has already passed.");
//     dispatch(setSelectedSlot(slot));
//   }, [dispatch]);

//   const fetchCurrentAddress = useCallback(() => {
//     if (!navigator.geolocation) return alert("Geolocation not supported");
//     setAutoAddressLoading(true);
//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {
//         const { latitude, longitude } = pos.coords;
//         try {
//           const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
//           const data = await res.json();
//           const addr = data.display_name || `${latitude}, ${longitude}`;
//           dispatch(setCustomerField({ field: "address", value: addr }));
//           dispatch(setTouched({ field: "address", value: true }));
//           dispatch(setValidationError({ field: "address", error: "" }));
//         } catch (err) {
//           alert("Could not fetch address.");
//         } finally {
//           setAutoAddressLoading(false);
//         }
//       },
//       () => {
//         alert("Location permission denied.");
//         setAutoAddressLoading(false);
//       }
//     );
//   }, [dispatch]);

//   const handleNext = useCallback(() => {
//     if (currentStep === 1 && canProceed) dispatch(nextStep());
//     else if (currentStep === 1 && selectedSlot?.isOutdated) alert("Please select a valid time slot");
//     else if (currentStep === 1) alert("Complete all selections");
//   }, [currentStep, canProceed, selectedSlot, dispatch]);

//   const handlePrevious = useCallback(() => dispatch(previousStep()), [dispatch]);

//   const handleConfirmBooking = useCallback(() => {
//     dispatch(setAllTouched());
//     const nameErr = validateName(customer.name);
//     const phoneErr = validatePhone(customer.phone);
//     const emailErr = validateEmail(customer.email);
//     const addrErr = validateAddress(customer.address);
//     dispatch(setValidationErrors({ name: nameErr, phone: phoneErr, email: emailErr, address: addrErr }));
//     if (nameErr || phoneErr || emailErr || addrErr) {
//       document.querySelector(".error-message")?.scrollIntoView({ behavior: "smooth", block: "center" });
//       return;
//     }
//     const finalTotal = computedTotalPrice > 0 ? computedTotalPrice : (selectedPriceOption?.price || 0);
//     const payload = {
//       serviceId: service._id,
//       serviceName: service.name,
//       selectedOption: selectedPriceOption,
//       selectedOptions,
//       selectedMultiOptions,
//       totalPrice: finalTotal,
//       selectedDate,
//       selectedSlot,
//       customer: { ...customer },
//       bookingDate: new Date().toISOString(),
//       status: "pending",
//       formattedDate: formatDateDisplay(selectedDate),
//       formattedTime: selectedSlot ? formatTimeRange(selectedSlot.time) : null,
//     };
//     dispatch(setBookingSummary(payload));
//     const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
//     existing.push({ ...payload, bookingId: Date.now() });
//     localStorage.setItem("bookings", JSON.stringify(existing));
//     alert("Booking confirmed!");
//     navigate("/booking-success", { state: { booking: payload } });
//   }, [dispatch, validateName, validatePhone, validateEmail, validateAddress, customer, service, selectedPriceOption, selectedOptions, selectedMultiOptions, computedTotalPrice, selectedDate, selectedSlot, navigate]);

//   if (loading) {
//     return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div></div>;
//   }
//   if (error || !service) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-center">
//         <div>
//           <Calendar className="w-12 h-12 text-red-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-serif">Booking Unavailable</h2>
//           <p className="text-stone-500">{error || "Service not found"}</p>
//           <button onClick={() => navigate(-1)} className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-full">Go Back</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/5 to-stone-50/30">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
//         <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-stone-500 hover:text-amber-600 mb-8 group">
//           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
//           <span>Back to service</span>
//         </button>
//         <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
//           {/* LEFT COLUMN – Steps */}
//           <div className="space-y-6">
//             {currentStep === 1 && (
//               <div>
//                 <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-100/50">
//                   <h2 className="text-2xl font-serif text-stone-800 mb-4 flex items-center gap-2">
//                     <CreditCard className="w-5 h-5 text-amber-500" />
//                     1. Choose your plan
//                   </h2>
//                   {(hasCustomPackage || hasAnySelections) && (
//                     <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
//                       <div className="flex justify-between items-center mb-3">
//                         <span className="font-semibold">Your Custom Selection</span>
//                         <button onClick={() => navigate(`/service/${serviceId}`)} className="text-xs text-amber-600 hover:text-amber-700 flex items-center gap-1">
//                           <Edit2 className="w-3 h-3" />
//                           Edit
//                         </button>
//                       </div>
//                       <div className="space-y-2">
//                         {selectedItemsSummary.map((item, idx) => (
//                           <div key={idx} className="flex justify-between text-sm">
//                             <span>{item.label}</span>
//                             <span className="text-amber-600 font-medium">+₹{item.price.toLocaleString()}</span>
//                           </div>
//                         ))}
//                       </div>
//                       <div className="pt-2 mt-2 border-t border-amber-200 flex justify-between font-bold">
//                         <span>Total</span>
//                         <span className="text-amber-700 text-lg">₹{computedTotalPrice.toLocaleString()}</span>
//                       </div>
//                     </div>
//                   )}
//                   {!hasAnySelections && (
//                     <div className="grid grid-cols-1 gap-3">
//                       {priceOptions.map((opt, i) => (
//                         <button
//                           key={i}
//                           onClick={() => { dispatch(setSelectedPriceOption(opt)); setHasCustomPackage(false); }}
//                           className={`flex justify-between items-center p-4 rounded-xl border transition-all ${
//                             selectedPriceOption?.label === opt.label && !hasCustomPackage
//                               ? "border-amber-500 bg-amber-50 shadow-sm"
//                               : "border-stone-200 hover:border-amber-300 hover:shadow-md"
//                           }`}
//                         >
//                           <span className="font-medium text-stone-800">{opt.label}</span>
//                           <span className="text-amber-700 font-semibold text-lg">₹{opt.price.toLocaleString()}</span>
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//                 {selectedPriceOption && (
//                   <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-100/50">
//                     <h2 className="text-2xl font-serif text-stone-800 mb-4 flex items-center gap-2">
//                       <Calendar className="w-5 h-5 text-amber-500" />
//                       2. Select date & time
//                     </h2>
//                     <div className="mb-6">
//                       <label className="block text-sm font-medium text-stone-700 mb-2">Choose a date</label>
//                       <input
//                         type="date"
//                         value={selectedDate}
//                         onChange={(e) => dispatch(setSelectedDate(e.target.value))}
//                         className="w-full p-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
//                         min={new Date().toISOString().split("T")[0]}
//                       />
//                     </div>
//                     {selectedDate && (
//                       <div>
//                         <div className="flex justify-between items-center mb-2">
//                           <label className="block text-sm font-medium text-stone-700 flex items-center gap-2">
//                             <Clock className="w-4 h-4 text-amber-500" />
//                             Available time slots
//                           </label>
//                         </div>
//                         {loadingSlots ? (
//                           <div className="text-center py-8">
//                             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto"></div>
//                             <p className="text-stone-500 text-sm mt-2">Loading slots...</p>
//                           </div>
//                         ) : slotError ? (
//                           <div className="text-center py-8 bg-red-50 rounded-xl">{slotError}</div>
//                         ) : availableTimeSlots.length === 0 ? (
//                           <div className="text-center py-8">No slots available</div>
//                         ) : (
//                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                             {availableTimeSlots.map((slot, i) => {
//                               const isSelected = selectedSlot?.time === slot.time;
//                               return (
//                                 <button
//                                   key={i}
//                                   onClick={() => handleSlotSelection(slot)}
//                                   disabled={slot.isOutdated}
//                                   className={`p-3 rounded-xl border text-center transition-all ${
//                                     isSelected && !slot.isOutdated
//                                       ? "border-amber-500 bg-amber-50 shadow-md"
//                                       : slot.isOutdated
//                                       ? "bg-stone-100 opacity-60 cursor-not-allowed"
//                                       : "border-stone-200 hover:border-amber-300"
//                                   }`}
//                                 >
//                                   <Clock className={`w-4 h-4 inline mr-1 ${isSelected && !slot.isOutdated ? "text-amber-600" : ""}`} />
//                                   <span>{formatTimeRange(slot.time)}</span>
//                                   {!slot.isDefault && !slot.isOutdated && (
//                                     <div className="text-xs mt-1">{slot.capacity} slot{slot.capacity !== 1 ? "s" : ""} left</div>
//                                   )}
//                                 </button>
//                               );
//                             })}
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}
//             {currentStep === 2 && (
//               <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-100/50 space-y-5">
//                 <h2 className="text-2xl font-serif text-stone-800 flex items-center gap-2">
//                   <User className="w-5 h-5 text-amber-500" />
//                   Your contact details
//                 </h2>
//                 <div className="space-y-5">
//                   <div>
//                     <label className="block text-sm font-medium text-stone-700 mb-1">Full name <span className="text-red-500">*</span></label>
//                     <div className="relative">
//                       <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
//                       <input
//                         type="text"
//                         className={`w-full pl-10 pr-4 py-3 border rounded-xl ${touched.name && validationErrors.name ? "border-red-500" : "border-stone-200"}`}
//                         value={customer.name}
//                         onChange={(e) => handleInputChange("name", e.target.value)}
//                       />
//                       {touched.name && validationErrors.name && <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />}
//                     </div>
//                     {touched.name && validationErrors.name && <p className="error-message text-red-500 text-xs mt-1">{validationErrors.name}</p>}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-stone-700 mb-1">Phone number <span className="text-red-500">*</span></label>
//                     <div className="relative">
//                       <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
//                       <input
//                         type="tel"
//                         className={`w-full pl-10 pr-4 py-3 border rounded-xl ${touched.phone && validationErrors.phone ? "border-red-500" : "border-stone-200"}`}
//                         value={customer.phone}
//                         onChange={(e) => handleInputChange("phone", e.target.value)}
//                       />
//                       {touched.phone && validationErrors.phone && <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />}
//                     </div>
//                     {touched.phone && validationErrors.phone && <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-stone-700 mb-1">Email address <span className="text-red-500">*</span></label>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
//                       <input
//                         type="email"
//                         className={`w-full pl-10 pr-4 py-3 border rounded-xl ${touched.email && validationErrors.email ? "border-red-500" : "border-stone-200"}`}
//                         value={customer.email}
//                         onChange={(e) => handleInputChange("email", e.target.value)}
//                       />
//                       {touched.email && validationErrors.email && <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />}
//                     </div>
//                     {touched.email && validationErrors.email && <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-stone-700 mb-1">Service address <span className="text-red-500">*</span></label>
//                     <div className="relative">
//                       <MapPin className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
//                       <textarea
//                         rows="3"
//                         className={`w-full pl-10 pr-4 py-3 border rounded-xl ${touched.address && validationErrors.address ? "border-red-500" : "border-stone-200"}`}
//                         value={customer.address}
//                         onChange={(e) => handleInputChange("address", e.target.value)}
//                       />
//                       {touched.address && validationErrors.address && <XCircle className="absolute right-3 top-3 w-4 h-4 text-red-500" />}
//                     </div>
//                     {touched.address && validationErrors.address && <p className="text-red-500 text-xs mt-1">{validationErrors.address}</p>}
//                     <button onClick={fetchCurrentAddress} disabled={autoAddressLoading} className="mt-2 text-sm text-amber-600 hover:underline">
//                       {autoAddressLoading ? "Fetching..." : "📍 Use my current location"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//           {/* RIGHT COLUMN – Summary */}
//           <div className="space-y-6">
//             <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-100/50 sticky top-6">
//               <h3 className="font-serif text-xl text-stone-800 mb-4">Booking Summary</h3>
//               <div className="space-y-3 text-sm">
//                 <div className="flex justify-between"><span>Service:</span><span>{service?.name}</span></div>
//                 {/* <div className="flex justify-between"><span>Plan:</span><span>{}</span></div> */}
//                {hasAnySelections && (
//   <div className="py-2 border-b border-stone-100">
    
//     {/* 🔹 Previous Selected Items */}
//     <span className="text-stone-600 block mb-2">Previous selections:</span>
    
//     {selectedItemsSummary.slice(0, -1).map((item, idx) => (
//       <div key={idx} className="flex justify-between text-xs mb-1 text-stone-500">
//         <span>{item.label}</span>
//         <span>+₹{item.price.toLocaleString()}</span>
//       </div>
//     ))}

//     {/* 🔹 Current Selected Item */}
//     {selectedItemsSummary.length > 0 && (
//       <>
//         <div className="mt-3 pt-2 border-t border-stone-200">
//           <span className="text-stone-700 font-medium block mb-1">
//             Current selection:
//           </span>
//           <div className="flex justify-between text-sm font-semibold">
//             <span>
//               {selectedItemsSummary[selectedItemsSummary.length - 1].label}
//             </span>
//             <span className="text-amber-600">
//               +₹
//               {selectedItemsSummary[
//                 selectedItemsSummary.length - 1
//               ].price.toLocaleString()}
//             </span>
//           </div>
//         </div>
//       </>
//     )}
//   </div>
// )}
//                 <div className="flex justify-between"><span>Total price:</span><span className="font-bold text-amber-700 text-lg">₹{(computedTotalPrice || selectedPriceOption?.price || 0).toLocaleString()}</span></div>
//                 <div className="flex justify-between"><span>Date:</span><span>{selectedDate ? formatDateDisplay(selectedDate) : "—"}</span></div>
//                 <div className="flex justify-between"><span>Time slot:</span><span>{selectedSlot ? formatTimeRange(selectedSlot.time) : "—"}</span></div>
//                 {currentStep === 2 && customer.name && !validationErrors.name && (
//                   <div className="pt-3 mt-2">
//                     <div className="font-medium text-stone-800 flex items-center gap-2"><User className="w-3 h-3 text-stone-400" />{customer.name}</div>
//                     <div className="text-stone-500 text-xs flex items-center gap-2 mt-1"><Phone className="w-3 h-3" />{customer.phone}</div>
//                     <div className="text-stone-500 text-xs flex items-center gap-2 mt-1"><Mail className="w-3 h-3" />{customer.email}</div>
//                     <div className="text-stone-500 text-xs mt-2 line-clamp-2 flex items-start gap-2"><MapPin className="w-3 h-3 mt-0.5" /><span>{customer.address}</span></div>
//                   </div>
//                 )}
//               </div>
//               <div className="flex gap-3 mt-6">
//                 {currentStep === 2 && <button onClick={handlePrevious} className="flex-1 py-3 rounded-full border">Previous</button>}
//                 {currentStep === 1 ? <button onClick={handleNext} disabled={!canProceed} className="flex-1 bg-amber-600 text-white py-3 rounded-full disabled:bg-stone-300">Next Step</button> : <button onClick={handleConfirmBooking} disabled={!canConfirm} className="flex-1 bg-green-600 text-white py-3 rounded-full disabled:bg-stone-300">Confirm Booking</button>}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//BookingSlot.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { ArrowLeft, Calendar } from "lucide-react";
import {
  setService,
  setPriceOptions,
  setSelectedPriceOption,
  setSelectedDate,
  setAvailableTimeSlots,
  setSelectedSlot,
  setAllTimeSlots,
  setLoadingSlots,
  setSlotError,
  setIsDateFullyBooked,
  setCustomerField,
  setValidationError,
  setValidationErrors,
  setTouched,
  setAllTouched,
  nextStep,
  previousStep,
  setBookingSummary,
  persistToLocalStorage,
  resetBookingState,
  removeServiceSelection,
  setServiceDate,
  setServiceSlot,
  selectService,
  selectPriceOptions,
  selectSelectedPriceOption,
  selectSelectedDate,
  selectAvailableTimeSlots,
  selectSelectedSlot,
  selectAllTimeSlots,
  selectLoadingSlots,
  selectSlotError,
  selectIsDateFullyBooked,
  selectCustomer,
  selectValidationErrors,
  selectTouched,
  selectCurrentStep,
  selectCanProceedToStep2,
  selectCanConfirm,
  selectSelectedOptions,
  selectSelectedMultiOptions,
  selectSelectedItemsSummary,
  selectPreviousItemsSummary,
  selectSelectionDiff,
  selectTotalPriceComputed,
  selectAllActiveBookings,
} from "../../store/bookingSlice";
import FirstStep from "./BookingSlot1/FirstStep";
import SecondStep from "./BookingSlot1/SecondStep";
import BookingSummaryStep1 from "./BookingSlot1/BookingSummaryStep1";
import BookingSummaryStep2 from "./BookingSlot1/BookingSummaryStep2";
import Navbar from "../layout/Navbar";

const DEFAULT_SLOTS = ["09:00-10:00", "12:00-13:00", "15:00-16:00", "17:00-18:00"];

export const formatTimeRange = (range) => {
  if (!range) return "";
  const [s, e] = range.split("-");
  const f = (t) => {
    let [h, m] = t.split(":");
    h = parseInt(h);
    const ampm = h >= 12 ? "PM" : "AM";
    const hh = h % 12 || 12;
    return `${hh}:${m} ${ampm}`;
  };
  return `${f(s)} - ${f(e)}`;
};

export const formatDateDisplay = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
};

export const isTimeSlotOutdated = (slotTime, date) => {
  if (!date || !slotTime) return false;
  const now = new Date();
  const selected = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selected < today) return true;
  if (selected.toDateString() === today.toDateString()) {
    const [start] = slotTime.split("-");
    const [h, m] = start.split(":");
    const slotDateTime = new Date(date);
    slotDateTime.setHours(parseInt(h), parseInt(m), 0, 0);
    return slotDateTime < now;
  }
  return false;
};

export default function BookingSlot() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux selectors
  const service = useSelector(selectService, shallowEqual);
  const priceOptions = useSelector(selectPriceOptions, shallowEqual);
  const selectedPriceOption = useSelector(selectSelectedPriceOption, shallowEqual);
  const selectedDate = useSelector(selectSelectedDate);
  const availableTimeSlots = useSelector(selectAvailableTimeSlots, shallowEqual);
  const selectedSlot = useSelector(selectSelectedSlot, shallowEqual);
  const allTimeSlots = useSelector(selectAllTimeSlots, shallowEqual);
  const loadingSlots = useSelector(selectLoadingSlots);
  const slotError = useSelector(selectSlotError);
  const customer = useSelector(selectCustomer, shallowEqual);
  const validationErrors = useSelector(selectValidationErrors, shallowEqual);
  const touched = useSelector(selectTouched, shallowEqual);
  const currentStep = useSelector(selectCurrentStep);
  const canProceed = useSelector(selectCanProceedToStep2);
  const canConfirm = useSelector(selectCanConfirm);
  const selectedOptions = useSelector(selectSelectedOptions, shallowEqual);
  const selectedMultiOptions = useSelector(selectSelectedMultiOptions, shallowEqual);
  const selectedItemsSummary = useSelector(selectSelectedItemsSummary);
  const previousItemsSummary = useSelector(selectPreviousItemsSummary);
  const selectionDiff = useSelector(selectSelectionDiff);
  const computedTotalPrice = useSelector(selectTotalPriceComputed);
  const allActiveBookings = useSelector(selectAllActiveBookings);

  // Local state
  const [autoAddressLoading, setAutoAddressLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasCustomPackage, setHasCustomPackage] = useState(false);

  // Refs for fetch control
  const hasFetchedServiceRef = useRef(false);
  const hasFetchedAllSlotsRef = useRef(false);
  const isSlotLoadingRef = useRef(false);
  const lastSelectedDateRef = useRef(null);

  const hasAnySelections = selectedItemsSummary.length > 0 || (selectedPriceOption !== null);

  // Validation functions
  const validateName = useCallback((name) => {
    if (!name?.trim()) return "Full name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (name.trim().length > 50) return "Name too long";
    if (!/^[a-zA-Z\s\-']+$/.test(name.trim())) return "Invalid characters";
    return "";
  }, []);

  const validatePhone = useCallback((phone) => {
    if (!phone?.trim()) return "Phone number is required";
    const clean = phone.replace(/\D/g, "");
    if (clean.length < 10) return "At least 10 digits";
    if (clean.length > 12) return "Too many digits";
    if (!/^[0-9+\-\s()]+$/.test(phone)) return "Invalid characters";
    return "";
  }, []);

  const validateEmail = useCallback((email) => {
    if (!email?.trim()) return "Email is required";
    const re = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    if (!re.test(email.trim())) return "Enter a valid email";
    if (email.trim().length > 100) return "Too long";
    return "";
  }, []);

  const validateAddress = useCallback((addr) => {
    if (!addr?.trim()) return "Address is required";
    if (addr.trim().length < 5) return "Address too short";
    if (addr.trim().length > 500) return "Address too long";
    return "";
  }, []);

  // Fetch service on mount
  useEffect(() => {
    if (hasFetchedServiceRef.current) return;
    hasFetchedServiceRef.current = true;
    const fetchService = async () => {
      try {
        const res = await fetch(`http://localhost:12000/client/send-services-client/${serviceId}`);
        const data = await res.json();
        if (data.success) {
          dispatch(setService(data.data));
          let stdOptions = [];
          if (data.data.options?.length) {
            const firstGroup = data.data.options[0];
            if (!firstGroup.multiSelect) stdOptions = firstGroup.values || [];
          } else if (data.data.price != null) {
            stdOptions = [{ label: data.data.name, price: data.data.price }];
          }
          dispatch(setPriceOptions(stdOptions));
        } else setError("Service not found");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [serviceId, dispatch]);

  // Update custom package flag
  // useEffect(() => {
  //   setHasCustomPackage(hasAnySelections || selectedPriceOption?.isCustom);
  // }, [hasAnySelections, selectedPriceOption?.isCustom]);

  // Fetch all time slots once
  useEffect(() => {
    if (hasFetchedAllSlotsRef.current) return;
    hasFetchedAllSlotsRef.current = true;
    const fetchAllSlots = async () => {
      try {
        const res = await fetch(`http://localhost:12000/client/send-time-slot/${serviceId}`);
        const data = await res.json();
        dispatch(setAllTimeSlots(data?.data || []));
      } catch (err) {
        console.error(err);
        dispatch(setAllTimeSlots([]));
      }
    };
    fetchAllSlots();
  }, [serviceId, dispatch]);

  // Load slots for selected date
  useEffect(() => {
    if (!selectedDate) return;
    if (lastSelectedDateRef.current === selectedDate && isSlotLoadingRef.current) return;
    lastSelectedDateRef.current = selectedDate;
    if (isSlotLoadingRef.current) return;
    const loadSlotsForDate = async () => {
      isSlotLoadingRef.current = true;
      dispatch(setLoadingSlots(true));
      dispatch(setSlotError(null));
      // Removed: dispatch(setSelectedSlot(null)); - preserve existing selection if valid
      dispatch(setIsDateFullyBooked(false));
      try {
        const dayData = allTimeSlots.find(
          (slot) => new Date(slot.date).toISOString().split("T")[0] === selectedDate
        );
        let formatted = [];
        if (!dayData) {
          formatted = DEFAULT_SLOTS.map(t => ({
            time: t, capacity: 5, isDefault: true,
            isOutdated: isTimeSlotOutdated(t, selectedDate)
          }));
          dispatch(setAvailableTimeSlots(formatted));
          
          // Only auto-select if current one is invalid or missing
          const isCurrentValid = selectedSlot && formatted.find(s => s.time === selectedSlot.time && !s.isOutdated);
          if (!isCurrentValid) {
            const firstValid = formatted.find(s => !s.isOutdated);
            if (firstValid) dispatch(setSelectedSlot(firstValid));
            else dispatch(setSelectedSlot(null));
          }
          return;
        }
        if (dayData.isBlocked) {
          dispatch(setAvailableTimeSlots([]));
          dispatch(setIsDateFullyBooked(true));
          dispatch(setSlotError("This day is not available for booking."));
          dispatch(setSelectedSlot(null)); // Must clear if day is blocked
          return;
        }
        if (!dayData.slots?.length) {
          dispatch(setAvailableTimeSlots([]));
          dispatch(setSlotError("No slots available for this date."));
          dispatch(setSelectedSlot(null));
          return;
        }
        const available = dayData.slots.filter(s => (s.capacity ?? 0) > 0);
        if (!available.length) {
          dispatch(setAvailableTimeSlots([]));
          dispatch(setSlotError("All slots are fully booked."));
          dispatch(setSelectedSlot(null));
          return;
        }
        formatted = available.map(s => ({
          time: s.time, capacity: s.capacity, isDefault: false,
          isOutdated: isTimeSlotOutdated(s.time, selectedDate)
        }));
        dispatch(setAvailableTimeSlots(formatted));

        // Only auto-select if current one is invalid or missing
        const isCurrentValid = selectedSlot && formatted.find(s => s.time === selectedSlot.time && !s.isOutdated);
        if (!isCurrentValid) {
          const firstValid = formatted.find(s => !s.isOutdated);
          if (firstValid) dispatch(setSelectedSlot(firstValid));
          else dispatch(setSelectedSlot(null));
          
          if (formatted.length && !firstValid) {
            dispatch(setSlotError("All available slots for today have passed."));
          }
        }
      } catch (err) {
        dispatch(setSlotError("Error loading slots."));
      } finally {
        dispatch(setLoadingSlots(false));
        isSlotLoadingRef.current = false;
      }
    };
    loadSlotsForDate();
  }, [selectedDate, serviceId, dispatch, allTimeSlots]);

  // Auto-save
  useEffect(() => {
    if (selectedPriceOption || selectedDate || selectedSlot || customer.name) {
      dispatch(persistToLocalStorage());
    }
  }, [selectedPriceOption, selectedDate, selectedSlot, customer, dispatch]);

  // Handlers
  const handleInputChange = useCallback((field, value) => {
    dispatch(setCustomerField({ field, value }));
    dispatch(setTouched({ field, value: true }));
    let err = "";
    if (field === "name") err = validateName(value);
    else if (field === "phone") err = validatePhone(value);
    else if (field === "email") err = validateEmail(value);
    else if (field === "address") err = validateAddress(value);
    dispatch(setValidationError({ field, error: err }));
  }, [dispatch, validateName, validatePhone, validateEmail, validateAddress]);

  const fetchCurrentAddress = useCallback(() => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    setAutoAddressLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
          const data = await res.json();
          const addr = data.display_name || `${latitude}, ${longitude}`;
          dispatch(setCustomerField({ field: "address", value: addr }));
          dispatch(setTouched({ field: "address", value: true }));
          dispatch(setValidationError({ field: "address", error: "" }));
        } catch (err) {
          alert("Could not fetch address.");
        } finally {
          setAutoAddressLoading(false);
        }
      },
      () => {
        alert("Location permission denied.");
        setAutoAddressLoading(false);
      }
    );
  }, [dispatch]);

  const handleNext = useCallback(() => {
    if (currentStep === 1) {
      if (canProceed) {
        dispatch(nextStep());
      } else {
        if (allActiveBookings.length === 0) {
          alert("❌ No services selected. Please go back and select a service.");
        } else {
          alert("❌ Please ensure all selected services have a valid date and time slot.");
        }
      }
    }
  }, [currentStep, canProceed, allActiveBookings, dispatch]);

  const handlePrevious = useCallback(() => dispatch(previousStep()), [dispatch]);
  const [submitting, setSubmitting] = useState(false);

  const handleConfirmBooking = useCallback(async () => {
    dispatch(setAllTouched());
    const nameErr = validateName(customer.name);
    const phoneErr = validatePhone(customer.phone);
    const emailErr = validateEmail(customer.email);
    const addrErr = validateAddress(customer.address);
    dispatch(setValidationErrors({ name: nameErr, phone: phoneErr, email: emailErr, address: addrErr }));
    
    if (nameErr || phoneErr || emailErr || addrErr) {
      document.querySelector(".error-message")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    const globalTotal = allActiveBookings.reduce((sum, b) => sum + (b.selections.totalPrice || 0), 0);
    
    const payload = {
      customer: {
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        address: customer.address,
      },
      allActiveBookings: allActiveBookings, // Pass the raw array from Redux
      isActive: true,
    };

   

    try {
      const response = await fetch("http://localhost:12000/client/create-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        dispatch(setBookingSummary(data.booking));
        dispatch(resetBookingState());
        
        alert(`Booking Confirmed. Track your booking using Booking ID: ${data.bookingId} or Mobile Number: ${customer.phone}`);
        navigate("/check-status", { state: { booking: data.booking } });
      } else {
        alert(data.message || "Failed to create booking. Please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Network error. Please check if the server is running.");
    } finally {
      setSubmitting(false);
    }
  }, [dispatch, validateName, validatePhone, validateEmail, validateAddress, customer, allActiveBookings, navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div></div>;
  }
  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <Calendar className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-serif">Booking Unavailable</h2>
          <p className="text-stone-500">{error || "Service not found"}</p>
          <button onClick={() => navigate(-1)} className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-full">Go Back</button>
        </div>
      </div>
    );
  }

  return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br pt-16 from-white via-amber-50/5 to-stone-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-stone-500 hover:text-amber-600 mb-8 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
              <span>Back to service</span>
            </button>
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              {/* Left Column – Active Step */}
              {currentStep === 1 && (
                <FirstStep
                  service={service}
                  serviceId={serviceId}
                  priceOptions={priceOptions}
                  allActiveBookings={allActiveBookings}
                  selectedPriceOption={selectedPriceOption}
                  selectedDate={selectedDate}
                  availableTimeSlots={availableTimeSlots}
                  selectedSlot={selectedSlot}
                  loadingSlots={loadingSlots}
                  slotError={slotError}
                  hasAnySelections={hasAnySelections}
                  selectedItemsSummary={selectedItemsSummary}
                  computedTotalPrice={computedTotalPrice}
                  onSelectPriceOption={(opt) => {
                    dispatch(setSelectedPriceOption(opt));
                    setHasCustomPackage(false);
                  }}
                  onServiceDateChange={(sId, date) => dispatch(setServiceDate({ serviceId: sId, date }))}
                  onServiceSlotSelect={(sId, slot) => {
                    if (slot.isOutdated) alert("This time slot has already passed.");
                    else dispatch(setServiceSlot({ serviceId: sId, slot }));
                  }}
                  onEditCustom={(sId) => navigate(`/service/${sId}`)}
                  onRemoveService={(sId) => dispatch(removeServiceSelection(sId))}
                />
              )}
              {currentStep === 2 && (
                <SecondStep
                  customer={customer}
                  touched={touched}
                  validationErrors={validationErrors}
                  autoAddressLoading={autoAddressLoading}
                  onInputChange={handleInputChange}
                  onFetchAddress={fetchCurrentAddress}
                />
              )}

              {/* Right Column – Step-specific Booking Summary */}
              {currentStep === 1 && (
                <BookingSummaryStep1
                  allActiveBookings={allActiveBookings}
                  canProceed={canProceed}
                  onNext={handleNext}
                />
              )}
              {currentStep === 2 && (
                <BookingSummaryStep2
                  allActiveBookings={allActiveBookings}
                  customer={customer}
                  validationErrors={validationErrors}
                  canConfirm={canConfirm}
                  submitting={submitting}
                  onPrevious={handlePrevious}
                  onConfirm={handleConfirmBooking}
                />
              )}
            </div>
          </div>
        </div>
      </>
  );
}