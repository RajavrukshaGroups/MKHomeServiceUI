import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown, ArrowRight, Diamond } from "lucide-react";
import { useEffect, useState, useMemo, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const HERO_CONFIG = {
  colors: {
    brand: "#02194a",
    accent: "#d4af37",
    accentMuted: "rgba(212, 175, 55, 0.05)",
    brandMuted: "rgba(2, 25, 74, 0.05)",
    textStone: "#78716c", // stone-500
  },
  fonts: {
    serif: "'Cormorant Garamond', serif",
    sans: "'Inter', sans-serif"
  },
  pattern: {
    backgroundImage: `
      linear-gradient(to right, rgba(2, 25, 74, 0.03) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(2, 25, 74, 0.03) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px'
  }
};

export default function Hero() {
  const [init, setInit] = useState(false);
  const heroRef = useRef(null);

  const { scrollY } = useScroll();
  
  // Parallax offsets
  const blob1Y = useTransform(scrollY, [0, 1000], [0, 200]);
  const blob2Y = useTransform(scrollY, [0, 1000], [0, -150]);
  const particlesY = useTransform(scrollY, [0, 1000], [0, 100]);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions = useMemo(
    () => ({
      background: { color: { value: "transparent" } },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: false },
          onHover: { enable: true, mode: ["grab", "repel"] },
        },
        modes: {
          grab: { distance: 140, links: { opacity: 0.5 } },
          repel: { distance: 100, duration: 0.4 },
        },
      },
      particles: {
        color: { value: HERO_CONFIG.colors.accent },
        links: {
          color: HERO_CONFIG.colors.brand,
          distance: 150,
          enable: true,
          opacity: 0.1,
          width: 0.5,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "out" },
          random: true,
          speed: 0.6,
          straight: false,
        },
        number: {
          density: { enable: true, area: 800 },
          value: 60,
        },
        opacity: { value: { min: 0.1, max: 0.4 } },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }),
    [],
  );

  return (
    <section 
      id="hero" 
      ref={heroRef} 
      style={{ 
        ...HERO_CONFIG.pattern,
        fontFamily: HERO_CONFIG.fonts.sans,
        backgroundColor: "#fdfcfb"
      }}
      className="relative min-h-[40vh] md:min-h-[70vh] flex flex-col items-center justify-center -pt-20 overflow-hidden"
    >
        {/* Local Style Injection for Hero Specifics */}
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');
          #hero .font-hero-serif { font-family: ${HERO_CONFIG.fonts.serif}; }
          #hero .text-brand { color: ${HERO_CONFIG.colors.brand}; }
          #hero .text-accent { color: ${HERO_CONFIG.colors.accent}; }
          #hero .bg-brand { background-color: ${HERO_CONFIG.colors.brand}; }
        `}} />

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            style={{ y: blob1Y, backgroundColor: HERO_CONFIG.colors.accentMuted }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full blur-[100px]"
          />
          <motion.div 
            style={{ y: blob2Y, backgroundColor: HERO_CONFIG.colors.brandMuted }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] rounded-full blur-[120px]"
          />
          
          {init && (
            <motion.div style={{ y: particlesY }} className="absolute inset-0 z-0 h-[120%] w-full">
              <Particles
                id="tsparticles"
                options={particlesOptions}
                className="h-full w-full opacity-60"
              />
            </motion.div>
          )}

          {/* Distant Particle Drifts (Manual Overlay) */}
          <motion.div style={{ y: particlesY }} className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                style={{ backgroundColor: HERO_CONFIG.colors.accent, opacity: 0.2 }}
                className="absolute w-1 h-1 rounded-full"
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: Math.random() * 100 + "%",
                  opacity: 0 
                }}
                animate={{ 
                  y: ["-10%", "110%"],
                  opacity: [0, 0.4, 0]
                }}
                transition={{ 
                  duration: 15 + Math.random() * 20, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: Math.random() * 10
                }}
              />
            ))}
          </motion.div>
        </div>

        <div className="container mx-auto px-6 relative z-10 pointer-events-auto">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <div className="h-[1px] w-8 opacity-40" style={{ backgroundColor: HERO_CONFIG.colors.accent }} />
              <span className="text-[10px] uppercase tracking-[0.4em] font-semibold text-accent">Curated Excellence</span>
              <div className="h-[1px] w-8 opacity-40" style={{ backgroundColor: HERO_CONFIG.colors.accent }} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-hero-serif font-light tracking-tight text-brand leading-[1.1] text-balance mb-8"
            >
              Our Service <span className="italic font-normal">Catalogue</span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1, ease: "circOut" }}
              className="h-[1px] w-48 mx-auto mb-8"
              style={{ background: `linear-gradient(to right, transparent, ${HERO_CONFIG.colors.accent}, transparent)` }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{ color: "#78716c" }}
              className="max-w-6xl mx-auto text-lg md:text-xl font-light leading-relaxed text-balance"
            >
              Discover meticulously curated premium services, delivered with 
              unwavering quality, absolute discretion, and a commitment to 
              <span className="text-brand font-medium"> timeless luxury.</span>
            </motion.p>

            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <button id="cta-catalogue" className="group relative px-8 py-4 bg-brand text-white overflow-hidden rounded-full transition-all hover:pr-12">
                <span className="relative z-10 text-sm tracking-widest font-medium uppercase">Explore Selection</span>
                <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all text-accent w-5 h-5" />
              </button>
              <button 
                style={{ color: HERO_CONFIG.colors.brand }}
                className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2"
              >
                Private Consultation <ArrowRight size={14} />
              </button>
            </motion.div> */}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 2 }}
          className="hidden md:block absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold opacity-40" style={{ color: "#78716c" }}>Scroll</span>
          <ChevronDown className="w-4 h-4 text-accent animate-bounce" />
        </motion.div>
      </section>
  );
}
