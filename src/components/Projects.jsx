import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Authentic Project Data based on your engineering portfolio
const projectsData = [
  {
    title: "FETC Web Platform",
    category: "Full-Stack Web Architecture",
    description: "Designed and developed responsive web portal integrating custom APIs and user interaction flows.",
    tags: ["React", "JavaScript", "HTML5", "CSS3"],
    match: "POWER 99%",
    episode: "MARK I"
  },
  {
    title: "Parikshaa Portal",
    category: "Web Application",
    description: "Interactive web application for online assessment with real-time UI response and third-party service integration.",
    tags: ["React", "JavaScript", "REST APIs", "Tailwind"],
    match: "POWER 98%",
    episode: "MARK II"
  },
  {
    title: "Zclick Media Studio Suite",
    category: "Visual Media & Branding",
    description: "Produced comprehensive visual marketing campaigns, promotional banners, and video commercials.",
    tags: ["Photoshop", "Illustrator", "Premiere Pro", "After Effects"],
    match: "POWER 99%",
    episode: "MARK III"
  },
  {
    title: "3D Character Rigging & Animation",
    category: "3D Animation & VFX",
    description: "Created production-ready character models, biped rigging, and keyframe animations for films & ads.",
    tags: ["Autodesk Maya", "Blender", "3ds Max", "Cinema 4D"],
    match: "POWER 100%",
    episode: "MARK IV"
  },
  {
    title: "Interactive Game Asset Pipeline",
    category: "Game Development",
    description: "Optimized low-poly 3D game assets and integrated animation rigs into Unity & Unreal Engine projects.",
    tags: ["Unity", "Unreal Engine", "Asset Optimization", "Rigging"],
    match: "POWER 98%",
    episode: "MARK V"
  }
];

const Projects = () => {
  const containerRef = useRef(null);
  const folderBackRef = useRef(null);
  const folderFrontRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileCardsRef = useRef([]);
  const mobileCarouselRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Set initial origins (Centered in viewport)
      gsap.set([folderBackRef.current, folderFrontRef.current], { 
        xPercent: -50, 
        yPercent: -50 
      });
      gsap.set(folderFrontRef.current, { transformOrigin: "bottom center" });
      
      const getGridPos = (index) => {
        let row, col;
        if (index < 3) { row = 0; col = index; }
        else if (index === 3) { row = 1; col = 0; }
        else if (index === 4) { row = 1; col = 2; }
        else { row = 2; col = index - 5; }
        return { row, col };
      };

      cardsRef.current.forEach((card) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          rotation: gsap.utils.random(-6, 6),
          scale: 0.85,
          x: 0,
          y: 0,
        });
      });

      let mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)"
      }, (context) => {
        let { isDesktop, isMobile } = context.conditions;

        if (isDesktop) {
          let floatTween;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 50%", 
              end: "bottom 50%",
              toggleActions: "play reverse play reverse",
              onEnter: () => { if (floatTween) floatTween.kill(); },
              onEnterBack: () => { if (floatTween) floatTween.kill(); },
              onLeave: () => { if (floatTween) floatTween.kill(); },
              onLeaveBack: () => { if (floatTween) floatTween.kill(); }
            },
            onComplete: () => {
              floatTween = gsap.to(cardsRef.current, {
                y: "+=12",
                rotation: "+=1",
                duration: 3.5,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                stagger: { amount: 1.5, from: "random" }
              });
            }
          });

          // 1. Folder opens with smooth rotation
          tl.to(folderFrontRef.current, {
            rotationX: -130,
            duration: 1.2,
            ease: "power3.inOut"
          });

          // 2. Cards rise up collectively
          tl.to(cardsRef.current, {
            y: -140,
            scale: 0.9,
            zIndex: 70,
            duration: 0.6,
            stagger: 0.04,
            ease: "back.out(1.2)"
          }, "-=0.6");

          // 3. Cards magically spread out into an ultra-clean blockbuster grid layout
          tl.to(cardsRef.current, {
            x: (i) => {
              const w = Math.max(...cardsRef.current.map(c => c?.offsetWidth || 0)) || 360;
              const gap = 40;
              const { col } = getGridPos(i);
              return (col - 1) * (w + gap);
            },
            y: (i) => {
              const h = Math.max(...cardsRef.current.map(c => c?.offsetHeight || 0)) || 240;
              const gap = 40;
              const { row } = getGridPos(i);
              return (row - 1) * (h + gap);
            },
            rotation: () => gsap.utils.random(-3, 3),
            scale: 1,
            duration: 1.4,
            stagger: { amount: 0.4, from: "center" },
            ease: "expo.out"
          }, "-=0.2");
        }

        if (isMobile) {
          const cardW = window.innerWidth * 0.8;
          const gap = 20;
          
          mobileCardsRef.current.forEach((card, i) => {
            gsap.set(card, {
              x: -(i * (cardW + gap)), 
              y: 0,
              scale: 0.4,
              opacity: 0,
              rotation: gsap.utils.random(-15, 15)
            });
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
            }
          });

          tl.to(folderFrontRef.current, {
            rotationX: -130,
            duration: 0.8,
            ease: "power3.inOut"
          });

          tl.to(mobileCardsRef.current, {
            y: -100,
            opacity: 1,
            scale: 0.85,
            duration: 0.6,
            stagger: 0.05,
            ease: "back.out(1.2)"
          }, "-=0.4");

          tl.to(mobileCardsRef.current, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: (i) => i === 0 ? 1 : 0.92,
            opacity: (i) => i === 0 ? 1 : 0.5,
            duration: 0.8,
            stagger: 0.08,
            ease: "expo.out",
            onComplete: () => {
              if (mobileCarouselRef.current) {
                mobileCarouselRef.current.style.overflowX = 'auto';
                mobileCarouselRef.current.style.pointerEvents = 'auto';
              }
            }
          }, "-=0.2");
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="bg-[#0b0b0b] min-h-[100svh] md:min-h-[170vh] relative font-sans overflow-x-clip text-white w-full flex items-center justify-center py-24 md:py-40 select-none">
      
      {/* Section Header Badge */}
      <div className="absolute top-8 inset-x-0 z-20 max-w-7xl mx-auto px-6 md:px-12 pointer-events-none flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-black/80 backdrop-blur-xl border border-blue-500/40 text-xs font-mono uppercase tracking-widest text-white shadow-[0_0_20px_rgba(59,130,246,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="text-cyan-400 font-bold">STARK LABS</span>
          <span className="text-white/40">|</span>
          <span className="text-blue-400 font-semibold">CLASSIFIED PROJECT PROTOCOLS</span>
        </div>
      </div>

      {/* Background Stark Title Watermark */}
      <div className="absolute top-10 left-0 w-full flex items-start justify-center pointer-events-none z-0">
        <h1 className="text-[14vw] sm:text-[17vw] md:text-[20vw] font-black text-cyan-500/[0.04] tracking-tighter leading-none whitespace-nowrap uppercase">
          STARK LABS
        </h1>
      </div>

      {/* Ambient Blue Glow behind folder */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Main Perspective Container */}
      <div className="mt-12 relative w-full max-w-7xl h-full flex items-center justify-center perspective-[2000px] z-10">
        
        {/* Origin Container */}
        <div className="relative w-0 h-0 transform-style-3d">
          
          {/* Folder Back */}
          <div 
            ref={folderBackRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video bg-[#090d16] rounded-[24px] border border-blue-500/40 shadow-[0_20px_50px_rgba(59,130,246,0.25)] flex items-center justify-center"
            style={{ zIndex: 5 }}
          >
            <div className="absolute -top-6 left-6 w-32 h-8 bg-[#0f172a] rounded-t-xl border-t border-blue-500/30" />
            <div className="relative z-10 text-blue-400 font-mono font-black text-2xl tracking-widest uppercase opacity-60">
              ARCHIVE_SLOTS
            </div>
          </div>

          {/* Desktop Project Cards */}
          {projectsData.map((project, i) => (
            <div 
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="hidden md:block absolute w-[80vw] md:w-[33vw] max-w-[380px] aspect-[16/10] will-change-transform"
              style={{ zIndex: 10 + i }}
            >
              <div className="w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#090d16]/95 backdrop-blur-2xl shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-all duration-500 group hover:scale-[1.04] hover:border-blue-500 hover:shadow-[0_35px_80px_rgba(59,130,246,0.35)] hover:-translate-y-2 cursor-pointer relative z-10 p-7 flex flex-col justify-between">
                
                {/* Top Card Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded border border-blue-500/20">
                    {project.episode}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-cyan-400 font-bold">{project.match}</span>
                    <span className="text-[10px] font-mono border border-white/30 px-1 text-white/70">HD</span>
                  </div>
                </div>

                {/* Middle Title & Description */}
                <div className="space-y-2 my-auto">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-white/40">
                    {project.category}
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/70 font-light leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono text-white/70 bg-white/5 px-2 py-0.5 rounded group-hover:border-blue-500/30 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Blue Glowing Corner Accent */}
                <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-blue-500 group-hover:shadow-[0_0_15px_#3B82F6] transition-all" />
              </div>
            </div>
          ))}

          {/* Folder Front Flap */}
          <div 
            ref={folderFrontRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video pointer-events-none will-change-transform"
            style={{ zIndex: 60 }}
          >
            <div className="absolute bottom-0 w-full h-[85%] bg-[#0e1726] rounded-b-[24px] rounded-t-md shadow-[0_-5px_20px_rgba(0,0,0,0.8)] flex flex-col justify-end p-6 border-t border-blue-500/40">
              <div className="w-20 h-1.5 bg-white/20 rounded-full mx-auto mb-2" />
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Swipeable Carousel */}
      <div 
        ref={mobileCarouselRef}
        className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-auto py-12 flex items-center gap-6 px-[12.5vw] pointer-events-none z-[100] snap-x snap-mandatory overflow-x-hidden hide-scrollbar"
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        {projectsData.map((project, i) => (
          <div 
            key={`mob-${i}`}
            ref={el => mobileCardsRef.current[i] = el}
            className="shrink-0 w-[78vw] aspect-[16/11] snap-center will-change-transform relative z-10"
          >
            <div className="w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#090d16] p-6 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.9)]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-widest text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                  {project.episode}
                </span>
                <span className="text-xs font-mono text-cyan-400 font-bold">{project.match}</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white">{project.title}</h3>
                <p className="text-xs text-white/70 font-light line-clamp-2">{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-1 pt-2 border-t border-white/10">
                {project.tags.slice(0, 3).map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-mono text-white/60 bg-white/5 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Projects;