import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

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
            role="banner"
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
                    <Link to="/" style={{ display: 'flex', width: 'fit-content' }} aria-label="Go to homepage">
                        <img
                            src={currentLogo}
                            alt="Sakhawat Hossain Sohan - WordPress Expert Logo"
                            width="200"
                            height="42"
                            loading="eager"
                            fetchPriority="high"
                            className="header-logo"
                            style={{ cursor: 'pointer' }}
                        />
                    </Link>
                </div>

                {/* Right Area: Theme Toggle, Menu & Location */}
                {/* Right Area: Controls */}
                <div className="header-controls" style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 'clamp(10px, 3vw, 20px)' }}>
                    {/* Theme Toggle, CV Download & Menu */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 16px)' }}>


                        <ThemeToggle theme={theme} onToggle={onToggleTheme} />

                        <motion.div
                            className="header-menu-button"
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
                            <div style={{ width: 'clamp(45px, 6vw, 55px)', overflow: 'hidden' }}>
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
