// components/ReduxDevTools.jsx
import { useSelector } from "react-redux";
import { useState } from "react";

export default function ReduxDevTools() {
  const [isOpen, setIsOpen] = useState(false);
  const bookingState = useSelector((state) => state.booking);

  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-mono shadow-lg"
      >
        🛠️ Redux
      </button>
      {isOpen && (
        <div className="absolute bottom-12 right-0 w-96 bg-gray-900 text-white rounded-lg shadow-xl p-4 text-xs font-mono max-h-96 overflow-auto">
          <pre>{JSON.stringify(bookingState, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}