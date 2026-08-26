import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const StarkPreloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const contentRef = useRef(null);
  const reactorRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    gsap.to(reactorRef.current, {
      rotation: 360,
      duration: 3,
      repeat: -1,
      ease: "none"
    });

    tl.set(preloaderRef.current, { autoAlpha: 1 })
      .fromTo(
        contentRef.current,
        { scale: 0.85, opacity: 0, filter: "blur(12px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "power4.out" }
      )
      .to(contentRef.current, {
        scale: 1.1,
        opacity: 0,
        filter: "blur(12px)",
        duration: 0.5,
        ease: "power3.in",
        delay: 0.8
      })
      .to(preloaderRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      });
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center select-none overflow-hidden"
    >
      <div ref={contentRef} className="flex flex-col items-center gap-6 text-center px-4">
        {/* Stark Arc Reactor Core Icon */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Outer Cyan Arc Glow */}
          <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl animate-pulse"></div>
          {/* Rotating Arc Reactor HUD Ring */}
          <div 
            ref={reactorRef}
            className="w-16 h-16 rounded-full border-2 border-dashed border-cyan-400 p-1 flex items-center justify-center shadow-[0_0_25px_#00F0FF]"
          >
            <div className="w-10 h-10 rounded-full border border-amber-500/60 p-1 flex items-center justify-center shadow-[0_0_15px_#F59E0B]">
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-400 via-amber-400 to-red-600 shadow-[0_0_20px_#00F0FF] animate-ping"></div>
            </div>
          </div>
        </div>

        {/* Stark Typography */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-cyan-400 font-bold">
            // STARK INDUSTRIES &bull; JARVIS OS v8.5
          </div>
          <h1 
            className="text-3xl md:text-4xl font-black uppercase tracking-[0.25em] text-white drop-shadow-[0_0_25px_rgba(0,240,255,0.6)]"
            style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}
          >
            MEET PAVAGADHI
          </h1>
          <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400/90 font-medium">
            INITIALIZING MARK LXXXV HUD INTERFACE...
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarkPreloader;