import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import pictureImg from '../assets/Portfolio/picture.png';

const Hero = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const spotlightRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const contentRef = useRef(null);

  const developerRoles = [
    '3D ANIMATOR // GAME SPECIALIST',
    'WEB DEVELOPER // REACT ARCHITECT',
    'GRAPHIC DESIGNER // VIDEO EDITOR',
    'B.SC. IT // DIGITAL CREATIVE'
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;
    if (!section || !card || !content) return;

    // --- GSAP CINEMATIC ENTRANCE ANIMATION ---
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      section.querySelector('header'),
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        content.querySelectorAll('.hero-anim-item'),
        { y: 50, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, stagger: 0.12 },
        "-=0.7"
      )
      .fromTo(
        card,
        { scale: 0.75, opacity: 0, rotationY: 35, rotationX: -15 },
        { scale: 1, opacity: 1, rotationY: 0, rotationX: 0, duration: 1.4, ease: "back.out(1.2)" },
        "-=0.9"
      );

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
      className="relative w-full min-h-screen bg-[#050505] text-white flex flex-col justify-between select-none overflow-hidden"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
      `}</style>

      {/* 1. Cinematic Background Gradient & Marquee */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#050b14] to-[#030712] z-0">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-10">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...developerRoles, ...developerRoles].map((role, idx) => (
              <span key={idx} className="text-[14vw] font-black text-blue-500 mx-8 uppercase tracking-tighter">
                {role} &bull;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Direct Mouse Tracking Spotlight Beam (Glows wherever you move) */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(6,182,212,0.1) 40%, transparent 70%)'
        }}
      ></div>

      {/* 3. Main Content Layer */}
      <div ref={contentRef} className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 min-h-screen flex flex-col justify-between pt-28 pb-10">

        {/* Top Stark Industries HUD Badge */}
        <div className="hero-anim-item flex items-center justify-between w-full">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-blue-500/40 text-xs font-mono uppercase tracking-widest text-white shadow-[0_0_20px_rgba(59,130,246,0.25)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shadow-[0_0_10px_#00F0FF]"></span>
            <span className="text-cyan-400 font-bold tracking-wider">STARK INDUSTRIES // HUD v8.5</span>
            <span className="text-white/40">|</span>
            <span className="text-blue-400 font-semibold">SYSTEM ONLINE</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/60 tracking-wider">
            <span className="px-2.5 py-0.5 border border-blue-500/30 rounded bg-black/50 text-blue-400">MARK LXXXV PROTOCOL</span>
            <span className="px-2.5 py-0.5 border border-cyan-500/30 rounded bg-black/50 text-cyan-300">B.SC. IT SPECIALIST</span>
          </div>
        </div>

        {/* Main Center Cinematic Stage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 my-auto">

          {/* Left Side: Developer Story & Description */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-5 text-left">

            <div className="hero-anim-item flex items-center gap-3">
              <span className="px-2.5 py-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-xs rounded tracking-widest shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-pulse">STARK PROTOCOL</span>
              <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase">// 3D ANIMATOR & WEB ENGINEER</span>
            </div>

            <h1 className="hero-anim-item text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.95] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
              MEET <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-500 drop-shadow-[0_0_35px_rgba(59,130,246,0.6)]">
                PAVAGADHI
              </span>
            </h1>

            <div className="hero-anim-item flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
              <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 rounded text-blue-400">ARC REACTOR CORE</span>
              <span className="text-white/40">•</span>
              <span className="text-cyan-300">Blender & Maya</span>
              <span className="text-white/40">•</span>
              <span className="text-blue-400">React & JS</span>
              <span className="text-white/40">•</span>
              <span className="text-cyan-300">Unity & Unreal</span>
            </div>

            <p className="hero-anim-item text-sm md:text-base text-white/80 font-light leading-relaxed max-w-md drop-shadow">
              Specializing in 3D animation, game development, responsive web design, and graphic/video post-production. Turning creative vision into high-performance digital products.
            </p>

            {/* Action Button Set */}
            <div className="hero-anim-item flex items-center gap-4 pt-2">
              <a
                href="#projects"
                className="px-8 py-3.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-widest rounded transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                View Projects
              </a>
              <a
                href="#contact"
                className="px-8 py-3.5 bg-neutral-900/80 text-white border border-white/20 font-bold text-xs uppercase tracking-widest rounded hover:bg-neutral-800 transition-all duration-300 shadow-xl backdrop-blur-md flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Contact Me
              </a>
            </div>
          </div>

          {/* Center: Interactive 3D Holographic Tilt Developer Poster Frame */}
          <div className="lg:col-span-4 flex justify-center perspective-[1200px]">
            <div
              ref={cardRef}
              className="relative group transform-gpu transition-transform duration-100 ease-out will-change-transform"
            >
              {/* Electric Blue Neon Back Glow */}
              <div className="absolute -inset-3 bg-gradient-to-r from-blue-600/50 via-cyan-500/40 to-indigo-600/50 rounded-3xl blur-3xl opacity-90 group-hover:opacity-100 animate-pulse duration-1000"></div>

              {/* Poster Card with Glossy Sheen */}
              <div className="relative w-[280px] md:w-[320px] p-3.5 bg-[#0a1120]/90 backdrop-blur-2xl rounded-2xl border border-blue-500/40 shadow-[0_40px_80px_rgba(59,130,246,0.2)] overflow-hidden">

                {/* Dynamic Specular Glare Layer */}
                <div
                  ref={glareRef}
                  className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-cyan-400/20 to-transparent pointer-events-none transform-gpu z-40"
                ></div>

                {/* Stark Tag */}
                <div className="absolute top-6 left-6 z-30 px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-mono text-[10px] font-black tracking-widest rounded shadow-xl">
                  STARK SPECIALIST
                </div>

                <img
                  src={pictureImg}
                  alt="Developer Portrait"
                  className="w-full h-[330px] md:h-[390px] object-cover rounded-xl filter contrast-125 brightness-105 group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Technical Specs & Stack */}
          <div className="hero-anim-item lg:col-span-3 flex flex-col items-start space-y-4 text-left">
            <div className="p-5 bg-black/80 backdrop-blur-2xl border border-blue-500/30 rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.2)] w-full max-w-xs">
              <h3 className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold mb-2">// STARK SCHEMATICS</h3>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                B.Sc. IT (VNSGU) • 3D Animation Specialist • Web Developer • Visual Media Specialist.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Cinematic Ticker */}
        <div className="hero-anim-item flex items-center justify-between text-xs font-mono text-white/50 tracking-widest uppercase">
          <span>ENGINEERED FOR SCALABILITY</span>
          <span>[ PORTFOLIO RELEASE v2.6 ]</span>
        </div>
      </div>

      {/* 4. Custom Precision Cursor Suite */}
      <div
        ref={cursorDotRef}
        className="absolute top-0 left-0 z-50 pointer-events-none w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_15px_#3B82F6]"
      ></div>

      <div
        ref={cursorRingRef}
        className="absolute top-0 left-0 z-50 pointer-events-none w-12 h-12 border border-cyan-400/60 rounded-full flex items-center justify-center backdrop-blur-[1px]"
      ></div>

      {/* --- STARK INDUSTRIES NAVBAR --- */}
      <header className="absolute top-0 inset-x-0 z-50 w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between pointer-events-auto">
        <div className="text-2xl font-black text-white tracking-tighter flex items-center gap-2.5 drop-shadow-[0_0_20px_rgba(0,240,255,0.8)]">
          <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#00F0FF] animate-pulse"></span>
          STARK <span className="text-cyan-400">//</span> MEET
        </div>
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-white/80">
          <a href="#home" className="hover:text-cyan-400 transition-colors">Home</a>
          <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
          <a href="#expertise" className="hover:text-cyan-400 transition-colors">Expertise</a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
        </nav>
        <a
          href="#contact"
          className="px-5 py-2 rounded bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(59,130,246,0.6)] hover:scale-105 active:scale-95"
        >
          INITIATE LINK
        </a>
      </header>
    </section>
  );
};

export default Hero;