import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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

    return (
        <footer
            style={{
                minHeight: isMobile ? '80vh' : '100vh',
                backgroundColor: 'var(--text-color)',
                color: 'var(--bg-color)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: isMobile
                    ? 'clamp(60px, 10vh, 100px) clamp(20px, 8vw, 6rem) clamp(40px, 8vh, 80px)'
                    : 'clamp(80px, 15vh, 160px) clamp(40px, 8vw, 6rem) clamp(60px, 10vh, 120px)',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 10
            }}
        >
            {/* Massive Background Text Watermark */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 0.05 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as any }}
                viewport={{ once: false, amount: 0.2 }}
                style={{
                    position: 'absolute',
                    bottom: isMobile ? '-1vh' : '-2vh',
                    left: isMobile ? '-1vw' : '-2vw',
                    fontSize: isMobile ? 'clamp(6rem, 20vw, 15rem)' : 'clamp(10rem, 25vw, 35rem)',
                    fontWeight: 900,
                    color: 'var(--bg-color)',
                    lineHeight: 0.7,
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                    textTransform: 'uppercase',
                    userSelect: 'none',
                    zIndex: 0
                }}>
                UX DESIGN
            </motion.div>

            {/* Top Section - Bold Call to Action */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={containerVariants}
                style={{ position: 'relative', zIndex: 1, marginBottom: isMobile ? '4rem' : '6rem' }}
            >
                <motion.span
                    variants={itemVariants}
                    style={{
                        fontSize: '10px',
                        letterSpacing: '0.4em',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        display: 'block',
                        marginBottom: '1.5rem',
                        opacity: 0.5
                    }}
                >
                    Available for new opportunities
                </motion.span>

                <motion.h2
                    variants={itemVariants}
                    style={{
                        fontSize: 'clamp(2.2rem, 10vw, 7rem)',
                        fontWeight: 800,
                        lineHeight: 0.95,
                        letterSpacing: '-0.03em',
                        textTransform: 'uppercase',
                        maxWidth: '1300px'
                    }}
                >
                    Let's Build<br />
                    Something <span style={{ color: '#ff4212' }}>Great</span>.
                </motion.h2>

                <motion.div
                    variants={itemVariants}
                    style={{ display: 'flex', gap: '3rem', marginTop: '3.5rem', flexWrap: 'wrap' }}
                >
                    <a
                        href="mailto:hello@sohan.com"
                        style={{
                            fontSize: 'clamp(1.1rem, 3vw, 2.2rem)',
                            color: 'var(--bg-color)',
                            textDecoration: 'none',
                            fontWeight: 300,
                            borderBottom: '1px solid var(--bg-color)',
                            paddingBottom: '0.4rem',
                            display: 'inline-block',
                            transition: 'color 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#ff4212'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--bg-color)'}
                    >
                        hello@sohan.com
                    </a>
                </motion.div>
            </motion.div>

            {/* Middle Section - Secondary Navigation / Socials */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={containerVariants}
                style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: isMobile ? '2.5rem 1.5rem' : '4rem',
                    position: 'relative',
                    zIndex: 1,
                    marginBottom: isMobile ? '3rem' : '4rem'
                }}
            >
                <motion.div variants={itemVariants}>
                    <h4 style={{ fontSize: '11px', fontWeight: 600, opacity: 0.4, marginBottom: '1.5rem', letterSpacing: '0.15em' }}>SERVICES</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', opacity: 0.9 }}>
                        {['UX / UI Design', 'Visual Identity', 'Web Engineering', 'Interaction Design'].map((s) => (
                            <span key={s} style={{ fontSize: '14px', fontWeight: 400 }}>{s}</span>
                        ))}
                    </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <h4 style={{ fontSize: '11px', fontWeight: 600, opacity: 0.4, marginBottom: '1.5rem', letterSpacing: '0.15em' }}>NAVIGATION</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        {['Work', 'Profile', 'Playground', 'Contact'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} style={{ color: 'var(--bg-color)', textDecoration: 'none', fontSize: '14px', width: 'fit-content', fontWeight: 400 }}>{item}</a>
                        ))}
                    </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <h4 style={{ fontSize: '11px', fontWeight: 600, opacity: 0.4, marginBottom: '1.5rem', letterSpacing: '0.15em' }}>CONNECT</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        {['LinkedIn', 'GitHub', 'Behance', 'Instagram'].map((link) => (
                            <a key={link} href="#" style={{ color: 'var(--bg-color)', textDecoration: 'none', fontSize: '14px', width: 'fit-content', fontWeight: 400 }}>{link}</a>
                        ))}
                    </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <h4 style={{ fontSize: '11px', fontWeight: 600, opacity: 0.4, marginBottom: '1.5rem', letterSpacing: '0.15em' }}>OFFICE</h4>
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
                    gap: isMobile ? '1.5rem' : '2rem',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <div style={{
                    height: '1px',
                    width: '100%',
                    backgroundColor: 'var(--bg-color)',
                    opacity: 0.1
                }} />

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: isMobile ? 'flex-start' : 'center',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: '1.5rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                        <motion.img
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.6, ease: "backInOut" }}
                            src="/Icon_Sohan.png"
                            alt="Sohan Icon"
                            style={{ height: '22px', opacity: 0.8, cursor: 'pointer' }}
                        />
                        <div style={{ opacity: 0.4, fontSize: '10px', letterSpacing: '0.05em' }}>
                            @2026 SOHAN UX. ALL RIGHTS RESERVED.
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: isMobile ? '0.5rem' : '3rem',
                        opacity: 0.4,
                        fontSize: '10px',
                        letterSpacing: '0.1em'
                    }}>
                        <span>DEVELOPED WITH CREATIVITY</span>
                        <span>DHAKA // 18:25</span>
                    </div>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;
