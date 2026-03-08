import React from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import HoverButton from './HoverButton';

interface HeaderProps {
    onOpenMenu: () => void;
    isOpen: boolean;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
    isInverted?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onOpenMenu, isOpen, theme, onToggleTheme, isInverted }) => {
    const currentLogo = theme === 'light' ? '/New_logo_white.png' : '/New_logo_dark.png';

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{
                opacity: isInverted ? 0 : 1,
                y: isInverted ? -20 : 0
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 600,
                pointerEvents: 'none',
                color: 'var(--text-color)'
            }}
        >
            <div style={{
                width: '100%',
                height: 'var(--header-height)',
                padding: '0 var(--section-px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-color)',
                backgroundColor: isOpen ? 'transparent' : 'var(--bg-color)',
                transition: 'background-color 0.3s ease',
                pointerEvents: 'auto'
            }}>
                {/* Left: Logo */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                    <img
                        src={currentLogo}
                        alt="Sohan Logo"
                        className="header-logo"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    />
                </div>

                {/* Right Area: Theme Toggle, Menu & Location */}
                {/* Right Area: Controls */}
                <div className="header-controls" style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '20px' }}>
                    {/* Theme Toggle, CV Download & Menu */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        {/* CV Download Button */}
                        <HoverButton
                            href="/Sakhawat_Hossain_CV_(5.0).pdf"
                            variant="outline"
                            download="Sakhawat_Hossain_CV.pdf"
                            className="header-cv-button"
                            style={{ height: '40px', padding: '0 20px', borderColor: 'var(--border-color)' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '10px', letterSpacing: '0.1em' }} className="cv-button-text">
                                    DOWNLOAD CV
                                </span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                            </div>
                        </HoverButton>

                        <ThemeToggle theme={theme} onToggle={onToggleTheme} />

                        <motion.div
                            onClick={onOpenMenu}
                            whileHover={{ opacity: 0.7 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                cursor: 'pointer',
                                padding: '8px 0',
                                backgroundColor: 'transparent',
                                color: 'var(--text-color)'
                            }}
                        >
                            <div style={{ width: '45px', overflow: 'hidden' }}>
                                <span style={{
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    letterSpacing: '-0.01em',
                                    fontFamily: 'var(--font-primary)',
                                    display: 'block'
                                }}>
                                    {isOpen ? 'Close' : 'Menu'}
                                </span>
                            </div>
                            <motion.div
                                animate={{ rotate: isOpen ? 45 : 0 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 4px)',
                                    gap: '5px',
                                    marginTop: '1px'
                                }}
                            >
                                {[...Array(4)].map((_, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            width: '4px',
                                            height: '4px',
                                            borderRadius: '50%',
                                            backgroundColor: 'currentColor'
                                        }}
                                    />
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
