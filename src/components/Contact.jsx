import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const ref = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '3D ANIMATION & RIGGING',
    message: '',
    permission: false
  });

  const [activeNode, setActiveNode] = useState('phone');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const servicesList = [
    '3D ANIMATION & RIGGING',
    'FULL-STACK WEB DEV',
    'GAME ASSET INTEGRATION',
    'VISUAL MEDIA & EDITING'
  ];

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.permission) {
      alert("Please check the permission box to engage transmission.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', service: '3D ANIMATION & RIGGING', message: '', permission: false });
        setTimeout(() => {
          setSubmitted(false);
        }, 6000);
      } else {
        setErrorMessage(data.error || 'Failed to dispatch transmission.');
      }
    } catch (err) {
      console.error('Transmission error:', err);
      setErrorMessage('Network error while dispatching transmission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} id="contact" className="bg-[#02050b] w-full min-h-screen relative overflow-hidden py-28 px-4 sm:px-6 md:px-12 select-none">
      
      {/* Background Matrix/Grid Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `radial-gradient(rgba(59, 130, 246, 0.4) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Cyber Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[220px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-12">

        {/* HUD Top Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-blue-500/20 text-xs font-mono text-cyan-400">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#00F0FF] animate-pulse"></span>
            <span className="font-bold tracking-widest uppercase">// STARK COMMS LINK v9.2</span>
            <span className="text-white/30">|</span>
            <span className="text-white/70">SIGNAL: 99.8% ENCRYPTED</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-white/50 tracking-widest uppercase">
            <span>LOC: 21.1702° N, 72.8311° E</span>
            <span>SYSTEM: STARK HUD</span>
          </div>
        </div>

        {/* Main Terminal Frame Layout */}
        <div className="relative bg-[#060b17]/95 backdrop-blur-3xl border border-blue-500/40 rounded-[2.5rem] p-6 sm:p-10 md:p-14 shadow-[0_0_80px_rgba(59,130,246,0.2)] overflow-hidden">
          
          {/* Cyber Corner HUD Brackets */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

          {/* Top Hologram Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-cyan-400 bg-blue-500/10 px-3 py-1 rounded border border-blue-500/30 uppercase tracking-widest">
                TRANSMISSION TERMINAL
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                SEND DIRECT <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                  SIGNAL & SPECIFICATIONS.
                </span>
              </h2>
            </div>
            <p className="text-white/60 text-xs sm:text-sm font-light max-w-xs leading-relaxed border-l-2 border-cyan-400/50 pl-4">
              Direct connection for 3D animation, game engine projects, web architecture, and video post-production.
            </p>
          </div>

          {/* Asymmetric 2-Column Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10 items-start">

            {/* Left Column: Interactive Signal Nodes */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                // SELECT CHANNEL NODE
              </div>

              {/* Phone Node */}
              <div 
                onClick={() => setActiveNode('phone')}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-4 ${
                  activeNode === 'phone' 
                    ? 'bg-blue-500/20 border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.2)]' 
                    : 'bg-[#030712]/80 border-white/10 hover:border-blue-500/40'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-cyan-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">NODE A // TELEPHONY</span>
                  <a href="tel:+919824999054" className="text-sm font-bold text-white hover:text-cyan-300 transition-colors">+91-9824999054</a>
                </div>
              </div>

              {/* Email Node */}
              <div 
                onClick={() => setActiveNode('email')}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-4 ${
                  activeNode === 'email' 
                    ? 'bg-blue-500/20 border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.2)]' 
                    : 'bg-[#030712]/80 border-white/10 hover:border-blue-500/40'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">NODE B // ENCRYPTED MAIL</span>
                  <a href="mailto:haneypavagadhi1234@gmail.com" className="text-xs sm:text-sm font-bold text-white hover:text-cyan-300 transition-colors truncate block">
                    haneypavagadhi1234@gmail.com
                  </a>
                </div>
              </div>

              {/* Location Node */}
              <div 
                onClick={() => setActiveNode('location')}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-4 ${
                  activeNode === 'location' 
                    ? 'bg-blue-500/20 border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.2)]' 
                    : 'bg-[#030712]/80 border-white/10 hover:border-blue-500/40'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">NODE C // GEO COORDINATES</span>
                  <span className="text-sm font-bold text-white">Surat, Gujarat, India</span>
                </div>
              </div>

              {/* Live Core Specs Box */}
              <div className="p-5 rounded-2xl bg-[#030712]/90 border border-blue-500/30 text-xs font-mono space-y-2">
                <div className="text-cyan-400 font-bold uppercase tracking-wider">// SYSTEM DISPATCH</div>
                <div className="text-white/70">AVAILABILITY: FREELANCE & FULL-TIME</div>
                <div className="text-white/50 text-[11px]">AVG RESPONSE TIME: &lt; 2 HOURS</div>
              </div>

            </div>

            {/* Right Column: Hologram Form Interface */}
            <div className="lg:col-span-8">
              {submitted ? (
                <div className="py-20 rounded-2xl bg-[#030712]/90 border border-cyan-400/50 flex flex-col items-center justify-center text-center space-y-4 shadow-[0_0_50px_rgba(0,240,255,0.2)]">
                  <div className="w-20 h-20 rounded-full bg-cyan-400/20 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_40px_#00F0FF] animate-pulse">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-widest">TRANSMISSION DISPATCHED</h3>
                  <p className="text-xs sm:text-sm text-cyan-300 font-mono max-w-md px-4">
                    Signal parameters locked! Thank you {formData.name}. Meet Pavagadhi will execute response protocol shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Service Selector Tabs */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                      // SELECT PROJECT CAPABILITY MATRIX
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {servicesList.map((service, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, service }))}
                          className={`py-3 px-2 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 border text-center ${
                            formData.service === service
                              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 border-cyan-400 text-white shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                              : 'bg-[#030712]/90 border-white/10 text-white/60 hover:border-blue-500/40 hover:text-white'
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name Input */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                        AGENT / CLIENT NAME *
                      </label>
                      <input 
                        type="text" 
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="ENTER YOUR NAME" 
                        required
                        className="w-full bg-[#030712] border border-blue-500/30 rounded-xl px-4 py-3.5 text-sm text-white font-mono focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all placeholder-white/30"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                        RETURN EMAIL ADDRESS *
                      </label>
                      <input 
                        type="email" 
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="NAME@DOMAIN.COM" 
                        required
                        className="w-full bg-[#030712] border border-blue-500/30 rounded-xl px-4 py-3.5 text-sm text-white font-mono focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all placeholder-white/30"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                      TRANSMISSION SPECIFICATIONS & SCOPE *
                    </label>
                    <textarea 
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="ENTER PROJECT REQUIREMENTS, DELIVERABLES, OR TIMELINE..." 
                      rows={5}
                      required
                      className="w-full bg-[#030712] border border-blue-500/30 rounded-xl px-4 py-3.5 text-sm text-white font-mono focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all placeholder-white/30 resize-none"
                    />
                  </div>

                  {/* Permission Box */}
                  <div className="flex items-start gap-3 pt-2">
                    <input 
                      type="checkbox" 
                      id="permission" 
                      checked={formData.permission}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-cyan-400/40 bg-[#030712] text-cyan-400 focus:ring-0 cursor-pointer"
                      style={{ accentColor: "#00F0FF" }}
                    />
                    <label htmlFor="permission" className="text-xs text-white/70 font-mono leading-relaxed cursor-pointer select-none">
                      AUTHORIZE TRANSMISSION & DIRECT COMMUNICATIONS PROTOCOL.
                    </label>
                  </div>

                  {/* Error Message Box */}
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-mono">
                      ❌ {errorMessage}
                    </div>
                  )}

                  {/* Submit Laser Action Button */}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:to-cyan-400 text-white font-mono font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_35px_rgba(59,130,246,0.6)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? 'DISPATCHING TRANSMISSION...' : 'ENGAGE TRANSMISSION PROTOCOL'}</span>
                    <svg className={`w-4 h-4 ${isSubmitting ? 'animate-spin' : 'animate-pulse'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {isSubmitting ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v1m0 14v1m8-8h-1M5 8h-1m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      )}
                    </svg>
                  </button>

                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;