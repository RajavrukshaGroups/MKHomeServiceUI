// import { Search } from 'lucide-react';
// import { motion } from 'motion/react';
// import { useNavigate } from 'react-router-dom';
// import heroImg from '../../assets/hero-img.png';

// export default function Hero() {
//   const navigate = useNavigate();

//   return (
//     <section className="relative h-[85vh] min-h-[600px] flex items-center pt-12 justify-center overflow-hidden">
//       {/* Background with overlay */}
//       <div className="absolute inset-0 z-0">
//         <img 
//           src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=1920" 
//           alt="Home services background" 
//           className="w-full h-full object-cover"
//           referrerPolicy="no-referrer"
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-black/60" />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 text-center md:text-left w-full">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="max-w-3xl"
//         >
//           {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/20 backdrop-blur-md rounded-full border border-accent/30 text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-8">
//             Premium Home Services in Karnataka
//           </div> */}
//           <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-8 leading-[0.85] uppercase tracking-tighter">
//             RELIABLE SOLUTIONS<br />
//             <span className="text-accent font-black">EVERY DAY.</span>
//           </h1>
//           <p className="text-lg md:text-xl text-white/70 mb-12 max-w-lg font-medium leading-relaxed">
//             Professional cleaning, repairs, and home maintenance delivered with precision. Trustworthy service for every home in Karnataka.
//           </p>

//           <div className="flex flex-col md:flex-row gap-4 bg-white/10 backdrop-blur-2xl p-2.5 rounded-[2rem] border border-white/20 shadow-2xl max-w-xl group">
//             <div className="flex items-center gap-3 px-6 py-4 flex-1">
//               <Search className="w-5 h-5 text-white/50 group-focus-within:text-accent transition-colors" />
//               <input 
//                 type="text" 
//                 placeholder="What can we help you with today?" 
//                 className="bg-transparent border-none outline-none text-white placeholder:text-white/30 w-full font-bold uppercase tracking-tight text-sm"
//               />
//             </div>
//             <button 
//               onClick={() => navigate('/services')}
//               className="bg-accent hover:bg-accent-dark text-white px-10 py-4 rounded-[1.5rem] font-black uppercase tracking-widest transition-all duration-300 shadow-xl shadow-black/20 text-xs active:scale-95"
//             >
//               Book Service
//             </button>
//           </div>

//           <div className="mt-8 flex flex-wrap gap-4">
//             <span className="text-sm text-gray-300 font-medium">Popular:</span>
//             {['Deep Cleaning', 'Electrician', 'AC Service', 'Salon'].map((tag) => (
//               <button 
//                 key={tag} 
//                 onClick={() => navigate('/services')}
//                 className="text-xs font-semibold bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-md transition-colors border border-white/10"
//               >
//                 {tag}
//               </button>
//             ))}
//           </div>
//         </motion.div>
//       </div>

//       <div>

//         <img src={heroImg} alt="Hero" className="absolute w-120 h-120 bottom-12 right-0 w-1/3 object-contain opacity-90 pointer-events-none" />
//       </div>

//       {/* Floating elements for visual flair */}
//       <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
//     </section>
//   );
// }

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import heroImg from '../../assets/hero-img.png';

export default function Hero() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState(new URLSearchParams(location.search).get('q') || "");

  // Sync with URL parameter
  useEffect(() => {
    const query = new URLSearchParams(location.search).get('q');
    if (query !== null) {
      setSearchQuery(query);
    } else {
      setSearchQuery("");
    }
  }, [location.search]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/services');
    }
  };

  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center pt-12 md:pt-32 justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=1920" 
          alt="Home services background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-black/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center md:text-left w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl pt-0 md:pt-0 lg:pt-0 xl:pt-0"
        >
          <h1 className="text-2xl  md:text-6xl font-display font-black text-white mb-8 leading-[0.85] uppercase tracking-tighter">
            <span className="text-[#D3AF37]">RELIABLE</span> SOLUTIONS<br />
            <span className="">EVERY</span> <span className="text-[#D3AF37]">DAY</span>.
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-12 max-w-lg font-medium leading-relaxed">
            Professional cleaning, repairs, and home maintenance delivered with precision. Trustworthy service for every home in Bangalore.
          </p>

          <div className="flex flex-col md:flex-row gap-4 bg-white/10 backdrop-blur-2xl p-2.5 rounded-[2rem] border border-white/20 shadow-2xl max-w-xl group">
            <div className="flex items-center gap-3 px-6 py-4 flex-1">
              <Search className="w-5 h-5 text-white/50 group-focus-within:text-accent transition-colors" />
              <input 
                type="text" 
                placeholder="What can we help you with today?" 
                className="bg-transparent border-none outline-none text-white placeholder:text-white/30 w-full font-bold uppercase tracking-tight text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
              />
            </div>
            <button 
              onClick={handleSearch}
              className="bg-accent hover:bg-accent-dark text-white px-10 py-4 rounded-[1.5rem] font-black uppercase tracking-widest transition-all duration-300 shadow-xl shadow-black/20 text-xs active:scale-95"
            >
              Book Service
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <span className="text-white/60 text-sm font-semibold">Popular:</span>
            {['Deep Cleaning', 'Painting',].map((tag) => (
              <button 
                key={tag} 
                onClick={() => navigate(`/services?q=${encodeURIComponent(tag)}`)}
                className="text-xs font-semibold bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-md transition-colors border border-white/10"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Image with scroll‑triggered slide‑in from right */}
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ type: 'spring', stiffness: 50, damping: 20, delay: 0.2 }}
        className="absolute  right-0 w-1/3 pointer-events-none hidden lg:block"
      >
        <img 
          src={heroImg} 
          alt="Hero" 
          className="w-full h-auto object-contain"
          loading="eager"
        />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

