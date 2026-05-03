// components/SelectionSummary.jsx
import { useSelector, useDispatch } from "react-redux";
import { 
  selectSelectedPriceOption, 
  selectSelectedDate, 
  selectSelectedSlot,
  selectIsPriceSelected,
  selectIsDateTimeSelected,
  undoPriceSelection,
  undoDateSelection,
  undoSlotSelection,
  formatTime,
  formatDate
} from "../store/bookingSlice";

export default function SelectionSummary() {
  const dispatch = useDispatch();
  const selectedPriceOption = useSelector(selectSelectedPriceOption);
  const selectedDate = useSelector(selectSelectedDate);
  const selectedSlot = useSelector(selectSelectedSlot);
  const isPriceSelected = useSelector(selectIsPriceSelected);
  const isDateTimeSelected = useSelector(selectIsDateTimeSelected);
  
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
  
  const formatDateDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  if (!isPriceSelected && !isDateTimeSelected) {
    return null;
  }
  
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 mb-6 border border-amber-200">
      <h3 className="text-sm font-semibold text-amber-800 mb-3 flex items-center gap-2">
        <span>📋</span> Your Selections
      </h3>
      
      <div className="space-y-3">
        {/* Price Selection */}
        {isPriceSelected && selectedPriceOption && (
          <div className="flex items-center justify-between group">
            <div className="flex-1">
              <p className="text-xs text-stone-500">Selected Plan</p>
              <p className="font-medium text-stone-800">{selectedPriceOption.label}</p>
              <p className="text-amber-700 font-bold">₹{selectedPriceOption.price.toLocaleString()}</p>
            </div>
            <button
              onClick={() => dispatch(undoPriceSelection())}
              className="opacity-0 group-hover:opacity-100 transition text-xs text-amber-600 hover:text-amber-700"
            >
              Change
            </button>
          </div>
        )}
        
        {/* Date & Time Selection */}
        {isDateTimeSelected && selectedDate && selectedSlot && (
          <div className="flex items-center justify-between group border-t border-amber-200 pt-3">
            <div className="flex-1">
              <p className="text-xs text-stone-500">Selected Date & Time</p>
              <p className="font-medium text-stone-800">{formatDateDisplay(selectedDate)}</p>
              <p className="text-sm text-amber-700">{formatTimeRange(selectedSlot.time)}</p>
              {!selectedSlot.isDefault && (
                <p className="text-xs text-stone-500">Capacity: {selectedSlot.capacity} slots left</p>
              )}
            </div>
            <button
              onClick={() => {
                dispatch(undoDateSelection());
                dispatch(undoSlotSelection());
              }}
              className="opacity-0 group-hover:opacity-100 transition text-xs text-amber-600 hover:text-amber-700"
            >
              Change
            </button>
          </div>
        )}
      </div>
      
      {/* Progress Indicator */}
      <div className="mt-4 pt-3 border-t border-amber-200">
        <div className="flex items-center gap-2">
          <div className={`flex-1 h-1 rounded-full transition-all ${
            isPriceSelected ? 'bg-green-500' : 'bg-stone-300'
          }`} />
          <div className={`flex-1 h-1 rounded-full transition-all ${
            isDateTimeSelected ? 'bg-green-500' : 'bg-stone-300'
          }`} />
          <div className="text-xs text-stone-500">
            {isPriceSelected && isDateTimeSelected ? '✓ Ready to continue' : 'Complete selections to proceed'}
          </div>
        </div>
      </div>
    </div>
  );
}