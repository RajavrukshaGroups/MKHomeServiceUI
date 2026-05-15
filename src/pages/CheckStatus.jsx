import React, { useState } from 'react';
import API from '../api/axios';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Search, Package, Calendar, Clock, MapPin, User, Phone, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { formatDateDisplay, formatTimeRange } from '../components/services/BookingSlot';

const CheckStatus = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchQuery = query.trim();
    if (!searchQuery) return;

    setLoading(true);
    setError(null);
    setBookings([]);

    try {
      const response = await API.get(`/client/get-booking?search=${encodeURIComponent(searchQuery)}`);
      const data = response.data;
      
      // Axios throws on non-2xx status, so if we're here, it was successful or handled by backend logic


      // Debug log to see exactly what the server is sending
      console.log("Booking Search API Response:", data);

      // Flexible handling for different API response structures
      const responseData = data.data || data.bookings || (Array.isArray(data) ? data : null);
      
      // If we got data back (either in .data, .bookings, or as a raw array)
      if (responseData) {
        const results = Array.isArray(responseData) ? responseData : [responseData];
        if (results.length === 0) {
          setError("No bookings found for this search.");
        } else {
          setBookings(results);
          // If the backend sent a 'total' count, we can use it, otherwise use the array length
          const count = data.total || results.length;
          console.log(`Successfully loaded ${count} booking(s).`);
        }
      } else if (data.success === false) {
        setError(data.message || "No booking found with this ID or Mobile Number.");
      } else {
        setError("Unexpected response format from server.");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError(err.message || "Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setBookings([]);
    setError(null);
  };

  const getStatusColor = (status) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('pending')) return 'bg-amber-100 text-amber-700 border-amber-200';
    if (s.includes('confirm')) return 'bg-blue-100 text-blue-700 border-blue-200';
    if (s.includes('complete')) return 'bg-green-100 text-green-700 border-green-200';
    if (s.includes('cancel')) return 'bg-red-100 text-red-700 border-red-200';
    return 'bg-stone-100 text-stone-700 border-stone-200';
  };

  const getWorkProgressColor = (status) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('pending')) return 'bg-stone-100 text-stone-600 border-stone-200';
    if (s.includes('progress') || s.includes('started')) return 'bg-blue-50 text-blue-700 border-blue-100';
    if (s.includes('complete') || s.includes('finished')) return 'bg-green-50 text-green-700 border-green-100';
    if (s.includes('cancel')) return 'bg-red-50 text-red-700 border-red-100';
    return 'bg-stone-100 text-stone-600 border-stone-200';
  };

  const getPaymentStatusColor = (status) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('paid')) return 'bg-green-50 text-green-700 border-green-100';
    if (s.includes('pending') || s.includes('unpaid')) return 'bg-amber-50 text-amber-700 border-amber-100';
    if (s.includes('partial')) return 'bg-blue-50 text-blue-700 border-blue-100';
    if (s.includes('refund')) return 'bg-red-50 text-red-700 border-red-100';
    return 'bg-stone-100 text-stone-600 border-stone-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-stone-50 to-amber-50/20">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-stone-800 mb-4">Track Your Booking</h1>
          <p className="text-stone-500 max-w-md mx-auto">
            Enter your Booking ID or registered Mobile Number to see the latest status of your service requests.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-2 rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 mb-12">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter Booking ID or Mobile Number"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-xl border-none focus:ring-2 focus:ring-amber-500/20 bg-stone-50 text-stone-800 font-medium"
              />
              {query && (
                <button 
                  type="button"
                  onClick={handleClear}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-stone-200 rounded-full text-stone-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold transition-all disabled:bg-stone-200 flex items-center gap-2"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Track"}
            </button>
          </form>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center animate-in fade-in slide-in-from-bottom-4">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        {/* Results Counter */}
        {bookings.length > 1 && (
          <div className="mb-6 flex items-center gap-2 text-stone-500 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-stone-200 w-fit animate-in fade-in slide-in-from-left-4">
            <Package className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium">Found <span className="font-bold text-stone-800">{bookings.length}</span> bookings matching your search</span>
          </div>
        )}

        {/* Bookings List */}
        {bookings.length > 0 && (
          <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-8">
            {bookings.map((booking, bIdx) => (
              <div key={booking._id || bIdx} className="space-y-6 pb-12 border-b border-stone-200 last:border-0">
                {/* Header Info */}
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-widest">Booking ID</span>
                      <div className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase border", getStatusColor(booking.bookingStatus))}>
                        {booking.bookingStatus}
                      </div>
                    </div>
                    <h2 className="text-xl md:text-2xl font-serif text-stone-800 break-all">{booking.bookingId}</h2>
                  </div>
                  <div className="md:text-right w-full md:w-auto pt-4 md:pt-0 border-t md:border-0 border-stone-50">
                    <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-widest mb-1 block">Grand Total</span>
                    <span className="text-2xl md:text-3xl font-serif font-bold text-amber-700">₹{booking.grandTotal?.toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Customer Info */}
                  <div className="md:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl p-6 border border-stone-100 shadow-sm h-full">
                      <h3 className="text-xs font-extrabold text-amber-700 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <User className="w-4 h-4" /> Customer Details
                      </h3>
                      <div className="space-y-4 text-sm text-stone-600">
                        <div>
                          <p className="text-[10px] text-stone-400 uppercase font-bold mb-1">Name</p>
                          <p className="font-medium text-stone-800">{booking.customer?.name}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-stone-400 uppercase font-bold mb-1">Phone</p>
                          <p className="font-medium text-stone-800">{booking.customer?.phone}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-stone-400 uppercase font-bold mb-1">Address</p>
                          <p className="font-medium text-stone-800 leading-relaxed">{booking.customer?.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Services Info */}
                  <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl p-6 border border-stone-100 shadow-sm h-full">
                      <h3 className="text-xs font-extrabold text-amber-700 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Package className="w-4 h-4" /> Booked Services
                      </h3>
                      <div className="space-y-8">
                        {booking.services?.map((svc, idx) => (
                          <div key={idx} className="flex flex-col pb-8 border-b border-stone-50 last:border-0 last:pb-0 gap-4">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                              <div className="space-y-3 flex-1">
                                <h4 className="text-lg font-bold text-stone-800 leading-tight">{svc.serviceName}</h4>
                                <div className="flex flex-wrap gap-2 md:gap-3">
                                  <span className="flex items-center gap-1.5 text-blue-600 font-medium bg-blue-50 px-2.5 py-1 rounded-lg text-[11px] md:text-xs">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {formatDateDisplay(svc.selectedDate)}
                                  </span>
                                  <span className="flex items-center gap-1.5 text-green-600 font-medium bg-green-50 px-2.5 py-1 rounded-lg text-[11px] md:text-xs">
                                    <Clock className="w-3.5 h-3.5" />
                                    {formatTimeRange(svc.selectedSlot?.time)}
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-2 md:gap-3">
                                  {svc.workProgress && (
                                    <span className={cn("flex items-center gap-1.5 font-bold border px-2.5 py-1 rounded-lg uppercase text-[9px] md:text-[10px] tracking-wider", getWorkProgressColor(svc.workProgress))}>
                                      <span className='text-stone-500 font-medium'>Progress:</span> {svc.workProgress}
                                    </span>
                                  )}
                                  {svc.paymentStatus && (
                                    <span className={cn("flex items-center gap-1.5 font-bold border px-2.5 py-1 rounded-lg uppercase text-[9px] md:text-[10px] tracking-wider", getPaymentStatusColor(svc.paymentStatus))}>
                                      <span className='text-stone-500 font-medium'>Payment:</span> {svc.paymentStatus}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="sm:text-right">
                                <span className="text-lg font-bold text-amber-700">₹{svc.totalPrice?.toLocaleString()}</span>
                              </div>
                            </div>

                            {/* Selected Price Options */}
                            {svc.selectedPriceOptions && svc.selectedPriceOptions.length > 0 && (
                              <div className="ml-2 sm:ml-4 space-y-2 border-l-2 border-stone-100 pl-4">
                                {svc.selectedPriceOptions.map((opt, oIdx) => (
                                  <div key={oIdx} className="flex justify-between items-center text-[11px] md:text-xs">
                                    <span className="text-stone-500 font-medium">{opt.title}</span>
                                    <span className="text-stone-400 font-mono">₹{opt.price?.toLocaleString()}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="bg-stone-800 rounded-3xl p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
              <div className="relative z-10 text-center md:text-left">
                <h3 className="text-xl font-serif mb-2">Need help with your booking?</h3>
                <p className="text-stone-400 text-sm">Contact our 24/7 support for any modifications or queries.</p>
              </div>
              <div className="relative z-10 w-full md:w-auto">
                <a href="tel:+911234567890" className="w-full md:w-auto px-6 py-3 bg-white text-stone-900 rounded-xl font-bold hover:bg-amber-50 transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" /> Call Support
                </a>
              </div>
              <CheckCircle2 className="absolute -right-8 -bottom-8 w-48 h-48 text-white/5 pointer-events-none" />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CheckStatus;
