import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClickSFX, playHoverSFX, playOpenHUDSFX } from '../utils/sfx';
import fetcImg from '../assets/projects/fetc.jpeg';

/**
 * =======================================================================
 * STARK INDUSTRIES // VERIFIED WORK SHOWCASE ARCHIVE
 * -----------------------------------------------------------------------
 * Add any new project objects into this `projectsData` array.
 * Categories are automatically detected and displayed in the filter bar.
 * =======================================================================
 */
const projectsData = [
  {
    id: 'fetc-portal',
    mark: 'MARK I',
    title: 'FETC Official Portal',
    category: 'Web Development',
    subtitle: 'Foreign English Testing Capital & Study Abroad Platform',
    description: 'Designed and developed the official single-page web portal for Foreign English Testing Capital (FETC), Surat. Showcases international exam training (IELTS, PTE, TOEFL, SELT, GRE, GMAT), global study abroad destination guides, and student lead intake pipelines.',
    fullDescription: 'FETC (Foreign English Testing Capital) is an authorized English examination, training, and global study abroad consultancy headquartered in Surat, Gujarat. Engineered with a responsive Single Page Architecture (SPA), the platform features modern interactive layouts, modular course navigation, foreign university destination directories, streamlined visa counseling intake forms, and high-performance cross-device styling.',
    image: fetcImg,
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'SPA', 'Responsive Architecture'],
    highlights: [
      'Interactive exam coaching directories (IELTS, PTE, TOEFL, SELT, GRE, GMAT)',
      'Global study abroad guides for UK, USA, Canada, Australia, Europe & more',
      'High-conversion student consultation & admission inquiry intake workflows',
      'Ultra-responsive mobile-first design with modern component hierarchy'
    ],
    powerScore: '100%',
    liveUrl: 'https://fetc.in/',
    githubUrl: 'https://github.com/MrStark0257',
    year: '2024'
  }
];

const Projects = () => {
  // Dynamically derive categories from current projectsData
  const dynamicCategories = ['All Work', ...new Set(projectsData.map((p) => p.category))];

  const [activeCategory, setActiveCategory] = useState('All Work');
  const [selectedProject, setSelectedProject] = useState(null);

  // Filter projects based on selected tab
  const filteredProjects = activeCategory === 'All Work'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenModal = (project) => {
    playOpenHUDSFX();
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    playClickSFX();
    setSelectedProject(null);
  };

  const handleTabClick = (category) => {
    playClickSFX();
    setActiveCategory(category);
  };

  return (
    <section 
      id="projects" 
      className="bg-[#02050b] w-full min-h-screen relative overflow-hidden py-28 px-4 sm:px-6 md:px-12 select-none"
    >
      {/* Background Matrix Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(0, 240, 255, 0.35) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Cyber Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[200px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[190px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-blue-500/20">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/40 backdrop-blur-md border border-cyan-400/40 text-xs font-mono uppercase tracking-widest text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00F0FF] animate-pulse"></span>
              <span>// STARK WORK ARCHIVE &bull; PROTOCOL 04</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
              FEATURED WORK <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                ENGINEERED EXHIBITS.
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-mono text-white/60">
            <div className="px-4 py-2 rounded-xl bg-[#080f20]/80 border border-blue-500/30 flex items-center gap-2">
              <span className="text-cyan-400 font-bold">{projectsData.length}</span>
              <span>LIVE PRODUCTION WORK</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-[#080f20]/80 border border-cyan-400/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-emerald-300 font-bold">OPERATIONAL</span>
            </div>
          </div>
        </div>

        {/* Category Filter Tab Bar */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
          {dynamicCategories.map((category) => {
            const count = category === 'All Work' 
              ? projectsData.length 
              : projectsData.filter((p) => p.category === category).length;
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                onClick={() => handleTabClick(category)}
                onMouseEnter={playHoverSFX}
                className={`relative px-4 sm:px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all duration-300 flex items-center gap-2 border ${
                  isActive
                    ? 'text-white border-cyan-400 bg-gradient-to-r from-blue-600/90 via-cyan-500/90 to-blue-700/90 shadow-[0_0_20px_rgba(0,240,255,0.4)] font-bold scale-[1.02]'
                    : 'text-white/70 border-white/10 bg-[#060c18]/80 hover:border-cyan-400/40 hover:text-white'
                }`}
              >
                <span>{category}</span>
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                  isActive ? 'bg-black/40 text-cyan-200' : 'bg-white/10 text-white/50'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Responsive Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="group relative rounded-3xl bg-[#070e1c]/90 border border-blue-500/30 overflow-hidden hover:border-cyan-400/80 transition-all duration-500 hover:shadow-[0_15px_45px_rgba(0,240,255,0.15)] flex flex-col justify-between"
              >
                {/* Cyber Corner Laser Brackets */}
                <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400/60 z-20 pointer-events-none group-hover:border-cyan-400 transition-colors"></div>
                <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400/60 z-20 pointer-events-none group-hover:border-cyan-400 transition-colors"></div>

                {/* Top Section: Media Preview Banner */}
                <div className="relative w-full h-56 sm:h-60 overflow-hidden bg-black/60">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
                  />

                  {/* Dark Radial Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070e1c] via-transparent to-black/50 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-cyan-400/40 text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-widest shadow-lg">
                      {project.mark}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-blue-600/80 backdrop-blur-md text-[10px] font-mono text-white font-bold uppercase tracking-wider">
                      {project.powerScore}
                    </span>
                  </div>

                  {/* Category Pill Tag */}
                  <div className="absolute bottom-3 left-4 z-10">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 font-bold bg-[#070e1c]/90 px-3 py-1 rounded-md border border-cyan-400/30">
                      // {project.category}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400/80 tracking-wider">
                      {project.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed line-clamp-3 pt-1">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="space-y-4 pt-3 border-t border-white/5">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[10px] font-mono text-white/75 group-hover:border-cyan-400/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="flex items-center justify-between gap-3 pt-1">
                      <button
                        onClick={() => handleOpenModal(project)}
                        onMouseEnter={playHoverSFX}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600/80 to-cyan-500/80 hover:from-blue-500 hover:to-cyan-400 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                      >
                        <span>EXPLORE HUD</span>
                        <span className="text-xs">→</span>
                      </button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Visit Live Project"
                          title="Visit fetc.in"
                          onMouseEnter={playHoverSFX}
                          onClick={playClickSFX}
                          className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/20 transition-all flex items-center justify-center"
                        >
                          <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View Source Code"
                          title="GitHub Source"
                          onMouseEnter={playHoverSFX}
                          onClick={playClickSFX}
                          className="p-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white/70 hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-white/[0.08] transition-all"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Pending Classified Transmission Companion Card */}
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="rounded-3xl bg-[#050b17]/60 border border-dashed border-cyan-400/30 p-8 flex flex-col justify-between items-center text-center space-y-6 hover:border-cyan-400/60 transition-colors"
            >
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.2)]">
                <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></span>
              </div>

              <div className="space-y-2">
                <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                  // TRANSMISSION NODE: PENDING ARCHIVE
                </div>
                <h3 className="text-lg font-bold text-white">
                  More Exhibits Loading...
                </h3>
                <p className="text-xs text-white/50 font-light leading-relaxed max-w-xs">
                  Additional productions across 3D Animation, Game Systems, and Video Editing are currently being classified.
                </p>
              </div>

              <a
                href="#contact"
                onMouseEnter={playHoverSFX}
                onClick={playClickSFX}
                className="px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 text-xs font-mono text-cyan-300 hover:text-white uppercase tracking-wider transition-all"
              >
                REQUEST CUSTOM DEMO →
              </a>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Bottom Stark Note */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40 uppercase tracking-widest">
          <p>// PRODUCTION PORTFOLIO &bull; DESIGNED & CODED BY MEET PAVAGADHI</p>
          <a 
            href="#contact" 
            className="text-cyan-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>COMMISSION CUSTOM PROJECT</span>
            <span>→</span>
          </a>
        </div>

      </div>

      {/* =======================================================================
          INTERACTIVE HOLOGRAPHIC DETAIL MODAL
         ======================================================================= */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/85 backdrop-blur-xl"
            />

            {/* Modal Dialog Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl rounded-[2rem] bg-[#070e1c] border-2 border-cyan-400/60 shadow-[0_0_80px_rgba(0,240,255,0.25)] overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto"
            >
              {/* Corner Laser Brackets */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-30"></div>
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none z-30"></div>

              {/* Modal Top Header Bar */}
              <div className="px-6 py-4 bg-[#0a1426] border-b border-cyan-400/30 flex items-center justify-between z-20">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00F0FF] animate-pulse"></span>
                  <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
                    // STARK TELEMETRY &bull; {selectedProject.mark}
                  </span>
                </div>

                <button
                  onClick={handleCloseModal}
                  onMouseEnter={playHoverSFX}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-white/70 hover:text-cyan-300 transition-colors border border-white/10"
                  aria-label="Close Project Modal"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-6 scrollbar-thin">
                
                {/* Media Banner */}
                <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-cyan-400/30 bg-black/80">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070e1c] via-transparent to-black/30 pointer-events-none" />

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="px-3 py-1 rounded bg-black/80 backdrop-blur-md border border-cyan-400/40 text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-widest">
                        {selectedProject.category}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2 drop-shadow-md">
                        {selectedProject.title}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded bg-cyan-500/20 border border-cyan-400/40 text-xs font-mono text-cyan-300 font-bold">
                      POWER {selectedProject.powerScore}
                    </span>
                  </div>
                </div>

                {/* Subtitle & Deep Description */}
                <div className="space-y-3">
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                    // SPECIFICATION & ARCHITECTURE OVERVIEW
                  </div>
                  <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
                    {selectedProject.fullDescription}
                  </p>
                </div>

                {/* Technical Highlights Checklist */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                    // KEY ARCHITECTURAL ACHIEVEMENTS
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProject.highlights.map((highlight, idx) => (
                      <div 
                        key={idx}
                        className="p-3 rounded-xl bg-blue-950/30 border border-cyan-400/20 flex items-start gap-3"
                      >
                        <span className="w-5 h-5 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center text-cyan-300 text-xs flex-shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span className="text-xs text-white/80 font-light leading-snug">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                    // TECHNOLOGIES & TOOLS DEPLOYED
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-xs font-mono text-cyan-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer Action Buttons */}
              <div className="p-6 bg-[#0a1426] border-t border-cyan-400/30 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center gap-2 hover:scale-105"
                    >
                      <span>LAUNCH FETC.IN</span>
                      <span>↗</span>
                    </a>
                  )}

                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      <span>SOURCE CODE</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  DISMISS
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Projects;
