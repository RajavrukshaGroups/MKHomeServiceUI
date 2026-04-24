import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, Github, Chrome, ShieldCheck, ChevronLeft } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating authentication
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('is_authenticated', 'true');
      localStorage.setItem('user_email', email);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background-app font-sans selection:bg-primary/10 selection:text-primary">
      <Navbar />

      <main className="pt-32 pb-20 flex items-center justify-center px-4">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row bg-white rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(15,23,42,0.1)] overflow-hidden border border-slate-100">
          
          {/* Left: Form Side */}
          <div className="flex-1 p-8 md:p-16">
            <div className="mb-10">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-400 hover:text-primary font-bold uppercase text-[10px] tracking-widest transition-colors mb-8 group"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back
              </button>
              <h1 className="text-3xl font-black text-primary uppercase tracking-tighter mb-3">
                Welcome <span className="text-accent">Back</span>
              </h1>
              <p className="text-slate-500 font-medium">Log in to manage your bookings and services.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                  <input 
                    required
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                  <button type="button" className="text-[10px] font-black text-accent hover:text-accent-dark uppercase tracking-widest">Forgot?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                  <input 
                    required
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary-dark text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 relative overflow-hidden"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Secure Login
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10">
              <div className="relative flex items-center justify-center mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100"></div>
                </div>
                <div className="relative px-4 bg-white text-[10px] font-black text-slate-300 uppercase tracking-widest">Or login with</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 py-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors group">
                  <Chrome className="w-5 h-5 text-slate-400 group-hover:text-[#4285F4]" />
                  <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Google</span>
                </button>
                <button className="flex items-center justify-center gap-3 py-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors group">
                  <Github className="w-5 h-5 text-slate-400 group-hover:text-[#181717]" />
                  <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Github</span>
                </button>
              </div>
            </div>

            <p className="mt-10 text-center text-slate-400 font-medium text-sm">
              Don't have an account? <Link to="/register" className="text-accent font-black uppercase text-xs tracking-widest hover:underline ml-2">Create yours</Link>
            </p>
          </div>

          {/* Right: Info Side */}
          <div className="hidden lg:flex flex-1 bg-primary relative p-16 flex-col justify-between text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-2xl font-display font-bold tracking-tighter uppercase mb-20">
                All In One <span className="text-accent font-extrabold">Home</span> Service
              </div>

              <div className="space-y-12">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/10">
                    <ShieldCheck className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Enterprise Security</h3>
                  <p className="text-white/60 font-medium leading-relaxed">
                    Your data is secured using top-tier encryption standards. Trustworthy and reliable home services start here.
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-2 h-2 rounded-full bg-accent" />
                    ))}
                  </div>
                  <p className="font-medium italic text-lg leading-relaxed mb-6">
                    "The most reliable service I've ever used. The booking process is completely seamless and secure."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800" />
                    <div>
                      <h4 className="font-black uppercase text-xs tracking-widest">Vikram S.</h4>
                      <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-black">Karnataka Property Owner</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
              © 2026 Reliable Professional Network
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
