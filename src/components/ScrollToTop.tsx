import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop: React.FC<{ theme?: 'light' | 'dark' }> = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    onClick={scrollToTop}
                    title="SCROLL TO TOP"
                    style={{
                        position: 'fixed',
                        bottom: 'clamp(1rem, 4vw, 2rem)',
                        right: 'clamp(1rem, 4vw, 2rem)',
                        width: 'clamp(40px, 10vw, 50px)',
                        height: 'clamp(40px, 10vw, 50px)',
                        backgroundColor: 'var(--text-color)',
                        color: 'var(--bg-color)',
                        border: 'none',
                        borderRadius: '0', // Industrial square
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 90,
                        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                        clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)'
                    }}
                    whileHover={{ scale: 1.05, backgroundColor: 'var(--accent-color)' }}
                    whileTap={{ scale: 0.95 }}
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                    >
                        <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
