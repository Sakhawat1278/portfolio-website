import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Hero from './sections/Hero';
import About from './sections/About';
import Footer from './sections/Footer';
import Preloader from './components/Preloader';
import Lenis from 'lenis';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return (saved as 'light' | 'dark') || 'light';
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Detect if footer is visible to invert header
  const isFooterInView = useInView(footerRef, {
    margin: "-10% 0px -90% 0px" // Trigger when footer enters the top 10% of viewport
  });

  useEffect(() => {
    if (!scrollWrapperRef.current || !contentRef.current) return;

    const lenis = new Lenis({
      wrapper: scrollWrapperRef.current,
      content: contentRef.current,
      lerp: 0.08, // Premium cinematic easing weight 
      wheelMultiplier: 0.9,
    });

    lenis.on('scroll', (e) => {
      setIsScrolled(e.scroll > 50);
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  // Cinematic Entrance is now handled by the Preloader component

  return (
    <div ref={scrollWrapperRef} className="smooth-scroll-wrapper" style={{ position: 'fixed', inset: 0, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch', width: '100%', backgroundColor: 'var(--bg-color)' }}>
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
          isScrolled={isScrolled}
          isInverted={isFooterInView}
        />
        <Menu isOpen={isMenuOpen} onClose={toggleMenu} theme={theme} onToggleTheme={toggleTheme} />

        <Hero theme={theme} />

        <div ref={contentRef} className="smooth-scroll-content" style={{ position: 'relative', zIndex: 1, backgroundColor: 'transparent' }}>
          {/* Spacer for fixed Hero */}
          <div style={{ height: '100vh', pointerEvents: 'none' }} />

          <main style={{ backgroundColor: 'var(--bg-color)', position: 'relative', zIndex: 2 }}>
            {/* Top Shadow Blend (Slides over Hero) */}
            <div style={{
              position: 'absolute',
              top: '-100px', // Starts slightly above to ensure zero gap
              left: 0,
              right: 0,
              height: '150px',
              pointerEvents: 'none',
              zIndex: 4
            }}>
              {/* Light Theme Blend */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent, #FAF7F0 60%)',
                opacity: theme === 'dark' ? 1 : 0,
                transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
              }} />
              {/* Dark Theme Blend */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent, #323232 60%)',
                opacity: theme === 'light' ? 1 : 0,
                transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
              }} />
            </div>

            {/* Other sections will go here and slide over the hero */}

            <About containerRef={scrollWrapperRef} />

            <div ref={footerRef}>
              <Footer />
            </div>
          </main>
        </div>
      </motion.div>
    </div>
  );
};

export default App;
