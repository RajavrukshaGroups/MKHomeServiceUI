import React from "react";
import { Edit2, Package, XCircle } from "lucide-react";
import ServiceSlotPicker from "./ServiceSlotPicker";
import { useNavigate } from "react-router-dom";
// import Navbar from "../../layout/Navbar";

const FirstStep = ({
  allActiveBookings = [],
  onServiceDateChange,
  onServiceSlotSelect,
  onEditCustom,
  onRemoveService,
}) => {
  // Calculate total price across ALL services
  const globalTotal = allActiveBookings.reduce((sum, b) => sum + (b.selections.totalPrice || 0), 0);
  const navigate = useNavigate();

  return (

    <div className="space-y-8">
      {/* Active Bookings List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-serif text-stone-800 flex items-center gap-3">
          <Package className="w-6 h-6 text-amber-500" />
          Review Your Services
        </h2>

        {allActiveBookings.length === 0 ? (
          <div className="bg-stone-50 rounded-2xl p-12 text-center border-2 border-dashed border-stone-200">
            <p className="text-stone-500 italic">No services selected yet.</p>
          </div>
        ) : (
            allActiveBookings.map((booking) => {
              const { serviceId, serviceName, selections } = booking;
              const items = [];
              
              // Add default price option if exists
              if (selections.selectedPriceOption?.label) {
                items.push(selections.selectedPriceOption);
              }

              // Add single options
              if (selections.selectedOptions) {
                Object.values(selections.selectedOptions).forEach(opt => {
                  if (opt?.label) items.push(opt);
                });
              }

              // Add multi options
              if (selections.selectedMultiOptions) {
                Object.values(selections.selectedMultiOptions).forEach(group => {
                  group.forEach(opt => { if (opt?.label) items.push(opt); });
                });
              }

              return (
                
                <div key={serviceId} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-100/50 shadow-sm hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-serif text-stone-800">{serviceName}</h3>
                      <p className="text-[10px] text-blue-800 font-extrabold uppercase tracking-widest mt-1">Booking Configuration</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onEditCustom(serviceId)}
                        className="p-2 hover:bg-amber-50 text-amber-600 rounded-lg transition-colors group"
                        title="Edit Service Selections"
                      >
                        <Edit2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Remove ${serviceName} from your booking?`)) {
                            onRemoveService(serviceId);
                          }
                        }}
                        className="p-2 hover:bg-red-50 text-red-400 hover:text-red-600 rounded-lg transition-colors group"
                        title="Remove Service"
                      >
                        <XCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Selections for this service */}
                  <div className="space-y-2 mb-6 bg-stone-50/50 rounded-xl p-4 border border-stone-100">
                    {items.length > 0 ? (
                      items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-stone-600">{item.label}</span>
                          <span className="text-amber-600 font-medium">₹{item.price.toLocaleString()}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-stone-400 italic">No options selected.</p>
                    )}
                    <div className="pt-2 mt-2 border-t border-stone-200 flex justify-between font-bold text-stone-800">
                      <span className="text-xs uppercase tracking-wider">Service Subtotal</span>
                      <span className="text-lg text-amber-700 font-serif">₹{(selections.totalPrice || 0).toLocaleString()}</span>
                    </div>
                  </div>

                {/* Individual Date & Time Picker */}
                <ServiceSlotPicker
                  serviceId={serviceId}
                  selectedDate={selections.selectedDate}
                  selectedSlot={selections.selectedSlot}
                  onDateChange={(date) => onServiceDateChange(serviceId, date)}
                  onSlotSelect={(slot) => onServiceSlotSelect(serviceId, slot)}
                />
              </div>
              
            );
          })
        )}
      </div>

      {/* Global Total Bar */}
      {/* {allActiveBookings.length > 0 && (
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-2xl p-6 shadow-xl shadow-amber-200/50 flex justify-between items-center transform hover:scale-[1.01] transition-transform">
          <div>
            <p className="text-amber-100 text-[10px] font-bold uppercase tracking-[0.2em]">Grand Total Amount</p>
            <h3 className="text-4xl font-serif mt-1">₹{globalTotal.toLocaleString()}</h3>
          </div>
          <div className="text-right">
            <p className="text-amber-100 text-xs font-medium">{allActiveBookings.length} Service{allActiveBookings.length !== 1 ? 's' : ''} in Cart</p>
            <div className="flex gap-1.5 mt-2 justify-end">
              {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/40"></div>)}
            </div>
          </div>
        </div>
      )} */}
      {/* <button onClick={() => window.location.href = "/services"} className="p-4 bg-amber-500 text-white rounded-xl">Add More Services</button> */}
    
        <button onClick={() => navigate(-1)} className="p-4  bg-[#035496] bg-linear  text-white rounded-xl">
          <span>Add More Services</span>
        </button>
    </div>
  );
};

export default FirstStep;