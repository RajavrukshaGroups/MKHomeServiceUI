import React, { useState, useEffect, useRef } from "react";
import { Calendar, Clock } from "lucide-react";
import { formatTimeRange, isTimeSlotOutdated } from "../BookingSlot";

const DEFAULT_SLOTS = ["09:00-10:00", "12:00-13:00", "15:00-16:00", "17:00-18:00"];

const ServiceSlotPicker = ({ serviceId, selectedDate, selectedSlot, onDateChange, onSlotSelect }) => {
  const [allTimeSlots, setAllTimeSlots] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isSlotLoadingRef = useRef(false);

  useEffect(() => {
    const fetchAllSlots = async () => {
      try {
        const res = await fetch(`http://localhost:12000/client/send-time-slot/${serviceId}`);
        const data = await res.json();
        setAllTimeSlots(data?.data || []);
      } catch (err) {
        console.error(err);
        setAllTimeSlots([]);
      }
    };
    fetchAllSlots();
  }, [serviceId]);

  useEffect(() => {
    if (!selectedDate) return;
    
    const loadSlotsForDate = async () => {
      setLoading(true);
      setError(null);
      try {
        // Find data for selected date. Normalize dates to YYYY-MM-DD for comparison.
        const dayData = allTimeSlots.find(slot => {
          const slotDateStr = slot.date.includes("T") ? slot.date.split("T")[0] : slot.date;
          return slotDateStr === selectedDate;
        });

        let formatted = [];
        
        if (!dayData) {
          // Fallback to default slots if no data found for this date
          formatted = DEFAULT_SLOTS.map(t => ({
            time: t, 
            capacity: 5, 
            isDefault: true,
            isOutdated: isTimeSlotOutdated(t, selectedDate),
            isFull: false
          }));
          setAvailableTimeSlots(formatted);
          return;
        }

        // If day is blocked, service is not available
        if (dayData.isBlocked) {
          setAvailableTimeSlots([]);
          setError("Service is not available for this day.");
          return;
        }

        if (!dayData.slots || dayData.slots.length === 0) {
          setAvailableTimeSlots([]);
          setError("No time slots available for this date.");
          return;
        }

        // Map all slots, marking those with 0 capacity as full
        formatted = dayData.slots.map(s => ({
          time: s.time,
          capacity: s.capacity,
          isDefault: false,
          isOutdated: isTimeSlotOutdated(s.time, selectedDate),
          isFull: (s.capacity ?? 0) <= 0
        }));

        setAvailableTimeSlots(formatted);
      } catch (err) {
        console.error("Error loading slots:", err);
        setError("Error loading available slots.");
      } finally {
        setLoading(false);
      }
    };
    loadSlotsForDate();
  }, [selectedDate, serviceId, allTimeSlots]);

  return (
    <div className="mt-4 pt-4 border-t border-stone-100">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-blue-800 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Calendar className="w-3 h-3" /> Select Date
          </label>
          <input
            type="date"
            value={selectedDate || ""}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full p-2 text-sm border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 transition"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        {selectedDate && (
          <div>
            <label className="block text-xs font-bold text-blue-800 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Clock className="w-3 h-3" /> Time Slot
            </label>
            {loading ? (
              <div className="flex items-center gap-2 text-stone-400 text-xs italic">
                <div className="animate-spin h-3 w-3 border-b-2 border-amber-500 rounded-full"></div>
                Loading slots...
              </div>
            ) : error ? (
              <p className="text-[10px] text-red-500 bg-red-50 p-1 rounded">{error}</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {availableTimeSlots.map((slot, i) => {
                  const isSelected = selectedSlot?.time === slot.time;
                  const isUnavailable = slot.isOutdated || slot.isFull;
                  
                  return (
                    <button
                      key={i}
                      onClick={() => !isUnavailable && onSlotSelect(slot)}
                      disabled={isUnavailable}
                      className={`px-3 py-1.5 text-xs rounded-full border transition-all flex flex-col items-center min-w-[100px] ${
                        isSelected && !isUnavailable
                          ? "border-amber-500 bg-amber-50 text-amber-700 shadow-sm"
                          : isUnavailable
                          ? "bg-stone-50 border-stone-100 text-stone-300 cursor-not-allowed opacity-70"
                          : "border-stone-200 hover:border-amber-300 text-stone-600"
                      }`}
                    >
                      <span>{formatTimeRange(slot.time)}</span>
                      {slot.isFull && !slot.isOutdated && (
                        <span className="text-[8px] font-bold uppercase tracking-tighter text-red-400">Full</span>
                      )}
                      {slot.isOutdated && (
                        <span className="text-[8px] font-bold uppercase tracking-tighter text-stone-400">Passed</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceSlotPicker;
