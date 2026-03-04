import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuProps {
    isOpen: boolean;
    onClose: () => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose, theme, onToggleTheme }) => {

    // Close menu on ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const cardVariants = {
        closed: {
            opacity: 0,
            scale: 0,
            transition: {
                duration: 0.25,
                ease: [0.4, 0, 1, 1] as any
            }
        },
        open: {
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring' as const,
                damping: 22,
                stiffness: 280,
                mass: 0.8
            }
        }
    };

    const linkContainerVariants = {
        open: {
            transition: { staggerChildren: 0.08, delayChildren: 0.25 }
        },
        closed: {
            transition: { staggerChildren: 0.04, staggerDirection: -1 }
        }
    };

    const linkVariants = {
        open: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.4, ease: "easeOut" as any }
        },
        closed: {
            x: 10,
            opacity: 0,
            transition: { duration: 0.3, ease: "easeIn" as any }
        }
    };

    const currentLogo = theme === 'light' ? '/Black_Sohan.png' : '/White_Sohan.png';

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Menu Card Wrapper */}
                    <div
                        className="menu-wrapper"
                        style={{
                            position: 'fixed',
                            zIndex: 120,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            pointerEvents: 'none'
                        }}
                    >
                        {/* The actual Card */}
                        <motion.div
                            className="menu-card"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={cardVariants}
                            style={{
                                backgroundColor: 'var(--card-bg)',
                                color: 'var(--card-text)',
                                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.25)',
                                transformOrigin: 'top right',
                                pointerEvents: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'visible'
                            }}
                        >
                            {/* Top row: theme toggle + close button aligned */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                marginBottom: '32px'
                            }}>
                                <div className="menu-mobile-logo" style={{ height: '28px' }}>
                                    <img
                                        src={currentLogo}
                                        alt="Sohan Logo"
                                        style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginLeft: 'auto' }}>
                                    <motion.div layoutId="theme-toggle" style={{ borderRadius: '50%' }}>
                                        <button
                                            onClick={onToggleTheme}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: '8px',
                                                borderRadius: '50%',
                                                color: 'var(--card-text)',
                                                backgroundColor: 'rgba(128, 128, 128, 0.1)',
                                                width: '40px',
                                                height: '40px'
                                            }}
                                        >
                                            <AnimatePresence mode="wait">
                                                {theme === 'light' ? (
                                                    <motion.svg
                                                        key="sun-card"
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.8 }}
                                                        transition={{ duration: 0.2 }}
                                                        width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                    >
                                                        <circle cx="12" cy="12" r="5"></circle>
                                                        <line x1="12" y1="1" x2="12" y2="3"></line>
                                                        <line x1="12" y1="21" x2="12" y2="23"></line>
                                                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                                        <line x1="1" y1="12" x2="3" y2="12"></line>
                                                        <line x1="21" y1="12" x2="23" y2="12"></line>
                                                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                                    </motion.svg>
                                                ) : (
                                                    <motion.svg
                                                        key="moon-card"
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.8 }}
                                                        transition={{ duration: 0.2 }}
                                                        width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                    >
                                                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                                    </motion.svg>
                                                )}
                                            </AnimatePresence>
                                        </button>
                                    </motion.div>

                                    <motion.div layoutId="menu-toggle" style={{ borderRadius: '50%' }}>
                                        <button
                                            onClick={onClose}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                backgroundColor: 'rgba(128, 128, 128, 0.1)',
                                                color: 'var(--card-text)',
                                            }}
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </motion.div>
                                </div>
                            </div>
                            <motion.nav
                                variants={linkContainerVariants}
                                style={{ display: 'flex', flexDirection: 'column' }}
                            >
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {['Home', 'Work', 'About', 'Contact'].map((item) => (
                                        <li key={item} style={{ marginBottom: '1.5rem' }}>
                                            <motion.a
                                                href={`#${item.toLowerCase()}`}
                                                onClick={onClose}
                                                variants={linkVariants}
                                                whileHover={{ x: 10 }}
                                                style={{
                                                    fontSize: 'clamp(2rem, 8vw, 2.5rem)',
                                                    fontWeight: 800,
                                                    display: 'block',
                                                    letterSpacing: '-0.02em',
                                                    color: 'var(--card-text)',
                                                    opacity: 0.9,
                                                    lineHeight: 1.1
                                                }}
                                            >
                                                {item}
                                            </motion.a>
                                        </li>
                                    ))}
                                </ul>
                            </motion.nav>

                            <motion.div
                                className="menu-bottom-section"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.8 }}
                                transition={{ delay: 0.4 }}
                                style={{
                                    marginTop: 'auto',
                                    paddingTop: '20px',
                                    borderTop: '1px solid rgba(128, 128, 128, 0.2)',
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-end',
                                    gap: '12px',
                                    color: 'var(--card-text)'
                                }}
                            >
                                <div>
                                    <p style={{ marginBottom: '8px', opacity: 0.6 }}>Let's connect</p>
                                    <a href="mailto:hello@sohan.com" style={{ fontWeight: 400, color: 'var(--card-text)' }}>hello@sohan.com</a>
                                </div>

                                <div style={{ display: 'flex', gap: '8px', marginRight: '-8px' }}>
                                    {[
                                        { name: 'LinkedIn', url: 'https://linkedin.com', icon: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>, extra: <><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></> },
                                        { name: 'GitHub', url: 'https://github.com', icon: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path> },
                                        { name: 'Facebook', url: 'https://facebook.com', icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path> }
                                    ].map((social) => (
                                        <motion.a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title={social.name}
                                            whileHover={{ backgroundColor: 'rgba(128, 128, 128, 0.1)', opacity: 1 }}
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '50%',
                                                opacity: 0.8,
                                                color: 'var(--card-text)'
                                            }}
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                {social.icon}
                                                {social.extra}
                                            </svg>
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Menu;
