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
      className="fixed inset-0 z-[9999] bg-[#030712] flex items-center justify-center select-none overflow-hidden"
    >
      <div ref={contentRef} className="flex flex-col items-center gap-6 text-center px-4">
        {/* Core Arc Reactor Icon */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Outer Blue Arc Glow */}
          <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse"></div>
          {/* Rotating Blue Arc Reactor HUD Ring */}
          <div 
            ref={reactorRef}
            className="w-16 h-16 rounded-full border-2 border-dashed border-cyan-400 p-1 flex items-center justify-center shadow-[0_0_25px_#3B82F6]"
          >
            <div className="w-10 h-10 rounded-full border border-blue-400/60 p-1 flex items-center justify-center shadow-[0_0_15px_#2563EB]">
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 via-cyan-400 to-indigo-500 shadow-[0_0_20px_#3B82F6] animate-ping"></div>
            </div>
          </div>
        </div>

        {/* Blue Typography */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-cyan-400 font-bold">
            // STARK INDUSTRIES &bull; JARVIS OS v8.5
          </div>
          <h1 
            className="text-3xl md:text-4xl font-black uppercase tracking-[0.25em] text-white drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]"
            style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}
          >
            MEET PAVAGADHI
          </h1>
          <div className="text-[11px] font-mono uppercase tracking-widest text-blue-400 font-medium">
            INITIALIZING BLUE HUD INTERFACE...
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarkPreloader;