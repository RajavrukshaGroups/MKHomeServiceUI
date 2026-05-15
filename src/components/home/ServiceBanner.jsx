import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import gsap from 'gsap';

export default function ServiceBanner() {
  const containerRef = useRef(null);
  const iconRef = useRef(null);
  const textRef = useRef(null);
  const marker1Ref = useRef(null);
  const marker2Ref = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleMouseMove = (e) => {
      // 3D Tilt Effect for the banner
      const bounds = containerRef.current.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const rotateX = (e.clientY - centerY) / 20;
      const rotateY = -(e.clientX - centerX) / 20;

      gsap.to(containerRef.current, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- Entry GSAP Animation ---
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.8,
        duration: 1.2,
        ease: "expo.out",
      });

      if (iconRef.current) {
        gsap.from(iconRef.current, {
          scale: 0,
          rotate: -180,
          duration: 1,
          delay: 0.5,
          ease: "elastic.out(1, 0.5)",
        });
      }

      const textLines = textRef.current?.children;
      if (textLines) {
        gsap.from(textLines, {
          opacity: 0,
          x: -30,
          stagger: 0.15,
          duration: 0.8,
          delay: 0.8,
          ease: "power3.out",
        });
      }

      const markers = [marker1Ref.current, marker2Ref.current].filter(Boolean);
      gsap.from(markers, {
        opacity: 0,
        scale: 0,
        stagger: 0.2,
        duration: 0.5,
        delay: 1.2,
        ease: "back.out(2)",
      });

      // Continuous floating state
      gsap.to('.map-pin-inner', {
        y: -4,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut"
      });
    }, containerRef.current);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative flex items-center gap-6 bg-gradient-to-r from-[#0c2b5b] to-[#081b3d] p-2 pr-10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/10 backdrop-blur-xl group cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Subtle hover outer glow */}
      <div className="absolute inset-0 rounded-full bg-[#ffc800]/0 group-hover:bg-[#ffc800]/5 transition-colors duration-500 blur-xl -z-10"></div>

      {/* Icon container */}
      <div className="relative flex items-center justify-center" style={{ transform: 'translateZ(50px)' }}>
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1e4b8a] to-[#0a234a] flex items-center justify-center shadow-[inset_0_4px_8px_rgba(0,0,0,0.4),0_8px_16px_rgba(0,0,0,0.3)] border border-white/20 transform-gpu overflow-hidden">
          {/* Animated Inner Glow */}
          <div className="absolute inset-0 bg-[#ffc800]/5 animate-pulse"></div>
          
          <div ref={iconRef} className="relative map-pin-inner">
            <MapPin className="w-7 h-7 text-[#ffc800] drop-shadow-[0_0_8px_rgba(255,200,0,0.5)]" />
            <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border-[2px] border-[#ffc800]"></div>
          </div>
          
          {/* Diagonal perspective markers */}
          <div ref={marker1Ref} className="absolute bottom-[16px] left-[16px] w-2 h-[1.5px] bg-[#ffc800]/60 rotate-[35deg] rounded-full"></div>
          <div ref={marker2Ref} className="absolute bottom-[16px] right-[16px] w-2 h-[1.5px] bg-[#ffc800]/60 -rotate-[35deg] rounded-full"></div>
        </div>
      </div>

      {/* Text Area */}
      <div ref={textRef} className="flex flex-col select-none" style={{ transform: 'translateZ(30px)' }}>
        <span className="text-white/80 text-lg font-medium tracking-tight leading-none mb-1">
          Serving homes
        </span>
        <span className="text-white text-lg font-semibold tracking-tight leading-none group-hover:text-white/90 transition-colors duration-300">
          across <span className="text-[#ffc800] font-bold drop-shadow-[0_0_10px_rgba(255,200,0,0.3)]">Bangalore</span>
        </span>
      </div>

      {/* Shimmer Effect */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-12 scale-150"></div>
      </div>
    </div>
  );
}
