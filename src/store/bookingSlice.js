// // store/bookingSlice.js
// import { createSlice, createSelector } from "@reduxjs/toolkit";

// const initialState = {
//   service: null,
//   currentServiceId: null,
//   priceOptions: [],
//   selectionsByService: {},
//   selectedOptions: {},
//   selectedMultiOptions: {},
//   totalPrice: 0,
//   customSelectedPrice: null,
//   selectedPriceOption: null,
//   selectedDate: "",
//   availableTimeSlots: [],
//   selectedSlot: null,
//   allTimeSlots: [],
//   loadingSlots: false,
//   slotError: null,
//   isDateFullyBooked: false,
//   customer: { name: "", phone: "", email: "", address: "" },
//   validationErrors: { name: "", phone: "", email: "", address: "" },
//   touched: { name: false, phone: false, email: false, address: false },
//   currentStep: 1,
//   bookingSummary: null,
// };

// // helpers
// const calculateTotalPrice = (selectedOptions, selectedMultiOptions) => {
//   let total = 0;
//   Object.values(selectedOptions).forEach(opt => { if (opt?.price) total += opt.price; });
//   Object.values(selectedMultiOptions).forEach(group => {
//     group.forEach(v => { if (v?.price) total += v.price; });
//   });
//   return total;
// };

// const formatCustomLabel = (selectedOptions, selectedMultiOptions) => {
//   const labels = [];
//   Object.values(selectedOptions).forEach(opt => { if (opt?.label) labels.push(opt.label); });
//   Object.values(selectedMultiOptions).forEach(group => {
//     group.forEach(opt => { if (opt?.label) labels.push(opt.label); });
//   });
//   return labels.length ? `Custom Package (${labels.join(" + ")})` : "Custom Package";
// };

// const bookingSlice = createSlice({
//   name: "booking",
//   initialState,
//   reducers: {
//     setService: (state, action) => {
//       const newService = action.payload;
//       const newId = newService?._id;
//       state.service = newService;
//       state.currentServiceId = newId;
//       const saved = state.selectionsByService[newId] || {};
//       state.selectedOptions = saved.selectedOptions || {};
//       state.selectedMultiOptions = saved.selectedMultiOptions || {};
//       state.totalPrice = saved.totalPrice ?? 0;
//       state.customSelectedPrice = saved.customSelectedPrice || null;
//       state.selectedPriceOption = saved.selectedPriceOption || null;
//       // reset date/time when switching services (optional)
//       state.selectedDate = "";
//       state.selectedSlot = null;
//       state.availableTimeSlots = [];
//       state.loadingSlots = false;
//       state.slotError = null;
//       state.isDateFullyBooked = false;
//     },
//     setPriceOptions: (state, action) => { state.priceOptions = action.payload; },
//     setSelectedPriceOption: (state, action) => {
//       state.selectedPriceOption = action.payload;
//       if (state.currentServiceId) {
//         if (!state.selectionsByService[state.currentServiceId]) state.selectionsByService[state.currentServiceId] = {};
//         state.selectionsByService[state.currentServiceId].selectedPriceOption = action.payload;
//       }
//       state.selectedDate = "";
//       state.selectedSlot = null;
//       state.availableTimeSlots = [];
//     },
//     setSelectedOptions: (state, action) => {
//       state.selectedOptions = action.payload;
//       state.totalPrice = calculateTotalPrice(state.selectedOptions, state.selectedMultiOptions);
//       if (state.currentServiceId) {
//         if (!state.selectionsByService[state.currentServiceId]) state.selectionsByService[state.currentServiceId] = {};
//         state.selectionsByService[state.currentServiceId].selectedOptions = action.payload;
//         state.selectionsByService[state.currentServiceId].totalPrice = state.totalPrice;
//       }
//       if (state.totalPrice > 0 && Object.keys(action.payload).length > 0) {
//         const customPkg = {
//           label: formatCustomLabel(state.selectedOptions, state.selectedMultiOptions),
//           price: state.totalPrice,
//           isCustom: true,
//         };
//         state.customSelectedPrice = customPkg;
//         state.selectedPriceOption = customPkg;
//         if (state.currentServiceId) {
//           state.selectionsByService[state.currentServiceId].customSelectedPrice = customPkg;
//           state.selectionsByService[state.currentServiceId].selectedPriceOption = customPkg;
//         }
//       }
//     },
//     setSelectedMultiOptions: (state, action) => {
//       state.selectedMultiOptions = action.payload;
//       state.totalPrice = calculateTotalPrice(state.selectedOptions, state.selectedMultiOptions);
//       if (state.currentServiceId) {
//         if (!state.selectionsByService[state.currentServiceId]) state.selectionsByService[state.currentServiceId] = {};
//         state.selectionsByService[state.currentServiceId].selectedMultiOptions = action.payload;
//         state.selectionsByService[state.currentServiceId].totalPrice = state.totalPrice;
//       }
//       const hasMulti = Object.values(action.payload).some(arr => arr.length > 0);
//       if ((state.totalPrice > 0 && hasMulti) || (state.totalPrice > 0 && Object.keys(state.selectedOptions).length > 0)) {
//         const customPkg = {
//           label: formatCustomLabel(state.selectedOptions, state.selectedMultiOptions),
//           price: state.totalPrice,
//           isCustom: true,
//         };
//         state.customSelectedPrice = customPkg;
//         state.selectedPriceOption = customPkg;
//         if (state.currentServiceId) {
//           state.selectionsByService[state.currentServiceId].customSelectedPrice = customPkg;
//           state.selectionsByService[state.currentServiceId].selectedPriceOption = customPkg;
//         }
//       }
//     },
//     setTotalPrice: (state, action) => {
//       state.totalPrice = action.payload;
//       if (state.currentServiceId && state.selectionsByService[state.currentServiceId]) {
//         state.selectionsByService[state.currentServiceId].totalPrice = action.payload;
//       }
//     },
//     setCustomSelectedPrice: (state, action) => {
//       state.customSelectedPrice = action.payload;
//       if (state.currentServiceId) {
//         if (!state.selectionsByService[state.currentServiceId]) state.selectionsByService[state.currentServiceId] = {};
//         state.selectionsByService[state.currentServiceId].customSelectedPrice = action.payload;
//       }
//     },
//     resetSelections: (state) => {
//       state.selectedPriceOption = null;
//       state.selectedOptions = {};
//       state.selectedMultiOptions = {};
//       state.totalPrice = 0;
//       state.customSelectedPrice = null;
//       if (state.currentServiceId && state.selectionsByService[state.currentServiceId]) {
//         delete state.selectionsByService[state.currentServiceId];
//       }
//     },
//     setSelectedDate: (state, action) => { state.selectedDate = action.payload; },
//     setAvailableTimeSlots: (state, action) => { state.availableTimeSlots = action.payload; },
//     setSelectedSlot: (state, action) => { state.selectedSlot = action.payload; },
//     setAllTimeSlots: (state, action) => { state.allTimeSlots = action.payload; },
//     setLoadingSlots: (state, action) => { state.loadingSlots = action.payload; },
//     setSlotError: (state, action) => { state.slotError = action.payload; },
//     setIsDateFullyBooked: (state, action) => { state.isDateFullyBooked = action.payload; },
//     setCustomerField: (state, action) => { const { field, value } = action.payload; state.customer[field] = value; },
//     setValidationError: (state, action) => { const { field, error } = action.payload; state.validationErrors[field] = error; },
//     setValidationErrors: (state, action) => { state.validationErrors = { ...state.validationErrors, ...action.payload }; },
//     setTouched: (state, action) => { const { field, value } = action.payload; state.touched[field] = value; },
//     setAllTouched: (state) => { state.touched = { name: true, phone: true, email: true, address: true }; },
//     nextStep: (state) => { if (state.currentStep < 2) state.currentStep += 1; },
//     previousStep: (state) => { if (state.currentStep > 1) state.currentStep -= 1; },
//     setBookingSummary: (state, action) => { state.bookingSummary = action.payload; },
//     persistToLocalStorage: (state) => {
//       localStorage.setItem("bookingDraft", JSON.stringify({
//         selectionsByService: state.selectionsByService,
//         customer: state.customer,
//         currentStep: state.currentStep,
//       }));
//     },
//     loadFromLocalStorage: (state) => {
//       const saved = localStorage.getItem("bookingDraft");
//       if (saved) {
//         try {
//           const parsed = JSON.parse(saved);
//           state.selectionsByService = parsed.selectionsByService || {};
//           state.customer = parsed.customer || initialState.customer;
//           state.currentStep = parsed.currentStep || 1;
//         } catch (e) {}
//       }
//     },
//     clearLocalStorage: (state) => { localStorage.removeItem("bookingDraft"); },
//   },
// });

// // ----- BASIC SELECTORS -----
// export const selectService = (state) => state.booking.service;
// export const selectPriceOptions = (state) => state.booking.priceOptions;
// export const selectSelectedPriceOption = (state) => state.booking.selectedPriceOption;
// export const selectSelectedOptions = (state) => state.booking.selectedOptions;
// export const selectSelectedMultiOptions = (state) => state.booking.selectedMultiOptions;
// export const selectTotalPrice = (state) => state.booking.totalPrice;
// export const selectCustomSelectedPrice = (state) => state.booking.customSelectedPrice;
// export const selectSelectedDate = (state) => state.booking.selectedDate;
// export const selectAvailableTimeSlots = (state) => state.booking.availableTimeSlots;
// export const selectSelectedSlot = (state) => state.booking.selectedSlot;
// export const selectAllTimeSlots = (state) => state.booking.allTimeSlots;
// export const selectLoadingSlots = (state) => state.booking.loadingSlots;
// export const selectSlotError = (state) => state.booking.slotError;
// export const selectIsDateFullyBooked = (state) => state.booking.isDateFullyBooked;
// export const selectCustomer = (state) => state.booking.customer;
// export const selectValidationErrors = (state) => state.booking.validationErrors;
// export const selectTouched = (state) => state.booking.touched;
// export const selectCurrentStep = (state) => state.booking.currentStep;
// export const selectBookingSummary = (state) => state.booking.bookingSummary;

// // ----- MEMOIZED SELECTORS -----
// export const selectSelectedItemsSummary = createSelector(
//   [selectSelectedOptions, selectSelectedMultiOptions],
//   (selectedOptions, selectedMultiOptions) => {
//     const items = [];
//     Object.values(selectedOptions).forEach(opt => {
//       if (opt?.label && opt?.price) items.push({ label: opt.label, price: opt.price });
//     });
//     Object.values(selectedMultiOptions).forEach(group => {
//       group.forEach(opt => {
//         if (opt?.label && opt?.price) items.push({ label: opt.label, price: opt.price });
//       });
//     });
//     return items;
//   }
// );

// export const selectTotalPriceComputed = createSelector(
//   [selectTotalPrice, selectSelectedPriceOption],
//   (totalPrice, selectedPriceOption) => totalPrice || selectedPriceOption?.price || 0
// );

// export const selectCanProceedToStep2 = createSelector(
//   [selectSelectedPriceOption, selectSelectedDate, selectSelectedSlot],
//   (selectedPriceOption, selectedDate, selectedSlot) => {
//     return selectedPriceOption !== null && selectedDate !== "" && selectedSlot !== null && !selectedSlot?.isOutdated;
//   }
// );

// export const selectCanConfirm = createSelector(
//   [selectCustomer, selectValidationErrors, selectSelectedDate, selectSelectedSlot],
//   (customer, validationErrors, selectedDate, selectedSlot) => {
//     const { name, phone, email, address } = customer;
//     return name?.trim() && phone?.trim() && email?.trim() && address?.trim() &&
//       !validationErrors.name && !validationErrors.phone && !validationErrors.email && !validationErrors.address &&
//       selectedDate && selectedSlot && !selectedSlot?.isOutdated;
//   }
// );

// // ----- EXPORT ACTIONS -----
// export const {
//   setService,
//   setPriceOptions,
//   setSelectedPriceOption,
//   setSelectedOptions,
//   setSelectedMultiOptions,
//   setTotalPrice,
//   setCustomSelectedPrice,
//   resetSelections,
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
//   clearLocalStorage,
// } = bookingSlice.actions;

// export default bookingSlice.reducer;



// store/bookingSlice.js
import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  service: null,
  currentServiceId: null,
  priceOptions: [],
  serviceMetadataByService: {}, // Store { name, icon, etc. } per serviceId
  selectionsByService: {},
  selectedOptions: {},
  selectedMultiOptions: {},
  // Track previous selections
  previousSelectedOptions: {},
  previousSelectedMultiOptions: {},
  // Track selection history per service
  selectionHistoryByService: {},
  totalPrice: 0,
  customSelectedPrice: null,
  selectedPriceOption: null,
  previousSelectedPriceOption: null,
  selectedDate: "",
  availableTimeSlots: [],
  selectedSlot: null,
  allTimeSlots: [],
  loadingSlots: false,
  slotError: null,
  isDateFullyBooked: false,
  customer: { name: "", phone: "", email: "", address: "" },
  validationErrors: { name: "", phone: "", email: "", address: "" },
  touched: { name: false, phone: false, email: false, address: false },
  currentStep: 1,
  bookingSummary: null,
};

// helpers
const calculateTotalPrice = (selectedOptions, selectedMultiOptions) => {
  let total = 0;
  Object.values(selectedOptions).forEach(opt => { if (opt?.price) total += opt.price; });
  Object.values(selectedMultiOptions).forEach(group => {
    group.forEach(v => { if (v?.price) total += v.price; });
  });
  return total;
};

const formatCustomLabel = (selectedOptions, selectedMultiOptions) => {
  const labels = [];
  Object.values(selectedOptions).forEach(opt => { if (opt?.label) labels.push(opt.label); });
  Object.values(selectedMultiOptions).forEach(group => {
    group.forEach(opt => { if (opt?.label) labels.push(opt.label); });
  });
  // return labels.length ? `Custom Package (${labels.join(" + ")})` : "Custom Package";
};

// Helper to add to selection history
const addToSelectionHistory = (state, serviceId, type, previous, current) => {
  if (!state.selectionHistoryByService[serviceId]) {
    state.selectionHistoryByService[serviceId] = [];
  }
  
  // Keep last 10 selections per service to avoid memory issues
  const MAX_HISTORY = 10;
  
  state.selectionHistoryByService[serviceId].push({
    timestamp: Date.now(),
    type: type, // 'single', 'multi', or 'revert'
    previous: JSON.parse(JSON.stringify(previous)),
    current: JSON.parse(JSON.stringify(current))
  });
  
  // Limit history size
  if (state.selectionHistoryByService[serviceId].length > MAX_HISTORY) {
    state.selectionHistoryByService[serviceId].shift();
  }
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setService: (state, action) => {
      const newService = action.payload;
      const newId = newService?._id;
      
      // If we're already on this service and have active selections, don't overwrite with (potentially stale) saved data
      if (state.currentServiceId === newId && (Object.keys(state.selectedOptions).length > 0 || Object.keys(state.selectedMultiOptions).length > 0)) {
        state.service = newService; // Just update service metadata
        return;
      }

      // Save current selections (including date/time) for the old service before switching
      if (state.currentServiceId && state.currentServiceId !== newId) {
        if (!state.selectionsByService[state.currentServiceId]) {
          state.selectionsByService[state.currentServiceId] = {};
        }
        state.selectionsByService[state.currentServiceId].selectedOptions = state.selectedOptions;
        state.selectionsByService[state.currentServiceId].selectedMultiOptions = state.selectedMultiOptions;
        state.selectionsByService[state.currentServiceId].totalPrice = state.totalPrice;
        state.selectionsByService[state.currentServiceId].selectedPriceOption = state.selectedPriceOption;
        state.selectionsByService[state.currentServiceId].previousSelectedPriceOption = state.previousSelectedPriceOption;
        state.selectionsByService[state.currentServiceId].customSelectedPrice = state.customSelectedPrice;
        state.selectionsByService[state.currentServiceId].selectedDate = state.selectedDate;
        state.selectionsByService[state.currentServiceId].selectedSlot = state.selectedSlot;
      }
      
      state.service = newService;
      state.currentServiceId = newId;
      
      if (newId && newService) {
        state.serviceMetadataByService[newId] = {
          name: newService.name,
          icon: newService.icon,
          image: newService.image
        };
      }
      
      // Load saved selections for this service
      const saved = state.selectionsByService[newId] || {};
      state.selectedOptions = JSON.parse(JSON.stringify(saved.selectedOptions || {}));
      state.selectedMultiOptions = JSON.parse(JSON.stringify(saved.selectedMultiOptions || {}));
      state.totalPrice = saved.totalPrice ?? 0;
      state.customSelectedPrice = saved.customSelectedPrice || null;
      state.selectedPriceOption = saved.selectedPriceOption || null;
      state.previousSelectedPriceOption = saved.previousSelectedPriceOption || null;
      state.selectedDate = saved.selectedDate || "";
      state.selectedSlot = saved.selectedSlot || null;
      
      state.previousSelectedOptions = saved.previousSelectedOptions || {};
      state.previousSelectedMultiOptions = saved.previousSelectedMultiOptions || {};
      
      // reset dynamic lists
      state.availableTimeSlots = [];
      state.loadingSlots = false;
      state.slotError = null;
      state.isDateFullyBooked = false;
      
      // Always reset to Step 1 when entering/switching service context
      state.currentStep = 1;
    },
    
    setPriceOptions: (state, action) => { 
      state.priceOptions = action.payload; 
    },
    
    setSelectedPriceOption: (state, action) => {
      const opt = action.payload;
      const isSame = state.selectedPriceOption?.label === opt?.label && state.selectedPriceOption?.price === opt?.price;
      
      // Store current as previous before updating
      state.previousSelectedPriceOption = state.selectedPriceOption;
      state.selectedPriceOption = opt;
      
      // If it's a standard option (not a custom package), clear the item-level selections
      if (opt && !opt.isCustom) {
        state.selectedOptions = {};
        state.selectedMultiOptions = {};
        state.customSelectedPrice = null;
        state.totalPrice = opt.price || 0;
      }

      if (state.currentServiceId) {
        if (!state.selectionsByService[state.currentServiceId]) state.selectionsByService[state.currentServiceId] = {};
        state.selectionsByService[state.currentServiceId].selectedPriceOption = opt;
        state.selectionsByService[state.currentServiceId].previousSelectedPriceOption = state.previousSelectedPriceOption;
        state.selectionsByService[state.currentServiceId].selectedOptions = state.selectedOptions;
        state.selectionsByService[state.currentServiceId].selectedMultiOptions = state.selectedMultiOptions;
        state.selectionsByService[state.currentServiceId].totalPrice = state.totalPrice;
        state.selectionsByService[state.currentServiceId].customSelectedPrice = state.customSelectedPrice;
      }
      
      // Auto persist to localStorage
      localStorage.setItem("bookingDraft", JSON.stringify({
        selectionsByService: state.selectionsByService,
        serviceMetadataByService: state.serviceMetadataByService,
        selectionHistoryByService: state.selectionHistoryByService,
        customer: state.customer,
        currentStep: state.currentStep,
      }));

      // Only clear schedule if it's a DIFFERENT selection
      if (!isSame) {
        state.selectedDate = "";
        state.selectedSlot = null;
        state.availableTimeSlots = [];
      }
    },
    
    // Track previous selections before updating
    setSelectedOptions: (state, action) => {
      // Store current as previous before updating
      state.previousSelectedOptions = JSON.parse(JSON.stringify(state.selectedOptions));
      
      // Add to history
      if (state.currentServiceId) {
        addToSelectionHistory(
          state, 
          state.currentServiceId, 
          'single',
          state.selectedOptions,
          action.payload
        );
      }
      
      state.selectedOptions = action.payload;
      state.totalPrice = calculateTotalPrice(state.selectedOptions, state.selectedMultiOptions);
      
      if (state.currentServiceId) {
        if (!state.selectionsByService[state.currentServiceId]) state.selectionsByService[state.currentServiceId] = {};
        state.selectionsByService[state.currentServiceId].selectedOptions = action.payload;
        state.selectionsByService[state.currentServiceId].previousSelectedOptions = state.previousSelectedOptions;
        state.selectionsByService[state.currentServiceId].totalPrice = state.totalPrice;
      }
      
      if (state.totalPrice > 0 && Object.keys(action.payload).length > 0) {
        const customPkg = {
          label: formatCustomLabel(state.selectedOptions, state.selectedMultiOptions),
          price: state.totalPrice,
          isCustom: true,
        };
        state.customSelectedPrice = customPkg;
        state.selectedPriceOption = customPkg;
        if (state.currentServiceId) {
          state.selectionsByService[state.currentServiceId].customSelectedPrice = customPkg;
          state.selectionsByService[state.currentServiceId].selectedPriceOption = customPkg;
        }
      }
    },
    
    // Track previous selections before updating
    setSelectedMultiOptions: (state, action) => {
      // Store current as previous before updating
      state.previousSelectedMultiOptions = JSON.parse(JSON.stringify(state.selectedMultiOptions));
      
      // Add to history
      if (state.currentServiceId) {
        addToSelectionHistory(
          state, 
          state.currentServiceId, 
          'multi',
          state.selectedMultiOptions,
          action.payload
        );
      }
      
      state.selectedMultiOptions = action.payload;
      state.totalPrice = calculateTotalPrice(state.selectedOptions, state.selectedMultiOptions);
      
      if (state.currentServiceId) {
        if (!state.selectionsByService[state.currentServiceId]) state.selectionsByService[state.currentServiceId] = {};
        state.selectionsByService[state.currentServiceId].selectedMultiOptions = action.payload;
        state.selectionsByService[state.currentServiceId].previousSelectedMultiOptions = state.previousSelectedMultiOptions;
        state.selectionsByService[state.currentServiceId].totalPrice = state.totalPrice;
      }
      
      const hasMulti = Object.values(action.payload).some(arr => arr.length > 0);
      if ((state.totalPrice > 0 && hasMulti) || (state.totalPrice > 0 && Object.keys(state.selectedOptions).length > 0)) {
        const customPkg = {
          label: formatCustomLabel(state.selectedOptions, state.selectedMultiOptions),
          price: state.totalPrice,
          isCustom: true,
        };
        state.customSelectedPrice = customPkg;
        state.selectedPriceOption = customPkg;
        if (state.currentServiceId) {
          state.selectionsByService[state.currentServiceId].customSelectedPrice = customPkg;
          state.selectionsByService[state.currentServiceId].selectedPriceOption = customPkg;
        }
      }
    },
    
    // Action to revert to previous selections
    revertToPreviousSelections: (state) => {
      if (Object.keys(state.previousSelectedOptions).length > 0 || 
          Object.keys(state.previousSelectedMultiOptions).length > 0) {
        
        // Store current as history before reverting
        if (state.currentServiceId) {
          addToSelectionHistory(
            state, 
            state.currentServiceId, 
            'revert',
            { single: state.selectedOptions, multi: state.selectedMultiOptions },
            { single: state.previousSelectedOptions, multi: state.previousSelectedMultiOptions }
          );
        }
        
        state.selectedOptions = JSON.parse(JSON.stringify(state.previousSelectedOptions));
        state.selectedMultiOptions = JSON.parse(JSON.stringify(state.previousSelectedMultiOptions));
        state.totalPrice = calculateTotalPrice(state.selectedOptions, state.selectedMultiOptions);
        
        // Clear previous after revert to prevent multiple reverts
        state.previousSelectedOptions = {};
        state.previousSelectedMultiOptions = {};
      }
    },
    
    // Clear history for current service
    clearSelectionHistory: (state) => {
      if (state.currentServiceId) {
        state.selectionHistoryByService[state.currentServiceId] = [];
      }
    },
    
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
      if (state.currentServiceId && state.selectionsByService[state.currentServiceId]) {
        state.selectionsByService[state.currentServiceId].totalPrice = action.payload;
      }
    },
    
    setCustomSelectedPrice: (state, action) => {
      state.customSelectedPrice = action.payload;
      if (state.currentServiceId) {
        if (!state.selectionsByService[state.currentServiceId]) state.selectionsByService[state.currentServiceId] = {};
        state.selectionsByService[state.currentServiceId].customSelectedPrice = action.payload;
      }
    },
    
    resetSelections: (state) => {
      state.selectedPriceOption = null;
      state.selectedOptions = {};
      state.selectedMultiOptions = {};
      state.previousSelectedOptions = {};
      state.previousSelectedMultiOptions = {};
      state.totalPrice = 0;
      state.customSelectedPrice = null;
      if (state.currentServiceId && state.selectionsByService[state.currentServiceId]) {
        delete state.selectionsByService[state.currentServiceId];
        delete state.selectionHistoryByService[state.currentServiceId];
      }
    },
    
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
      if (state.currentServiceId) {
        if (!state.selectionsByService[state.currentServiceId]) state.selectionsByService[state.currentServiceId] = {};
        state.selectionsByService[state.currentServiceId].selectedDate = action.payload;
      }
      // Auto persist
      localStorage.setItem("bookingDraft", JSON.stringify({
        selectionsByService: state.selectionsByService,
        serviceMetadataByService: state.serviceMetadataByService,
        selectionHistoryByService: state.selectionHistoryByService,
        customer: state.customer,
        currentStep: state.currentStep,
      }));
    },
    setAvailableTimeSlots: (state, action) => { state.availableTimeSlots = action.payload; },
    setSelectedSlot: (state, action) => {
      state.selectedSlot = action.payload;
      if (state.currentServiceId) {
        if (!state.selectionsByService[state.currentServiceId]) state.selectionsByService[state.currentServiceId] = {};
        state.selectionsByService[state.currentServiceId].selectedSlot = action.payload;
        // Auto persist
        localStorage.setItem("bookingDraft", JSON.stringify({
          selectionsByService: state.selectionsByService,
          serviceMetadataByService: state.serviceMetadataByService,
          selectionHistoryByService: state.selectionHistoryByService,
          customer: state.customer,
          currentStep: state.currentStep,
        }));
      }
    },
    removeServiceSelection: (state, action) => {
      const serviceId = action.payload;
      delete state.selectionsByService[serviceId];
      delete state.selectionHistoryByService[serviceId];
      delete state.serviceMetadataByService[serviceId];
      
      if (state.currentServiceId === serviceId) {
        state.selectedPriceOption = null;
        state.selectedOptions = {};
        state.selectedMultiOptions = {};
        state.totalPrice = 0;
        state.selectedDate = "";
        state.selectedSlot = null;
      }
      // Auto persist
      localStorage.setItem("bookingDraft", JSON.stringify({
        selectionsByService: state.selectionsByService,
        serviceMetadataByService: state.serviceMetadataByService,
        selectionHistoryByService: state.selectionHistoryByService,
        customer: state.customer,
        currentStep: state.currentStep,
      }));
    },
    setServiceDate: (state, action) => {
      const { serviceId, date } = action.payload;
      if (!state.selectionsByService[serviceId]) state.selectionsByService[serviceId] = {};
      state.selectionsByService[serviceId].selectedDate = date;
      if (state.currentServiceId === serviceId) state.selectedDate = date;
      
      // Auto persist
      localStorage.setItem("bookingDraft", JSON.stringify({
        selectionsByService: state.selectionsByService,
        serviceMetadataByService: state.serviceMetadataByService,
        selectionHistoryByService: state.selectionHistoryByService,
        customer: state.customer,
        currentStep: state.currentStep,
      }));
    },
    setServiceSlot: (state, action) => {
      const { serviceId, slot } = action.payload;
      if (!state.selectionsByService[serviceId]) state.selectionsByService[serviceId] = {};
      state.selectionsByService[serviceId].selectedSlot = slot;
      if (state.currentServiceId === serviceId) state.selectedSlot = slot;

      // Auto persist
      localStorage.setItem("bookingDraft", JSON.stringify({
        selectionsByService: state.selectionsByService,
        serviceMetadataByService: state.serviceMetadataByService,
        selectionHistoryByService: state.selectionHistoryByService,
        customer: state.customer,
        currentStep: state.currentStep,
      }));
    },
    
    setAllTimeSlots: (state, action) => { state.allTimeSlots = action.payload; },
    setLoadingSlots: (state, action) => { state.loadingSlots = action.payload; },
    setSlotError: (state, action) => { state.slotError = action.payload; },
    setIsDateFullyBooked: (state, action) => { state.isDateFullyBooked = action.payload; },
    setCustomerField: (state, action) => { const { field, value } = action.payload; state.customer[field] = value; },
    setValidationError: (state, action) => { const { field, error } = action.payload; state.validationErrors[field] = error; },
    setValidationErrors: (state, action) => { state.validationErrors = { ...state.validationErrors, ...action.payload }; },
    setTouched: (state, action) => { const { field, value } = action.payload; state.touched[field] = value; },
    setAllTouched: (state) => { state.touched = { name: true, phone: true, email: true, address: true }; },
    nextStep: (state) => { if (state.currentStep < 2) state.currentStep += 1; },
    previousStep: (state) => { if (state.currentStep > 1) state.currentStep -= 1; },
    setBookingSummary: (state, action) => { state.bookingSummary = action.payload; },
    persistToLocalStorage: (state) => {
      localStorage.setItem("bookingDraft", JSON.stringify({
        selectionsByService: state.selectionsByService,
        serviceMetadataByService: state.serviceMetadataByService,
        selectionHistoryByService: state.selectionHistoryByService,
        customer: state.customer,
        currentStep: state.currentStep,
      }));
    },
    loadFromLocalStorage: (state) => {
      // If we already have selections in memory, don't overwrite with (potentially stale) localStorage data
      if (Object.keys(state.selectionsByService).length > 0) return;

      const saved = localStorage.getItem("bookingDraft");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          state.selectionsByService = parsed.selectionsByService || {};
          state.serviceMetadataByService = parsed.serviceMetadataByService || {};
          state.selectionHistoryByService = parsed.selectionHistoryByService || {};
          state.customer = parsed.customer || initialState.customer;
          state.currentStep = parsed.currentStep || 1;

          // Validation: If at Step 2 but some services are unscheduled, kick back to Step 1
          if (state.currentStep === 2) {
            const allBookings = Object.values(state.selectionsByService);
            const allScheduled = allBookings.every(s => s.selectedDate && s.selectedSlot);
            if (!allScheduled) state.currentStep = 1;
          }
        } catch (e) {
          console.error("Failed to parse booking draft", e);
        }
      }
    },
    clearLocalStorage: (state) => { localStorage.removeItem("bookingDraft"); },
    resetBookingState: (state) => {
      localStorage.removeItem("bookingDraft");
      Object.assign(state, initialState);
    },
  },
});

// ============================================
// BASIC SELECTORS (no dependencies)
// ============================================
export const selectService = (state) => state.booking.service;
export const selectCurrentServiceId = (state) => state.booking.currentServiceId;
export const selectPriceOptions = (state) => state.booking.priceOptions;
export const selectSelectedPriceOption = (state) => state.booking.selectedPriceOption;
export const selectSelectedOptions = (state) => state.booking.selectedOptions;
export const selectSelectedMultiOptions = (state) => state.booking.selectedMultiOptions;
export const selectTotalPrice = (state) => state.booking.totalPrice;
export const selectCustomSelectedPrice = (state) => state.booking.customSelectedPrice;
export const selectSelectedDate = (state) => state.booking.selectedDate;
export const selectAvailableTimeSlots = (state) => state.booking.availableTimeSlots;
export const selectSelectedSlot = (state) => state.booking.selectedSlot;
export const selectAllTimeSlots = (state) => state.booking.allTimeSlots;
export const selectLoadingSlots = (state) => state.booking.loadingSlots;
export const selectSlotError = (state) => state.booking.slotError;
export const selectIsDateFullyBooked = (state) => state.booking.isDateFullyBooked;
export const selectCustomer = (state) => state.booking.customer;
export const selectValidationErrors = (state) => state.booking.validationErrors;
export const selectTouched = (state) => state.booking.touched;
export const selectCurrentStep = (state) => state.booking.currentStep;
export const selectBookingSummary = (state) => state.booking.bookingSummary;
export const selectPreviousSelectedOptions = (state) => state.booking.previousSelectedOptions;
export const selectPreviousSelectedMultiOptions = (state) => state.booking.previousSelectedMultiOptions;
export const selectSelectionsByService = (state) => state.booking.selectionsByService;

// ============================================
// MEMOIZED SELECTORS
// ============================================

// Memoized selectors for previous selections
export const selectSelectionHistory = createSelector(
  [selectCurrentServiceId, (state) => state.booking.selectionHistoryByService],
  (currentServiceId, selectionHistoryByService) => {
    return selectionHistoryByService[currentServiceId] || [];
  }
);

export const selectGlobalSelectionHistory = createSelector(
  [(state) => state.booking.selectionHistoryByService],
  (historyByService) => {
    const allHistory = [];
    Object.entries(historyByService).forEach(([serviceId, history]) => {
      history.forEach(entry => allHistory.push({ ...entry, serviceId }));
    });
    return allHistory.sort((a, b) => b.timestamp - a.timestamp);
  }
);

export const selectAllActiveBookings = createSelector(
  [(state) => state.booking.selectionsByService, (state) => state.booking.serviceMetadataByService],
  (selectionsByService, metadataByService) => {
    return Object.entries(selectionsByService)
      .map(([serviceId, selections]) => {
        const metadata = metadataByService[serviceId] || { name: "Unknown Service" };
        const hasPriceOption = selections.selectedPriceOption !== null;
        const hasOptions = selections.selectedOptions && Object.keys(selections.selectedOptions).length > 0;
        const hasMulti = selections.selectedMultiOptions && Object.values(selections.selectedMultiOptions).some(arr => arr.length > 0);
        const hasTotalPrice = selections.totalPrice > 0;
        
        if (hasPriceOption || hasOptions || hasMulti || hasTotalPrice) {
          return {
            serviceId,
            serviceName: metadata.name,
            icon: metadata.icon,
            image: metadata.image,
            selections,
          };
        }
        return null;
      })
      .filter(Boolean);
  }
);

export const selectHasPreviousSelections = createSelector(
  [selectPreviousSelectedOptions, selectPreviousSelectedMultiOptions],
  (previousSelectedOptions, previousSelectedMultiOptions) => {
    return Object.keys(previousSelectedOptions).length > 0 || 
           Object.keys(previousSelectedMultiOptions).length > 0;
  }
);

// export const selectPreviousSelectedMultiOptions = (state) => state.booking.previousSelectedMultiOptions;
export const selectPreviousSelectedPriceOption = (state) => state.booking.previousSelectedPriceOption;

// Selected items summary
export const selectSelectedItemsSummary = createSelector(
  [selectSelectedOptions, selectSelectedMultiOptions, selectSelectedPriceOption],
  (selectedOptions, selectedMultiOptions, selectedPriceOption) => {
    const items = [];
    Object.values(selectedOptions).forEach(opt => {
      if (opt?.label && opt?.price) items.push({ label: opt.label, price: opt.price });
    });
    Object.values(selectedMultiOptions).forEach(group => {
      group.forEach(opt => {
        if (opt?.label && opt?.price) items.push({ label: opt.label, price: opt.price });
      });
    });
    // If it's a standard option (not custom), we can show it too if needed, 
    // but usually we only show "Custom Selection" list.
    // However, for the summary history to work for standard plans, we must include it.
    if (selectedPriceOption && !selectedPriceOption.isCustom) {
       // Only add if not already covered by item-level selections
       if (items.length === 0) {
         items.push({ label: selectedPriceOption.label, price: selectedPriceOption.price });
       }
    }
    return items;
  }
);

// Previous items summary
export const selectPreviousItemsSummary = createSelector(
  [selectPreviousSelectedOptions, selectPreviousSelectedMultiOptions, selectPreviousSelectedPriceOption],
  (previousSelectedOptions, previousSelectedMultiOptions, previousSelectedPriceOption) => {
    const items = [];
    Object.values(previousSelectedOptions).forEach(opt => {
      if (opt?.label && opt?.price) items.push({ label: opt.label, price: opt.price });
    });
    Object.values(previousSelectedMultiOptions).forEach(group => {
      group.forEach(opt => {
        if (opt?.label && opt?.price) items.push({ label: opt.label, price: opt.price });
      });
    });
    
    // Include previous standard price option
    if (previousSelectedPriceOption && !previousSelectedPriceOption.isCustom) {
      if (items.length === 0) {
        items.push({ label: previousSelectedPriceOption.label, price: previousSelectedPriceOption.price });
      }
    }
    return items;
  }
);

// Selection diff
export const selectSelectionDiff = createSelector(
  [selectPreviousItemsSummary, selectSelectedItemsSummary],
  (previousItems, currentItems) => {
    const previousMap = new Map(previousItems.map(item => [item.label, item]));
    const currentMap = new Map(currentItems.map(item => [item.label, item]));
    
    const added = currentItems.filter(item => !previousMap.has(item.label));
    const removed = previousItems.filter(item => !currentMap.has(item.label));
    const unchanged = currentItems.filter(item => previousMap.has(item.label));
    
    return { added, removed, unchanged };
  }
);

// Last selection changes with limit
export const selectLastSelectionChanges = createSelector(
  [selectSelectionHistory, (state, limit = 5) => limit],
  (history, limit) => history.slice(-limit)
);

// Total price computed
export const selectTotalPriceComputed = createSelector(
  [selectTotalPrice, selectSelectedPriceOption],
  (totalPrice, selectedPriceOption) => totalPrice || selectedPriceOption?.price || 0
);

// Can proceed to step 2
export const selectCanProceedToStep2 = createSelector(
  [selectAllActiveBookings],
  (allBookings) => {
    if (allBookings.length === 0) return false;
    return allBookings.every(b => 
      b.selections.selectedDate && 
      b.selections.selectedSlot && 
      !b.selections.selectedSlot.isOutdated
    );
  }
);

// Can confirm booking
export const selectCanConfirm = createSelector(
  [selectCustomer, selectValidationErrors, selectAllActiveBookings],
  (customer, validationErrors, allBookings) => {
    const { name, phone, email, address } = customer;
    const isContactValid = name?.trim() && phone?.trim() && email?.trim() && address?.trim() &&
      !validationErrors.name && !validationErrors.phone && !validationErrors.email && !validationErrors.address;
    
    if (!isContactValid) return false;
    if (allBookings.length === 0) return false;
    
    // All services must be scheduled
    return allBookings.every(b => 
      b.selections.selectedDate && 
      b.selections.selectedSlot && 
      !b.selections.selectedSlot.isOutdated
    );
  }
);

// ============================================
// EXPORT ACTIONS
// ============================================
export const {
  setService,
  setPriceOptions,
  setSelectedPriceOption,
  setSelectedOptions,
  setSelectedMultiOptions,
  setTotalPrice,
  setCustomSelectedPrice,
  resetSelections,
  removeServiceSelection,
  revertToPreviousSelections,
  clearSelectionHistory,
  setSelectedDate,
  setServiceDate,
  setAvailableTimeSlots,
  setSelectedSlot,
  setServiceSlot,
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
  clearLocalStorage,
  resetBookingState,
} = bookingSlice.actions;

export default bookingSlice.reducer;