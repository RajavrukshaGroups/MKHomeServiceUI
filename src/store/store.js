// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./bookingSlice";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});