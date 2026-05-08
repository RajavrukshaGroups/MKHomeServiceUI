// StepTwo.jsx
import React from "react";
import { User, Phone, Mail, MapPin, XCircle, CircleUser,LocateFixed  } from "lucide-react";

const StepTwo = ({
  customer,
  touched,
  validationErrors,
  autoAddressLoading,
  onInputChange,
  onFetchAddress,
}) => {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-100/50 space-y-5">
      <h2 className="text-2xl font-serif text-stone-800 flex items-center gap-2">
        <CircleUser className="w-8 h-8 text-amber-500" />
        Your contact details
      </h2>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Full name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              className={`w-full pl-10 pr-4 py-3 border rounded-xl ${
                touched.name && validationErrors.name ? "border-red-500" : "border-stone-200"
              }`}
              value={customer.name}
              onChange={(e) => onInputChange("name", e.target.value)}
            />
            {touched.name && validationErrors.name && (
              <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
            )}
          </div>
          {touched.name && validationErrors.name && (
            <p className="error-message text-red-500 text-xs mt-1">{validationErrors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Phone number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="tel"
              className={`w-full pl-10 pr-4 py-3 border rounded-xl ${
                touched.phone && validationErrors.phone ? "border-red-500" : "border-stone-200"
              }`}
              value={customer.phone}
              onChange={(e) => onInputChange("phone", e.target.value)}
            />
            {touched.phone && validationErrors.phone && (
              <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
            )}
          </div>
          {touched.phone && validationErrors.phone && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Email address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="email"
              className={`w-full pl-10 pr-4 py-3 border rounded-xl ${
                touched.email && validationErrors.email ? "border-red-500" : "border-stone-200"
              }`}
              value={customer.email}
              onChange={(e) => onInputChange("email", e.target.value)}
            />
            {touched.email && validationErrors.email && (
              <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
            )}
          </div>
          {touched.email && validationErrors.email && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Service address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
            <textarea
              rows="3"
              className={`w-full pl-10 pr-4 py-3 border rounded-xl ${
                touched.address && validationErrors.address ? "border-red-500" : "border-stone-200"
              }`}
              value={customer.address}
              onChange={(e) => onInputChange("address", e.target.value)}
            />
            {touched.address && validationErrors.address && (
              <XCircle className="absolute right-3 top-3 w-4 h-4 text-red-500" />
            )}
          </div>
          {touched.address && validationErrors.address && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.address}</p>
          )}
          <button
            onClick={onFetchAddress}
            disabled={autoAddressLoading}
            className="mt-2 text-sm text-amber-600 hover:underline flex flex-row items-center gap-2"
          >
            {autoAddressLoading ? "Fetching..." : <><LocateFixed className="w-4 h-4" />
                                                    <span>Use my current location</span></>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;