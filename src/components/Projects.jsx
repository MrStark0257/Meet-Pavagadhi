import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const watermarkRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getScrollAmount = () => {
      return track.scrollWidth - window.innerWidth + 120;
    };

    // Horizontal Scroll Pinning Reel Timeline
    const tween = gsap.to(track, {
      x: () => -getScrollAmount(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 0.6,
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        invalidateOnRefresh: true
      }
    });

    // Parallax background watermark motion
    if (watermarkRef.current) {
      gsap.to(watermarkRef.current, {
        x: () => getScrollAmount() * 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          scrub: 0.6,
          start: "top top",
          end: () => `+=${getScrollAmount()}`
        }
      });
    }

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="bg-[#030712] w-full h-screen relative overflow-hidden select-none flex flex-col justify-between py-12"
    >
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Background Parallax Watermark Text */}
      <div 
        ref={watermarkRef}
        className="absolute top-16 left-0 w-[200vw] flex items-center justify-start pointer-events-none z-0 opacity-10"
      >
        <h1 className="text-[18vw] font-black text-cyan-400 uppercase tracking-tighter whitespace-nowrap leading-none">
          STARK LABS PROJECTS PROTOCOLS
        </h1>
      </div>

      {/* Top Header Badge */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full flex items-center justify-between pointer-events-none pt-4">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-2xl border border-blue-500/40 text-xs font-mono uppercase tracking-widest text-white shadow-[0_0_20px_rgba(59,130,246,0.25)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shadow-[0_0_10px_#00F0FF]"></span>
          <span className="text-cyan-400 font-bold">STARK LABS</span>
          <span className="text-white/40">|</span>
          <span className="text-blue-400 font-semibold">CLASSIFIED PROJECT PROTOCOLS</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-white/50 tracking-wider">
          <span>SCROLL HORIZONTALLY TO EXPLORE &rarr;</span>
        </div>
      </div>

      {/* Horizontal Reel Track Container */}
      <div className="relative z-10 w-full overflow-hidden my-auto py-6">
        <div 
          ref={trackRef} 
          className="flex items-center gap-8 px-6 md:px-24 w-max will-change-transform"
        >
          {projectsData.map((project, i) => (
            <div 
              key={i}
              className="group shrink-0 w-[85vw] sm:w-[420px] md:w-[480px] h-[380px] md:h-[430px] rounded-[2.5rem] p-8 md:p-10 bg-[#090d16]/95 backdrop-blur-3xl border border-blue-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col justify-between relative overflow-hidden transition-all duration-500 hover:border-cyan-400/80 hover:shadow-[0_30px_70px_rgba(59,130,246,0.3)] hover:-translate-y-2 cursor-pointer"
            >
              {/* Dynamic Specular Lighting Layer */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Cyan Accent Top Line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent group-hover:w-60 transition-all duration-500 z-10" />

              {/* Top Metadata */}
              <div className="flex items-center justify-between relative z-10">
                <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-cyan-400 bg-blue-500/10 px-3 py-1 rounded border border-blue-500/30 group-hover:border-cyan-400/60 transition-colors">
                  {project.episode}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-cyan-300 font-bold">{project.match}</span>
                  <span className="text-[10px] font-mono border border-white/20 px-1.5 py-0.5 rounded text-white/60">HD</span>
                </div>
              </div>

              {/* Middle Title & Description */}
              <div className="space-y-3 relative z-10 my-auto">
                <div className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold">
                  // {project.category}
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-snug group-hover:text-cyan-300 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-xs md:text-sm text-white/75 font-light leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Bottom Tech Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 relative z-10">
                {project.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="text-[11px] font-mono text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded-lg group-hover:border-blue-500/40 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Glowing Corner Accent */}
              <div className="absolute bottom-6 right-6 w-2.5 h-2.5 rounded-full bg-blue-500 group-hover:bg-cyan-400 group-hover:shadow-[0_0_15px_#00F0FF] transition-all duration-300 z-10" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Ticker */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full flex items-center justify-between text-xs font-mono text-white/40 tracking-widest uppercase pointer-events-none pb-4">
        <span>STARK LABS CLASSIFIED FILE ARCHIVE</span>
        <span>PAGE 01 / 05</span>
      </div>

    </section>
  );
};

export default Projects;