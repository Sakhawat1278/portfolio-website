import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Hero from './sections/Hero';
import Preloader from './components/Preloader';
import Lenis from 'lenis';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { SpeedInsights } from "@vercel/speed-insights/react";

// ── Lazy-load below-fold sections ──────────────────────────────────────────
// These are not needed on initial render and will be code-split automatically
const About = lazy(() => import('./sections/About'));
const Services = lazy(() => import('./sections/Services'));
const TechStack = lazy(() => import('./sections/TechStack'));
const SelectedWorks = lazy(() => import('./sections/SelectedWorks'));
const Testimonials = lazy(() => import('./sections/Testimonials'));
const ExperienceEducation = lazy(() => import('./sections/ExperienceEducation'));
const Contact = lazy(() => import('./sections/Contact'));
const Footer = lazy(() => import('./sections/Footer'));

// Minimal inline fallback — no layout shift, no external deps
const SectionFallback = () => (
  <div style={{ minHeight: '30vh', width: '100%' }} aria-hidden="true" />
);

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return (saved as 'light' | 'dark') || 'light';
  });
  const [isLoading, setIsLoading] = useState(true);

  const footerRef = useRef<HTMLDivElement>(null);

  const isFooterInView = useInView(footerRef, {
    margin: "0px 0px -95% 0px",
    amount: 0
  });

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.18, wheelMultiplier: 0.9 });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      lenisRef.current = null;
    };
  }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      lenisRef.current?.stop();
    } else {
      document.body.style.overflow = 'unset';
      lenisRef.current?.start();
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  return (
    <div className="smooth-scroll-wrapper" style={{ width: '100%', backgroundColor: 'var(--bg-color)' }}>
      <AnimatePresence>
        {isLoading && (
          <Preloader theme={theme} onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Header
          onOpenMenu={toggleMenu}
          isOpen={isMenuOpen}
          theme={theme}
          onToggleTheme={toggleTheme}
          isInverted={isFooterInView}
        />
        <Menu isOpen={isMenuOpen} onClose={toggleMenu} theme={theme} />

        <Hero isReady={!isLoading} />

        <div
          className="smooth-scroll-content"
          style={{ position: 'relative', zIndex: 1, backgroundColor: 'transparent', pointerEvents: 'none' }}
        >
          <main style={{ backgroundColor: 'var(--bg-color)', position: 'relative', zIndex: 2, pointerEvents: 'auto' }}>

            <Suspense fallback={<SectionFallback />}>
              <About theme={theme} />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Services theme={theme} />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <TechStack />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <SelectedWorks />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Testimonials />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <ExperienceEducation />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Contact theme={theme} />
            </Suspense>

            <div ref={footerRef}>
              <Suspense fallback={<SectionFallback />}>
                <Footer theme={theme} />
              </Suspense>
            </div>
          </main>
        </div>
      </motion.div>
      <SpeedInsights />
    </div>
  );
};

export default App;
