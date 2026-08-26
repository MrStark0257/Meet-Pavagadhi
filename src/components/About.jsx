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
                Hi, I'm <span className="text-white font-bold drop-shadow">Meet Pavagadhi</span> — a 3D Animator, Web Developer, and Game Specialist.
              </p>
              <p className="text-sm md:text-base text-white/60 font-light leading-relaxed">
                With a B.Sc. in IT and mastery across Autodesk Maya, Blender, Unity, Unreal Engine, React, and Adobe Creative Suite, I turn creative concepts into high-impact digital experiences, 3D animations, and responsive web applications.
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

          {/* Card 3: Professional Experience Summary (Span 12) */}
          <div
            ref={addToRefs}
            className="md:col-span-12 p-8 md:p-12 bg-[#090d16]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-blue-500/60 transition-all duration-500 overflow-hidden relative group"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(59,130,246,0.15), transparent 70%)'
              }}
            ></div>

            <div className="space-y-2 text-left relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">Professional Experience</h3>
              <p className="text-base md:text-lg font-semibold text-white">Freelance 3D Animator (2021-Present) • Web Developer (2022-Present) • Z click Media (2023-2026)</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 relative z-10">
              {['Autodesk Maya', 'Blender', 'Unity', 'Unreal Engine', 'React', 'JavaScript', 'Photoshop', 'After Effects'].map((tech, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-wider text-white shadow-inner hover:bg-red-600/20 hover:border-red-600/40 hover:scale-105 transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;