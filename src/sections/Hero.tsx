import React from 'react';
import { motion } from 'framer-motion';
import HoverButton from '../components/HoverButton';

interface HeroProps {
    isReady: boolean;
}

const Hero: React.FC<HeroProps> = ({ isReady }) => {
    const title = "CREATIVE ALWAYS";

    return (
        <section
            id="home"
            className="hero-section"
            style={{
                position: 'relative',
                width: '100%',
                backgroundColor: 'var(--bg-color)',
                paddingTop: 'var(--header-height)',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* ── Row 1: Headline + Video ── */}
            <div className="hero-row-1">
                {/* Animated bottom border */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isReady ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] as any, delay: 0.1 }}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '1px',
                        backgroundColor: 'var(--border-color)',
                        transformOrigin: 'left center'
                    }}
                />

                {/* LEFT: Headline + dot + buttons */}
                <motion.div
                    className="hero-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] as any, delay: 0.2 }}
                >
                    {/* Headline + dot */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                        <h2 className="hero-headline">
                            DESIGN STUDIO<br />
                            FOR <span style={{ color: 'var(--accent-color)' }}>TIMELESS</span><br />
                            BRANDING.
                        </h2>

                        {/* Orange live dot */}
                        <div style={{ position: 'relative', marginTop: '0.25em', flexShrink: 0 }}>
                            <div style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: '#ff4212'
                            }} />
                            <motion.div
                                animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                style={{
                                    position: 'absolute',
                                    inset: -4,
                                    borderRadius: '50%',
                                    border: '1px solid #ff4212'
                                }}
                            />
                        </div>
                    </div>

                    {/* Mobile-only: square video between headline and buttons */}
                    <motion.div
                        className="hero-video-mobile"
                        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                        animate={isReady ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as any, delay: 0.4 }}
                    >
                        <video
                            src="/Wireframe.mp4"
                            autoPlay muted loop playsInline
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </motion.div>

                    {/* Buttons */}
                    <div className="hero-buttons">
                        <HoverButton href="#works" variant="solid">EXPLORE_WORKS</HoverButton>
                        <HoverButton href="#contact" variant="outline">START_MISSION</HoverButton>
                    </div>
                </motion.div>

                {/* RIGHT: Square video — tablet + desktop */}
                <motion.div
                    className="hero-video-desktop"
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    animate={isReady ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as any, delay: 0.4 }}
                >
                    <video
                        src="/Wireframe.mp4"
                        autoPlay muted loop playsInline
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </motion.div>
            </div>

            {/* ── Row 2: CREATIVE ALWAYS ── */}
            <div className="hero-row-2">
                {/* Animated bottom border */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isReady ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] as any, delay: 0.6 }}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '1px',
                        backgroundColor: 'var(--border-color)',
                        transformOrigin: 'left center'
                    }}
                />

                <div className="hero-marquee-inner">
                    {title.split(" ").map((word, wordIdx) => (
                        <div key={wordIdx} style={{ display: 'flex' }}>
                            {word.split("").map((char, charIdx) => (
                                <div key={charIdx} style={{ overflow: 'hidden', display: 'flex' }}>
                                    <motion.span
                                        className="hero-marquee-char"
                                        initial={{ y: '100%' }}
                                        animate={isReady ? { y: 0 } : { y: '100%' }}
                                        transition={{
                                            duration: 1.2,
                                            ease: [0.16, 1, 0.3, 1],
                                            delay: 0.8 + (wordIdx * 0.1) + (charIdx * 0.03)
                                        }}
                                    >
                                        {char}
                                    </motion.span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
