// BookingSlot.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  Calendar,
  ChevronRight,
  ChevronLeft,
  CreditCard,
  Home,
  Edit2,
  Save,
  Star,
  AlertCircle,
  XCircle,
} from "lucide-react";
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
  loadFromLocalStorage,
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
  selectIsPriceSelected,
  selectIsDateTimeSelected,
  selectSelectedOptions,
  selectTotalPrice,
} from "../../store/bookingSlice";

const DEFAULT_SLOTS = [
  "09:00-10:00",
  "12:00-13:00",
  "15:00-16:00",
  "17:00-18:00",
];

// Helper: Format Time
const formatTimeRange = (range) => {
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

// Helper: Format Date
const formatDateDisplay = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Helper: Check if time slot is outdated
const isTimeSlotOutdated = (slotTime, date) => {
  if (!date || !slotTime) return false;
  
  const now = new Date();
  const selectedDateObj = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDateObj < today) {
    return true;
  }
  
  if (selectedDateObj.toDateString() === today.toDateString()) {
    const [startTime] = slotTime.split("-");
    const [hours, minutes] = startTime.split(":");
    
    const slotDateTime = new Date(date);
    slotDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    return slotDateTime < now;
  }
  
  return false;
};

// Selection Summary Component
const SelectionSummary = () => {
  const dispatch = useDispatch();
  const selectedPriceOption = useSelector(selectSelectedPriceOption);
  const selectedDate = useSelector(selectSelectedDate);
  const selectedSlot = useSelector(selectSelectedSlot);
  const isPriceSelected = useSelector(selectIsPriceSelected);
  const isDateTimeSelected = useSelector(selectIsDateTimeSelected);
  const selectedOptions = useSelector(selectSelectedOptions);
  const totalPrice = useSelector(selectTotalPrice);
  
  if (!isPriceSelected && !isDateTimeSelected) {
    return null;
  }
  
  return (
   <></>
  );
};

// Auto-Save Indicator Component
const AutoSaveIndicator = () => {
  const [saved, setSaved] = useState(false);
  const selectedPriceOption = useSelector(selectSelectedPriceOption);
  const selectedDate = useSelector(selectSelectedDate);
  const selectedSlot = useSelector(selectSelectedSlot);
  const customer = useSelector(selectCustomer);
  
  useEffect(() => {
    setSaved(true);
    const timer = setTimeout(() => setSaved(false), 2000);
    return () => clearTimeout(timer);
  }, [selectedPriceOption, selectedDate, selectedSlot, customer]);
  
  if (!saved) return null;
  
  return (
    <></>
  );
};

export default function BookingSlot() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux Selectors
  const service = useSelector(selectService);
  const priceOptions = useSelector(selectPriceOptions);
  const selectedPriceOption = useSelector(selectSelectedPriceOption);
  const selectedDate = useSelector(selectSelectedDate);
  const availableTimeSlots = useSelector(selectAvailableTimeSlots);
  const selectedSlot = useSelector(selectSelectedSlot);
  const allTimeSlots = useSelector(selectAllTimeSlots);
  const loadingSlots = useSelector(selectLoadingSlots);
  const slotError = useSelector(selectSlotError);
  const isDateFullyBooked = useSelector(selectIsDateFullyBooked);
  const customer = useSelector(selectCustomer);
  const validationErrors = useSelector(selectValidationErrors);
  const touched = useSelector(selectTouched);
  const currentStep = useSelector(selectCurrentStep);
  const canProceedToStep2 = useSelector(selectCanProceedToStep2);
  const canConfirm = useSelector(selectCanConfirm);
  const isPriceSelected = useSelector(selectIsPriceSelected);
  const isDateTimeSelected = useSelector(selectIsDateTimeSelected);
  const selectedOptions = useSelector(selectSelectedOptions);
  const totalPrice = useSelector(selectTotalPrice);

  const [autoAddressLoading, setAutoAddressLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ---------------- VALIDATION FUNCTIONS ----------------
  const validateName = (name) => {
    if (!name || name.trim() === "") {
      return "Full name is required";
    }
    if (name.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    if (name.trim().length > 50) {
      return "Name must be less than 50 characters";
    }
    if (!/^[a-zA-Z\s\-']+$/.test(name.trim())) {
      return "Name can only contain letters, spaces, hyphens, and apostrophes";
    }
    return "";
  };

  const validatePhone = (phone) => {
    if (!phone || phone.trim() === "") {
      return "Phone number is required";
    }
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      return "Phone number must be at least 10 digits";
    }
    if (cleanPhone.length > 15) {
      return "Phone number must be less than 15 digits";
    }
    if (!/^[0-9+\-\s()]+$/.test(phone)) {
      return "Phone number contains invalid characters";
    }
    return "";
  };

  const validateEmail = (email) => {
    if (!email || email.trim() === "") {
      return "Email address is required";
    }
    const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      return "Please enter a valid email address (e.g., name@example.com)";
    }
    if (email.trim().length > 100) {
      return "Email must be less than 100 characters";
    }
    return "";
  };

  const validateAddress = (address) => {
    if (!address || address.trim() === "") {
      return "Service address is required";
    }
    if (address.trim().length < 5) {
      return "Please enter a complete address";
    }
    if (address.trim().length > 500) {
      return "Address must be less than 500 characters";
    }
    return "";
  };

  // ---------------- FETCH SERVICE ----------------
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(
          `http://localhost:12000/client/send-services-client/${serviceId}`
        );
        const data = await res.json();

        if (data.success) {
          dispatch(setService(data.data));

          let options = [];
          if (data.data.options?.length > 0) {
            options = data.data.options[0]?.values || [];
          } else if (data.data.price != null) {
            options = [{ label: "Standard", price: data.data.price }];
          }

          dispatch(setPriceOptions(options));
          
          // Don't reset selected price option if we already have one from ServiceDetails
          if (!selectedPriceOption && options.length > 0) {
            dispatch(setSelectedPriceOption(options[0]));
          }
        } else {
          setError("Service not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Load saved draft from localStorage
    dispatch(loadFromLocalStorage());
    fetchService();
  }, [serviceId, dispatch]);

  // Auto-save selections to localStorage
  useEffect(() => {
    if (selectedPriceOption || selectedDate || selectedSlot || customer.name) {
      dispatch(persistToLocalStorage());
    }
  }, [selectedPriceOption, selectedDate, selectedSlot, customer, dispatch]);

  // ---------------- FETCH ALL SLOTS ----------------
  const fetchAllTimeSlots = async () => {
    try {
      const res = await fetch(
        `http://localhost:12000/client/send-time-slot/${serviceId}`
      );
      const data = await res.json();

      const slots = data?.data || [];
      dispatch(setAllTimeSlots(slots));
      return slots;
    } catch (err) {
      console.error(err);
      dispatch(setAllTimeSlots([]));
      return [];
    }
  };

  // ---------------- HANDLE DATE CHANGE ----------------
  useEffect(() => {
    if (!selectedDate) return;

    const loadSlots = async () => {
      dispatch(setLoadingSlots(true));
      dispatch(setSlotError(null));
      dispatch(setSelectedSlot(null));
      dispatch(setIsDateFullyBooked(false));

      try {
        let slotsData = allTimeSlots;
        if (!slotsData.length) {
          slotsData = await fetchAllTimeSlots();
        }

        const dayData = slotsData.find((slot) => {
          return new Date(slot.date).toISOString().split("T")[0] === selectedDate;
        });

        let formattedSlots = [];

        if (!dayData) {
          formattedSlots = DEFAULT_SLOTS.map((t) => ({
            time: t,
            capacity: 5,
            isDefault: true,
            isOutdated: isTimeSlotOutdated(t, selectedDate),
          }));
          
          dispatch(setAvailableTimeSlots(formattedSlots));
          const firstValidSlot = formattedSlots.find(slot => !slot.isOutdated);
          if (firstValidSlot) {
            dispatch(setSelectedSlot(firstValidSlot));
          }
          return;
        }

        if (dayData.isBlocked === true) {
          dispatch(setAvailableTimeSlots([]));
          dispatch(setSelectedSlot(null));
          dispatch(setIsDateFullyBooked(true));
          dispatch(setSlotError("❌ This day is not available for booking."));
          return;
        }

        if (!dayData.slots || dayData.slots.length === 0) {
          dispatch(setAvailableTimeSlots([]));
          dispatch(setSlotError("No slots available for this date."));
          return;
        }

        const available = dayData.slots.filter(
          (s) => (s.capacity ?? 0) > 0
        );

        if (!available.length) {
          dispatch(setAvailableTimeSlots([]));
          dispatch(setSlotError("All slots are fully booked."));
          return;
        }

        formattedSlots = available.map((s) => ({
          time: s.time,
          capacity: s.capacity,
          isDefault: false,
          isOutdated: isTimeSlotOutdated(s.time, selectedDate),
        }));

        dispatch(setAvailableTimeSlots(formattedSlots));
        
        const firstValidSlot = formattedSlots.find(slot => !slot.isOutdated);
        if (firstValidSlot) {
          dispatch(setSelectedSlot(firstValidSlot));
        }
        
        if (formattedSlots.length > 0 && !firstValidSlot) {
          dispatch(setSlotError("⚠️ All available time slots for today have passed. Please select another date."));
        }
      } catch (err) {
        dispatch(setSlotError("Error loading slots."));
      } finally {
        dispatch(setLoadingSlots(false));
      }
    };

    loadSlots();
  }, [selectedDate, serviceId, dispatch, allTimeSlots]);

  // ---------------- AUTO-FETCH ADDRESS ----------------
  const fetchCurrentAddress = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    setAutoAddressLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          const data = await res.json();
          const fullAddress = data.display_name || `${latitude}, ${longitude}`;
          dispatch(setCustomerField({ field: "address", value: fullAddress }));
          dispatch(setTouched({ field: "address", value: true }));
        } catch (err) {
          console.error(err);
          alert("Could not fetch address. Please enter manually.");
        } finally {
          setAutoAddressLoading(false);
        }
      },
      (err) => {
        console.error(err);
        alert("Location permission denied. Please enter address manually.");
        setAutoAddressLoading(false);
      }
    );
  };

  // ---------------- HANDLE NEXT STEP ----------------
  const handleNext = () => {
    if (currentStep === 1 && canProceedToStep2) {
      dispatch(nextStep());
    } else if (currentStep === 1 && selectedSlot?.isOutdated) {
      alert("Please select a valid time slot (past time slots cannot be booked)");
    } else if (currentStep === 1) {
      alert("Please complete all selections");
    }
  };

  // ---------------- HANDLE PREVIOUS ----------------
  const handlePrevious = () => {
    dispatch(previousStep());
  };

  // ---------------- HANDLE CONFIRM BOOKING ----------------
  const handleConfirmBooking = () => {
    // Mark all fields as touched for validation
    dispatch(setAllTouched());
    
    // Validate all fields
    const nameError = validateName(customer.name);
    const phoneError = validatePhone(customer.phone);
    const emailError = validateEmail(customer.email);
    const addressError = validateAddress(customer.address);
    
    dispatch(setValidationErrors({
      name: nameError,
      phone: phoneError,
      email: emailError,
      address: addressError,
    }));
    
    if (nameError || phoneError || emailError || addressError) {
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const payload = {
      serviceId: service._id,
      serviceName: service.name,
      selectedOption: selectedPriceOption,
      selectedOptions: selectedOptions,
      totalPrice: totalPrice || selectedPriceOption?.price || 0,
      selectedDate: selectedDate,
      selectedSlot: selectedSlot,
      customer: customer,
      bookingDate: new Date().toISOString(),
      status: "pending",
      formattedDate: formatDateDisplay(selectedDate),
      formattedTime: selectedSlot ? formatTimeRange(selectedSlot.time) : null,
    };

    dispatch(setBookingSummary(payload));
    
    console.log("Booking confirmed:", payload);
    
    // Store in localStorage
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    existingBookings.push({ ...payload, bookingId: Date.now() });
    localStorage.setItem('bookings', JSON.stringify(existingBookings));
    
    alert("Booking confirmed! We'll contact you shortly.");
    navigate("/booking-success", { state: { booking: payload } });
  };

  // ---------------- INPUT CHANGE HANDLERS WITH VALIDATION ----------------
  const handleInputChange = (field, value) => {
    dispatch(setCustomerField({ field, value }));
    dispatch(setTouched({ field, value: true }));
    
    // Real-time validation
    let error = "";
    switch (field) {
      case "name":
        error = validateName(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "address":
        error = validateAddress(value);
        break;
      default:
        break;
    }
    dispatch(setValidationError({ field, error }));
  };

  // ---------------- HANDLE SLOT SELECTION ----------------
  const handleSlotSelection = (slot) => {
    if (slot.isOutdated) {
      alert("This time slot has already passed. Please select a different time slot.");
      return;
    }
    dispatch(setSelectedSlot(slot));
  };

  // ---------------- LOADING ----------------
  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-stone-600">Loading booking details...</p>
        </div>
      </div>
    );

  // ---------------- ERROR ----------------
  if (error || !service)
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-50 rounded-full mb-4">
            <Calendar className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-serif text-stone-800">Booking Unavailable</h2>
          <p className="text-stone-500 mt-2">{error || "Service not found"}</p>
          <button onClick={() => navigate(-1)} className="mt-6 px-6 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition">
            Go Back
          </button>
        </div>
      </div>
    );

  // ---------------- MAIN RENDER ----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/5 to-stone-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-stone-500 hover:text-amber-600 transition mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
          <span>Back to service</span>
        </button>

        {/* Selection Summary Component */}
        <SelectionSummary />

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* LEFT COLUMN - Booking Form */}
          <div className="space-y-6">
            {currentStep === 1 && (
              <div>
                {/* PRICE OPTIONS */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-100/50">
                  <h2 className="text-2xl font-serif text-stone-800 mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-amber-500" />
                    1. Choose your plan
                  </h2>
                  
                  {/* Display Selected Options from ServiceDetails */}
                  {selectedOptions && Object.keys(selectedOptions).length > 0 && totalPrice && (
                    <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-stone-800 text-sm">Your Selected Package</h4>
                        <button 
                          onClick={() => navigate(`/service/${serviceId}`)}
                          className="text-xs text-amber-600 hover:text-amber-700 flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" />
                          Edit
                        </button>
                      </div>
                      <div className="space-y-2">
                        {Object.values(selectedOptions).map((opt, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-stone-600">{opt.label}</span>
                            <span className="font-medium text-amber-700">₹{opt.price.toLocaleString()}</span>
                          </div>
                        ))}
                        <div className="pt-2 mt-2 border-t border-amber-200 flex justify-between font-bold">
                          <span className="text-stone-800">Total</span>
                          <span className="text-amber-700">₹{totalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 gap-3">
                    {priceOptions.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => dispatch(setSelectedPriceOption(opt))}
                        className={`flex justify-between items-center p-4 rounded-xl border transition-all ${
                          selectedPriceOption?.label === opt.label
                            ? "border-amber-500 bg-amber-50 shadow-sm"
                            : "border-stone-200 hover:border-amber-300 hover:shadow-md"
                        }`}
                      >
                        <span className="font-medium text-stone-800">{opt.label}</span>
                        <span className="text-amber-700 font-semibold text-lg">₹{opt.price.toLocaleString()}</span>
                      </button>
                    ))}
                  </div>
                  {isPriceSelected && (
                    <></>
                  )}
                </div>

                {/* DATE PICKER */}
                {selectedPriceOption && (
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-100/50">
                    <h2 className="text-2xl font-serif text-stone-800 mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-amber-500" />
                      2. Select date & time
                    </h2>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-stone-700 mb-2">Choose a date</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => dispatch(setSelectedDate(e.target.value))}
                        className="w-full p-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    {/* TIME SLOTS */}
                    {selectedDate && (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-medium text-stone-700 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-amber-500" />
                            Available time slots
                          </label>
                          {!loadingSlots && availableTimeSlots.length > 0 && availableTimeSlots[0]?.isDefault && (
                            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                              Default Slots
                            </span>
                          )}
                          {!loadingSlots && availableTimeSlots.length > 0 && !availableTimeSlots[0]?.isDefault && (
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                              Configured Slots
                            </span>
                          )}
                        </div>

                        {loadingSlots ? (
                          <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto"></div>
                            <p className="text-stone-500 text-sm mt-2">Loading slots...</p>
                          </div>
                        ) : slotError ? (
                          <div className="text-center py-8 bg-red-50 rounded-xl border border-red-200">
                            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                            <p className="text-red-600 text-sm font-medium">{slotError}</p>
                          </div>
                        ) : availableTimeSlots.length === 0 ? (
                          <div className="text-center py-8 bg-stone-50 rounded-xl">
                            <Clock className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                            <p className="text-stone-500 text-sm">No slots available for this date.</p>
                            <p className="text-stone-400 text-xs mt-1">Please select another date</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {availableTimeSlots.map((slot, i) => {
                                const isSelected = selectedSlot?.time === slot.time;
                                const isOutdated = slot.isOutdated;
                                
                                return (
                                  <button
                                    key={i}
                                    onClick={() => handleSlotSelection(slot)}
                                    disabled={isOutdated}
                                    className={`p-3 rounded-xl border text-center transition-all ${
                                      isSelected && !isOutdated
                                        ? "border-amber-500 bg-amber-50 shadow-md"
                                        : isOutdated
                                        ? "bg-stone-100 border-stone-200 cursor-not-allowed opacity-60"
                                        : "border-stone-200 hover:border-amber-300 hover:shadow-md"
                                    }`}
                                  >
                                    <div>
                                      <Clock className={`w-4 h-4 inline mr-1 ${
                                        isSelected && !isOutdated 
                                          ? 'text-amber-600' 
                                          : isOutdated 
                                          ? 'text-stone-400' 
                                          : 'text-stone-500'
                                      }`} />
                                      <span className={
                                        isSelected && !isOutdated 
                                          ? 'text-amber-700 font-medium' 
                                          : isOutdated 
                                          ? 'text-stone-400 line-through' 
                                          : 'text-stone-700'
                                      }>
                                        {formatTimeRange(slot.time)}
                                      </span>
                                    </div>
                                    {!slot.isDefault && !isOutdated && (
                                      <div className="text-xs mt-1">
                                        <span className={slot.capacity <= 2 ? "text-orange-500" : "text-green-600"}>
                                          {slot.capacity} slot{slot.capacity !== 1 ? 's' : ''} left
                                        </span>
                                      </div>
                                    )}
                                    {slot.isDefault && !isOutdated && (
                                      <div className="text-xs mt-1 text-stone-400">
                                        Standard slot
                                      </div>
                                    )}
                                    {isOutdated && (
                                      <div className="text-xs mt-1 text-stone-400">
                                        ⏰ Past time slot
                                      </div>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                            {availableTimeSlots.length > 0 && availableTimeSlots[0]?.isDefault && (
                              <p className="text-xs text-stone-400 text-center mt-3">
                                ⏰ Using default time slots. Service provider will confirm availability.
                              </p>
                            )}
                            {selectedDate === new Date().toISOString().split('T')[0] && (
                              <p className="text-xs text-amber-600 text-center mt-2">
                                ⚠️ Past time slots for today are disabled
                              </p>
                            )}
                          </div>
                        )}
                        
                        {isDateTimeSelected && (
                          <div className="mt-3 text-xs text-green-600 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Date & time selected
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-100/50 space-y-5">
                <h2 className="text-2xl font-serif text-stone-800 flex items-center gap-2">
                  <User className="w-5 h-5 text-amber-500" />
                  Your contact details
                </h2>


                {/* Customer Form with Validation */}
                <div className="space-y-5">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Full name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        type="text"
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 transition ${
                          touched.name && validationErrors.name
                            ? "border-red-500 focus:ring-red-500"
                            : "border-stone-200 focus:border-amber-500"
                        }`}
                        placeholder="John Doe"
                        value={customer.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                      />
                      {touched.name && validationErrors.name && (
                        <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
                      )}
                    </div>
                    {touched.name && validationErrors.name && (
                      <p className="error-message text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {validationErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Phone number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        type="tel"
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 transition ${
                          touched.phone && validationErrors.phone
                            ? "border-red-500 focus:ring-red-500"
                            : "border-stone-200 focus:border-amber-500"
                        }`}
                        placeholder="+91 98765 43210"
                        value={customer.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                      {touched.phone && validationErrors.phone && (
                        <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
                      )}
                    </div>
                    {touched.phone && validationErrors.phone && (
                      <p className="error-message text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {validationErrors.phone}
                      </p>
                    )}
                    <p className="text-stone-400 text-xs mt-1">Enter 10-digit mobile number</p>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        type="email"
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 transition ${
                          touched.email && validationErrors.email
                            ? "border-red-500 focus:ring-red-500"
                            : "border-stone-200 focus:border-amber-500"
                        }`}
                        placeholder="john@example.com"
                        value={customer.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                      {touched.email && validationErrors.email && (
                        <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
                      )}
                    </div>
                    {touched.email && validationErrors.email && (
                      <p className="error-message text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {validationErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Address Field */}
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Service address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                      <textarea
                        rows="3"
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 transition ${
                          touched.address && validationErrors.address
                            ? "border-red-500 focus:ring-red-500"
                            : "border-stone-200 focus:border-amber-500"
                        }`}
                        placeholder="Enter full address"
                        value={customer.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                      />
                      {touched.address && validationErrors.address && (
                        <XCircle className="absolute right-3 top-3 w-4 h-4 text-red-500" />
                      )}
                    </div>
                    {touched.address && validationErrors.address && (
                      <p className="error-message text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {validationErrors.address}
                      </p>
                    )}
                    <button
                      onClick={fetchCurrentAddress}
                      disabled={autoAddressLoading}
                      className="mt-2 text-sm text-amber-600 flex items-center gap-1 hover:underline transition"
                    >
                      {autoAddressLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-amber-600"></div>
                          Fetching location...
                        </>
                      ) : (
                        "📍 Use my current location"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN - Booking Summary */}
          <div className="space-y-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-100/50 sticky top-6">
              <h3 className="font-serif text-xl text-stone-800 mb-4">Booking Summary</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-600">Service:</span>
                  <span className="font-medium">{service?.name}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-600">Selected plan:</span>
                  <span className="font-medium">{selectedPriceOption?.label || "—"}</span>
                </div>

                {selectedOptions && Object.keys(selectedOptions).length > 0 && (
                  <div className="py-2 border-b border-stone-100">
                    <span className="text-stone-600 block mb-2">Package Details:</span>
                    {Object.values(selectedOptions).map((opt, idx) => (
                      <div key={idx} className="flex justify-between text-xs mb-1">
                        <span>{opt.label}</span>
                        <span className="text-amber-600">₹{opt.price}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-600">Price:</span>
                  <span className="font-bold text-amber-700">₹{(totalPrice || selectedPriceOption?.price)?.toLocaleString() || 0}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-600">Date:</span>
                  <span>{selectedDate ? formatDateDisplay(selectedDate) : "—"}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-600">Time slot:</span>
                  <span className="flex items-center gap-1">
                    {selectedSlot ? formatTimeRange(selectedSlot.time) : "—"}
                    {selectedSlot?.isOutdated && (
                      <span className="text-xs text-red-500 ml-1">(Expired)</span>
                    )}
                  </span>
                </div>

                {currentStep === 2 && customer.name && !validationErrors.name && (
                  <div className="pt-3 mt-2">
                    <div className="font-medium text-stone-800 flex items-center gap-2">
                      <User className="w-3 h-3 text-stone-400" />
                      {customer.name}
                    </div>
                    <div className="text-stone-500 text-xs flex items-center gap-2 mt-1">
                      <Phone className="w-3 h-3" />
                      {customer.phone}
                    </div>
                    <div className="text-stone-500 text-xs flex items-center gap-2 mt-1">
                      <Mail className="w-3 h-3" />
                      {customer.email}
                    </div>
                    <div className="text-stone-500 text-xs mt-2 line-clamp-2 flex items-start gap-2">
                      <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>{customer.address}</span>
                    </div>
                  </div>
                )}

                <div className="border-t-2 border-amber-200 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total to pay</span>
                    <span className="text-2xl font-bold text-amber-700">₹{(totalPrice || selectedPriceOption?.price)?.toLocaleString() || 0}</span>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3 mt-6">
                {currentStep === 2 && (
                  <button onClick={handlePrevious} className="flex-1 py-3 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-50 flex items-center justify-center gap-2">
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                )}

                {currentStep === 1 ? (
                  <button
                    onClick={handleNext}
                    disabled={!canProceedToStep2}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-full font-medium hover:from-amber-600 hover:to-amber-700 disabled:from-stone-300 disabled:to-stone-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Next Step
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleConfirmBooking}
                    disabled={!canConfirm}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-full font-medium hover:from-green-600 hover:to-green-700 disabled:from-stone-300 disabled:to-stone-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Confirm Booking
                  </button>
                )}
              </div>

              {currentStep === 2 && !canConfirm && (
                <div className="mt-3 p-2 bg-amber-50 rounded-lg">
                  <p className="text-xs text-amber-700 text-center">
                    Please fill in all required fields correctly to continue
                  </p>
                </div>
              )}

              {currentStep === 1 && selectedSlot?.isOutdated && (
                <div className="mt-3 p-2 bg-red-50 rounded-lg">
                  <p className="text-xs text-red-600 text-center">
                    ⚠️ The selected time slot has passed. Please choose a different time.
                  </p>
                </div>
              )}

              
            </div>

           
          </div>
        </div>
      </div>
      
      {/* Auto-Save Indicator */}
      <AutoSaveIndicator />
    </div>
  );
}