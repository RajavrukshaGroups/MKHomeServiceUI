import React from "react";
import { formatTimeRange, formatDateDisplay } from "../BookingSlot";

const BookingSummaryStep1 = ({
  allActiveBookings = [],
  canProceed,
  onNext,
}) => {
  // Calculate total across ALL services
  const grandTotal = allActiveBookings.reduce((sum, b) => sum + (b.selections.totalPrice || 0), 0);

  return (
    <div className="space-y-6">
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-100/50 sticky top-6 shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b border-stone-100 pb-3">
          <h3 className="font-serif text-xl text-stone-800">Booking Summary</h3>
          <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-green-200">
            Active
          </span>
        </div>
        
        <div className="space-y-6 text-sm">
          {/* Services List */}
          <div className="space-y-4">
            {allActiveBookings.map((booking) => (
              <div key={booking.serviceId} className="group">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-stone-700">{booking.serviceName}</span>
                  <span className="text-amber-700 font-medium">₹{booking.selections.totalPrice.toLocaleString()}</span>
                </div>
                
                <div className="text-[10px] text-stone-400 flex flex-wrap gap-x-2 gap-y-1">
                  <span className={booking.selections.selectedDate ? "flex items-center gap-1 text-blue-600" : "flex items-center gap-1 text-red-600"}>
                    📅 {booking.selections.selectedDate ? formatDateDisplay(booking.selections.selectedDate) : "Schedule pending"}
                  </span>
                  {booking.selections.selectedSlot && (
                    <span className={booking.selections.selectedSlot ? "flex items-center gap-1 text-green-600" : "flex items-center gap-1 text-red-600"}>
                      ⏰ {formatTimeRange(booking.selections.selectedSlot.time)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Grand Total */}
          <div className="border-t border-stone-200 pt-4 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-stone-500 font-medium uppercase tracking-widest text-[10px]">Grand Total</span>
              <span className="text-2xl font-serif text-amber-700 font-bold">₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="text-[10px] text-stone-400 italic mt-6 bg-stone-50 p-3 rounded-lg border border-stone-100">
          📍 You will provide contact and address details in the next step. All time slots are subject to availability.
        </div>

        <button
          onClick={onNext}
          disabled={!canProceed}
          className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-xl disabled:bg-stone-300 disabled:cursor-not-allowed shadow-lg shadow-amber-200/50 transition-all font-bold tracking-wide transform active:scale-[0.98]"
        >
          Proceed to Contact Info
        </button>
      </div>
    </div>
  );
};

export default BookingSummaryStep1;