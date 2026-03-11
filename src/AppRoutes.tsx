import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// ── Lazy-load pages ──────────────────────────────────────────────────────────
const Home = lazy(() => import('./pages/Home'));
const Works = lazy(() => import('./pages/Works'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const Skills = lazy(() => import('./pages/Skills'));

const SectionFallback = () => (
    <div style={{ minHeight: '100vh', width: '100%', backgroundColor: 'var(--bg-color)' }} aria-hidden="true" />
);

const AppRoutes: React.FC<{ isLoading: boolean, theme: 'light' | 'dark' }> = ({ isLoading, theme }) => {
    const location = useLocation();

    // Ensure we always start at the top when navigating to a new page
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [location.pathname]);

    return (
        <AnimatePresence mode="wait">
            <Suspense fallback={<SectionFallback />}>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home theme={theme} isLoading={isLoading} />} />
                    <Route path="/works" element={<Works theme={theme} />} />
                    <Route path="/contact" element={<ContactPage theme={theme} />} />
                    <Route path="/about" element={<AboutPage theme={theme} />} />
                    <Route path="/skills" element={<Skills theme={theme} />} />
                </Routes>
            </Suspense>
        </AnimatePresence>
    );
};

export default AppRoutes;
