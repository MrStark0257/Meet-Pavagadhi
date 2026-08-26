import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-white py-16 px-6 md:px-12 border-t border-white/10 select-none relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col space-y-12">

        {/* Top Section: Brand & Quick Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-white/10">
          <div className="space-y-2">
            <div className="text-2xl font-black text-white tracking-tighter flex items-center gap-2 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3B82F6] animate-pulse"></span>
              MEET <span className="text-cyan-400">//</span> PAVAGADHI
            </div>
            <p className="text-xs font-mono text-cyan-400/80 tracking-widest uppercase">
              // ELECTRIC BLUE EDITION &bull; CYBER DEVELOPER SUITE
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex flex-wrap gap-6 md:gap-8 text-xs font-mono uppercase tracking-widest text-white/70">
            <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
            <a href="#expertise" className="hover:text-blue-400 transition-colors">Expertise</a>
            <a href="#skills" className="hover:text-blue-400 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </nav>
        </div>

        {/* Middle Section: Socials & External Profiles */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs font-mono text-white/60">
          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors uppercase tracking-wider"
            >
              GitHub //
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors uppercase tracking-wider"
            >
              LinkedIn //
            </a>
            <a
              href="https://leetcode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors uppercase tracking-wider"
            >
              LeetCode //
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-white/50 tracking-widest uppercase">
            <a href="tel:+919824999054" className="hover:text-blue-400 transition-colors">+91-9824999054</a>
            <span>//</span>
            <a href="mailto:haneypavagadhi1234@gmail.com" className="hover:text-blue-400 transition-colors">haneypavagadhi1234@gmail.com</a>
            <span>//</span>
            <span>LOCATION: GUJARAT, INDIA</span>
          </div>
        </div>

        {/* Bottom Copyright & Cinematic Tagline */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-white/5 text-[11px] font-mono text-white/40 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Meet Pavagadhi. All Rights Reserved.</p>
          <p className="text-blue-400/80">CYBER SUITE OPERATIONAL &bull; BUILT WITH REACT & ELECTRIC BLUE HUD ENGINE</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;