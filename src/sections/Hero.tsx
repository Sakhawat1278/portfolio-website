import React from 'react';
import { motion } from 'framer-motion';
import HoverButton from '../components/HoverButton';

interface HeroProps {
    theme: 'light' | 'dark';
}

const Hero: React.FC<HeroProps> = ({ theme }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.4
            }
        }
    };

    const itemVariants = {
        hidden: { y: 60, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.77, 0, 0.175, 1] as any
            }
        }
    };

    return (
        <section
            id="home"
            className="hero-section"
            style={{
                position: 'fixed',
                inset: 0,
                height: '100vh',
                zIndex: 0,
                backgroundColor: 'var(--bg-color)',
                overflow: 'hidden',
                padding: 'clamp(120px, 15vh, 180px) clamp(40px, 8vw, 6rem) clamp(100px, 15vh, 140px)'
            }}
        >
            {/* Absolute 3D Abstract Background Container */}
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
            }}>
                <motion.video
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1.02, opacity: 1 }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                    src="/White Background Video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center center'
                    }}
                />

                {/* Light Appearance Vignette & Bottom Blend (triggered by 'dark' theme state) */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    boxShadow: 'inset 0 0 120px 20px #FAF7F0',
                    background: 'linear-gradient(to top, #FAF7F0 0%, #FAF7F0 2%, transparent 30%)',
                    pointerEvents: 'none',
                    opacity: theme === 'dark' ? 1 : 0,
                    transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }} />

                {/* Dark Appearance Vignette & Bottom Blend (triggered by 'light' theme state) */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    boxShadow: 'inset 0 0 120px 20px #323232',
                    background: 'linear-gradient(to top, #323232 0%, #323232 2%, transparent 30%)',
                    pointerEvents: 'none',
                    opacity: theme === 'light' ? 1 : 0,
                    transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }} />
            </div>

            <motion.div
                className="container hero-content-container"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                style={{ zIndex: 1, maxWidth: '100%' }}
            >
                <motion.span
                    variants={itemVariants}
                    style={{
                        fontSize: '11px',
                        letterSpacing: '0.2em',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        marginBottom: '1rem',
                        display: 'block',
                        color: 'var(--text-color)',
                        opacity: 0.5
                    }}
                >
                    Code | Create | Innovate
                </motion.span>
                <motion.h1
                    variants={itemVariants}
                    style={{
                        fontSize: 'clamp(1.8rem, 9vw, 5.5rem)',
                        fontWeight: 800,
                        lineHeight: 1.05,
                        letterSpacing: '-0.02em',
                        marginBottom: '1.5rem',
                        color: 'var(--text-color)',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap'
                    }}
                >
                    Beyond Code<br />
                    <motion.span
                        style={{
                            color: '#ff4212',
                            backgroundColor: 'var(--text-color)',
                            padding: '0 0.5rem',
                            display: 'inline-block',
                            marginTop: '0.2rem',
                            marginBottom: '0.2rem'
                        }}
                    >
                        Engineering
                    </motion.span><br />
                    Impact
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    style={{
                        fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                        fontWeight: 300,
                        maxWidth: '450px',
                        marginBottom: '2rem',
                        color: 'var(--text-color)',
                        opacity: 0.7,
                        lineHeight: 1.6
                    }}
                >
                    Architecting scalable digital solutions that bridge the gap between complex
                    engineering and seamless business growth. Specialized in high-performance
                    digital systems.
                </motion.p>

                <motion.div
                    className="hero-buttons"
                    variants={itemVariants}
                    style={{
                        gap: '1rem',
                        flexWrap: 'wrap'
                    }}
                >
                    <HoverButton href="#work" variant="solid">
                        View My Work
                    </HoverButton>
                    <HoverButton href="#contact" variant="outline">
                        Get in Touch
                    </HoverButton>
                </motion.div>
            </motion.div>

            {/* Subtle floating background decoration */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.05, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60vw',
                    height: '60vw',
                    backgroundColor: 'var(--text-color)',
                    borderRadius: '50%',
                    filter: 'blur(100px)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
            />
        </section >
    );
};

export default Hero;
