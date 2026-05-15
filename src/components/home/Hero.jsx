// import { useState, useEffect } from 'react';
// import { Search, Shield, Calendar, Sparkles, Clock, MapPin, Award, Users, Leaf, FileText, ArrowRight } from 'lucide-react';
// import { motion } from 'motion/react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import heroImg from '../../assets/hero-img.png';
// import bgImg from '../../assets/hero-background-img.png'

// export default function Hero() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [searchQuery, setSearchQuery] = useState(new URLSearchParams(location.search).get('q') || "");

//   // Sync with URL parameter
//   useEffect(() => {
//     const query = new URLSearchParams(location.search).get('q');
//     setSearchQuery(query || "");
//   }, [location.search]);

//   const handleSearch = () => {
//     if (searchQuery.trim()) {
//       navigate(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
//     } else {
//       navigate('/services');
//     }
//   };

//   return (
//     <section className="relative min-h-screen bg-white flex flex-col justify-center overflow-hidden pt-24 md:pt-32">
//       {/* Bright Background with Subtle Overlay & Curves */}
//       <div className="absolute inset-0 z-0">
//         <img 
//           src={bgImg} 
//           alt="Home interior" 
//           className="w-full h-full object-cover opacity-10"
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        
//         {/* Decorative Curves as seen in image */}
//         <svg className="absolute right-0 top-0 h-full w-1/2 opacity-20 pointer-events-none" viewBox="0 0 400 800" fill="none">
//           <path d="M400 0C300 100 200 300 200 500C200 700 300 850 400 900" stroke="#fbbf24" strokeWidth="2" strokeDasharray="10 10" />
//           <path d="M450 50C350 150 250 350 250 550C250 750 350 900 450 950" stroke="#fbbf24" strokeWidth="1" />
//         </svg>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//         {/* Left Content */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="max-w-2xl text-left"
//         >
//           {/* Top Badge */}
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#041131] rounded-lg text-white text-[10px] font-bold uppercase tracking-wider mb-8 shadow-lg">
//             <div className="bg-white/10 p-1 rounded">
//               <Shield className="w-3 h-3 text-[#fbbf24]" />
//             </div>
//             Professional. Reliable. Trusted.
//           </div>

//           <div className="relative mb-6">
//             <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#041131] leading-[1] tracking-tighter uppercase">
//               RELIABLE <span className="text-[#fbbf24]">SOLUTIONS</span><br />
//               EVERY DAY
//               <span className="inline-block w-4 h-4 md:w-6 md:h-6 bg-[#fbbf24] rounded-full ml-2 align-baseline" />
//             </h1>
//           </div>

//           {/* Gold separator line */}
//           <div className="w-24 h-1.5 bg-[#fbbf24] mb-8" />

//           <p className="text-lg text-gray-500 mb-10 max-w-lg leading-relaxed font-medium">
//             Professional cleaning, repairs, and home maintenance delivered with precision. Trustworthy service for every home in Bangalore.
//           </p>

//           {/* Features Horizontal List */}
//           <div className="flex flex-wrap gap-6 md:gap-8 mb-14">
//             {[
//               { icon: Shield, text: "Trusted Professionals" },
//               { icon: Calendar, text: "Easy Booking" },
//               { icon: Sparkles, text: "Quality Assurance" },
//               { icon: Clock, text: "On-Time Service" },
//             ].map((feature, i) => (
//               <div key={i} className="flex items-center gap-3">
//                 <div className="w-9 h-9 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
//                   <feature.icon className="w-4 h-4 text-[#041131] stroke-[2]" />
//                 </div>
//                 <span className="text-[10px] font-bold text-[#041131] uppercase tracking-tight leading-tight">{feature.text.split(' ')[0]}<br/>{feature.text.split(' ')[1]}</span>
//               </div>
//             ))}
//           </div>

//           {/* Search Bar */}
//           <div className="relative max-w-xl group">
//             <div className="flex items-center gap-4 bg-white p-1.5 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-100 group-focus-within:border-[#fbbf24]/30 transition-all duration-300">
//               <div className="flex items-center gap-4 pl-6 flex-1">
//                 <Search className="w-5 h-5 text-gray-400" />
//                 <input 
//                   type="text" 
//                   placeholder="WHAT CAN WE HELP YOU WITH TODAY?" 
//                   className="bg-transparent border-none outline-none text-gray-800 placeholder:text-gray-400 w-full font-bold uppercase tracking-tight text-[11px] py-4"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
//                 />
//               </div>
//               <button 
//                 onClick={handleSearch}
//                 className="bg-[#fbbf24] hover:bg-[#041131] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 group/btn active:scale-95 shadow-lg shadow-[#fbbf24]/20"
//               >
//                 <span className="text-[11px]">Book Service</span>
//                 <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
//               </button>
//             </div>
//           </div>
//         </motion.div>

//         {/* Right Image Content */}
//         <div className="relative h-full flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, x: 50 }}
//             animate={{ opacity: 1, scale: 1, x: 0 }}
//             transition={{ duration: 1 }}
//             className="relative"
//           >
//             <img 
//               src={heroImg} 
//               alt="Professional Cleaner" 
//               className="w-full max-w-[500px] md:max-w-[650px] h-auto object-contain relative z-10"
//               loading="eager"
//             />
            
//             {/* Serving Badge */}
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.5 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 1, duration: 0.5 }}
//               className="absolute bottom-20 -left-12 bg-[#041131] text-white px-4 py-3 rounded-2xl shadow-2xl z-20 flex items-center gap-3 backdrop-blur-md bg-opacity-95 border border-white/5"
//             >
//               <div className="w-8 h-8 bg-[#fbbf24] rounded-full flex items-center justify-center">
//                 <MapPin className="w-4 h-4 text-[#041131]" />
//               </div>
//               <div>
//                 <p className="text-[8px] text-white/50 font-bold uppercase tracking-[0.2em] leading-none mb-1">Serving homes</p>
//                 <p className="text-[10px] font-bold whitespace-nowrap uppercase">across <span className="text-[#fbbf24]">Bangalore</span></p>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Bottom Trust Bar */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 w-full mt-12">
//         <div className="bg-[#041131] rounded-t-[2.5rem] p-8 md:p-12 flex flex-wrap justify-between items-center gap-8 border-t border-white/5 shadow-2xl">
//           {[
//             { icon: Award, title: "100% Satisfaction", sub: "Guarantee" },
//             { icon: Users, title: "Trained & Verified", sub: "Experts" },
//             { icon: Leaf, title: "Eco-Friendly", sub: "Products" },
//             { icon: FileText, title: "Transparent", sub: "Pricing" },
//           ].map((item, i) => (
//             <div key={i} className="flex items-center gap-4 flex-1 min-w-[200px] border-r last:border-none border-white/10 px-4">
//               <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shrink-0">
//                 <item.icon className="w-6 h-6 text-[#fbbf24]" />
//               </div>
//               <div className="text-left">
//                 <p className="text-white font-bold text-xs uppercase tracking-tight leading-tight">{item.title}</p>
//                 <p className="text-white/40 font-bold text-[10px] uppercase tracking-widest mt-1">{item.sub}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


import { motion } from "motion/react";
import { Shield, Calendar, Sparkles, Clock, Award, Users, Leaf, FileText, MapPin, Search, ShoppingCart, CheckCircle,   Star, UserCheck,  CreditCard, ArrowRight, Menu  } from "lucide-react";
import { useState } from 'react';

import heroImg from '../../assets/hero-img.png';
import bgImg from '../../assets/hero-background-img.png'
import ServiceBanner from './ServiceBanner';

const BottomFeature = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-center gap-4 px-6">
    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
      <Icon className="w-6 h-6 text-yellow-400" />
    </div>
    <div className="flex flex-col">
      <span className="text-white text-base font-semibold leading-tight">{title}</span>
      <span className="text-gray-400 text-xs">{subtitle}</span>
    </div>
  </div>
);

export default function Hero() {
  return (
    <section className="relative min-h-[30vh] md:min-h-screen bg-white flex flex-col justify-center overflow-hidden pt-32 pb-0">
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImg} 
          alt="Home services background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-white/20" />
      </div>
      {/* Background Decorative Curves */}
      <div className="absolute inset-0 z-0">
        <svg className="absolute right-0 top-0 h-full w-1/2 opacity-10 pointer-events-none" viewBox="0 0 400 800" fill="none">
          <path d="M400 0C300 100 200 300 200 500C200 700 300 850 400 900" stroke="#c99718ff" strokeWidth="2" strokeDasharray="10 10" />
          <path d="M450 50C350 150 250 350 250 550C250 750 350 900 450 950" stroke="#c0962bff" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-8xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#041131] rounded-lg text-white text-[10px] font-bold uppercase tracking-widest mb-6">
            <Shield className="w-3 h-3 text-[#fbbf24]" />
            Professional. Reliable. Trusted.
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-[#081842ff] mb-4 leading-tight uppercase">
            Reliable <span className="text-[#cf9d1dff]">Solutions</span> <span className="text-5xl"> <br/> EVERY DAY<span className="text-[#fbbf24]">.</span></span>
          </h1>

          <div className="w-20 h-1 bg-[#ce9b1aff] mb-8" />

          <p className="text-lg text-gray-500 mb-10 max-w-xl leading-relaxed">
            Discover our comprehensive range of professional home services. From deep cleaning to expert repairs, we deliver excellence at your doorstep.
          </p>

          {/* <div className="flex flex-wrap gap-8">
            {[
              { icon: Shield, text: "Trusted Professionals" },
              { icon: Sparkles, text: "Quality Assurance" },
              { icon: Clock, text: "On-Time Service" },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-[#041131]" />
                </div>
                <span className="text-[11px] font-bold text-[#041131] uppercase tracking-tight">{feature.text}</span>
              </div>
            ))}
          </div> */}
        </motion.div>
        <div className="hidden lg:block">
        <ServiceBanner />
        </div>

        {/* Right Content - Image */}
        <div className="">
          <motion.div
        initial={{ x: 300, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ type: 'spring', stiffness: 50, damping: 20, delay: 0.2 }}
        className="absolute  right-0 w-1/3 pointer-events-none hidden bottom-2 lg:block"
      >
        <img 
          src={heroImg} 
          alt="Hero" 
          className="w-full h-auto object-contain"
          loading="eager"
        />
      </motion.div>
        </div>
      </div>

      {/* Trust Bar */}
      {/* <div className="relative z-10 max-w-7xl mx-auto px-4 w-full mt-12">
        <div className="bg-[#041131] rounded-t-[3rem] p-8 md:p-10 flex flex-wrap justify-between items-center gap-6 border-t border-white/5">
          {[
            { icon: Award, title: "100% Satisfaction", sub: "Guarantee" },
            { icon: Users, title: "Trained Experts", sub: "Verified" },
            { icon: Leaf, title: "Eco-Friendly", sub: "Products" },
            { icon: FileText, title: "Transparent", sub: "Pricing" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 flex-1 min-w-[200px] border-r last:border-none border-white/10 px-4">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shrink-0">
                <item.icon className="w-6 h-6 text-[#fbbf24]" />
              </div>
              <div>
                <p className="text-white font-bold text-xs uppercase tracking-tight">{item.title}</p>
                <p className="text-white/40 font-bold text-[10px] uppercase tracking-widest mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}
       <section className="px-6 hidden md:block md:px-16 -mt-5 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-[1440px] mx-auto bg-[#052d54ff] rounded-[40px] py-3 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 border border-white/10"
          >
            <div className="flex-1 border-r border-white/10 flex justify-center">
              <BottomFeature icon={CheckCircle} title="100% Satisfaction" subtitle="Guarantee" />
            </div>
            <div className="flex-1 border-r border-white/10 flex justify-center">
              <BottomFeature icon={UserCheck} title="Trained & Verified" subtitle="Experts" />
            </div>
            <div className="flex-1 border-r border-white/10 flex justify-center">
              <BottomFeature icon={Leaf} title="Eco-Friendly" subtitle="Products" />
            </div>
            <div className="flex-1 flex justify-center">
              <BottomFeature icon={CreditCard} title="Transparent" subtitle="Pricing" />
            </div>
          </motion.div>
        </section>
    </section>
  );
}

