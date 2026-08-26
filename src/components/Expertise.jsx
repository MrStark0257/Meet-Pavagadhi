import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const expertiseData = [
  {
    number: "01",
    title: "3D Animation & Rigging",
    text: "Creating high-quality 3D animations for films, games, and advertisements. Expert in character modeling, rigging, rendering, and asset optimization using Maya, Blender, 3ds Max, and Cinema 4D.",
    tag: "3D & ANIMATION WORKFLOW"
  },
  {
    number: "02",
    title: "Web Development",
    text: "Designing and developing responsive websites using HTML, CSS, JavaScript, and modern frameworks like React for projects including FETC, Parikshaa, and Zclick Media.",
    tag: "WEB ENGINEERING & REACT"
  },
  {
    number: "03",
    title: "Game Development",
    text: "Integrating real-time 3D animation assets and interactive mechanics into Unity and Unreal Engine. Experienced in performance optimization for interactive gaming environments.",
    tag: "GAME ENGINES & INTERACTIVE"
  },
  {
    number: "04",
    title: "Graphic Design & Video Editing",
    text: "Creating compelling visual marketing assets, banners, brochures, and commercial video edits using Adobe Photoshop, Illustrator, Premiere Pro, and After Effects.",
    tag: "VISUAL MEDIA & CREATIVE SUITE"
  }
];

const Expertise = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    const container = containerRef.current;
    if (!cards.length || !container) return;

    let ctx = gsap.context(() => {
      // 1. Initial State: Card 0 is positioned at top (y: 0). Cards 1, 2, 3 start pushed down below view.
      cards.forEach((card, i) => {
        if (i > 0) {
          gsap.set(card, {
            y: 500,
            opacity: 0,
            scale: 0.94,
            zIndex: i + 1
          });
        } else {
          gsap.set(card, {
            y: 0,
            opacity: 1,
            scale: 1,
            zIndex: 1
          });
        }
      });

      // 2. Master Pinned ScrollTrigger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=320%",
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true
        }
      });

      // Animate each subsequent card sliding UP over the previous card
      cards.forEach((card, i) => {
        if (i === 0) return;

        const prevCards = cards.slice(0, i);
        const targetY = i * 28; // Stacked header offset

        // Previous cards scale down slightly to form a stacked deck background
        tl.to(prevCards, {
          scale: (idx) => 1 - (i - idx) * 0.03,
          y: (idx) => idx * 28 - (i - idx) * 10,
          opacity: (idx) => 1 - (i - idx) * 0.15,
          duration: 1,
          ease: "power2.out"
        }, (i - 1) * 1);

        // Current card slides up over previous card
        tl.to(card, {
          y: targetY,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out"
        }, (i - 1) * 1);
      });

      // Mouse spotlight highlight per card
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

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="expertise"
      ref={containerRef}
      className="relative w-full h-screen bg-[#030712] text-white py-12 px-6 md:px-12 select-none overflow-hidden flex flex-col justify-between"
    >
      {/* Ambient Background Glow */}
      <div className="absolute top-1/3 left-1/4 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Section Header */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-blue-500/20 pt-4">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono uppercase tracking-widest text-cyan-400 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shadow-[0_0_10px_#00F0FF]"></span>
            <span className="text-cyan-400 font-bold">PROTOCOL 02</span>
            <span className="text-white/40">|</span>
            <span className="text-blue-400 font-semibold">STARK SUITE CAPABILITIES</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            STARK LABS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]">
              TECHNICAL PROTOCOLS.
            </span>
          </h2>
        </div>
        <p className="text-white/75 text-xs md:text-sm font-light leading-relaxed max-w-xs border-l-2 border-cyan-400/40 pl-4">
          Specializing in 3D animation, game engine mechanics, full-stack web architecture, and digital post-production.
        </p>
      </div>

      {/* Pinned 3D Stacking Deck Workspace */}
      <div className="relative z-10 max-w-6xl mx-auto w-full h-[480px] md:h-[520px] my-auto flex items-center justify-center">
        {expertiseData.map((item, index) => (
          <div
            key={index}
            ref={el => cardsRef.current[index] = el}
            className="absolute inset-x-0 mx-auto w-full p-8 md:p-12 rounded-[2.5rem] bg-[#090e1c]/95 backdrop-blur-3xl border border-blue-500/40 shadow-[0_30px_80px_rgba(0,0,0,0.95)] flex flex-col justify-between h-[380px] md:h-[420px] overflow-hidden group hover:border-cyan-400 hover:shadow-[0_30px_90px_rgba(0,240,255,0.3)] transition-colors duration-300 will-change-transform"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            {/* Dynamic Mouse Spotlight Highlight */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
              style={{
                background: 'radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(0,240,255,0.15), transparent 70%)'
              }}
            />

            {/* Glowing Top Cyan Accent Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10 group-hover:w-80 transition-all duration-500" />

            {/* Card Header Top */}
            <div className="flex items-center justify-between w-full mb-4 relative z-10">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-cyan-400 px-3.5 py-1 rounded-xl bg-blue-500/10 border border-blue-500/30 group-hover:border-cyan-400 transition-colors">
                {item.tag}
              </span>
              <span className="text-3xl md:text-5xl font-mono font-black text-cyan-400/40 group-hover:text-cyan-400 transition-colors">
                {item.number}
              </span>
            </div>

            {/* Card Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto relative z-10">
              <div className="lg:col-span-5">
                <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-snug group-hover:text-cyan-300 transition-colors duration-300">
                  {item.title}
                </h3>
              </div>
              <div className="lg:col-span-7">
                <p className="text-sm md:text-base text-white/90 font-light leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>

            {/* Blue/Cyan Corner Accent */}
            <div className="absolute bottom-6 right-6 w-3 h-3 rounded-full bg-blue-500 group-hover:bg-cyan-400 group-hover:shadow-[0_0_20px_#00F0FF] z-10 transition-all duration-300" />
          </div>
        ))}
      </div>

      {/* Footer Ticker Indicator */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-white/40 tracking-widest uppercase pointer-events-none pb-4">
        <span>STARK LABS TECHNICAL CAPABILITIES</span>
        <span>PROTOCOL SUITE 01-04</span>
      </div>

    </section>
  );
};

export default Expertise;