// // store/bookingSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const DEFAULT_SLOTS = [
//   "09:00-10:00",
//   "12:00-13:00",
//   "15:00-16:00",
//   "17:00-18:00",
// ];

// const initialState = {
//   // Service Details
//   service: null,
//   serviceId: null,
  
//   // ========== CHOOSE YOUR PLAN SECTION ==========
//   priceOptions: [],
//   selectedPriceOption: null,
//   selectedPriceOptionHistory: [], // Track price selection history
  
//   // ========== SELECT DATE & TIME SECTION ==========
//   selectedDate: "",
//   selectedDateHistory: [], // Track date selection history
//   availableTimeSlots: [],
//   selectedSlot: null,
//   selectedSlotHistory: [], // Track slot selection history
//   allTimeSlots: [],
  
//   // UI States for Date & Time
//   loadingSlots: false,
//   slotError: null,
//   isDateFullyBooked: false,
  
//   // Customer Details
//   customer: {
//     name: "",
//     phone: "",
//     email: "",
//     address: "",
//   },
  
//   // Validation
//   validationErrors: {
//     name: "",
//     phone: "",
//     email: "",
//     address: "",
//   },
//   touched: {
//     name: false,
//     phone: false,
//     email: false,
//     address: false,
//   },
  
//   // Step Management
//   currentStep: 1,
  
//   // Booking Summary
//   bookingSummary: null,
  
//   // Form Completeness Tracking
//   isPriceSelected: false,
//   isDateTimeSelected: false,
//   isCustomerInfoComplete: false,
// };

// const bookingSlice = createSlice({
//   name: "booking",
//   initialState,
//   reducers: {
//     // ========== SERVICE ACTIONS ==========
//     setService: (state, action) => {
//       state.service = action.payload;
//       state.serviceId = action.payload?._id;
//     },
//     setPriceOptions: (state, action) => {
//       state.priceOptions = action.payload;
//     },
    
//     // ========== CHOOSE YOUR PLAN ACTIONS ==========
//     setSelectedPriceOption: (state, action) => {
//       state.selectedPriceOption = action.payload;
//       state.isPriceSelected = !!action.payload;
      
//       // Save to history for undo/redo functionality
//       if (action.payload) {
//         state.selectedPriceOptionHistory.push({
//           option: action.payload,
//           timestamp: new Date().toISOString(),
//         });
//         // Keep only last 5 history items
//         if (state.selectedPriceOptionHistory.length > 5) {
//           state.selectedPriceOptionHistory.shift();
//         }
//       }
      
//       // Reset date & time when price option changes
//       state.selectedDate = "";
//       state.selectedSlot = null;
//       state.availableTimeSlots = [];
//       state.isDateFullyBooked = false;
//       state.slotError = null;
//       state.isDateTimeSelected = false;
//     },
    
//     // ========== SELECT DATE & TIME ACTIONS ==========
//     setSelectedDate: (state, action) => {
//       state.selectedDate = action.payload;
      
//       // Save to history
//       if (action.payload) {
//         state.selectedDateHistory.push({
//           date: action.payload,
//           timestamp: new Date().toISOString(),
//         });
//         if (state.selectedDateHistory.length > 5) {
//           state.selectedDateHistory.shift();
//         }
//       }
      
//       // Reset time slots when date changes
//       state.availableTimeSlots = [];
//       state.selectedSlot = null;
//       state.isDateFullyBooked = false;
//       state.slotError = null;
//       state.isDateTimeSelected = false;
//     },
    
//     setAvailableTimeSlots: (state, action) => {
//       state.availableTimeSlots = action.payload;
//     },
    
//     setSelectedSlot: (state, action) => {
//       state.selectedSlot = action.payload;
      
//       // Update date & time selection status
//       state.isDateTimeSelected = !!(state.selectedDate && action.payload);
      
//       // Save to history
//       if (action.payload) {
//         state.selectedSlotHistory.push({
//           slot: action.payload,
//           date: state.selectedDate,
//           timestamp: new Date().toISOString(),
//         });
//         if (state.selectedSlotHistory.length > 5) {
//           state.selectedSlotHistory.shift();
//         }
//       }
//     },
    
//     setAllTimeSlots: (state, action) => {
//       state.allTimeSlots = action.payload;
//     },
    
//     setLoadingSlots: (state, action) => {
//       state.loadingSlots = action.payload;
//     },
    
//     setSlotError: (state, action) => {
//       state.slotError = action.payload;
//     },
    
//     setIsDateFullyBooked: (state, action) => {
//       state.isDateFullyBooked = action.payload;
//     },
    
//     // ========== CUSTOMER ACTIONS ==========
//     setCustomerField: (state, action) => {
//       const { field, value } = action.payload;
//       state.customer[field] = value;
      
//       // Update customer info completeness
//       const { name, phone, email, address } = state.customer;
//       state.isCustomerInfoComplete = !!(name && phone && email && address);
//     },
    
//     setCustomer: (state, action) => {
//       state.customer = { ...state.customer, ...action.payload };
      
//       // Update customer info completeness
//       const { name, phone, email, address } = state.customer;
//       state.isCustomerInfoComplete = !!(name && phone && email && address);
//     },
    
//     resetCustomer: (state) => {
//       state.customer = initialState.customer;
//       state.isCustomerInfoComplete = false;
//     },
    
//     // ========== VALIDATION ACTIONS ==========
//     setValidationError: (state, action) => {
//       const { field, error } = action.payload;
//       state.validationErrors[field] = error;
//     },
    
//     setValidationErrors: (state, action) => {
//       state.validationErrors = { ...state.validationErrors, ...action.payload };
//     },
    
//     setTouched: (state, action) => {
//       const { field, value } = action.payload;
//       state.touched[field] = value;
//     },
    
//     setAllTouched: (state) => {
//       state.touched = {
//         name: true,
//         phone: true,
//         email: true,
//         address: true,
//       };
//     },
    
//     resetValidation: (state) => {
//       state.validationErrors = initialState.validationErrors;
//       state.touched = initialState.touched;
//     },
    
//     // ========== STEP MANAGEMENT ==========
//     setCurrentStep: (state, action) => {
//       state.currentStep = action.payload;
//     },
    
//     nextStep: (state) => {
//       if (state.currentStep < 3) {
//         // Validate current step before proceeding
//         if (state.currentStep === 1 && (!state.isPriceSelected || !state.isDateTimeSelected)) {
//           return;
//         }
//         state.currentStep += 1;
//       }
//     },
    
//     previousStep: (state) => {
//       if (state.currentStep > 1) {
//         state.currentStep -= 1;
//       }
//     },
    
//     resetStep: (state) => {
//       state.currentStep = 1;
//     },
    
//     // ========== BOOKING SUMMARY ==========
//     setBookingSummary: (state, action) => {
//       state.bookingSummary = action.payload;
//     },
    
//     // ========== UNDO/REDO FUNCTIONALITY ==========
//     undoPriceSelection: (state) => {
//       if (state.selectedPriceOptionHistory.length > 1) {
//         const previous = state.selectedPriceOptionHistory[state.selectedPriceOptionHistory.length - 2];
//         state.selectedPriceOption = previous.option;
//         state.isPriceSelected = true;
//         state.selectedPriceOptionHistory.pop();
//       }
//     },
    
//     undoDateSelection: (state) => {
//       if (state.selectedDateHistory.length > 1) {
//         const previous = state.selectedDateHistory[state.selectedDateHistory.length - 2];
//         state.selectedDate = previous.date;
//         state.selectedDateHistory.pop();
//       }
//     },
    
//     undoSlotSelection: (state) => {
//       if (state.selectedSlotHistory.length > 1) {
//         const previous = state.selectedSlotHistory[state.selectedSlotHistory.length - 2];
//         state.selectedSlot = previous.slot;
//         state.selectedSlotHistory.pop();
//         state.isDateTimeSelected = !!(state.selectedDate && state.selectedSlot);
//       }
//     },
    
//     // ========== RESET ENTIRE BOOKING ==========
//     resetBooking: (state) => {
//       return initialState;
//     },
    
//     // ========== PERSIST TO LOCAL STORAGE ==========
//     persistToLocalStorage: (state) => {
//       const persistData = {
//         selectedPriceOption: state.selectedPriceOption,
//         selectedDate: state.selectedDate,
//         selectedSlot: state.selectedSlot,
//         customer: state.customer,
//         currentStep: state.currentStep,
//         timestamp: new Date().toISOString(),
//       };
//       localStorage.setItem('bookingDraft', JSON.stringify(persistData));
//     },
    
//     loadFromLocalStorage: (state) => {
//       const savedData = localStorage.getItem('bookingDraft');
//       if (savedData) {
//         const parsed = JSON.parse(savedData);
//         if (parsed.selectedPriceOption) state.selectedPriceOption = parsed.selectedPriceOption;
//         if (parsed.selectedDate) state.selectedDate = parsed.selectedDate;
//         if (parsed.selectedSlot) state.selectedSlot = parsed.selectedSlot;
//         if (parsed.customer) state.customer = parsed.customer;
//         if (parsed.currentStep) state.currentStep = parsed.currentStep;
        
//         state.isPriceSelected = !!state.selectedPriceOption;
//         state.isDateTimeSelected = !!(state.selectedDate && state.selectedSlot);
//         state.isCustomerInfoComplete = !!(state.customer.name && state.customer.phone && state.customer.email && state.customer.address);
//       }
//     },
    
//     clearDraft: (state) => {
//       localStorage.removeItem('bookingDraft');
//     },
//   },
// });

// // Export actions
// export const {
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
//   setCustomer,
//   resetCustomer,
//   setValidationError,
//   setValidationErrors,
//   setTouched,
//   setAllTouched,
//   resetValidation,
//   setCurrentStep,
//   nextStep,
//   previousStep,
//   resetStep,
//   setBookingSummary,
//   undoPriceSelection,
//   undoDateSelection,
//   undoSlotSelection,
//   resetBooking,
//   persistToLocalStorage,
//   loadFromLocalStorage,
//   clearDraft,
// } = bookingSlice.actions;

// // ========== SELECTORS ==========
// export const selectService = (state) => state.booking.service;
// export const selectPriceOptions = (state) => state.booking.priceOptions;
// export const selectSelectedPriceOption = (state) => state.booking.selectedPriceOption;
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
// export const selectIsPriceSelected = (state) => state.booking.isPriceSelected;
// export const selectIsDateTimeSelected = (state) => state.booking.isDateTimeSelected;
// export const selectIsCustomerInfoComplete = (state) => state.booking.isCustomerInfoComplete;

// // Derived selectors
// export const selectCanProceedToStep2 = (state) => {
//   const { selectedPriceOption, selectedDate, selectedSlot, isDateFullyBooked, selectedSlot: slot } = state.booking;
//   return selectedPriceOption && selectedDate && selectedSlot && !isDateFullyBooked && !slot?.isOutdated;
// };

// export const selectCanConfirm = (state) => {
//   const { customer, validationErrors } = state.booking;
//   return customer.name && customer.phone && customer.email && customer.address &&
//     !validationErrors.name && !validationErrors.phone && !validationErrors.email && !validationErrors.address;
// };

// export const selectPriceSelectionSummary = (state) => ({
//   isSelected: state.booking.isPriceSelected,
//   selectedOption: state.booking.selectedPriceOption,
//   history: state.booking.selectedPriceOptionHistory,
// });

// export const selectDateTimeSelectionSummary = (state) => ({
//   isSelected: state.booking.isDateTimeSelected,
//   date: state.booking.selectedDate,
//   slot: state.booking.selectedSlot,
//   dateHistory: state.booking.selectedDateHistory,
//   slotHistory: state.booking.selectedSlotHistory,
// });

// export default bookingSlice.reducer;

// store/bookingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_SLOTS = [
  "09:00-10:00",
  "12:00-13:00",
  "15:00-16:00",
  "17:00-18:00",
];

const initialState = {
  // Service Details
  service: null,
  serviceId: null,
  
  // ========== CHOOSE YOUR PLAN SECTION ==========
  priceOptions: [],
  selectedPriceOption: null,
  selectedPriceOptionHistory: [], // Track price selection history
  
  // Selected Options from Service Details page
  selectedOptions: {},  // Store selected option configurations (e.g., {0: {label: "1BHK", price: 999}, 1: {...}})
  totalPrice: null,     // Store calculated total price from selected options
  
  // ========== SELECT DATE & TIME SECTION ==========
  selectedDate: "",
  selectedDateHistory: [], // Track date selection history
  availableTimeSlots: [],
  selectedSlot: null,
  selectedSlotHistory: [], // Track slot selection history
  allTimeSlots: [],
  
  // UI States for Date & Time
  loadingSlots: false,
  slotError: null,
  isDateFullyBooked: false,
  
  // Customer Details
  customer: {
    name: "",
    phone: "",
    email: "",
    address: "",
  },
  
  // Validation
  validationErrors: {
    name: "",
    phone: "",
    email: "",
    address: "",
  },
  touched: {
    name: false,
    phone: false,
    email: false,
    address: false,
  },
  
  // Step Management
  currentStep: 1,
  
  // Booking Summary
  bookingSummary: null,
  
  // Form Completeness Tracking
  isPriceSelected: false,
  isDateTimeSelected: false,
  isCustomerInfoComplete: false,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    // ========== SERVICE ACTIONS ==========
    setService: (state, action) => {
      state.service = action.payload;
      state.serviceId = action.payload?._id;
    },
    setPriceOptions: (state, action) => {
      state.priceOptions = action.payload;
    },
    
    // ========== SELECTED OPTIONS FROM SERVICE DETAILS ==========
    setSelectedOptions: (state, action) => {
      state.selectedOptions = action.payload;
      // Also update the selected price option based on total price
      if (state.totalPrice !== null && Object.keys(action.payload).length > 0) {
        state.selectedPriceOption = {
          label: `Custom Package (${Object.values(action.payload).map(v => v.label).join(' + ')})`,
          price: state.totalPrice,
          options: action.payload
        };
        state.isPriceSelected = true;
      }
    },
    
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
      if (action.payload !== null && Object.keys(state.selectedOptions).length > 0) {
        state.selectedPriceOption = {
          label: `Custom Package (${Object.values(state.selectedOptions).map(v => v.label).join(' + ')})`,
          price: action.payload,
          options: state.selectedOptions
        };
        state.isPriceSelected = true;
      }
    },
    
    // ========== CHOOSE YOUR PLAN ACTIONS ==========
    setSelectedPriceOption: (state, action) => {
      state.selectedPriceOption = action.payload;
      state.isPriceSelected = !!action.payload;
      
      // Save to history for undo/redo functionality
      if (action.payload) {
        state.selectedPriceOptionHistory.push({
          option: action.payload,
          timestamp: new Date().toISOString(),
        });
        // Keep only last 5 history items
        if (state.selectedPriceOptionHistory.length > 5) {
          state.selectedPriceOptionHistory.shift();
        }
      }
      
      // Reset date & time when price option changes
      state.selectedDate = "";
      state.selectedSlot = null;
      state.availableTimeSlots = [];
      state.isDateFullyBooked = false;
      state.slotError = null;
      state.isDateTimeSelected = false;
    },
    
    // ========== SELECT DATE & TIME ACTIONS ==========
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
      
      // Save to history
      if (action.payload) {
        state.selectedDateHistory.push({
          date: action.payload,
          timestamp: new Date().toISOString(),
        });
        if (state.selectedDateHistory.length > 5) {
          state.selectedDateHistory.shift();
        }
      }
      
      // Reset time slots when date changes
      state.availableTimeSlots = [];
      state.selectedSlot = null;
      state.isDateFullyBooked = false;
      state.slotError = null;
      state.isDateTimeSelected = false;
    },
    
    setAvailableTimeSlots: (state, action) => {
      state.availableTimeSlots = action.payload;
    },
    
    setSelectedSlot: (state, action) => {
      state.selectedSlot = action.payload;
      
      // Update date & time selection status
      state.isDateTimeSelected = !!(state.selectedDate && action.payload);
      
      // Save to history
      if (action.payload) {
        state.selectedSlotHistory.push({
          slot: action.payload,
          date: state.selectedDate,
          timestamp: new Date().toISOString(),
        });
        if (state.selectedSlotHistory.length > 5) {
          state.selectedSlotHistory.shift();
        }
      }
    },
    
    setAllTimeSlots: (state, action) => {
      state.allTimeSlots = action.payload;
    },
    
    setLoadingSlots: (state, action) => {
      state.loadingSlots = action.payload;
    },
    
    setSlotError: (state, action) => {
      state.slotError = action.payload;
    },
    
    setIsDateFullyBooked: (state, action) => {
      state.isDateFullyBooked = action.payload;
    },
    
    // ========== CUSTOMER ACTIONS ==========
    setCustomerField: (state, action) => {
      const { field, value } = action.payload;
      state.customer[field] = value;
      
      // Update customer info completeness
      const { name, phone, email, address } = state.customer;
      state.isCustomerInfoComplete = !!(name && phone && email && address);
    },
    
    setCustomer: (state, action) => {
      state.customer = { ...state.customer, ...action.payload };
      
      // Update customer info completeness
      const { name, phone, email, address } = state.customer;
      state.isCustomerInfoComplete = !!(name && phone && email && address);
    },
    
    resetCustomer: (state) => {
      state.customer = initialState.customer;
      state.isCustomerInfoComplete = false;
    },
    
    // ========== VALIDATION ACTIONS ==========
    setValidationError: (state, action) => {
      const { field, error } = action.payload;
      state.validationErrors[field] = error;
    },
    
    setValidationErrors: (state, action) => {
      state.validationErrors = { ...state.validationErrors, ...action.payload };
    },
    
    setTouched: (state, action) => {
      const { field, value } = action.payload;
      state.touched[field] = value;
    },
    
    setAllTouched: (state) => {
      state.touched = {
        name: true,
        phone: true,
        email: true,
        address: true,
      };
    },
    
    resetValidation: (state) => {
      state.validationErrors = initialState.validationErrors;
      state.touched = initialState.touched;
    },
    
    // ========== STEP MANAGEMENT ==========
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    
    nextStep: (state) => {
      if (state.currentStep < 3) {
        // Validate current step before proceeding
        if (state.currentStep === 1 && (!state.isPriceSelected || !state.isDateTimeSelected)) {
          return;
        }
        state.currentStep += 1;
      }
    },
    
    previousStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    
    resetStep: (state) => {
      state.currentStep = 1;
    },
    
    // ========== BOOKING SUMMARY ==========
    setBookingSummary: (state, action) => {
      state.bookingSummary = action.payload;
    },
    
    // ========== UNDO/REDO FUNCTIONALITY ==========
    undoPriceSelection: (state) => {
      if (state.selectedPriceOptionHistory.length > 1) {
        const previous = state.selectedPriceOptionHistory[state.selectedPriceOptionHistory.length - 2];
        state.selectedPriceOption = previous.option;
        state.isPriceSelected = true;
        state.selectedPriceOptionHistory.pop();
      }
    },
    
    undoDateSelection: (state) => {
      if (state.selectedDateHistory.length > 1) {
        const previous = state.selectedDateHistory[state.selectedDateHistory.length - 2];
        state.selectedDate = previous.date;
        state.selectedDateHistory.pop();
      }
    },
    
    undoSlotSelection: (state) => {
      if (state.selectedSlotHistory.length > 1) {
        const previous = state.selectedSlotHistory[state.selectedSlotHistory.length - 2];
        state.selectedSlot = previous.slot;
        state.selectedSlotHistory.pop();
        state.isDateTimeSelected = !!(state.selectedDate && state.selectedSlot);
      }
    },
    
    // ========== RESET ENTIRE BOOKING ==========
    resetBooking: (state) => {
      return initialState;
    },
    
    // ========== RESET SELECTIONS (Keep customer info) ==========
    resetSelections: (state) => {
      state.selectedPriceOption = null;
      state.selectedOptions = {};
      state.totalPrice = null;
      state.selectedDate = "";
      state.selectedSlot = null;
      state.availableTimeSlots = [];
      state.isPriceSelected = false;
      state.isDateTimeSelected = false;
      state.isDateFullyBooked = false;
      state.slotError = null;
      state.currentStep = 1;
    },
    
    // ========== PERSIST TO LOCAL STORAGE ==========
    persistToLocalStorage: (state) => {
      const persistData = {
        selectedPriceOption: state.selectedPriceOption,
        selectedOptions: state.selectedOptions,
        totalPrice: state.totalPrice,
        selectedDate: state.selectedDate,
        selectedSlot: state.selectedSlot,
        customer: state.customer,
        currentStep: state.currentStep,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem('bookingDraft', JSON.stringify(persistData));
    },
    
    loadFromLocalStorage: (state) => {
      const savedData = localStorage.getItem('bookingDraft');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.selectedPriceOption) state.selectedPriceOption = parsed.selectedPriceOption;
        if (parsed.selectedOptions) state.selectedOptions = parsed.selectedOptions;
        if (parsed.totalPrice) state.totalPrice = parsed.totalPrice;
        if (parsed.selectedDate) state.selectedDate = parsed.selectedDate;
        if (parsed.selectedSlot) state.selectedSlot = parsed.selectedSlot;
        if (parsed.customer) state.customer = parsed.customer;
        if (parsed.currentStep) state.currentStep = parsed.currentStep;
        
        state.isPriceSelected = !!state.selectedPriceOption;
        state.isDateTimeSelected = !!(state.selectedDate && state.selectedSlot);
        state.isCustomerInfoComplete = !!(state.customer.name && state.customer.phone && state.customer.email && state.customer.address);
      }
    },
    
    clearDraft: (state) => {
      localStorage.removeItem('bookingDraft');
    },
  },
});

// Export actions
export const {
  setService,
  setPriceOptions,
  setSelectedOptions,
  setTotalPrice,
  setSelectedPriceOption,
  setSelectedDate,
  setAvailableTimeSlots,
  setSelectedSlot,
  setAllTimeSlots,
  setLoadingSlots,
  setSlotError,
  setIsDateFullyBooked,
  setCustomerField,
  setCustomer,
  resetCustomer,
  setValidationError,
  setValidationErrors,
  setTouched,
  setAllTouched,
  resetValidation,
  setCurrentStep,
  nextStep,
  previousStep,
  resetStep,
  setBookingSummary,
  undoPriceSelection,
  undoDateSelection,
  undoSlotSelection,
  resetBooking,
  resetSelections,
  persistToLocalStorage,
  loadFromLocalStorage,
  clearDraft,
} = bookingSlice.actions;

// ========== SELECTORS ==========
export const selectService = (state) => state.booking.service;
export const selectPriceOptions = (state) => state.booking.priceOptions;
export const selectSelectedPriceOption = (state) => state.booking.selectedPriceOption;
export const selectSelectedOptions = (state) => state.booking.selectedOptions;
export const selectTotalPrice = (state) => state.booking.totalPrice;
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
export const selectIsPriceSelected = (state) => state.booking.isPriceSelected;
export const selectIsDateTimeSelected = (state) => state.booking.isDateTimeSelected;
export const selectIsCustomerInfoComplete = (state) => state.booking.isCustomerInfoComplete;

// Derived selectors
export const selectCanProceedToStep2 = (state) => {
  const { selectedPriceOption, selectedDate, selectedSlot, isDateFullyBooked, selectedSlot: slot } = state.booking;
  return selectedPriceOption && selectedDate && selectedSlot && !isDateFullyBooked && !slot?.isOutdated;
};

export const selectCanConfirm = (state) => {
  const { customer, validationErrors } = state.booking;
  return customer.name && customer.phone && customer.email && customer.address &&
    !validationErrors.name && !validationErrors.phone && !validationErrors.email && !validationErrors.address;
};

export const selectPriceSelectionSummary = (state) => ({
  isSelected: state.booking.isPriceSelected,
  selectedOption: state.booking.selectedPriceOption,
  selectedOptions: state.booking.selectedOptions,
  totalPrice: state.booking.totalPrice,
  history: state.booking.selectedPriceOptionHistory,
});

export const selectDateTimeSelectionSummary = (state) => ({
  isSelected: state.booking.isDateTimeSelected,
  date: state.booking.selectedDate,
  slot: state.booking.selectedSlot,
  dateHistory: state.booking.selectedDateHistory,
  slotHistory: state.booking.selectedSlotHistory,
});

export const selectAllSelections = (state) => ({
  service: state.booking.service,
  selectedPriceOption: state.booking.selectedPriceOption,
  selectedOptions: state.booking.selectedOptions,
  totalPrice: state.booking.totalPrice,
  selectedDate: state.booking.selectedDate,
  selectedSlot: state.booking.selectedSlot,
  customer: state.booking.customer,
  currentStep: state.booking.currentStep,
  isPriceSelected: state.booking.isPriceSelected,
  isDateTimeSelected: state.booking.isDateTimeSelected,
  isCustomerInfoComplete: state.booking.isCustomerInfoComplete,
});

export default bookingSlice.reducer;