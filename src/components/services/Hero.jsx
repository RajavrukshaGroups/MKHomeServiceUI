// import { motion, useScroll, useTransform } from "motion/react";
// import { ChevronDown, ArrowRight, Diamond } from "lucide-react";
// import { useEffect, useState, useMemo, useRef } from "react";
// import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { loadSlim } from "@tsparticles/slim";

// const HERO_CONFIG = {
//   colors: {
//     brand: "#02194a",
//     accent: "#d4af37",
//     accentMuted: "rgba(212, 175, 55, 0.05)",
//     brandMuted: "rgba(2, 25, 74, 0.05)",
//     textStone: "#78716c", // stone-500
//   },
//   fonts: {
//     serif: "'Cormorant Garamond', serif",
//     sans: "'Inter', sans-serif"
//   },
//   pattern: {
//     backgroundImage: `
//       linear-gradient(to right, rgba(2, 25, 74, 0.03) 1px, transparent 1px),
//       linear-gradient(to bottom, rgba(2, 25, 74, 0.03) 1px, transparent 1px)
//     `,
//     backgroundSize: '40px 40px'
//   }
// };

// export default function Hero() {
//   const [init, setInit] = useState(false);
//   const heroRef = useRef(null);

//   const { scrollY } = useScroll();
  
//   // Parallax offsets
//   const blob1Y = useTransform(scrollY, [0, 1000], [0, 200]);
//   const blob2Y = useTransform(scrollY, [0, 1000], [0, -150]);
//   const particlesY = useTransform(scrollY, [0, 1000], [0, 100]);

//   // this should be run only once per application lifetime
//   useEffect(() => {
//     initParticlesEngine(async (engine) => {
//       await loadSlim(engine);
//     }).then(() => {
//       setInit(true);
//     });
//   }, []);

//   const particlesOptions = useMemo(
//     () => ({
//       background: { color: { value: "transparent" } },
//       fpsLimit: 120,
//       interactivity: {
//         events: {
//           onClick: { enable: false },
//           onHover: { enable: true, mode: ["grab", "repel"] },
//         },
//         modes: {
//           grab: { distance: 140, links: { opacity: 0.5 } },
//           repel: { distance: 100, duration: 0.4 },
//         },
//       },
//       particles: {
//         color: { value: HERO_CONFIG.colors.accent },
//         links: {
//           color: HERO_CONFIG.colors.brand,
//           distance: 150,
//           enable: true,
//           opacity: 0.1,
//           width: 0.5,
//         },
//         move: {
//           direction: "none",
//           enable: true,
//           outModes: { default: "out" },
//           random: true,
//           speed: 0.6,
//           straight: false,
//         },
//         number: {
//           density: { enable: true, area: 800 },
//           value: 60,
//         },
//         opacity: { value: { min: 0.1, max: 0.4 } },
//         shape: { type: "circle" },
//         size: { value: { min: 1, max: 3 } },
//       },
//       detectRetina: true,
//     }),
//     [],
//   );

//   return (
//     <section 
//       id="hero" 
//       ref={heroRef} 
//       style={{ 
//         ...HERO_CONFIG.pattern,
//         fontFamily: HERO_CONFIG.fonts.sans,
//         backgroundColor: "#f3f0ecff"
//       }}
//       className="relative min-h-[40vh] md:min-h-[70vh] flex flex-col items-center justify-center -pt-20 mb-4 overflow-hidden"
//     >
//         {/* Local Style Injection for Hero Specifics */}
//         <style dangerouslySetInnerHTML={{ __html: `
//           @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');
//           #hero .font-hero-serif { font-family: ${HERO_CONFIG.fonts.serif}; }
//           #hero .text-brand { color: ${HERO_CONFIG.colors.brand}; }
//           #hero .text-accent { color: ${HERO_CONFIG.colors.accent}; }
//           #hero .bg-brand { background-color: ${HERO_CONFIG.colors.brand}; }
//         `}} />

//         {/* Background Decorative Elements */}
//         <div className="absolute inset-0 pointer-events-none overflow-hidden">
//           <motion.div 
//             style={{ y: blob1Y, backgroundColor: HERO_CONFIG.colors.accentMuted }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 2 }}
//             className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full blur-[100px]"
//           />
//           <motion.div 
//             style={{ y: blob2Y, backgroundColor: HERO_CONFIG.colors.brandMuted }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 2, delay: 0.5 }}
//             className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] rounded-full blur-[120px]"
//           />
          
//           {init && (
//             <motion.div style={{ y: particlesY }} className="absolute inset-0 z-0 h-[120%] w-full">
//               <Particles
//                 id="tsparticles"
//                 options={particlesOptions}
//                 className="h-full w-full opacity-60"
//               />
//             </motion.div>
//           )}

//           {/* Distant Particle Drifts (Manual Overlay) */}
//           <motion.div style={{ y: particlesY }} className="absolute inset-0">
//             {[...Array(12)].map((_, i) => (
//               <motion.div
//                 key={`particle-${i}`}
//                 style={{ backgroundColor: HERO_CONFIG.colors.accent, opacity: 0.2 }}
//                 className="absolute w-1 h-1 rounded-full"
//                 initial={{ 
//                   x: Math.random() * 100 + "%", 
//                   y: Math.random() * 100 + "%",
//                   opacity: 0 
//                 }}
//                 animate={{ 
//                   y: ["-10%", "110%"],
//                   opacity: [0, 0.4, 0]
//                 }}
//                 transition={{ 
//                   duration: 15 + Math.random() * 20, 
//                   repeat: Infinity, 
//                   ease: "linear",
//                   delay: Math.random() * 10
//                 }}
//               />
//             ))}
//           </motion.div>
//         </div>

//         <div className="container mx-auto px-6 relative z-10 pointer-events-auto">
//           <div className="text-center max-w-4xl mx-auto">
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="flex items-center justify-center gap-3 mb-4"
//             >
//               <div className="h-[1px] w-8 opacity-40" style={{ backgroundColor: HERO_CONFIG.colors.accent }} />
//               <span className="text-[10px] uppercase tracking-[0.4em] font-semibold text-accent">Curated Excellence</span>
//               <div className="h-[1px] w-8 opacity-40" style={{ backgroundColor: HERO_CONFIG.colors.accent }} />
//             </motion.div>

//             <motion.h1
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4, duration: 0.8 }}
//               className="text-4xl md:text-6xl lg:text-7xl font-hero-serif font-light tracking-tight text-brand leading-[1.1] text-balance mb-3"
//             >
//               Our Service <span className="italic font-normal">Catalogue</span>
//             </motion.h1>

//             <motion.div
//               initial={{ scaleX: 0 }}
//               animate={{ scaleX: 1 }}
//               transition={{ delay: 0.8, duration: 1, ease: "circOut" }}
//               className="h-[1px] w-48 mx-auto mb-14"
//               style={{ background: `linear-gradient(to right, transparent, ${HERO_CONFIG.colors.accent}, transparent)` }}
//             />

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6 }}
//               style={{ color: "#78716c" }}
//               className="max-w-6xl mx-auto text-lg md:text-xl font-light leading-relaxed text-balance"
//             >
//               Discover meticulously curated premium services, delivered with 
//               unwavering quality, absolute discretion, and a commitment to 
//               <span className="text-brand font-medium"> timeless luxury.</span>
//             </motion.p>

//             {/* <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 1 }}
//               className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
//             >
//               <button id="cta-catalogue" className="group relative px-8 py-4 bg-brand text-white overflow-hidden rounded-full transition-all hover:pr-12">
//                 <span className="relative z-10 text-sm tracking-widest font-medium uppercase">Explore Selection</span>
//                 <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all text-accent w-5 h-5" />
//               </button>
//               <button 
//                 style={{ color: HERO_CONFIG.colors.brand }}
//                 className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2"
//               >
//                 Private Consultation <ArrowRight size={14} />
//               </button>
//             </motion.div> */}
//           </div>
//         </div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.5, duration: 2 }}
//           className="absolute inset-0 -bottom-89 flex flex-col items-center justify-center gap-2"
//         >
//           <span className="text-[9px] uppercase tracking-[0.3em] font-bold opacity-40" style={{ color: "#78716c" }}>Scroll</span>
//           <ChevronDown className="w-4 h-4 text-accent animate-bounce" />
//         </motion.div>
//       </section>
//   );
// }

// import React, { useState } from 'react';
// import { ArrowDown, Search, MapPin, Sparkles, Building2, Globe, Users } from 'lucide-react';
// //import { AREAS } from '../data';
// import HeroImg from "./../../assets/heroImg.png"

// const AREAS = [
//   { id: '1', name: 'Downtown district', zipCode: '10001' },
//   { id: '2', name: 'West End Heights', zipCode: '10002' },
//   { id: '3', name: 'Northside Meadows', zipCode: '10003' },
//   { id: '4', name: 'South Bay Shore', zipCode: '10004' },
//   { id: '5', name: 'Oakridge Terrace', zipCode: '10005' },
//   { id: '6', name: 'East Valley Green', zipCode: '10006' }
// ];


// export default function Hero({
//   searchQuery,
//   setSearchQuery,
//   selectedArea,
//   setSelectedArea,
//   onSearchSubmit,
//   onGetStarted
// }) {
//   const [isSearchingFocus, setIsSearchingFocus] = useState(false);

//   // SVG scribble path definitions for rendering high-fidelity exact visual matches of the pencil strokes in the screenshot
//   const yellowScribblePath1 = "M10,35 C35,15 80,-5 120,5 C130,7 135,12 110,18 C85,24 45,35 25,48 C15,55 20,62 50,58 C80,54 130,42 160,35";
//   const yellowScribblePathLeftBottom = "M5,25 C35,-2 85,-10 115,12 C125,22 100,32 75,42 C45,55 10,75 25,85 C35,92 80,82 120,65 C160,48 195,25 210,15";

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       onSearchSubmit();
//     }
//   };

//   return (
//     <section 
//       id="home" 
//       className="relative pt-24 min-h-screen bg-brick-texture overflow-hidden flex flex-col justify-between"
//     >
      
//       {/* Decorative Blob Elements representing the abstract blue and yellow disks in margins */}
//       <div className="absolute top-24 -left-12 w-48 h-48 bg-localaid-blue/5 rounded-full blur-3xl pointer-events-none" />
//       <div className="absolute top-1/3 -right-20 w-80 h-80 bg-localaid-gold/10 rounded-full blur-3xl pointer-events-none" />
      
//       {/* Visual Floating elements matching real-life design */}
//       {/* Yellow solid dot (top right) */}
//       <div className="absolute top-44 right-[15%] w-5 h-5 bg-localaid-gold rounded-full animate-pulse z-10 hidden sm:block" />
//       {/* Blue solid dot (top background left) */}
//       <div className="absolute top-36 left-[8%] w-4 h-4 bg-localaid-blue/30 rounded-full z-10" />
//       {/* Yellow solid dot (bottom left above wave) */}
//       <div className="absolute bottom-52 left-[20%] w-6 h-6 bg-localaid-gold rounded-full animate-bounce z-10 hidden md:block" />

//       {/* Main Container */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-32 w-full relative z-20 flex-grow flex flex-col justify-center">
        
//         {/* Main Header Title */}
//         <div className="text-center max-w-4xl mx-auto mb-10" id="hero-title-container">
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-localaid-blue leading-[1.1] md:leading-[1.15]" id="hero-heading">
//             All In One Service <br className="hidden sm:inline" />
//             <span className="text-slate-800">For Your Household</span>
//           </h1>
//         </div>

//         {/* Hero Grid Content: Left Why, Center Image, Right Stats */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="hero-grid">
          
//           {/* Left Column: Why LocalAid Panel */}
//           <div className="lg:col-span-4 flex flex-col items-start text-left relative" id="why-localaid-column">
            
//             {/* Handdrawn Yellow Scribble decoration above "Why LocalAid" (Matches Screenshot) */}
//             <div className="absolute -top-12 left-0 w-36 h-12 text-localaid-gold/90 pointer-events-none select-none" id="decorative-scribble-top-left">
//               <svg viewBox="0 0 180 70" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round">
//                 <path d={yellowScribblePath1} />
//               </svg>
//             </div>

//             <span className="text-localaid-blue font-extrabold text-lg sm:text-xl md:text-2xl mb-3 tracking-wide" id="why-localaid-label">
//               Why LocalAid?
//             </span>
//             <p className="text-localaid-slate text-sm sm:text-base leading-relaxed mb-6 max-w-md font-medium" id="why-localaid-description">
//               Orci ullamcorper integer arcu posuere. Nunc lacus ante adipiscing ac enim vel. Lectus placerat non sed at odio in sagittis jim attit. LocalAID delivers professional quality straight to your door with immediate transparent bookings.
//             </p>
            
//             <button
//               onClick={onGetStarted}
//               className="px-8 py-3.5 bg-localaid-blue text-white font-bold text-sm rounded-xl localaid-btn-shadow hover:bg-opacity-95 hover:scale-[1.02] transform transition-all cursor-pointer"
//               id="get-started-btn"
//             >\
//               Get Started
//             </button>

//             {/* Downward circular scrolling badge (Matches Screenshot) */}
//             <div className="mt-12 relative cursor-pointer group flex items-center gap-4" onClick={onSearchSubmit} id="scroll-badge-container">
//               <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
//                 {/* SVG Text circulating */}
//                 <svg className="absolute inset-0 w-full h-full scroll-circle-text text-localaid-slate hover:text-localaid-blue" viewBox="0 0 100 100">
//                   <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
//                   <text className="text-[10px] font-extrabold fill-current uppercase tracking-[0.1em]">
//                     <textPath href="#circlePath" startOffset="0%">
//                       • Scroll Down • Find Service 
//                     </textPath>
//                   </text>
//                 </svg>
//                 {/* Center circle and arrow */}
//                 <div className="w-9 h-9 rounded-full bg-localaid-gold flex items-center justify-center text-localaid-blue shadow group-hover:scale-110 transition-transform">
//                   <ArrowDown size={14} className="stroke-[3]" />
//                 </div>
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-[11px] font-extrabold text-localaid-blue tracking-wider uppercase">Discover More</span>
//                 <span className="text-[10px] font-bold text-localaid-slate">Explore Top Specialists</span>
//               </div>
//             </div>
//           </div>

//           {/* Center Column: Professional Image within Frame */}
//           <div className="lg:col-span-4 flex justify-center relative py-4 lg:py-0" id="hero-middle-avatar-column">
            
//             {/* Arched Background behind workers representing the blue backdrop mask */}
//             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] aspect-[1/1.2] rounded-t-full bg-slate-200/45 border-4 border-white shadow-inner -z-10 bg-gradient-to-b from-blue-50 to-indigo-50/10" />

//             <img
//               src={HeroImg}
//               alt="LocalAID Household Service Staff"
//               referrerPolicy="no-referrer"
//               className="relative z-10 w-full max-w-[340px] drop-shadow-2xl hover:scale-[1.01] transition-transform duration-500 rounded-b-xl"
//               id="hero-team-image"
//             />
//           </div>

//           {/* Right Column: Key Statistics List */}
//           <div className="lg:col-span-4 flex flex-col justify-center space-y-5" id="stats-column">
            
//             {/* Stat Row 1 */}
//             <div className="flex items-center gap-4 bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 localaid-card-shadow hover:-translate-x-1 transition-transform cursor-default" id="stat-card-1">
//               <div className="w-14 h-14 rounded-2xl bg-localaid-gold flex items-center justify-center text-localaid-blue" id="stat-icon-wrapper-1">
//                 {/* SVG lookalike measuring/ruler or award icon */}
//                 <Building2 size={24} className="stroke-[2.5]" />
//               </div>
//               <div className="flex flex-col text-left">
//                 <span className="text-2xl font-black text-localaid-blue leading-none">15+</span>
//                 <span className="text-xs font-bold text-localaid-slate uppercase tracking-wider mt-1">Year Experience</span>
//               </div>
//             </div>

//             {/* Stat Row 2 */}
//             <div className="flex items-center gap-4 bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 localaid-card-shadow hover:-translate-x-1 transition-transform cursor-default" id="stat-card-2">
//               <div className="w-14 h-14 rounded-2xl bg-[#FFE485] flex items-center justify-center text-localaid-blue" id="stat-icon-wrapper-2">
//                 <Users size={24} className="stroke-[2.5]" />
//               </div>
//               <div className="flex flex-col text-left">
//                 <span className="text-2xl font-black text-localaid-blue leading-none">866k</span>
//                 <span className="text-xs font-bold text-localaid-slate uppercase tracking-wider mt-1">Total Customer</span>
//               </div>
//             </div>

//             {/* Stat Row 3 */}
//             <div className="flex items-center gap-4 bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 localaid-card-shadow hover:-translate-x-1 transition-transform cursor-default" id="stat-card-3">
//               <div className="w-14 h-14 rounded-2xl bg-localaid-gold flex items-center justify-center text-localaid-blue" id="stat-icon-wrapper-3">
//                 <Globe size={24} className="stroke-[2.5]" />
//               </div>
//               <div className="flex flex-col text-left">
//                 <span className="text-2xl font-black text-localaid-blue leading-none">42+</span>
//                 <span className="text-xs font-bold text-localaid-slate uppercase tracking-wider mt-1">Countries Served</span>
//               </div>
//             </div>

//             {/* Delicate Yellow Scribble overlay (matches bottom-right details) */}
//             <div className="h-10 w-24 ml-auto text-localaid-gold/70 hidden lg:block" id="decorative-scribble-bottom-right">
//               <svg viewBox="0 0 100 35" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
//                 <path d="M5,10 C30,10 50,5 95,15 M15,22 C40,25 60,18 90,28" />
//               </svg>
//             </div>

//           </div>

//         </div>

//       </div>

//       {/* Overlapping Search Container (Tucks nicely on wave border layout) */}
//       <div className="w-full relative z-30 -mb-8 max-w-4xl mx-auto px-4" id="hero-search-overlay-anchor">
//         <div className={`bg-white rounded-2xl p-3 sm:p-4 border transition-all duration-300 flex flex-col md:flex-row gap-2.5 items-stretch shadow-2xl ${
//           isSearchingFocus ? 'border-localaid-sky ring-4 ring-localaid-sky/15 scale-[1.01]' : 'border-gray-200'
//         }`} id="search-container">
          
//           {/* Area Selector Dropdown */}
//           <div className="flex-1 min-w-[160px] flex items-center gap-2.5 bg-gray-55 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors" id="select-area-group">
//             <MapPin size={20} className="text-localaid-blue" />
//             <div className="flex flex-col flex-grow text-left">
//               <label className="text-[10px] font-extrabold text-localaid-slate uppercase tracking-wider leading-none mb-0.5">Coverage Area</label>
//               <select
//                 value={selectedArea}
//                 onChange={(e) => setSelectedArea(e.target.value)}
//                 className="bg-transparent text-sm font-bold text-localaid-blue outline-none cursor-pointer w-full pr-2"
//                 id="area-select"
//               >
//                 <option value="">All Services Areas</option>
//                 {AREAS.map((a) => (
//                   <option key={a.id} value={a.id}>
//                     {a.name} ({a.zipCode})
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Divider bar for desktop */}
//           <div className="hidden md:block w-px bg-gray-100 my-1" />

//           {/* Search Box Input */}
//           <div className="flex-[2] flex items-center gap-2.5 px-3 py-2" id="search-input-group">
//             <Search size={20} className="text-localaid-slate" />
//             <div className="flex flex-col flex-grow text-left">
//               <label className="text-[10px] font-extrabold text-localaid-slate uppercase tracking-wider leading-none mb-0.5">What do you need?</label>
//               <input
//                 type="text"
//                 placeholder="Search cleaning, plumbing, handyman support..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onFocus={() => setIsSearchingFocus(true)}
//                 onBlur={() => setIsSearchingFocus(false)}
//                 onKeyDown={handleKeyPress}
//                 className="bg-transparent text-sm font-bold text-localaid-blue placeholder-gray-400 outline-none w-full"
//                 id="search-input"
//               />
//             </div>
//           </div>

//           {/* Search Dispatch Button */}
//           <button
//             onClick={onSearchSubmit}
//             className="bg-localaid-blue hover:bg-opacity-95 text-white p-4 md:px-6 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
//             id="search-submit-btn"
//           >
//             <Search size={18} />
//             <span className="md:hidden">Search Services</span>
//           </button>
//         </div>
//       </div>

//       {/* Wave bottom separator transitioning to the flat Service catalog background */}
//       <div className="wave-divider" id="wave-bottom-divider">
//         <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
//           <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35C25,48,71.21,57.19,117.2,56.44Z" className="shape-fill"></path>
//         </svg>
//       </div>

//       {/* Big Yellow Side Scribble Decoration below hero left */}
//       <div className="absolute -bottom-16 -left-12 w-48 h-32 text-localaid-gold/70 select-none pointer-events-none hidden md:block" id="decorative-scribble-left-behind-search">
//         <svg viewBox="0 0 200 100" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
//           <path d={yellowScribblePathLeftBottom} />
//         </svg>
//       </div>

//     </section>
//   );
// }

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Search, MapPin, Sparkles, Building2, Globe, Users } from 'lucide-react';
//import { AREAS } from '../data';
import HeroImg from "./../../assets/heroImg.png"

const AREAS = [
  { id: '1', name: 'Downtown district', zipCode: '10001' },
  { id: '2', name: 'West End Heights', zipCode: '10002' },
  { id: '3', name: 'Northside Meadows', zipCode: '10003' },
  { id: '4', name: 'South Bay Shore', zipCode: '10004' },
  { id: '5', name: 'Oakridge Terrace', zipCode: '10005' },
  { id: '6', name: 'East Valley Green', zipCode: '10006' }
];

export default function Hero({
  searchQuery,
  setSearchQuery,
  selectedArea,
  setSelectedArea,
  onSearchSubmit,
  onGetStarted
}) {
  const [isSearchingFocus, setIsSearchingFocus] = useState(false);

  // SVG scribble path definitions for rendering high-fidelity exact visual matches of the pencil strokes in the screenshot
  const yellowScribblePath1 = "M10,35 C35,15 80,-5 120,5 C130,7 135,12 110,18 C85,24 45,35 25,48 C15,55 20,62 50,58 C80,54 130,42 160,35";
  const yellowScribblePathLeftBottom = "M5,25 C35,-2 85,-10 115,12 C125,22 100,32 75,42 C45,55 10,75 25,85 C35,92 80,82 120,65 C160,48 195,25 210,15";

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
    }
  };

  const statVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section 
      id="home" 
      className="relative pt-2 min-h-screen bg-brick-texture overflow-hidden flex flex-col justify-between"
    >
      
      {/* Decorative Blob Elements representing the abstract blue and yellow disks in margins */}
      <div className="absolute top-24 -left-12 w-48 h-48 bg-[#0E2B5C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-[#FAC915]/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Visual Floating elements matching real-life design */}
      {/* Yellow solid dot (top right) */}
      <div className="absolute top-44 right-[15%] w-5 h-5 bg-[#FAC915] rounded-full animate-pulse z-10 hidden sm:block" />
      {/* Blue solid dot (top background left) */}
      <div className="absolute top-36 left-[8%] w-4 h-4 bg-[#0E2B5C]/30 rounded-full z-10" />
      {/* Yellow solid dot (bottom left above wave) */}
      <div className="absolute bottom-52 left-[20%] w-6 h-6 bg-[#FAC915] rounded-full animate-bounce z-10 hidden md:block" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 w-full relative z-20 flex-grow flex flex-col justify-center">
        
        {/* Main Header Title */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-4xl mx-auto mb-10" 
          id="hero-title-container"
        >
          <h1 className="text-xl sm:text-2xl md:text-5xl font-extrabold tracking-tight text-[#0E2B5C] leading-[1.1] md:leading-[1.15]" id="hero-heading">
            All In One Service <br className="hidden sm:inline" />
            <span className="text-slate-800">For Your <span className='text-[#495056ff]'> Household</span></span>
          </h1>
        </motion.div>

        {/* Hero Grid Content: Left Why, Center Image, Right Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="hero-grid">
          
          {/* Left Column: Why LocalAid Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-4 flex flex-col items-start text-left relative" 
            id="why-localaid-column"
          >
            
            {/* Handdrawn Yellow Scribble decoration above \"Why LocalAid\" (Matches Screenshot) */}
            {/* <div className="absolute -top-12 left-0 w-36 h-12 text-[#FAC915]/90 pointer-events-none select-none" id="decorative-scribble-top-left">
              <svg viewBox="0 0 180 70" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round">
                <path d={yellowScribblePath1} />
              </svg>
            </div> */}

            <span className="text-[#0E2B5C] font-extrabold text-lg sm:text-xl md:text-2xl mb-3 tracking-wide" id="why-localaid-label">
              Why Home Services?
            </span>
            <p className="text-[#5E6E82] text-sm sm:text-base leading-relaxed mb-6 max-w-md font-medium" id="why-localaid-description">
              Trusted professionals for cleaning, plumbing, electrical, painting, and more.

              Easy booking, transparent pricing, and reliable service—right at your doorstep.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })} id="scroll-badge-container"
              className="px-8 py-3.5 bg-[#0E2B5C] text-white font-bold text-sm rounded-xl shadow-[0_4px_14px_0_rgba(14,43,92,0.4)] hover:bg-opacity-95 transform transition-all cursor-pointer"
              //id="get-started-btn" 
            >
              Get Started
            </motion.button>

            {/* Downward circular scrolling badge (Matches Screenshot) */}
            <div className="mt-12 relative cursor-pointer group flex items-center gap-4" onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })} id="scroll-badge-container">
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                {/* SVG Text circulating */}
                <svg className="absolute inset-0 w-full h-full scroll-circle-text text-[#5E6E82] hover:text-[#0E2B5C]" viewBox="0 0 100 100">
                  <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                  <text className="text-[10px] font-extrabold fill-current uppercase tracking-[0.1em]\">
                    <textPath href="#circlePath" startOffset="0%">
                      • Scroll Down • Find Service 
                    </textPath>
                  </text>
                </svg>
                {/* Center circle and arrow */}
                <div className="w-9 h-9 rounded-full bg-[#FAC915] flex items-center justify-center text-[#0E2B5C] shadow group-hover:scale-110 transition-transform">
                  <ArrowDown size={14} className="stroke-[3]" />
                </div>
              </div>
              {/* <div className="flex flex-col">
                <span className="text-[11px] font-extrabold text-[#0E2B5C] tracking-wider uppercase">Discover More</span>
                <span className="text-[10px] font-bold text-[#5E6E82]">Explore Top Specialists</span>
              </div> */}
            </div>
          </motion.div>

          {/* Center Column: Professional Image within Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="lg:col-span-4 flex justify-center relative py-4 lg:py-0" 
            id="hero-middle-avatar-column"
          >
            
            {/* Arched Background behind workers representing the blue backdrop mask */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] aspect-[1/1.2] rounded-t-full bg-slate-200/45 border-4 border-white shadow-inner -z-10 bg-gradient-to-b from-blue-50 to-indigo-50/10" />

            <img
              src={HeroImg}
              alt="LocalAID Household Service Staff"
              referrerPolicy="no-referrer"
              className="relative z-10 w-full h-full drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500 rounded-b-xl"
              id="hero-team-image"
            />
          </motion.div>

          {/* Right Column: Key Statistics List */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.35
                }
              }
            }}
            className="lg:col-span-4 flex flex-col justify-center space-y-5" 
            id="stats-column"
          >
            
            {/* Stat Row 1 */}
            <motion.div 
              variants={statVariants}
              whileHover={{ x: -4, transition: { duration: 0.2 } }}
              className="flex items-center gap-4 bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-[0_10px_30px_-5px_rgba(15,23,42,0.05),0_2px_10px_-2px_rgba(15,23,42,0.02)] cursor-default" 
              id="stat-card-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#FAC915] flex items-center justify-center text-[#0E2B5C]" id="stat-icon-wrapper-1">
                {/* SVG lookalike measuring/ruler or award icon */}
                <Building2 size={24} className="stroke-[2.5]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-2xl font-black text-[#0E2B5C] leading-none">15+</span>
                <span className="text-xs font-bold text-[#5E6E82] uppercase tracking-wider mt-1">Year Experience</span>
              </div>
            </motion.div>

            {/* Stat Row 2 */}
            <motion.div 
              variants={statVariants}
              whileHover={{ x: -4, transition: { duration: 0.2 } }}
              className="flex items-center gap-4 bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-[0_10px_30px_-5px_rgba(15,23,42,0.05),0_2px_10px_-2px_rgba(15,23,42,0.02)] cursor-default" 
              id="stat-card-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#FFE485] flex items-center justify-center text-[#0E2B5C]" id="stat-icon-wrapper-2">
                <Users size={24} className="stroke-[2.5]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-2xl font-black text-[#0E2B5C] leading-none">866k</span>
                <span className="text-xs font-bold text-[#5E6E82] uppercase tracking-wider mt-1">Total Customer</span>
              </div>
            </motion.div>

            {/* Stat Row 3 */}
            <motion.div 
              variants={statVariants}
              whileHover={{ x: -4, transition: { duration: 0.2 } }}
              className="flex items-center gap-4 bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-[0_10px_30px_-5px_rgba(15,23,42,0.05),0_2px_10px_-2px_rgba(15,23,42,0.02)] cursor-default" 
              id="stat-card-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#FAC915] flex items-center justify-center text-[#0E2B5C]" id="stat-icon-wrapper-3">
                <Globe size={24} className="stroke-[2.5]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-2xl font-black text-[#0E2B5C] leading-none">42+</span>
                <span className="text-xs font-bold text-[#5E6E82] uppercase tracking-wider mt-1">Countries Served</span>
              </div>
            </motion.div>

            {/* Delicate Yellow Scribble overlay (matches bottom-right details) */}
            <div className="h-10 w-24 ml-auto text-[#FAC915]/70 hidden lg:block" id="decorative-scribble-bottom-right">
              <svg viewBox="0 0 100 35" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
                <path d="M5,10 C30,10 50,5 95,15 M15,22 C40,25 60,18 90,28" />
              </svg>
            </div>

          </motion.div>

        </div>

      </div>

      {/* Overlapping Search Container (Tucks nicely on wave border layout) */}
     
      {/* Wave bottom separator transitioning to the flat Service catalog background */}
      

    </section>
  );
}
