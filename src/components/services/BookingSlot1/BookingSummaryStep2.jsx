// BookingSummaryStep2.jsx
import React from "react";
import { User, Phone, Mail, MapPin, CalendarDays, Clock   } from "lucide-react";
import { formatTimeRange, formatDateDisplay } from "../BookingSlot";

const BookingSummaryStep2 = ({
  allActiveBookings = [],
  customer,
  validationErrors,
  canConfirm,
  submitting,
  onPrevious,
  onConfirm,
}) => {
  const grandTotal = allActiveBookings.reduce((sum, b) => sum + (b.selections.totalPrice || 0), 0);

  return (
    <div className="space-y-6">
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-100/50 sticky top-6 shadow-sm">
        <h3 className="font-serif text-xl text-stone-800 mb-6 border-b border-stone-100 pb-3">Booking Summary</h3>

        {/* Services List */}
        <div className="mb-6">
          <h4 className="text-[10px] font-extrabold text-amber-700 uppercase tracking-widest mb-3">Selected Services</h4>
          <div className="space-y-4">
            {allActiveBookings.map((booking) => {
              const items = [];
              if (booking.selections.selectedPriceOption?.label) items.push(booking.selections.selectedPriceOption);
              if (booking.selections.selectedOptions) {
                Object.values(booking.selections.selectedOptions).forEach(opt => {
                  if (opt?.label) items.push(opt);
                });
              }
              if (booking.selections.selectedMultiOptions) {
                Object.values(booking.selections.selectedMultiOptions).forEach(group => {
                  group.forEach(opt => { if (opt?.label) items.push(opt); });
                });
              }

              return (
                <div key={booking.serviceId} className="border-b border-stone-50 pb-3 last:border-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-stone-800 text-sm uppercase tracking-tight">{booking.serviceName}</span>
                    <span className="text-amber-700 font-extrabold text-sm">₹{booking.selections.totalPrice.toLocaleString()}</span>
                  </div>
                  
                  {/* Options List */}
                  <div className="space-y-1 mb-2">
                    {items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-[10px] text-stone-500 italic">
                        <span>• {item.label}</span>
                        <span>₹{item.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-[10px] text-stone-400 flex flex-wrap gap-x-2">
                    <span className="text-blue-600 flex flex-row items-center gap-2"><CalendarDays className="w-4 h-4" /> {booking.selections.selectedDate ? formatDateDisplay(booking.selections.selectedDate) : "—"}</span>
                    {booking.selections.selectedSlot && (
                      <span className="text-green-600 flex flex-row items-center gap-2"><Clock className="w-4 h-4" /> {formatTimeRange(booking.selections.selectedSlot.time)}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-stone-100 mt-2">
            <span className="text-stone-800 font-medium uppercase tracking-widest text-[10px]">Grand Total</span>
            <span className="text-xl font-serif text-amber-700 font-bold">₹{grandTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Customer Details */}
        <div className="pt-5 border-t border-stone-200">
          <h4 className="text-[10px] font-extrabold text-amber-700 uppercase tracking-widest mb-3">Your Details</h4>
          <div className="space-y-3">
            {customer.name && !validationErrors.name ? (
              <div className="space-y-2 text-sm text-stone-600">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-stone-400" />
                  <span className="truncate">{customer.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-stone-400 mt-0.5" />
                  <span className="text-xs leading-relaxed">{customer.address}</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-stone-400 italic">Please complete your details on the left.</p>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onPrevious}
            className="flex-1 px-4 py-3 border border-stone-200 bg-blue-500 text-white rounded-xl  font-medium hover:bg-blue-700 transition active:scale-[0.98]"
          >
            Previous
          </button>
          <button
            onClick={onConfirm}
            disabled={!canConfirm || submitting}
            className="flex-[2] bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed transition-all font-bold shadow-lg shadow-amber-200/50 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Confirming...</span>
              </>
            ) : (
              "Confirm Booking"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSummaryStep2;