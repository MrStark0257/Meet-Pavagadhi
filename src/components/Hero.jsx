import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import pictureImg from '../assets/Portfolio/picture.png';
import { playHoverSFX, playClickSFX } from '../utils/sfx';

const Hero = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const contentRef = useRef(null);
  const schematicsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;
    if (!section || !card || !content) return;

    // --- GSAP CINEMATIC ENTRANCE ANIMATION ---
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      content.querySelectorAll('.hero-anim-item'),
      { y: 50, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, stagger: 0.1 },
      0.2
    )
      .fromTo(
        card,
        { scale: 0.85, opacity: 0, rotationY: 20 },
        { scale: 1, opacity: 1, rotationY: 0, duration: 1.3, ease: "back.out(1.2)" },
        "-=0.8"
      );

    // Continuous smooth floating motion for Hologram Pass Frame
    if (schematicsRef.current) {
      gsap.to(schematicsRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // --- MOUSE PHYSICS & SPOTLIGHT TRACKING ---
    gsap.set([cursorDotRef.current, cursorRingRef.current], {
      scale: 0.5,
      opacity: 0,
      transformOrigin: "50% 50%"
    });

    const xToDot = gsap.quickTo(cursorDotRef.current, "x", { duration: 0.05, ease: "power2.out" });
    const yToDot = gsap.quickTo(cursorDotRef.current, "y", { duration: 0.05, ease: "power2.out" });
    const xToRing = gsap.quickTo(cursorRingRef.current, "x", { duration: 0.15, ease: "power3.out" });
    const yToRing = gsap.quickTo(cursorRingRef.current, "y", { duration: 0.15, ease: "power3.out" });

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dotSize = 12;
      const ringSize = 48;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      }

      xToDot(x - dotSize / 2);
      yToDot(y - dotSize / 2);
      xToRing(x - ringSize / 2);
      yToRing(y - ringSize / 2);
    };

    const handleMouseEnter = () => {
      gsap.to([cursorDotRef.current, cursorRingRef.current], {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to([cursorDotRef.current, cursorRingRef.current], {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: "power2.inOut"
      });
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseenter", handleMouseEnter);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseenter", handleMouseEnter);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#030712] text-white flex flex-col justify-between select-none overflow-hidden"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-slow {
          display: flex;
          width: max-content;
          animation: marquee 75s linear infinite;
        }
        .animate-marquee-reverse-slow {
          display: flex;
          width: max-content;
          animation: marquee-reverse 65s linear infinite;
        }
      `}</style>

      {/* 1. Ambient Background Grid & Glows */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#02050b] via-[#050b18] to-[#02050b] z-0 pointer-events-none overflow-hidden">
        {/* Ambient Radial Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[180px] pointer-events-none" />

        {/* Top Marquee Row */}
        <div className="absolute top-[8%] left-0 w-full flex items-center pointer-events-none select-none opacity-[0.07] z-0">
          <div className="flex whitespace-nowrap animate-marquee-reverse-slow">
            {['3D ANIMATOR // GAME SPECIALIST', 'GRAPHIC DESIGNER // VIDEO EDITOR', 'STARK OS DEVELOPER PROTOCOL', '3D ANIMATOR // GAME SPECIALIST', 'GRAPHIC DESIGNER // VIDEO EDITOR', 'STARK OS DEVELOPER PROTOCOL'].map((role, idx) => (
              <span key={idx} className="text-[8vw] font-black text-blue-400 mx-10 uppercase tracking-tighter mix-blend-overlay">
                {role} &bull;
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Marquee Row */}
        <div className="absolute bottom-[10%] left-0 w-full flex items-center pointer-events-none select-none opacity-[0.07] z-0">
          <div className="flex whitespace-nowrap animate-marquee-slow">
            {['WEB DEVELOPER // REACT ARCHITECT', 'B.SC. IT // DIGITAL CREATIVE', 'MARK LXXXV PROTOCOL', 'WEB DEVELOPER // REACT ARCHITECT', 'B.SC. IT // DIGITAL CREATIVE', 'MARK LXXXV PROTOCOL'].map((role, idx) => (
              <span key={idx} className="text-[8vw] font-black text-cyan-400 mx-10 uppercase tracking-tighter mix-blend-overlay">
                {role} &bull;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Direct Mouse Tracking Spotlight Beam */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(0,240,255,0.25) 0%, rgba(59,130,246,0.1) 40%, transparent 70%)'
        }}
      ></div>

      {/* 3. Main Content Stage */}
      <div ref={contentRef} className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 min-h-screen flex flex-col justify-between pt-24 pb-12">

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 my-auto">

          {/* Left Column: Developer Story & Bio (Reference Design Replica) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">

            {/* Top Pill Tag */}
            <div className="hero-anim-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono uppercase tracking-widest text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shadow-[0_0_10px_#00F0FF]"></span>
              <span>3D ANIMATOR & WEB SPECIALIST &bull; STARK OS v8.5</span>
            </div>

            {/* Massive Bold Headline */}
            <div className="hero-anim-item space-y-1">
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-white leading-[0.95] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
                MEET
              </h1>
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 drop-shadow-[0_0_45px_rgba(0,240,255,0.5)] leading-[0.95]">
                PAVAGADHI
              </h1>
            </div>

            {/* Sub-heading Role */}
            <div className="hero-anim-item flex items-center gap-2.5 text-lg md:text-2xl font-bold font-mono text-white">
              <span className="text-cyan-400 text-xl font-bold">&gt;</span>
              <span className="text-cyan-300 font-extrabold">3D Animator & Web Specialist</span>
            </div>

            {/* Bio Paragraph */}
            <p className="hero-anim-item text-sm md:text-base text-white/80 font-light leading-relaxed max-w-xl">
              Specializing in 3D animation, game development, responsive web design, and graphic/video post-production. Turning creative vision into high-performance digital products.
            </p>

            {/* 3 Action Pill Buttons (Exact Reference Replica in Electric Blue & Cyan) */}
            <div className="hero-anim-item flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#projects"
                onMouseEnter={playHoverSFX}
                onClick={playClickSFX}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-[0_0_35px_rgba(0,240,255,0.5)] flex items-center gap-2.5 hover:scale-105 active:scale-95"
              >
                <span>View Projects</span>
                <span className="text-base">&rarr;</span>
              </a>

              <a
                href="#contact"
                onMouseEnter={playHoverSFX}
                onClick={playClickSFX}
                className="px-7 py-4 bg-[#090f1f]/80 hover:bg-[#0e1830] text-white border border-blue-500/30 hover:border-cyan-400/80 font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 backdrop-blur-xl flex items-center gap-2 hover:scale-105 active:scale-95 shadow-xl"
              >
                <span>👁 Contact Me</span>
              </a>

              <a
                href="#skills"
                onMouseEnter={playHoverSFX}
                onClick={playClickSFX}
                className="px-7 py-4 bg-[#090f1f]/80 hover:bg-[#0e1830] text-white/90 border border-white/10 hover:border-blue-400/80 font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 backdrop-blur-xl flex items-center gap-2 hover:scale-105 active:scale-95 shadow-xl"
              >
                <span>📥 View Matrix</span>
              </a>
            </div>

          </div>

          {/* Right Column: Holographic 3D ID Pass Frame (Exact Reference Replica) */}
          <div className="lg:col-span-5 flex justify-center perspective-[1400px] relative mt-8 lg:mt-0">
            
            <div 
              ref={schematicsRef}
              className="relative group transition-all duration-500"
            >
              {/* Electric Blue Neon Ambient Background Aura */}
              <div className="absolute -inset-6 bg-gradient-to-tr from-blue-600/40 via-cyan-400/30 to-indigo-600/40 rounded-[3.5rem] blur-3xl opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Floating Top-Left Badge (Reference Replica) */}
              <div className="absolute -top-4 -left-4 z-40 px-4 py-2 rounded-2xl bg-[#081022]/95 border border-cyan-400/50 text-cyan-300 font-mono text-[10px] font-bold uppercase tracking-wider shadow-[0_15px_35px_rgba(0,240,255,0.25)] flex items-center gap-2 backdrop-blur-2xl">
                <span className="text-cyan-400 font-extrabold">⚡ 98%</span>
                <span className="text-white/60">|</span>
                <span>3D RIGGING & ANIMATION</span>
              </div>

              {/* Floating Top-Right Badge (Reference Replica) */}
              <div className="absolute -top-4 -right-4 z-40 px-4 py-2 rounded-2xl bg-[#081022]/95 border border-blue-500/50 text-blue-400 font-mono text-[10px] font-bold uppercase tracking-wider shadow-[0_15px_35px_rgba(59,130,246,0.25)] backdrop-blur-2xl">
                <span>STARK OS v8.5</span>
              </div>

              {/* Main Holographic Rounded Square ID Card Pass Chassis */}
              <div className="relative w-[310px] sm:w-[360px] md:w-[400px] h-[390px] sm:h-[440px] md:h-[480px] rounded-[3rem] bg-[#070e1c]/95 border border-blue-500/40 p-4 shadow-[0_40px_100px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col justify-between group-hover:border-cyan-400/80 transition-all duration-500">
                
                {/* Photo Container */}
                <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden">
                  <img
                    src={pictureImg}
                    alt="Meet Pavagadhi - Developer Portrait"
                    className="w-full h-full object-cover object-top filter contrast-105 brightness-105 group-hover:scale-[1.03] transition-transform duration-700"
                  />

                  {/* Gradient Overlay Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-transparent to-transparent opacity-90"></div>

                  {/* Bottom Left Developer ID Badge */}
                  <div className="absolute bottom-5 left-5 z-30 space-y-1 text-left">
                    <h3 className="text-lg md:text-xl font-black uppercase text-white tracking-tight leading-none drop-shadow">
                      MEET PAVAGADHI
                    </h3>
                    <p className="text-[10px] md:text-[11px] font-mono font-bold text-cyan-300 uppercase tracking-widest">
                      3D & FULL-STACK SPECIALIST &bull; VNSGU
                    </p>
                  </div>

                  {/* Bottom Right Glowing Action Icon Button */}
                  <a 
                    href="#projects"
                    onMouseEnter={playHoverSFX}
                    onClick={playClickSFX}
                    className="absolute bottom-5 right-5 z-30 w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white font-black shadow-[0_0_20px_#00F0FF] hover:scale-110 active:scale-95 transition-all duration-300"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>

              </div>

              {/* Bottom Watermark Subtitle */}
              <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest text-center mt-4">
                // 3D HOLOGRAPHIC ID PASS &bull; STARK OS OPERATIONAL
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* 4. Custom Precision Cursor Suite */}
      <div
        ref={cursorDotRef}
        className="absolute top-0 left-0 z-50 pointer-events-none w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#00F0FF]"
      ></div>

      <div
        ref={cursorRingRef}
        className="absolute top-0 left-0 z-50 pointer-events-none w-12 h-12 border border-cyan-400/60 rounded-full flex items-center justify-center backdrop-blur-[1px]"
      ></div>

    </section>
  );
};

export default Hero;