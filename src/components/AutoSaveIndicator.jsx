// components/AutoSaveIndicator.jsx
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { CheckCircle, Save } from "lucide-react";

export default function AutoSaveIndicator() {
  const [saved, setSaved] = useState(false);
  const selectedPriceOption = useSelector(state => state.booking.selectedPriceOption);
  const selectedDate = useSelector(state => state.booking.selectedDate);
  const selectedSlot = useSelector(state => state.booking.selectedSlot);
  
  useEffect(() => {
    setSaved(true);
    const timer = setTimeout(() => setSaved(false), 2000);
    return () => clearTimeout(timer);
  }, [selectedPriceOption, selectedDate, selectedSlot]);
  
  if (!saved) return null;
  
  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm animate-bounce">
      <CheckCircle className="w-4 h-4" />
      Selections saved
    </div>
  );
}