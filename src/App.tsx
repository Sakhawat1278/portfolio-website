import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Hero from './sections/Hero';
import Lenis from 'lenis';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
  }, [theme]);

  const curtainColor = theme === 'dark' ? '#323232' : '#FAF7F0';

  return (
    <div ref={scrollWrapperRef} className="smooth-scroll-wrapper" style={{ position: 'fixed', inset: 0, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch', width: '100%', backgroundColor: 'var(--bg-color)' }}>
      {/* Cinematic Entrance Curtain */}
      <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: '-100%', opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: curtainColor,
          zIndex: 999,
          pointerEvents: 'none'
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Header onOpenMenu={toggleMenu} isOpen={isMenuOpen} theme={theme} onToggleTheme={toggleTheme} isScrolled={isScrolled} />
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

            {/* Dummy section to test scroll effect */}
            <section
              style={{
                height: '200vh',
                backgroundColor: 'var(--bg-color)',
                color: 'var(--text-color)',
                padding: '120px 0',
                textAlign: 'center',
                position: 'relative',
                zIndex: 3
              }}
            >
              <div className="container">
                <h2 style={{ fontSize: '3rem', fontWeight: 600, marginBottom: '2rem' }}>
                  Scroll down to see the logo transition...
                </h2>
                <p style={{ fontSize: '1.2rem', fontWeight: 300, opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
                  The logo in the header will elegantly transform into an icon as you explore deeper.
                  This is part of the premium, advanced technique usage you requested.
                </p>
              </div>
            </section>
          </main>
        </div>
      </motion.div>
    </div>
  );
};

export default App;
