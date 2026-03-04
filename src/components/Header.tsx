import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
    onOpenMenu: () => void;
    isOpen: boolean;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
    isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ onOpenMenu, isOpen, theme, onToggleTheme, isScrolled }) => {
    // Since the frame is var(--text-color), in light mode it's white, and in dark mode it's dark.
    // So the logo inside the frame needs to contrast with the frame.
    // This means we should ALWAYS use the inverse of the text color.
    const currentLogo = theme === 'light' ? '/Black_Sohan.png' : '/White_Sohan.png';
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 600);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const hideTopFrame = isOpen && isMobile;

    return (
        <>
            {/* The global frame wrapper */}
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 110,
                    pointerEvents: 'none',
                    overflow: 'hidden'
                }}
            >
                {/* The main 20px frame using native safe bounds to support iOS/WebKit rendering */}
                <div
                    className="global-frame-border"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        boxSizing: 'border-box'
                    }} />

                {/* Top Cutout SVG */}
                <motion.div
                    className="top-svg-wrapper"
                    initial={{ x: "-50%", y: -150, opacity: 0 }}
                    animate={{
                        x: "-50%",
                        y: hideTopFrame ? -150 : 0,
                        opacity: hideTopFrame ? 0 : 1
                    }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        position: 'absolute',
                        left: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        pointerEvents: 'none'
                    }}>
                    <svg width="220" height="36" viewBox="0 0 220 36" style={{ display: 'block', overflow: 'visible' }} shapeRendering="crispEdges">
                        <path d="M 0 0 C 20 0, 20 36, 40 36 L 180 36 C 200 36, 200 0, 220 0 Z" fill="var(--text-color)" />
                    </svg>

                    <div style={{ position: 'absolute', top: '-15px', left: 0, right: 0, height: '51px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'auto' }}>
                        <div style={{ height: '28px', position: 'relative', width: '140px', display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>
                            <img
                                src={currentLogo}
                                alt="Sohan Logo"
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'contain',
                                    position: 'absolute'
                                }}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Bottom Cutout SVG */}
                <motion.div
                    className="bottom-svg-wrapper"
                    initial={{ x: "-50%", y: 150, opacity: 0 }}
                    animate={{
                        x: "-50%",
                        y: isScrolled ? 150 : 0,
                        opacity: isScrolled ? 0 : 1
                    }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        position: 'absolute',
                        left: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        pointerEvents: 'none'
                    }}>
                    <svg width="180" height="32" viewBox="0 0 180 32" style={{ display: 'block', overflow: 'visible' }} shapeRendering="crispEdges">
                        <path d="M 0 32 C 24 32, 24 0, 48 0 L 132 0 C 156 0, 156 32, 180 32 Z" fill="var(--text-color)" />
                    </svg>

                    {/* Scroll Down text inside Bottom Cutout */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '46px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3px', pointerEvents: 'auto' }}>
                        <span style={{
                            color: 'var(--bg-color)',
                            fontSize: '9px',
                            fontWeight: 600,
                            letterSpacing: '0.15em',
                            cursor: 'pointer',
                            marginTop: '2px'
                        }}>
                            SCROLL DOWN
                        </span>
                        <div style={{ width: '12px', height: '2px', backgroundColor: 'var(--bg-color)', borderRadius: '2px' }} />
                    </div>
                </motion.div>

                {/* Right Top Icons (Floating inside the frame) */}
                <div style={{
                    position: 'absolute',
                    top: 'clamp(24px, 5vw, 40px)',
                    right: 'clamp(24px, 5vw, 40px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    pointerEvents: 'auto'
                }}>
                    {!isOpen && (
                        <motion.div className="header-theme-toggle" layoutId="theme-toggle" style={{ borderRadius: '50%' }}>
                            <button
                                onClick={onToggleTheme}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%',
                                    color: 'var(--text-color)',
                                    width: '40px',
                                    height: '40px',
                                }}
                            >
                                <AnimatePresence mode="wait">
                                    {theme === 'light' ? (
                                        <motion.svg
                                            key="sun"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.2 }}
                                            width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
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
                                            key="moon"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.2 }}
                                            width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                        >
                                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                        </motion.svg>
                                    )}
                                </AnimatePresence>
                            </button>
                        </motion.div>
                    )}

                    {!isOpen && (
                        <motion.div layoutId="menu-toggle" style={{ borderRadius: '50%' }}>
                            <button
                                onClick={onOpenMenu}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '6px',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                                    <div style={{ width: '26px', height: '2px', borderRadius: '2px', backgroundColor: 'var(--text-color)' }}></div>
                                    <div style={{ width: '16px', height: '2px', borderRadius: '2px', backgroundColor: 'var(--text-color)' }}></div>
                                </div>
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Header;
