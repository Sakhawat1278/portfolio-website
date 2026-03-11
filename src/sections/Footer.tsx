import React, { useRef } from 'react';
import { motion } from 'framer-motion';

interface FooterProps {
    theme: 'light' | 'dark';
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
    const footerRef = useRef<HTMLElement>(null);


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 40, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as any
            }
        }
    };

    const socialIcons = [
        { name: 'Facebook', url: 'https://www.facebook.com/sakhawat.hossain.81427', icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path> },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sakhawathossain1278', icon: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>, extra: <><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></> },
        { name: 'GitHub', url: 'https://github.com/Sakhawat1278', icon: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.44 5.44 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path> }
    ];

    return (
        <footer
            ref={footerRef}
            className="footer-section"
            style={{
                backgroundColor: 'var(--bg-color)',
                color: 'var(--text-color)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                paddingTop: 'var(--section-py)',
                zIndex: 10
            }}
        >
            {/* Background Noise/Texture */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0.03,
                pointerEvents: 'none',
                backgroundImage: `url('https://www.transparenttextures.com/patterns/asfalt-dark.png')`,
                zIndex: -1
            }} />

            {/* Massive Background Text Watermark */}
            <motion.div
                className="footer-watermark"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.03 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as any }}
                viewport={{ once: false, amount: 0.2 }}
                style={{
                    fontWeight: 900,
                    color: 'var(--text-color)',
                    lineHeight: 0.7,
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                    textTransform: 'uppercase',
                    userSelect: 'none',
                    zIndex: 0
                }}
            >
                SOHAN UX
            </motion.div>

            <div className="container" style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-between',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Top Section - Bold Call to Action */}
                <motion.div
                    className="footer-top-section"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    variants={containerVariants}
                    style={{
                        position: 'relative',
                        zIndex: 1
                    }}
                >
                    {/* Mobile Logo Branding */}
                    <motion.div
                        className="footer-mobile-logo"
                        variants={itemVariants}
                    >
                        <img
                            src={theme === 'light' ? '/New_logo_white.png' : '/New_logo_dark.png'}
                            alt="Sakhawat Hossain Sohan - Portfolio Logo"
                            width="160"
                            height="35"
                            style={{
                                height: '35px',
                                width: 'auto',
                                objectFit: 'contain'
                            }}
                        />
                    </motion.div>

                    <div className="footer-content-wrapper">
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'inherit',
                            flex: 1
                        }}>
                            <motion.span
                                className="footer-available"
                                variants={itemVariants}
                            >
                                Available for new opportunities
                            </motion.span>

                            <motion.h2
                                className="footer-headline"
                                variants={itemVariants}
                            >
                                Let's Build<br />
                                Something <span style={{ color: '#ff4212' }}>Great</span>.
                            </motion.h2>

                            <motion.div
                                className="footer-email-container"
                                variants={itemVariants}
                            >
                                <a
                                    href="mailto:contact@sohanux.com"
                                    style={{
                                        fontSize: 'clamp(1.1rem, 3vw, 2.2rem)',
                                        color: 'var(--text-color)',
                                        textDecoration: 'none',
                                        fontWeight: 300,
                                        borderBottom: '1px solid var(--border-color)',
                                        paddingBottom: '0.4rem',
                                        display: 'inline-block',
                                        transition: 'color 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#ff4212'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-color)'}
                                >
                                    contact@sohanux.com
                                </a>
                            </motion.div>
                        </div>

                        <motion.div
                            className="footer-desktop-logo"
                            variants={itemVariants}
                            style={{
                                opacity: 1,
                                marginRight: '0',
                                marginBottom: '0'
                            }}
                        >
                            <img
                                src={theme === 'light' ? '/New_logo_white.png' : '/New_logo_dark.png'}
                                alt="Sakhawat Hossain Sohan - Technology & Design Portfolio"
                                width="300"
                                height="75"
                                style={{
                                    height: 'clamp(40px, 6vw, 75px)',
                                    width: 'auto',
                                    objectFit: 'contain'
                                }}
                            />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Middle Section - Secondary Navigation / Socials */}
                <motion.div
                    className="footer-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={containerVariants}
                    style={{
                        position: 'relative',
                        zIndex: 1
                    }}
                >
                    <motion.div className="footer-grid-item" variants={itemVariants}>
                        <h4 className="footer-grid-title" style={{ fontSize: '11px', fontWeight: 600, opacity: 0.4, marginBottom: '1.5rem', letterSpacing: '0.15em' }}>SERVICES</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', opacity: 0.9, alignItems: 'inherit' }}>
                            {['UX / UI Design', 'Visual Identity', 'Web Engineering', 'Interaction Design'].map((s) => (
                                <span key={s} style={{ fontSize: '14px', fontWeight: 400 }}>{s}</span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="footer-grid-item" variants={itemVariants}>
                        <h4 className="footer-grid-title" style={{ fontSize: '11px', fontWeight: 600, opacity: 0.4, marginBottom: '1.5rem', letterSpacing: '0.15em' }}>NAVIGATION</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'inherit' }}>
                            {[
                                { label: 'Home', path: '/' },
                                { label: 'My Works', path: '/works' },
                                { label: 'About', path: '/about' },
                                { label: 'Skills', path: '/skills' },
                                { label: 'Contact', path: '/contact' }
                            ].map((item, index) => (
                                <a
                                    key={item.path}
                                    href={item.path}
                                    style={{
                                        color: 'var(--text-color)',
                                        textDecoration: 'none',
                                        fontSize: '14px',
                                        width: 'fit-content',
                                        fontWeight: 400,
                                        display: 'flex',
                                        alignItems: 'baseline',
                                        gap: '10px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = 'var(--accent-color)';
                                        e.currentTarget.style.paddingLeft = '6px';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = 'var(--text-color)';
                                        e.currentTarget.style.paddingLeft = '0';
                                    }}
                                >
                                    <span style={{ fontSize: '9px', fontWeight: 600, opacity: 0.3, fontFamily: 'monospace' }}>00{index + 1}</span>
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="footer-grid-item" variants={itemVariants}>
                        <h4 className="footer-grid-title" style={{ fontSize: '11px', fontWeight: 600, opacity: 0.4, marginBottom: '1.5rem', letterSpacing: '0.15em' }}>CONNECT</h4>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '1rem',
                            alignItems: 'center',
                            justifyContent: 'inherit'
                        }}>
                            {socialIcons.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                    title={social.name}
                                    whileHover={{ scale: 1.1, color: '#e63b00' }}
                                    style={{
                                        color: 'var(--text-color)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'color 0.3s ease'
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        {social.icon}
                                        {social.extra}
                                    </svg>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="footer-grid-item" variants={itemVariants}>
                        <h4 className="footer-grid-title" style={{ fontSize: '11px', fontWeight: 600, opacity: 0.4, marginBottom: '1.5rem', letterSpacing: '0.15em' }}>OFFICE</h4>
                        <p style={{ fontSize: '14px', opacity: 0.9, lineHeight: 1.6 }}>
                            Dhaka, Bangladesh<br />
                            Remote Globally<br />
                            GMT+6
                        </p>
                    </motion.div>
                </motion.div>

                {/* Bottom Section - Legal & Credits */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2rem',
                        position: 'relative',
                        zIndex: 1,
                        alignItems: 'inherit'
                    }}
                >
                    <div style={{
                        height: '1px',
                        width: '100%',
                        backgroundColor: 'var(--border-color)',
                        opacity: 1,
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Static Footer Border Line */}
                        <div
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                height: '100%',
                                width: '100%',
                                backgroundColor: 'var(--border-color)',
                                opacity: 1
                            }}
                        />
                    </div>

                    <div className="footer-bottom-info">
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.2rem',
                            flexDirection: 'row'
                        }}>

                            <div style={{ opacity: 0.4, fontSize: '10px', letterSpacing: '0.05em' }}>
                                @2026 SOHAN UX. ALL RIGHTS RESERVED.
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '1.5rem',
                            opacity: 0.4,
                            fontSize: '10px',
                            letterSpacing: '0.1em'
                        }}>
                            <span>DEVELOPED WITH CREATIVITY</span>
                            <span>DHAKA // 18:25</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
