import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const expertiseData = [
  {
    number: "01",
    title: "3D Animation & Rigging",
    text: "High-precision 3D character modeling, facial & biped rigging, UV unwrapping, motion keyframing, and production-ready rendering for films, commercials, and games.",
    tag: "3D ART & ANIMATION PIPELINE",
    deliverables: ["Character Rigging & Skinning", "Maya & Blender 3D", "UV Unwrapping & Texturing", "Keyframe Animation Cycles"]
  },
  {
    number: "02",
    title: "Full-Stack Web Architecture",
    text: "Designing and deploying responsive, high-performance web applications, interactive UI frameworks, REST API integrations, and optimized web platforms.",
    tag: "WEB ENGINEERING & REACT",
    deliverables: ["React.js & Modern JS", "Responsive UI Architecture", "REST API Integration", "Tailwind & Web Performance"]
  },
  {
    number: "03",
    title: "Game Development & Engines",
    text: "Integrating real-time 3D animation rigs, environment layout, physics collision, and interactive gameplay mechanics into Unity and Unreal Engine pipelines.",
    tag: "GAME ENGINES & REAL-TIME 3D",
    deliverables: ["Unity & Unreal Engine", "Real-Time 3D Asset Rigs", "Environment Assembly", "Low-Poly Optimization"]
  },
  {
    number: "04",
    title: "Graphic Design & Post-Production",
    text: "Producing cinematic video commercials, motion graphics, promo reels, brand identity suites, and visual marketing collateral across Adobe Creative Cloud.",
    tag: "POST-PRODUCTION & VISUAL SUITE",
    deliverables: ["Premiere Pro & After Effects", "Photoshop & Illustrator", "Brand Identity Systems", "Cinematic Motion Graphics"]
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

      cards.forEach((card, i) => {
        if (i === 0) return;

        const prevCards = cards.slice(0, i);
        const targetY = i * 28;

        tl.to(prevCards, {
          scale: (idx) => 1 - (i - idx) * 0.03,
          y: (idx) => idx * 28 - (i - idx) * 10,
          opacity: (idx) => 1 - (i - idx) * 0.15,
          duration: 1,
          ease: "power2.out"
        }, (i - 1) * 1);

        tl.to(card, {
          y: targetY,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out"
        }, (i - 1) * 1);
      });

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
            <span className="text-blue-400 font-semibold">SPECIALIZATIONS & CORE SERVICES</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            DOMAINS OF EXPERTISE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]">
              & CREATIVE SERVICES.
            </span>
          </h2>
        </div>
        <p className="text-white/75 text-xs md:text-sm font-light leading-relaxed max-w-xs border-l-2 border-cyan-400/40 pl-4">
          Comprehensive engineering & creative solutions — bridging 3D digital art, game engine architecture, full-stack web applications, and video post-production.
        </p>
      </div>

      {/* Pinned 3D Stacking Deck Workspace */}
      <div className="relative z-10 max-w-6xl mx-auto w-full h-[480px] md:h-[530px] my-auto flex items-center justify-center">
        {expertiseData.map((item, index) => (
          <div
            key={index}
            ref={el => cardsRef.current[index] = el}
            className="absolute inset-x-0 mx-auto w-full p-8 md:p-11 rounded-[2.5rem] bg-[#090e1c]/95 backdrop-blur-3xl border border-blue-500/40 shadow-[0_30px_80px_rgba(0,0,0,0.95)] flex flex-col justify-between h-[390px] md:h-[440px] overflow-hidden group hover:border-cyan-400 hover:shadow-[0_30px_90px_rgba(0,240,255,0.3)] transition-colors duration-300 will-change-transform"
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
            <div className="flex items-center justify-between w-full mb-3 relative z-10">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-cyan-400 px-3.5 py-1 rounded-xl bg-blue-500/10 border border-blue-500/30 group-hover:border-cyan-400 transition-colors">
                {item.tag}
              </span>
              <span className="text-3xl md:text-5xl font-mono font-black text-cyan-400/40 group-hover:text-cyan-400 transition-colors">
                {item.number}
              </span>
            </div>

            {/* Card Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start my-auto relative z-10">
              <div className="lg:col-span-5 space-y-2">
                <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-snug group-hover:text-cyan-300 transition-colors duration-300">
                  {item.title}
                </h3>
              </div>
              <div className="lg:col-span-7 space-y-4">
                <p className="text-xs md:text-sm text-white/90 font-light leading-relaxed">
                  {item.text}
                </p>

                {/* Key Deliverable Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.deliverables.map((del, dIdx) => (
                    <span 
                      key={dIdx}
                      className="text-[10px] sm:text-xs font-mono text-cyan-300 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-lg font-medium"
                    >
                      ✓ {del}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Blue/Cyan Corner Accent */}
            <div className="absolute bottom-6 right-6 w-3 h-3 rounded-full bg-blue-500 group-hover:bg-cyan-400 group-hover:shadow-[0_0_20px_#00F0FF] z-10 transition-all duration-300" />
          </div>
        ))}
      </div>

      {/* Footer Ticker Indicator */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-white/40 tracking-widest uppercase pointer-events-none pb-4">
        <span>MEET PAVAGADHI SPECIALIZATION MATRIX</span>
        <span>CORE DOMAINS 01-04</span>
      </div>

    </section>
  );
};

export default Expertise;