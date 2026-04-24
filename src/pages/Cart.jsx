import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import {
  Trash2,
  ArrowRight,
  ShoppingBag,
  ChevronLeft,
  ShieldCheck,
  Clock,
  CheckCircle2,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, totalPrice, cartCount } = useCart();
  const [location, setLocation] = useState('Select Location');

  useEffect(() => {
    const savedLocation = localStorage.getItem('user_location');
    if (savedLocation) setLocation(savedLocation);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background-app font-sans selection:bg-primary/10 selection:text-primary">
      <Navbar location={location} onLocationClick={() => {}} />

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6 mb-12">
            <button
              onClick={() => navigate(-1)}
              className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:scale-110 transition-transform shadow-sm group"
            >
              <ChevronLeft className="w-6 h-6 text-slate-600 group-hover:text-primary" />
            </button>

            <h1 className="text-4xl font-black text-primary uppercase tracking-tighter">
              Your <span className="text-accent">Basket</span>
            </h1>

            <div className="bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[11px] font-black text-accent uppercase tracking-widest">
                {cartCount} {cartCount === 1 ? 'Service' : 'Services'}
              </span>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-16 text-center shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100"
            >
              <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 rotate-3">
                <ShoppingBag className="w-12 h-12 text-slate-300" />
              </div>

              <h2 className="text-3xl font-black text-primary mb-4 uppercase tracking-tight">
                Your basket is <span className="text-slate-300">empty</span>
              </h2>

              <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium">
                No services selected. Professional home maintenance is just a few clicks away.
              </p>

              <Link
                to="/services"
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20 group"
              >
                Browse Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                <AnimatePresence mode="popLayout">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 relative group overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-[4rem] -z-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="w-full md:w-48 h-36 rounded-3xl overflow-hidden shadow-lg relative z-10 shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between relative z-10">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-black text-accent uppercase tracking-widest mb-1 block">
                              {item.category}
                            </span>
                            <h3 className="text-2xl font-black text-primary uppercase tracking-tighter leading-none mb-3">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                <span>60 Min</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>Verified</span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-90"
                            title="Remove from basket"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-50">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Service Cost</span>
                            <span className="text-3xl font-black text-primary tracking-tighter">
                              ₹{item.price}
                            </span>
                          </div>

                          <Link
                            to={`/service/${item.id}`}
                            className="text-[11px] font-black text-primary uppercase tracking-widest hover:text-accent flex items-center gap-2 group/link"
                          >
                            View Details
                            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                <div className="bg-emerald-50 rounded-[2.5rem] p-8 border border-emerald-100 flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-black text-emerald-900 uppercase tracking-tight">Price Assurance</h4>
                    <p className="text-emerald-700/70 text-sm font-medium">You're getting the best rates for these services across Karnataka.</p>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-32 bg-primary rounded-[3rem] p-10 shadow-[0_30px_60px_-15px_rgba(0,10,0,0.3)] border border-white/10 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[5rem]" />
                  
                  <h2 className="text-2xl font-black mb-10 uppercase tracking-tight">
                    Order <span className="text-accent">Summary</span>
                  </h2>

                  <div className="space-y-6 mb-10">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-white/60 uppercase tracking-widest">Subtotal</span>
                      <span className="text-xl font-black tracking-tighter">₹{totalPrice}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-white/60 uppercase tracking-widest">Service Fee</span>
                      <div className="bg-accent text-primary px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">F R E E</div>
                    </div>

                    <div className="h-[1px] bg-white/10 my-8" />

                    <div className="flex justify-between items-end">
                      <span className="text-sm font-black uppercase tracking-[0.2em] mb-1">Total Pay</span>
                      <span className="text-5xl font-black tracking-tighter text-white">₹{totalPrice}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/login')}
                    className="w-full bg-accent hover:bg-accent-dark text-primary py-6 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-black/20 transition-all active:scale-[0.98] text-sm"
                  >
                    Lock & Proceed
                  </button>

                  <Link
                    to="/services"
                    className="block text-center mt-8 text-[11px] font-black text-white/40 uppercase tracking-widest hover:text-accent transition-colors"
                  >
                    Continue Browsing
                  </Link>
                </div>
                
                <div className="mt-8 p-6 bg-white rounded-3xl border border-slate-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center">
                     <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Service Area</h5>
                    <p className="font-black text-slate-900 uppercase text-xs">{location}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
