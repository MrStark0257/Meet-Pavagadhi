import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projectsData = [
  {
    id: 1,
    title: "FETC Web Platform",
    category: "Full-Stack Web Architecture",
    description: "Designed and developed responsive web portal integrating custom APIs and user interaction flows.",
    tags: ["React", "JavaScript", "HTML5", "CSS3"],
    match: "POWER 99%",
    episode: "MARK I",
    icon: "🌐"
  },
  {
    id: 2,
    title: "Parikshaa Portal",
    category: "Web Application",
    description: "Interactive web application for online assessment with real-time UI response and third-party service integration.",
    tags: ["React", "JavaScript", "REST APIs", "Tailwind"],
    match: "POWER 98%",
    episode: "MARK II",
    icon: "⚡"
  },
  {
    id: 3,
    title: "Zclick Media Studio Suite",
    category: "Visual Media & Branding",
    description: "Produced comprehensive visual marketing campaigns, promotional banners, and video commercials.",
    tags: ["Photoshop", "Illustrator", "Premiere Pro", "After Effects"],
    match: "POWER 99%",
    episode: "MARK III",
    icon: "🎬"
  },
  {
    id: 4,
    title: "3D Character Rigging & Animation",
    category: "3D Animation & VFX",
    description: "Created production-ready character models, biped rigging, and keyframe animations for films & ads.",
    tags: ["Autodesk Maya", "Blender", "3ds Max", "Cinema 4D"],
    match: "POWER 100%",
    episode: "MARK IV",
    icon: "👾"
  },
  {
    id: 5,
    title: "Interactive Game Asset Pipeline",
    category: "Game Development",
    description: "Optimized low-poly 3D game assets and integrated animation rigs into Unity & Unreal Engine projects.",
    tags: ["Unity", "Unreal Engine", "Asset Optimization", "Rigging"],
    match: "POWER 98%",
    episode: "MARK V",
    icon: "🎮"
  }
];

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projectsData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="bg-[#02050b] w-full min-h-screen relative overflow-hidden py-24 px-4 sm:px-6 md:px-12 select-none flex flex-col justify-between"
    >
      {/* Background Matrix Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `radial-gradient(rgba(0, 240, 255, 0.3) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Cyber Ambient Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/15 rounded-full blur-[200px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none z-0" />

      {/* Header */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-blue-500/20">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono uppercase tracking-widest text-cyan-400 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shadow-[0_0_10px_#00F0FF]"></span>
            <span>STARK LABS // CLASSIFIED PROJECTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            FEATURED PROJECTS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]">
              & CREATIVE WORKS.
            </span>
          </h2>
        </div>
        
        {/* Revolver Controls */}
        <div className="flex items-center gap-4">
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-2xl bg-[#090d16] border border-blue-500/30 flex items-center justify-center text-cyan-400 hover:border-cyan-400 hover:bg-blue-500/20 hover:scale-110 transition-all duration-300 shadow-lg active:scale-95"
            title="Previous Project"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <span className="text-xs font-mono text-cyan-400 font-bold tracking-widest px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/30">
            0{activeIndex + 1} / 0{projectsData.length}
          </span>

          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-2xl bg-[#090d16] border border-blue-500/30 flex items-center justify-center text-cyan-400 hover:border-cyan-400 hover:bg-blue-500/20 hover:scale-110 transition-all duration-300 shadow-lg active:scale-95"
            title="Next Project"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Clean 3D Coverflow Stage Workspace */}
      <div className="relative z-10 w-full max-w-7xl mx-auto h-[440px] sm:h-[480px] flex items-center justify-center perspective-[1200px] my-6">
        {projectsData.map((project, idx) => {
          // Calculate distance relative to activeIndex
          let offset = idx - activeIndex;
          if (offset < -2) offset += projectsData.length;
          if (offset > 2) offset -= projectsData.length;

          const isVisible = Math.abs(offset) <= 2;
          const isActive = offset === 0;

          // 3D positioning coordinates
          let translateX = offset * 310; // Mobile / Desktop spacing
          if (window.innerWidth < 640) translateX = offset * 240;

          let rotateY = offset * -35;
          let scale = isActive ? 1.05 : 0.82;
          let opacity = isActive ? 1 : Math.abs(offset) === 1 ? 0.6 : 0;
          let zIndex = 30 - Math.abs(offset) * 10;

          if (!isVisible) return null;

          return (
            <motion.div
              key={project.id}
              onClick={() => setActiveIndex(idx)}
              initial={false}
              animate={{
                x: translateX,
                rotateY: rotateY,
                scale: scale,
                opacity: opacity,
                zIndex: zIndex
              }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className={`absolute w-[86vw] sm:w-[420px] md:w-[460px] h-[340px] sm:h-[380px] rounded-[2.5rem] p-7 sm:p-9 bg-[#090e1d] border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.95)] ${
                isActive 
                  ? 'border-cyan-400 shadow-[0_0_50px_rgba(0,240,255,0.35)] ring-2 ring-cyan-400/50' 
                  : 'border-blue-500/30 hover:border-blue-400/80'
              }`}
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Internal Cyan Laser Top Stripe */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-all duration-500 ${
                isActive ? 'w-64 opacity-100' : 'w-24 opacity-40'
              }`} />

              {/* Top Card Bar */}
              <div className="flex items-center justify-between relative z-10">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-blue-500/10 px-3 py-1 rounded-xl border border-blue-500/30">
                  {project.episode}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-cyan-300 font-bold">{project.match}</span>
                  <span className="text-xl">{project.icon}</span>
                </div>
              </div>

              {/* Card Title & Description */}
              <div className="space-y-3 relative z-10 my-auto">
                <span className="text-[11px] font-mono uppercase tracking-widest text-blue-400 font-bold block">
                  // {project.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 relative z-10">
                {project.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="text-[10px] sm:text-[11px] font-mono text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Glowing Core Indicator */}
              <div className={`absolute bottom-6 right-6 w-3 h-3 rounded-full transition-all duration-300 ${
                isActive ? 'bg-cyan-400 shadow-[0_0_20px_#00F0FF] animate-pulse' : 'bg-blue-600'
              }`} />
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Mark Suit Selector Bar */}
      <div className="relative z-20 max-w-7xl mx-auto w-full pt-4">
        <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest text-center mb-3">
          // CLICK MARK SUIT TO ENGAGE SPECIFIC PROJECT PROTOCOL
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-3">
          {projectsData.map((project, idx) => (
            <button
              key={project.id}
              onClick={() => setActiveIndex(idx)}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 border ${
                idx === activeIndex
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.4)] scale-105'
                  : 'bg-[#090d16] text-white/60 border-white/10 hover:border-blue-500/50 hover:text-white'
              }`}
            >
              {project.episode}
            </button>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Projects;