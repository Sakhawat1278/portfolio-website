import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import HoverButton from './HoverButton';

interface MenuProps {
    isOpen: boolean;
    onClose: () => void;
    theme: 'light' | 'dark';
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
    const location = useLocation();
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

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 500,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    pointerEvents: 'none'
                }}>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'rgba(var(--bg-color-rgb), 0.6)',
                            cursor: 'pointer',
                            pointerEvents: 'auto'
                        }}
                    />

                    {/* Menu Sidebar */}
                    <motion.div
                        initial={{ y: '-100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '-100%', opacity: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="menu-container"
                        style={{
                            height: 'auto',
                            backgroundColor: 'var(--bg-color)',
                            color: 'var(--text-color)',
                            position: 'relative',
                            zIndex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            pointerEvents: 'auto',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                            paddingTop: 'var(--header-height)'
                        }}
                    >
                        {/* Directory Section */}
                        <div style={{
                            marginBottom: '40px',
                            borderBottom: '1px solid var(--border-color)',
                            paddingBottom: '40px',
                            paddingTop: '32px'
                        }}>

                            <nav>
                                <ul style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '4px'
                                }}>
                                    {[
                                        { label: 'Home', path: '/', number: '01' },
                                        { label: 'My Works', path: '/works', number: '02' },
                                        { label: 'About', path: '/about', number: '03' },
                                        { label: 'Skills', path: '/skills', number: '04' },
                                        { label: 'Contact', path: '/contact', number: '05' }
                                    ].map((item, index) => (
                                        <motion.li
                                            key={item.path}
                                            initial={{ opacity: 0, x: 15 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + (index * 0.05) }}
                                        >
                                            <Link
                                                to={item.path}
                                                onClick={onClose}
                                                style={{
                                                    textDecoration: 'none',
                                                    color: location.pathname === item.path ? 'var(--accent-color)' : 'inherit',
                                                    fontSize: 'clamp(24px, 4vw, 32px)',
                                                    fontWeight: 400,
                                                    display: 'flex',
                                                    alignItems: 'baseline',
                                                    gap: '12px',
                                                    letterSpacing: '-0.02em',
                                                    transition: 'all 0.3s ease',
                                                    fontFamily: 'var(--font-primary)',
                                                    padding: '6px 0',
                                                    paddingLeft: location.pathname === item.path ? '8px' : '0'
                                                }}
                                                onMouseEnter={(e: any) => {
                                                    if (location.pathname !== item.path) {
                                                        e.currentTarget.style.color = 'var(--accent-color)';
                                                        e.currentTarget.style.paddingLeft = '8px';
                                                    }
                                                }}
                                                onMouseLeave={(e: any) => {
                                                    if (location.pathname !== item.path) {
                                                        e.currentTarget.style.color = 'inherit';
                                                        e.currentTarget.style.paddingLeft = '0';
                                                    }
                                                }}
                                            >
                                                <span style={{ fontSize: '12px', fontWeight: 600, opacity: 0.3, fontFamily: 'monospace' }}>{item.number}</span>
                                                {item.label}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

                        {/* Social Section & CV */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            <div>
                                <span style={{ fontSize: '10px', fontWeight: 800, opacity: 0.4, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '24px', display: 'block' }}>Socials</span>

                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    gap: '32px',
                                    fontSize: '14px',
                                    fontWeight: 500
                                }}>
                                    {[
                                        { name: 'Facebook', url: 'https://www.facebook.com/sakhawat.hossain.81427' },
                                        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sakhawathossain1278' },
                                        { name: 'GitHub', url: 'https://github.com/Sakhawat1278' }
                                    ].map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: 'inherit', textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.3s' }}
                                            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                                            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
                                        >
                                            {social.name}
                                        </a>
                                    ))}
                                </div>

                            </div>

                            {/* CV Download integrated into Menu */}
                            <div>
                                <HoverButton
                                    href="/Sakhawat_Hossain_CV_(5.0).pdf"
                                    variant="outline"
                                    download="Sakhawat_Hossain_CV.pdf"
                                    className="menu-cv-button"
                                    style={{ height: '50px', padding: '0 30px', borderColor: 'var(--border-color)', width: 'fit-content' }}
                                >
                                    <span style={{ fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}>
                                        DOWNLOAD CV
                                    </span>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '12px' }}>
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                        <polyline points="14 2 14 8 20 8"></polyline>
                                        <line x1="16" y1="13" x2="8" y2="13"></line>
                                        <line x1="16" y1="17" x2="8" y2="17"></line>
                                        <polyline points="10 9 9 9 8 9"></polyline>
                                    </svg>
                                </HoverButton>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Menu;
