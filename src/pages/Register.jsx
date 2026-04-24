import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight, Github, Chrome, CheckCircle2, ChevronLeft } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating registration
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('is_authenticated', 'true');
      localStorage.setItem('user_email', email);
      localStorage.setItem('user_name', name);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background-app font-sans selection:bg-primary/10 selection:text-primary">
      <Navbar />

      <main className="pt-32 pb-20 flex items-center justify-center px-4">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row bg-white rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(15,23,42,0.1)] overflow-hidden border border-slate-100">
          
          {/* Left: Info Side (Swapped for variety) */}
          <div className="hidden lg:flex flex-1 bg-primary relative p-16 flex-col justify-between text-white overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-2xl font-display font-bold tracking-tighter uppercase mb-20">
                 All In One <span className="text-accent font-extrabold">Home</span> Service
              </div>

              <div className="space-y-10">
                <h3 className="text-4xl font-black uppercase tracking-tight leading-tight">
                  Join the <span className="text-accent">Professional</span> Network
                </h3>
                
                <div className="space-y-6">
                  {[
                    'Instant booking for 50+ home services',
                    'Verified & background-checked experts',
                    'Transparent pricing & zero hidden fees',
                    'Priority support and easier management'
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                      </div>
                      <span className="font-medium text-white/80">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-auto">
               <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm mb-10">
                  <p className="text-white/60 text-sm italic leading-relaxed">
                    "Setting up an account took less than a minute. Now I manage all my property maintenance in one dashboard."
                  </p>
               </div>
               <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
                © 2026 Reliable Professional Network
               </div>
            </div>
          </div>

          {/* Right: Form Side */}
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
                Create <span className="text-accent">Account</span>
              </h1>
              <p className="text-slate-500 font-medium">Join thousands of happy homeowners in Karnataka.</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                  <input 
                    required
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                  />
                </div>
              </div>

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
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Password</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                  <input 
                    required
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
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
                    Create Account
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10">
              <div className="relative flex items-center justify-center mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100"></div>
                </div>
                <div className="relative px-4 bg-white text-[10px] font-black text-slate-300 uppercase tracking-widest">Or sign up with</div>
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

            <p className="mt-8 text-center text-slate-400 font-medium text-sm">
              Already have an account? <Link to="/login" className="text-accent font-black uppercase text-xs tracking-widest hover:underline ml-2">Log in here</Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
