import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // --- Cinematic Stagger Entrance on Scroll ---
    gsap.fromTo(
      cardRefs.current,
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // --- Interactive Magnetic Mouse Spotlight per Bento Card ---
    const cards = cardRefs.current;
    const handleMouseMove = (e, card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    cards.forEach((card) => {
      if (!card) return;
      const listener = (e) => handleMouseMove(e, card);
      card.addEventListener('mousemove', listener);
      return () => card.removeEventListener('mousemove', listener);
    });

  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] text-white py-32 px-6 md:px-12 flex flex-col justify-center select-none overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">

        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-blue-500/40 text-xs font-mono uppercase tracking-widest text-white shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-cyan-400 font-bold">PROTOCOL 01</span>
            <span className="text-white/40">|</span>
            <span className="text-blue-400 font-semibold">STARK SYSTEM DIAGNOSTIC</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            CORE ARCHITECTURE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]">
              ORIGIN & SCHEMATICS.
            </span>
          </h2>
        </div>

        {/* Bento Grid Layout with Interactive Mouse Light Tracking */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Card 1: Bio & Core Profile (Span 7) */}
          <div
            ref={addToRefs}
            className="md:col-span-7 p-8 md:p-12 bg-[#090d16]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative group hover:border-blue-500/60 transition-all duration-500 overflow-hidden"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(59,130,246,0.15), transparent 70%)'
              }}
            ></div>

            <div className="absolute top-0 right-0 p-8 text-white/5 font-mono text-7xl font-black pointer-events-none">
              01
            </div>

            <div className="space-y-5 relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">Cast & Profile</h3>
              <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed">
                Hi, I'm <span className="text-white font-bold drop-shadow">Meet Pavagadhi</span> — Founder at <a href="https://nexvedatechnology.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 decoration-cyan-400/50">Nexveda Technology</a>, 3D Animator, and Web Developer.
              </p>
              <p className="text-sm md:text-base text-white/60 font-light leading-relaxed">
                With a B.Sc. in IT and mastery across React, modern web architecture, Autodesk Maya, Blender, Unity, and Unreal Engine, I direct client digital engineering at Nexveda Technology while delivering bespoke 3D animations and high-performance web applications worldwide.
              </p>
            </div>

            <div className="pt-8 flex flex-wrap gap-2 relative z-10">
              <span className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80">Web Design & Coding</span>
              <span className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80">3D Rigging & Animation</span>
              <span className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80">Game Development</span>
              <span className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80">Graphic & Video Editing</span>
            </div>
          </div>

          {/* Card 2: Academic Core & Education (Span 5) */}
          <div
            ref={addToRefs}
            className="md:col-span-5 p-8 md:p-12 bg-[#090d16]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative group hover:border-blue-500/60 transition-all duration-500 overflow-hidden"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(59,130,246,0.15), transparent 70%)'
              }}
            ></div>

            <div className="absolute top-0 right-0 p-8 text-white/5 font-mono text-7xl font-black pointer-events-none">
              02
            </div>

            <div className="space-y-5 relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">Education & Training</h3>
              <ul className="space-y-4 text-sm text-white/80 font-light">
                <li className="flex flex-col gap-0.5">
                  <div className="flex items-center justify-between">
                    <strong className="text-white font-bold">B.Sc. Information & Technology</strong>
                    <span className="text-xs font-mono text-blue-400">2019 - 2022</span>
                  </div>
                  <span className="text-xs text-white/50">Veer Narmad South Gujarat University</span>
                </li>
                <li className="flex flex-col gap-0.5 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <strong className="text-white font-bold">3D Animation Specialization</strong>
                    <span className="text-xs font-mono text-blue-400">2021 - 2022</span>
                  </div>
                  <span className="text-xs text-white/50">Sanju Design Factory</span>
                </li>
                <li className="flex flex-col gap-0.5 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <strong className="text-white font-bold">Game Development Program</strong>
                    <span className="text-xs font-mono text-blue-400">2020 - 2022</span>
                  </div>
                  <span className="text-xs text-white/50">Online Platform Certification</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 font-mono text-xs text-white/40 relative z-10">
              // ACADEMIC & TECHNICAL FOUNDATION
            </div>
          </div>

          {/* Card 3: Professional Experience & Toolkit (Span 12) */}
          <div
            ref={addToRefs}
            className="md:col-span-12 p-8 md:p-12 bg-[#090d16]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative group hover:border-blue-500/60 transition-all duration-500 overflow-hidden"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(59,130,246,0.15), transparent 70%)'
              }}
            ></div>

            {/* Background 03 Number matching Card 1 & 2 */}
            <div className="absolute top-0 right-0 p-8 text-white/5 font-mono text-7xl font-black pointer-events-none">
              03
            </div>

            {/* Header */}
            <div className="space-y-2 relative z-10 mb-8">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>// TRACK RECORD & CORE TOOLSET</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                Professional Experience & Technical Proficiency
              </h3>
            </div>

            {/* Two-Column Grid: Timeline on Left, Tech Stack on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-start">
              
              {/* Left Column: 4 Cleanly Aligned Experience Cards */}
              <div className="lg:col-span-7 space-y-3">
                {/* Exp 1: Nexveda Technology (Company Work / Startup) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/50 via-cyan-950/30 to-blue-950/50 border border-cyan-400/40 hover:border-cyan-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.25)] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group/item">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base font-bold text-white group-hover/item:text-cyan-300 transition-colors">
                        Nexveda Technology
                      </span>
                      <a
                        href="https://nexvedatechnology.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-400/15 border border-cyan-400/40 text-[10px] font-mono font-bold text-cyan-300 hover:text-white hover:bg-cyan-400/30 transition-all"
                        title="Visit Nexveda Technology"
                      >
                        <span>nexvedatechnology.com</span>
                        <span>↗</span>
                      </a>
                    </div>
                    <p className="text-xs text-cyan-200/70 font-mono">
                      Founder & Tech Lead &bull; Digital Engineering Studio & Web Apps
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-cyan-400/15 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold tracking-wider shrink-0 flex items-center gap-1.5 self-start sm:self-auto shadow-[0_0_10px_rgba(0,240,255,0.25)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                    2024 — PRESENT
                  </span>
                </div>

                {/* Exp 2: Freelance Web Developer (Freelance Work) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 hover:bg-cyan-950/20 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group/item">
                  <div className="space-y-1">
                    <div className="text-base font-bold text-white group-hover/item:text-cyan-300 transition-colors flex items-center gap-2">
                      <span>Freelance Web Developer</span>
                    </div>
                    <p className="text-xs text-white/50 font-mono">
                      Full-Stack Architecture, React 19, Modern Responsive UI
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs font-bold tracking-wider shrink-0 flex items-center gap-1.5 self-start sm:self-auto">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                    2022 — PRESENT
                  </span>
                </div>

                {/* Exp 3: Freelance 3D Animator (Freelance Work) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 hover:bg-cyan-950/20 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group/item">
                  <div className="space-y-1">
                    <div className="text-base font-bold text-white group-hover/item:text-cyan-300 transition-colors flex items-center gap-2">
                      <span>Freelance 3D Animator</span>
                    </div>
                    <p className="text-xs text-white/50 font-mono">
                      Character Rigging, Asset Modeling & Animation Pipeline
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs font-bold tracking-wider shrink-0 flex items-center gap-1.5 self-start sm:self-auto">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                    2021 — PRESENT
                  </span>
                </div>

                {/* Exp 4: Z click Media */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 hover:bg-cyan-950/20 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group/item">
                  <div className="space-y-1">
                    <div className="text-base font-bold text-white group-hover/item:text-cyan-300 transition-colors flex items-center gap-2">
                      <span>Z click Media</span>
                    </div>
                    <p className="text-xs text-white/50 font-mono">
                      Commercial Motion Graphics & Digital Video Post-Production
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/15 text-white/60 font-mono text-xs tracking-wider shrink-0 self-start sm:self-auto">
                    2023 — 2026
                  </span>
                </div>
              </div>

              {/* Right Column: Cleanly Aligned Tech Matrix */}
              <div className="lg:col-span-5 p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center justify-between">
                  <span>// SOFTWARE ARSENAL</span>
                  <span className="text-[10px] text-white/40">8 TOOLS</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { name: 'Autodesk Maya', cat: '3D Modeling & Rig' },
                    { name: 'Blender', cat: 'Render & Cycles' },
                    { name: 'Unity', cat: 'Real-time Engine' },
                    { name: 'Unreal Engine', cat: 'Cinematic Visuals' },
                    { name: 'React', cat: 'Frontend Architecture' },
                    { name: 'JavaScript', cat: 'Modern ES6+ Logic' },
                    { name: 'Photoshop', cat: 'Texture & Graphics' },
                    { name: 'After Effects', cat: 'Motion & VFX Suite' },
                  ].map((tech, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/60 hover:bg-cyan-950/30 transition-all duration-300 group/tech cursor-default"
                    >
                      <div className="text-xs font-mono font-bold text-white/90 group-hover/tech:text-cyan-300 transition-colors truncate">
                        {tech.name}
                      </div>
                      <div className="text-[10px] font-mono text-white/40 truncate">
                        {tech.cat}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Cyber Bar */}
            <div className="mt-8 pt-5 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-white/40 relative z-10">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                DEPLOYED WORLDWIDE &bull; FREELANCE & CONTRACT READY
              </span>
              <span className="text-cyan-400/80 font-bold">
                STARK PROTOCOL 01 VERIFIED
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;