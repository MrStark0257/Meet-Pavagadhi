import { useState, lazy, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import NetflixPreloader from './components/NetflixPreloader';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';

// Lazy load below-the-fold components for ultra-fast initial bundle load
const About = lazy(() => import('./components/About'));
const Expertise = lazy(() => import('./components/Expertise'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="bg-[#050505] min-h-screen text-white relative md:cursor-none selection:bg-blue-600 selection:text-white">
      {/* Cinematic Preloader */}
      {loading && <NetflixPreloader onComplete={() => setLoading(false)} />}

      {/* Global Mouse Hover Effects & Spotlight across ALL sections (Desktop only) */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      {/* Hero Section (Eager Load for Instant FCP) */}
      <Hero />

      {/* Below-the-fold Sections (Lazy Loaded with Suspense) */}
      <Suspense fallback={<div className="min-h-[200px] bg-[#050505]" />}>
        <About />
        <Expertise />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </Suspense>

      {/* Vercel Analytics & Speed Insights */}
      <Analytics />
      <SpeedInsights />
    </main>
  );
}

export default App;