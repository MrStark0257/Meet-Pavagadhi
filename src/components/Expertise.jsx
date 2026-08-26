import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const expertiseData = [
  {
    number: "01",
    title: "3D Animation & Rigging",
    text: "Creating high-quality 3D animations for films, games, and advertisements. Expert in character modeling, rigging, rendering, and asset optimization using Maya, Blender, 3ds Max, and Cinema 4D.",
    tag: "3D & ANIMATION WORKFLOW",
    gradient: "from-[#1f0a0c] via-[#121212] to-[#0a0a0a]"
  },
  {
    number: "02",
    title: "Web Development",
    text: "Designing and developing responsive websites using HTML, CSS, JavaScript, and modern frameworks like React for projects including FETC, Parikshaa, and Zclick Media.",
    tag: "WEB ENGINEERING & REACT",
    gradient: "from-[#1a0809] via-[#111111] to-[#090909]"
  },
  {
    number: "03",
    title: "Game Development",
    text: "Integrating real-time 3D animation assets and interactive mechanics into Unity and Unreal Engine. Experienced in performance optimization for interactive gaming environments.",
    tag: "GAME ENGINES & INTERACTIVE",
    gradient: "from-[#220a0d] via-[#131313] to-[#0a0a0a]"
  },
  {
    number: "04",
    title: "Graphic Design & Video Editing",
    text: "Creating compelling visual marketing assets, banners, brochures, and commercial video edits using Adobe Photoshop, Illustrator, Premiere Pro, and After Effects.",
    tag: "VISUAL MEDIA & CREATIVE SUITE",
    gradient: "from-[#1d090b] via-[#101010] to-[#080808]"
  }
];

const Expertise = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current;
    if (!cards.length) return;

    cards.forEach((card, index) => {
      if (index === cards.length - 1) return; // Keep the top-most card fully focused

      gsap.to(card, {
        scale: 0.92 - index * 0.025,
        y: -15 - index * 8,
        filter: "blur(6px)",
        opacity: 0.4,
        scrollTrigger: {
          trigger: card,
          start: `top ${90 + index * 20}px`,
          end: "bottom top",
          scrub: true,
        }
      });
    });

    // Magnetic mouse highlight per card
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

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="expertise"
      ref={containerRef}
      className="relative w-full bg-[#050505] text-white py-20 px-6 md:px-12 select-none overflow-hidden"
    >
      {/* Ambient Blue Glow */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-12">
        
        {/* Compact Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-black/80 backdrop-blur-xl border border-blue-500/40 text-xs font-mono uppercase tracking-widest text-white shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="text-cyan-400 font-bold">PROTOCOL 02</span>
              <span className="text-white/40">|</span>
              <span className="text-blue-400 font-semibold">STARK SUITE CAPABILITIES</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              STARK LABS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-500 drop-shadow-[0_0_25px_rgba(59,130,246,0.35)]">
                TECHNICAL PROTOCOLS.
              </span>
            </h2>
          </div>
          <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed max-w-xs">
            Integrating 3D animation, game engine mechanics, full-stack web development, and digital post-production.
          </p>
        </div>

        {/* Compact 1-on-1 Gradient Stacking Container */}
        <div className="relative flex flex-col gap-8 pb-20">
          {expertiseData.map((item, index) => (
            <div
              key={index}
              ref={addToRefs}
              className={`sticky w-full p-6 md:p-8 rounded-2xl bg-gradient-to-br ${item.gradient} backdrop-blur-2xl border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.85)] flex flex-col justify-between min-h-[230px] md:min-h-[250px] transform-gpu transition-all overflow-hidden group hover:border-red-600/50`}
              style={{
                zIndex: index + 1,
                top: `${95 + index * 16}px`
              }}
            >
              {/* Dynamic Mouse Spotlight Highlight */}
              {/* Card Container */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                  background: 'radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), rgba(59,130,246,0.18), transparent 70%)'
                }}
              ></div>

              {/* Blue Accent Stripe */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent z-10"></div>

              {/* Card Header Top */}
              <div className="flex items-center justify-between w-full mb-4 relative z-10">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400 px-2.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/25">
                  {item.tag}
                </span>
                <span className="text-2xl md:text-3xl font-mono font-black text-white/20">
                  {item.number}
                </span>
              </div>

              {/* Card Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center my-auto relative z-10">
                <div className="lg:col-span-5">
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-snug group-hover:text-cyan-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>

              {/* Subtle Blue Corner Dot */}
              <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:shadow-[0_0_10px_#3B82F6] z-10 transition-all"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Expertise;