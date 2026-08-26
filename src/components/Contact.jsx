import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Contact = () => {
  const ref = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web Development',
    message: '',
    permission: false
  });

  const [submitted, setSubmitted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.permission) {
      alert("Please accept the contact permission checkbox.");
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', service: 'Web Development', message: '', permission: false });
    }, 4000);
  };

  return (
    <section ref={ref} id="contact" className="bg-[#030712] w-full min-h-screen relative overflow-hidden py-32 px-6 md:px-12 select-none">
      
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[200px] pointer-events-none z-0"></div>
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[180px] pointer-events-none z-0"></div>

      {/* Background Parallax Watermark Text */}
      <motion.div 
        style={{ y }}
        className="absolute top-12 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 opacity-10"
      >
        <h1 
          className="text-[24vw] leading-[0.75] font-black text-cyan-400 uppercase tracking-tighter select-none scale-y-[1.4] origin-top"
          style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}
        >
          STARK OS
        </h1>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono uppercase tracking-widest text-cyan-400 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shadow-[0_0_10px_#00F0FF]"></span>
            <span>PROTOCOL 04 // SECURE COMMS LINK</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
            INITIATE DIRECT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]">
              SIGNAL TRANSMISSION.
            </span>
          </h2>
          <p className="text-white/60 text-xs md:text-sm max-w-md font-light leading-relaxed">
            Have a 3D animation, game engine integration, or full-stack web project in mind? Reach out directly.
          </p>
        </div>

        {/* Main 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info & Availability */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Status Card */}
            <div className="p-8 rounded-3xl bg-[#090d16]/90 backdrop-blur-2xl border border-blue-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden group hover:border-cyan-400/60 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#00F0FF] animate-pulse"></span>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">STATUS: ONLINE & AVAILABLE</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ready for Next Project</h3>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                Accepting freelance assignments, 3D character animation gigs, game asset production, and web development projects worldwide.
              </p>
            </div>

            {/* Direct Channel Items */}
            <div className="space-y-4">
              
              {/* Phone Card */}
              <a 
                href="tel:+919824999054"
                className="p-6 rounded-2xl bg-[#090d16]/80 backdrop-blur-xl border border-white/10 flex items-center gap-5 hover:border-blue-500/60 hover:bg-[#0d1424]/90 transition-all duration-300 group shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">DIRECT PHONE</span>
                  <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">+91-9824999054</span>
                </div>
              </a>

              {/* Email Card */}
              <a 
                href="mailto:haneypavagadhi1234@gmail.com"
                className="p-6 rounded-2xl bg-[#090d16]/80 backdrop-blur-xl border border-white/10 flex items-center gap-5 hover:border-blue-500/60 hover:bg-[#0d1424]/90 transition-all duration-300 group shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                  <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">EMAIL ADDRESS</span>
                  <span className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate block">haneypavagadhi1234@gmail.com</span>
                </div>
              </a>

              {/* Location Card */}
              <div className="p-6 rounded-2xl bg-[#090d16]/80 backdrop-blur-xl border border-white/10 flex items-center gap-5 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">BASE LOCATION</span>
                  <span className="text-sm font-bold text-white">Gujarat, India</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Modern Interactive Form Card */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 md:p-12 rounded-[2.5rem] bg-[#090d16]/95 backdrop-blur-3xl border border-blue-500/30 shadow-[0_30px_70px_rgba(59,130,246,0.2)] relative overflow-hidden"
            >
              {/* Internal Accent Lighting */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-90" />

              {submitted ? (
                <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_30px_#00F0FF] animate-bounce">
                    <svg className="w-8 h-8 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-white">TRANSMISSION RECEIVED!</h3>
                  <p className="text-xs md:text-sm text-cyan-300 font-mono max-w-sm">
                    Thank you {formData.name || 'Friend'}! Your message has been logged. Meet will connect with you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                        Full Name *
                      </label>
                      <input 
                        type="text" 
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Tony Stark" 
                        required
                        className="w-full bg-[#050914] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-white/30"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                        Email Address *
                      </label>
                      <input 
                        type="email" 
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="stark@industries.com" 
                        required
                        className="w-full bg-[#050914] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-white/30"
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div className="space-y-2">
                    <label htmlFor="service" className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                      Project Type / Service
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-[#050914] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all cursor-pointer"
                    >
                      <option value="Web Development">Full-Stack Web Development</option>
                      <option value="3D Animation & Rigging">3D Character Animation & Rigging</option>
                      <option value="Game Development">Game Engine Asset Integration</option>
                      <option value="Graphic & Video Editing">Visual Media & Video Post-Production</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                      Project Message *
                    </label>
                    <textarea 
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your project scope, timeline, or inquiries..." 
                      rows={4}
                      required
                      className="w-full bg-[#050914] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-white/30 resize-none"
                    />
                  </div>

                  {/* Permission Checkbox */}
                  <div className="flex items-start gap-3 pt-2">
                    <input 
                      type="checkbox" 
                      id="permission" 
                      checked={formData.permission}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-white/30 bg-[#050914] text-blue-500 focus:ring-0 cursor-pointer"
                      style={{ accentColor: "#3B82F6" }}
                    />
                    <label htmlFor="permission" className="text-xs text-white/70 font-light leading-relaxed cursor-pointer">
                      I give permission to contact me at this email regarding project inquiries and collaboration.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:to-cyan-400 text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>SEND DIRECT MESSAGE</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>

                </form>
              )}

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;