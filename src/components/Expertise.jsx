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
    gradient: "from-[#0a1324] via-[#090d16] to-[#04070d]"
  },
  {
    number: "02",
    title: "Web Development",
    text: "Designing and developing responsive websites using HTML, CSS, JavaScript, and modern frameworks like React for projects including FETC, Parikshaa, and Zclick Media.",
    tag: "WEB ENGINEERING & REACT",
    gradient: "from-[#08101f] via-[#080c14] to-[#03060a]"
  },
  {
    number: "03",
    title: "Game Development",
    text: "Integrating real-time 3D animation assets and interactive mechanics into Unity and Unreal Engine. Experienced in performance optimization for interactive gaming environments.",
    tag: "GAME ENGINES & INTERACTIVE",
    gradient: "from-[#0b162b] via-[#080d17] to-[#04070d]"
  },
  {
    number: "04",
    title: "Graphic Design & Video Editing",
    text: "Creating compelling visual marketing assets, banners, brochures, and commercial video edits using Adobe Photoshop, Illustrator, Premiere Pro, and After Effects.",
    tag: "VISUAL MEDIA & CREATIVE SUITE",
    gradient: "from-[#091220] via-[#070b13] to-[#030509]"
  }
];

const Expertise = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;

    // Set 3D perspective initial styles
    cards.forEach((card, i) => {
      if (i > 0) {
        gsap.set(card, {
          y: 120,
          opacity: 0,
          scale: 0.92,
          rotateX: 10
        });
      }
    });

    // Create ScrollTrigger pinning and 3D deck stacking timeline
    cards.forEach((card, index) => {
      if (index < cards.length - 1) {
        const nextCard = cards[index + 1];

        // Slide next card up while stacking current card into background
        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 20%",
            end: "bottom top",
            scrub: 1,
            pin: false
          }
        })
        .to(card, {
          scale: 0.92 - index * 0.02,
          y: -25,
          rotateX: -6,
          opacity: 0.5,
          filter: "brightness(0.6) blur(2px)",
          ease: "power2.out"
        }, 0)
        .to(nextCard, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          filter: "brightness(1) blur(0px)",
          ease: "power2.out"
        }, 0);
      }
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

  return (
    <section
      id="expertise"
      ref={containerRef}
      className="relative w-full bg-[#030712] text-white py-28 px-6 md:px-12 select-none overflow-hidden"
    >
      {/* Ambient Blue Background Glow */}
      <div className="absolute top-1/3 left-1/4 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-blue-500/40 text-xs font-mono uppercase tracking-widest text-white shadow-[0_0_20px_rgba(59,130,246,0.25)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shadow-[0_0_10px_#00F0FF]"></span>
              <span className="text-cyan-400 font-bold">PROTOCOL 02</span>
              <span className="text-white/40">|</span>
              <span className="text-blue-400 font-semibold">STARK SUITE CAPABILITIES</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
              STARK LABS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                TECHNICAL PROTOCOLS.
              </span>
            </h2>
          </div>
          <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed max-w-xs border-l-2 border-cyan-400/40 pl-4">
            Integrating 3D animation, game engine mechanics, full-stack web development, and digital post-production.
          </p>
        </div>

        {/* 3D Stacking Deck Container */}
        <div className="relative flex flex-col gap-10 pb-24 perspective-[1400px]">
          {expertiseData.map((item, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className={`sticky w-full p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br ${item.gradient} backdrop-blur-2xl border border-blue-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between min-h-[260px] md:min-h-[280px] transform-gpu transition-all duration-300 overflow-hidden group hover:border-cyan-400/80 hover:shadow-[0_30px_70px_rgba(59,130,246,0.3)]`}
              style={{
                zIndex: index + 1,
                top: `${110 + index * 20}px`
              }}
            >
              {/* Real-time Dynamic Mouse Spotlight Highlight */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                  background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(59,130,246,0.2), transparent 70%)'
                }}
              />

              {/* Cyan Accent Glowing Top Stripe */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10 opacity-80 group-hover:opacity-100 group-hover:w-64 transition-all duration-500"></div>

              {/* Card Header Top */}
              <div className="flex items-center justify-between w-full mb-6 relative z-10">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-cyan-400 px-3.5 py-1 rounded bg-blue-500/10 border border-blue-500/30 group-hover:border-cyan-400/60 transition-colors">
                  {item.tag}
                </span>
                <span className="text-3xl md:text-4xl font-mono font-black text-white/20 group-hover:text-cyan-400/40 transition-colors">
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
                  <p className="text-xs md:text-base text-white/75 font-light leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>

              {/* Blue Corner Glow Indicator */}
              <div className="absolute bottom-6 right-6 w-2.5 h-2.5 rounded-full bg-blue-500 group-hover:bg-cyan-400 group-hover:shadow-[0_0_15px_#00F0FF] z-10 transition-all duration-300" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Expertise;