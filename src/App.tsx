import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Preloader from './components/Preloader';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { SpeedInsights } from "@vercel/speed-insights/react";
import AppRoutes from './AppRoutes';

import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return (saved as 'light' | 'dark') || 'light';
  });
  const [isLoading, setIsLoading] = useState(true);

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
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <AnimatePresence>
        {isLoading && (
          <Preloader theme={theme} onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Header
          onOpenMenu={toggleMenu}
          isOpen={isMenuOpen}
          theme={theme}
          onToggleTheme={toggleTheme}
          isInverted={false} // Will handle inversion per page if needed
        />
        <Menu isOpen={isMenuOpen} onClose={toggleMenu} theme={theme} />

        <AppRoutes isLoading={isLoading} theme={theme} />
      </motion.div>
      <ScrollToTop theme={theme} />
      <SpeedInsights />
    </div>
  );
};

export default App;
