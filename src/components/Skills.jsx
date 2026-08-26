import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  { 
    title: '3D Animation & Rigging', 
    desc: 'Modeling, rigging, keyframe animation, and asset optimization for films, games, and commercial projects.', 
    tag: '3D ART & ANIMATION',
    skills: ['Autodesk Maya', 'Blender', '3ds Max', 'Cinema 4D', 'Rigging'] 
  },
  { 
    title: 'Web Design & Coding', 
    desc: 'Designing and building responsive, high-performance web applications with modern frontend frameworks.', 
    tag: 'FULL-STACK WEB',
    skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Angular'] 
  },
  { 
    title: 'Game Development', 
    desc: 'Integrating 3D assets, environment design, and interactive gameplay mechanics into real-time game engines.', 
    tag: 'INTERACTIVE ENGINES',
    skills: ['Unity', 'Unreal Engine', 'Asset Optimization', 'Interactive 3D'] 
  },
  { 
    title: 'Graphic Design', 
    desc: 'Creating visual identity, social media graphics, promotional banners, and marketing brochures.', 
    tag: 'BRAND & VISUALS',
    skills: ['Photoshop', 'Illustrator', 'Design Thinking', 'Brand Assets'] 
  },
  { 
    title: 'Video Editing & Motion', 
    desc: 'Editing cinematic video commercials, motion graphics, promo reels, and visual effects.', 
    tag: 'POST-PRODUCTION',
    skills: ['Premiere Pro', 'After Effects', 'Video Editing', 'Motion Graphics'] 
  },
  { 
    title: 'Design Thinking & Wireframing', 
    desc: 'Conceptualizing user experiences, wireframing interfaces, and translating ideas into visual products.', 
    tag: 'UX & WIREFRAMES',
    skills: ['Wireframing', 'Design Systems', 'UI Layouts', 'Prototyping'] 
  },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const textRefs = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    const section = sectionRef.current;
    if (!cards.length || !section) return;

    let ctx = gsap.context(() => {

      const spacing = window.innerWidth < 640 ? 280 : window.innerWidth < 1024 ? 340 : 380;

      // Update function mapping continuous scroll float progress to card position
      const renderStage = (progress) => {
        // progress maps from 0 (Card 0 centered) to (skillCategories.length - 1) (Card 5 centered)
        const currentActiveFloat = Math.min(skillCategories.length - 1, Math.max(0, progress));
        const activeIdx = Math.round(currentActiveFloat);

        cards.forEach((card, i) => {
          if (!card) return;

          const offset = i - currentActiveFloat;
          const absOffset = Math.abs(offset);
          const targetX = offset * spacing;

          const isFocused = i === activeIdx;
          const scale = Math.max(0.72, 1.05 - absOffset * 0.15);
          const opacity = Math.max(0.1, 1 - absOffset * 0.45);
          const zIndex = Math.round(50 - absOffset * 10);
          const rotY = offset * -18;
          const rotZ = offset * 1.5;

          gsap.set(card, {
            x: targetX,
            y: isFocused ? -15 : 0,
            scale: scale,
            rotationY: rotY,
            rotationZ: rotZ,
            opacity: opacity,
            zIndex: zIndex
          });
        });

        // Watermark text sync
        textRefs.current.forEach((txt, i) => {
          if (txt) {
            const txtOpacity = Math.max(0, 1 - Math.abs(i - currentActiveFloat));
            gsap.set(txt, { opacity: txtOpacity });
          }
        });
      };

      // Set initial stage (Card 0 Centered)
      renderStage(0);

      // ScrollTrigger Pin & Step Controller
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=400%",
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // self.progress goes from 0 to 1 -> maps from 0 to 5
          const targetStep = self.progress * (skillCategories.length - 1);
          renderStage(targetStep);
        }
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="skills"
      ref={sectionRef} 
      className="relative w-full h-screen bg-[#030712] text-white overflow-hidden flex items-center justify-center perspective-[1200px] select-none"
    >
      {/* Background Matrix/Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[200px] pointer-events-none z-0" />
      
      {/* Dynamic Background Watermark Typography */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        {skillCategories.map((_, i) => (
          <h1 
            key={`text-${i}`}
            ref={el => textRefs.current[i] = el}
            className="absolute text-[22vw] md:text-[18vw] font-black uppercase text-transparent leading-none tracking-tighter mix-blend-overlay"
            style={{ 
               WebkitTextStroke: `2px ${i % 2 === 0 ? 'rgba(0,240,255,0.35)' : 'rgba(59,130,246,0.25)'}`,
               opacity: i === 0 ? 1 : 0 
            }}
          >
            STARK
          </h1>
        ))}
      </div>

      {/* Section Header Badge */}
      <div className="absolute top-8 inset-x-0 z-20 max-w-7xl mx-auto px-6 md:px-12 pointer-events-none flex items-center justify-between">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-2xl border border-blue-500/40 text-xs font-mono uppercase tracking-widest text-white shadow-[0_0_20px_rgba(59,130,246,0.2)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shadow-[0_0_10px_#00F0FF]"></span>
          <span className="text-cyan-400 font-bold">PROTOCOL 03</span>
          <span className="text-white/40">|</span>
          <span className="text-blue-400 font-semibold">TECH MATRIX & SCHEMATICS</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold tracking-wider">
          <span>TECHNICAL SKILLSETS & FRAMEWORKS</span>
        </div>
      </div>

      {/* Cards Centered Reel Stage */}
      <div className="relative w-full max-w-7xl h-full flex items-center justify-center z-10 transform-style-3d">
        {skillCategories.map((category, i) => (
          <div 
            key={i}
            ref={el => cardsRef.current[i] = el}
            className="absolute shrink-0 w-[84vw] sm:w-[340px] md:w-[380px] h-[440px] md:h-[480px] rounded-[2.5rem] p-7 md:p-9 bg-[#090d16]/95 backdrop-blur-3xl border border-blue-500/30 flex flex-col justify-between overflow-hidden group shadow-[0_30px_70px_rgba(0,0,0,0.9)] hover:border-cyan-400/80 transition-colors duration-300 will-change-transform"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            {/* Top Cyan Accent Laser Stripe */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent group-hover:w-60 transition-all duration-500 z-10" />

            {/* Inner Blue Glossy Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
            
            {/* Top Card Metadata */}
            <div className="flex items-center justify-between relative z-10">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-cyan-400 bg-blue-500/10 px-3 py-1 rounded-xl border border-blue-500/30">
                {category.tag}
              </span>
              <span className="text-xs font-mono text-white/40">
                [ 0{i + 1} / 06 ]
              </span>
            </div>

            {/* Middle Title & Description */}
            <div className="space-y-3 relative z-10 my-auto">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight group-hover:text-cyan-300 transition-colors duration-300">
                {category.title}
              </h3>
              <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed line-clamp-3">
                {category.desc}
              </p>
            </div>

            {/* Bottom Skill Badges */}
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10 relative z-10">
              {category.skills.map((skill, sIdx) => (
                <span 
                  key={sIdx}
                  className="text-[10px] sm:text-xs font-mono text-white/80 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg group-hover:border-blue-500/40 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Bottom Glow Accent */}
            <div className="absolute bottom-6 right-6 w-2.5 h-2.5 rounded-full bg-blue-500 group-hover:bg-cyan-400 group-hover:shadow-[0_0_15px_#00F0FF] transition-all" />
          </div>
        ))}
      </div>

    </section>
  );
};

export default Skills;