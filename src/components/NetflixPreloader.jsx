import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { speakJarvisGreeting } from '../utils/sfx';

const StarkPreloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const contentRef = useRef(null);
  const reactorRef = useRef(null);
  const [audioEngaged, setAudioEngaged] = useState(false);

  const handleEngageAudio = () => {
    speakJarvisGreeting();
    setAudioEngaged(true);
  };

  useEffect(() => {
    // Attempt auto voice greeting on mount
    speakJarvisGreeting();

    // Listen for any early user gesture to trigger voice speech
    const handleGesture = () => {
      speakJarvisGreeting();
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('keydown', handleGesture);
    };

    window.addEventListener('click', handleGesture);
    window.addEventListener('touchstart', handleGesture);
    window.addEventListener('keydown', handleGesture);

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
        delay: 1.5
      })
      .to(preloaderRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      });

    return () => {
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('keydown', handleGesture);
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-[#030712] flex items-center justify-center select-none overflow-hidden"
    >
      <div ref={contentRef} className="flex flex-col items-center gap-6 text-center px-4">
        {/* Core Arc Reactor Icon */}
        <div 
          onClick={handleEngageAudio}
          className="relative w-24 h-24 flex items-center justify-center cursor-pointer group"
          title="Click for JARVIS Voice Greeting"
        >
          {/* Outer Blue Arc Glow */}
          <div className="absolute inset-0 rounded-full bg-blue-500/30 blur-2xl animate-pulse group-hover:bg-cyan-400/40"></div>
          {/* Rotating Blue Arc Reactor HUD Ring */}
          <div 
            ref={reactorRef}
            className="w-20 h-20 rounded-full border-2 border-dashed border-cyan-400 p-1 flex items-center justify-center shadow-[0_0_30px_#3B82F6] group-hover:border-white transition-colors"
          >
            <div className="w-12 h-12 rounded-full border border-blue-400/60 p-1 flex items-center justify-center shadow-[0_0_20px_#2563EB]">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 via-cyan-400 to-indigo-500 shadow-[0_0_25px_#3B82F6] animate-ping"></div>
            </div>
          </div>
        </div>

        {/* Blue Typography */}
        <div className="space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-cyan-400 font-bold">
            // STARK INDUSTRIES &bull; JARVIS VOICE PROTOCOL v8.5
          </div>
          <h1 
            className="text-3xl md:text-5xl font-black uppercase tracking-[0.25em] text-white drop-shadow-[0_0_30px_rgba(59,130,246,0.7)]"
            style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}
          >
            MEET PAVAGADHI
          </h1>
          <div className="text-[11px] font-mono uppercase tracking-widest text-blue-400 font-medium flex items-center justify-center gap-2">
            <span>JARVIS VOICE CONFIRMATION ENGAGED...</span>
          </div>
        </div>

        {/* Interactive Voice Greeting Trigger Button */}
        <button
          onClick={handleEngageAudio}
          className="mt-2 px-5 py-2.5 rounded-xl bg-blue-500/10 border border-cyan-400/40 text-cyan-400 text-xs font-mono font-bold tracking-widest hover:bg-cyan-400/20 hover:border-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.2)] active:scale-95 flex items-center gap-2"
        >
          <span>🤖</span>
          <span>{audioEngaged ? 'VOICE GREETING ACTIVE' : 'CLICK FOR JARVIS VOICE CONFIRMATION'}</span>
        </button>

      </div>
    </div>
  );
};

export default StarkPreloader;