import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import pictureImg from '../assets/Portfolio/picture.png';
import { playHoverSFX, playClickSFX } from '../utils/sfx';

const Hero = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);
  const contentRef = useRef(null);
  const schematicsRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        { y: -120, scale: 0.3, opacity: 0, rotationZ: -12, filter: "blur(15px)" },
        { y: 0, scale: 1, opacity: 1, rotationZ: 0, filter: "blur(0px)", duration: 1.6, ease: "expo.out" },
        "-=0.9"
      );

    // Small, subtle floating motion for STARK SCHEMATICS box
    if (schematicsRef.current) {
      gsap.to(schematicsRef.current, {
        y: -6,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      }
    };

    const handleMouseEnter = () => {
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
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

      {/* 1. Cinematic Background Gradient & Multi-Row Staggered Slow Marquee */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#050b14] to-[#030712] z-0 pointer-events-none overflow-hidden">
        {/* Top Marquee Row */}
        <div className="absolute top-[10%] left-0 w-full flex items-center pointer-events-none select-none opacity-10 z-0">
          <div className="flex whitespace-nowrap animate-marquee-reverse-slow">
            {['3D ANIMATOR // GAME SPECIALIST', 'GRAPHIC DESIGNER // VIDEO EDITOR', 'STARK OS DEVELOPER PROTOCOL', '3D ANIMATOR // GAME SPECIALIST', 'GRAPHIC DESIGNER // VIDEO EDITOR', 'STARK OS DEVELOPER PROTOCOL'].map((role, idx) => (
              <span key={idx} className="text-[10vw] md:text-[7vw] font-black text-blue-400 mx-6 md:mx-10 uppercase tracking-tighter mix-blend-overlay">
                {role} &bull;
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Marquee Row */}
        <div className="absolute bottom-[12%] left-0 w-full flex items-center pointer-events-none select-none opacity-10 z-0">
          <div className="flex whitespace-nowrap animate-marquee-slow">
            {['WEB DEVELOPER // REACT ARCHITECT', 'B.SC. IT // DIGITAL CREATIVE', 'MARK LXXXV PROTOCOL', 'WEB DEVELOPER // REACT ARCHITECT', 'B.SC. IT // DIGITAL CREATIVE', 'MARK LXXXV PROTOCOL'].map((role, idx) => (
              <span key={idx} className="text-[10vw] md:text-[7vw] font-black text-cyan-400 mx-6 md:mx-10 uppercase tracking-tighter mix-blend-overlay">
                {role} &bull;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Direct Mouse Tracking Spotlight Beam */}
      <div
        ref={spotlightRef}
        className="hidden md:block absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(6,182,212,0.1) 40%, transparent 70%)'
        }}
      ></div>

      {/* 3. Main Content Layer */}
      <div ref={contentRef} className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-10">

        {/* Top Stark Industries HUD Badge */}
        <div className="hero-anim-item flex items-center justify-between w-full">
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-blue-500/40 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white shadow-[0_0_20px_rgba(59,130,246,0.25)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shadow-[0_0_10px_#00F0FF]"></span>
            <span className="text-cyan-400 font-bold tracking-wider">STARK HUD v8.5</span>
            <span className="text-white/40">|</span>
            <span className="text-blue-400 font-semibold">SYSTEM ONLINE</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/60 tracking-wider">
            <span className="px-2.5 py-0.5 border border-blue-500/30 rounded bg-black/50 text-blue-400">MARK LXXXV PROTOCOL</span>
            <span className="px-2.5 py-0.5 border border-cyan-500/30 rounded bg-black/50 text-cyan-300">B.SC. IT SPECIALIST</span>
          </div>
        </div>

        {/* Main Center Cinematic Stage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 my-auto py-6">

          {/* Left Side: Developer Story & Description */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-4 sm:space-y-5 text-left">

            <div className="hero-anim-item flex flex-wrap items-center gap-2.5">
              <span className="px-2.5 py-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-[10px] sm:text-xs rounded tracking-widest shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-pulse">STARK PROTOCOL</span>
              <span className="text-cyan-400 text-[10px] sm:text-xs font-mono tracking-widest uppercase">// 3D ANIMATOR & WEB ENGINEER</span>
            </div>

            <h1 className="hero-anim-item text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white leading-[0.98] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
              MEET <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-500 drop-shadow-[0_0_35px_rgba(59,130,246,0.6)]">
                PAVAGADHI
              </span>
            </h1>

            <div className="hero-anim-item flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-mono text-cyan-400 font-bold">
              <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 rounded text-blue-400">ARC REACTOR CORE</span>
              <span className="text-white/40">•</span>
              <span className="text-cyan-300">Blender & Maya</span>
              <span className="text-white/40">•</span>
              <span className="text-blue-400">React & JS</span>
              <span className="text-white/40">•</span>
              <span className="text-cyan-300">Unity & Unreal</span>
            </div>

            <p className="hero-anim-item text-xs sm:text-sm md:text-base text-white/80 font-light leading-relaxed max-w-md drop-shadow">
              Specializing in 3D animation, game development, responsive web design, and graphic/video post-production. Turning creative vision into high-performance digital products.
            </p>

            {/* Action Button Set */}
            <div className="hero-anim-item flex flex-wrap items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
              <a
                href="#projects"
                onMouseEnter={playHoverSFX}
                onClick={playClickSFX}
                className="flex-1 sm:flex-initial px-6 sm:px-8 py-3.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-widest rounded transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center justify-center gap-2 hover:scale-105 active:scale-95 text-center"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                View Projects
              </a>
              <a
                href="#contact"
                onMouseEnter={playHoverSFX}
                onClick={playClickSFX}
                className="flex-1 sm:flex-initial px-6 sm:px-8 py-3.5 bg-neutral-900/80 text-white border border-white/20 font-bold text-xs uppercase tracking-widest rounded hover:bg-neutral-800 transition-all duration-300 shadow-xl backdrop-blur-md flex items-center justify-center gap-2 hover:scale-105 active:scale-95 text-center"
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

          {/* Center Stage: Floating Holographic Developer Card */}
          <div className="lg:col-span-4 flex justify-center perspective-[1400px] relative my-6 lg:my-0">

            {/* Top Laser Guideline */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_15px_#00F0FF] animate-ping"></div>
              <div className="w-[2px] h-8 bg-gradient-to-b from-cyan-400 via-blue-500 to-transparent"></div>
            </div>

            {/* Spinning Arc Reactor Background Halo Ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[340px] md:w-[420px] h-[280px] sm:h-[340px] md:h-[420px] rounded-full border border-blue-500/25 border-dashed animate-spin pointer-events-none z-0" style={{ animationDuration: '28s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[280px] md:w-[340px] h-[240px] sm:h-[280px] md:h-[340px] rounded-full border border-cyan-400/30 blur-sm pointer-events-none z-0 animate-pulse"></div>

            <div
              ref={cardRef}
              className="relative group transform-gpu transition-all duration-500 z-10"
            >
              {/* Floating Widget 1: Top-Left Accuracy Badge */}
              <div className="absolute -top-3 left-0 sm:-left-6 md:-left-10 z-40 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-[#091122]/95 backdrop-blur-2xl border border-cyan-400/60 rounded-2xl shadow-[0_10px_30px_rgba(0,240,255,0.25)] flex items-center gap-2 animate-bounce" style={{ animationDuration: '4s' }}>
                <span className="text-cyan-400 font-mono font-black text-xs sm:text-sm">98%</span>
                <div className="text-left">
                  <div className="text-[8px] sm:text-[9px] font-mono text-cyan-300 font-bold uppercase tracking-wider">3D ANIMATION</div>
                  <div className="text-[7px] sm:text-[8px] font-mono text-white/60 font-bold">SKILL LEVEL</div>
                </div>
              </div>

              {/* Floating Widget 2: Top-Right Arc Status Badge */}
              <div className="absolute -top-3 right-0 sm:-right-6 md:-right-8 z-40 px-3 py-1.5 sm:px-3.5 sm:py-1.5 bg-[#091122]/95 backdrop-blur-2xl border border-blue-500/60 rounded-2xl shadow-[0_10px_30px_rgba(59,130,246,0.3)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span className="text-[9px] sm:text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-widest">STARK OS v8.5</span>
              </div>

              {/* Floating Widget 3: Bottom-Right Spec Badge */}
              <div className="absolute -bottom-3 right-0 sm:-right-6 md:-right-8 z-40 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl shadow-[0_10px_30px_rgba(0,240,255,0.4)] flex items-center gap-2 text-white font-mono text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">
                <span>ARC CORE</span>
                <span>⚡ 100%</span>
              </div>

              {/* Electric Neon Cyan & Blue Ambient Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/40 via-cyan-400/30 to-indigo-600/40 rounded-[2.5rem] blur-3xl opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Glassmorphic Cyber Frame */}
              <div className="relative w-[260px] sm:w-[310px] md:w-[340px] p-3 sm:p-3.5 bg-[#070d1d]/95 backdrop-blur-3xl rounded-[2.4rem] border border-blue-500/40 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden group-hover:border-cyan-400/90 transition-all duration-500">

                {/* Laser Corner Brackets */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400 z-30 pointer-events-none"></div>
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400 z-30 pointer-events-none"></div>
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400 z-30 pointer-events-none"></div>
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400 z-30 pointer-events-none"></div>

                {/* Portrait Photo */}
                <img
                  src={pictureImg}
                  alt="Meet Pavagadhi - Developer Portrait"
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                  className="w-full h-[320px] sm:h-[370px] md:h-[410px] object-cover object-top rounded-[1.8rem] group-hover:scale-[1.02] transition-transform duration-500 relative z-10 filter contrast-105"
                />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-5 inset-x-5 z-30 px-3.5 py-2 bg-black/85 backdrop-blur-xl border border-cyan-400/40 rounded-xl text-[9px] sm:text-[10px] font-mono text-white flex items-center justify-between shadow-2xl">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    <span className="text-cyan-300 font-bold">MEET PAVAGADHI</span>
                  </div>
                  <span className="text-white/60">3D & WEB SPECIALIST</span>
                </div>

              </div>
            </div>
          </div>

          {/* Right Side: Interactive Stark Diagnostic Terminal & Skill Matrix */}
          <div className="hero-anim-item lg:col-span-3 flex flex-col items-start space-y-4 text-left w-full">
            <div
              ref={schematicsRef}
              className="relative group w-full transition-all duration-500 hover:scale-[1.02]"
            >
              {/* Glowing Cyber Accent Ring */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-3xl blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

              <div className="relative p-5 sm:p-6 bg-[#080e1e]/95 backdrop-blur-3xl border border-blue-500/40 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.9)] group-hover:border-cyan-400 transition-colors duration-500 overflow-hidden space-y-4 sm:space-y-5">

                {/* Top Cyan Accent Laser Stripe */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent group-hover:w-60 transition-all duration-500"></div>

                {/* Terminal Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest">// STARK SCHEMATICS v8.5</div>
                    <div className="text-sm sm:text-base font-black text-white tracking-tight">ENGINEERING SKILL MATRIX</div>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-cyan-400/40 font-bold shadow-[0_0_12px_rgba(0,240,255,0.3)]">
                    ONLINE
                  </span>
                </div>

                {/* Skill Matrix Progress Indicators */}
                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <div className="flex justify-between items-center text-white/90 font-bold mb-1.5 text-[11px] sm:text-xs">
                      <span className="flex items-center gap-1.5 truncate">
                        <span className="text-cyan-400">❖</span> 3D ANIMATION & RIGGING
                      </span>
                      <span className="text-cyan-400 font-bold ml-2">98%</span>
                    </div>
                    <div className="w-full h-2 bg-black/80 rounded-full overflow-hidden border border-blue-500/30 p-0.5">
                      <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-400 rounded-full w-[98%] shadow-[0_0_12px_#00F0FF]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-white/90 font-bold mb-1.5 text-[11px] sm:text-xs">
                      <span className="flex items-center gap-1.5 truncate">
                        <span className="text-blue-400">⚡</span> FULL-STACK WEB DEV
                      </span>
                      <span className="text-blue-400 font-bold ml-2">95%</span>
                    </div>
                    <div className="w-full h-2 bg-black/80 rounded-full overflow-hidden border border-blue-500/30 p-0.5">
                      <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full w-[95%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-white/90 font-bold mb-1.5 text-[11px] sm:text-xs">
                      <span className="flex items-center gap-1.5 truncate">
                        <span className="text-cyan-300">🎮</span> GAME DEV & VFX
                      </span>
                      <span className="text-cyan-300 font-bold ml-2">92%</span>
                    </div>
                    <div className="w-full h-2 bg-black/80 rounded-full overflow-hidden border border-blue-500/30 p-0.5">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full w-[92%]"></div>
                    </div>
                  </div>
                </div>

                {/* Tech Badges Grid */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {['Blender', 'Maya', 'React', 'JS', 'Unity', 'Photoshop'].map((tech, tIdx) => (
                    <span key={tIdx} className="text-[9px] sm:text-[10px] font-mono text-cyan-300 bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 rounded-md font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer Bio Line */}
                <div className="pt-2.5 border-t border-white/10 text-[10px] sm:text-[11px] font-mono text-white/70 leading-relaxed font-light">
                  B.Sc. IT (VNSGU) &bull; Visual Media & 3D Animation Specialist.
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Bottom Cinematic Ticker */}
        <div className="hero-anim-item flex items-center justify-between text-[10px] sm:text-xs font-mono text-white/50 tracking-widest uppercase">
          <span>ENGINEERED FOR SCALABILITY</span>
          <span>[ PORTFOLIO RELEASE v2.6 ]</span>
        </div>
      </div>

      {/* --- STARK INDUSTRIES NAVBAR --- */}
      <header className="absolute top-0 inset-x-0 z-50 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-5 sm:py-6 flex items-center justify-between pointer-events-auto">
        <div className="text-xl sm:text-2xl font-black text-white tracking-tighter flex items-center gap-2 sm:gap-2.5 drop-shadow-[0_0_20px_rgba(0,240,255,0.8)]">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#00F0FF] animate-pulse"></span>
          STARK <span className="text-cyan-400">//</span> MEET
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-white/80">
          <a href="#home" className="hover:text-cyan-400 transition-colors">Home</a>
          <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
          <a href="#expertise" className="hover:text-cyan-400 transition-colors">Expertise</a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="px-5 py-2 rounded bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(59,130,246,0.6)] hover:scale-105 active:scale-95"
          >
            INITIATE LINK
          </a>
        </div>

        {/* Mobile Hamburger Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-cyan-400 focus:outline-none"
          aria-label="Toggle Mobile Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile Slide-down Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#050b17]/95 backdrop-blur-2xl border-b border-blue-500/30 p-6 flex flex-col space-y-4 md:hidden z-50 shadow-2xl animate-fadeIn">
            {['home', 'about', 'expertise', 'skills', 'projects', 'contact'].map((link) => (
              <a
                key={link}
                href={`#${link}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono uppercase tracking-widest text-white/90 hover:text-cyan-400 py-1 flex items-center justify-between border-b border-white/5"
              >
                <span>// {link}</span>
                <span className="text-cyan-400 text-xs">→</span>
              </a>
            ))}
          </div>
        )}
      </header>
    </section>
  );
};

export default Hero;