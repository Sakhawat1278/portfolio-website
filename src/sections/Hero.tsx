import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import HoverButton from '../components/HoverButton';

const Hero: React.FC = () => {
    const [isReady, setIsReady] = useState(false);
    const videoRef1 = useRef<HTMLVideoElement>(null);
    const videoRef2 = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Snappy Load: Show headline/text immediately after mount
        setIsReady(true);

        // Immediate Buffering & Playback to solve "slow loading" report
        videoRef1.current?.play().catch(() => { });
        videoRef2.current?.play().catch(() => { });
    }, []);

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
                flexDirection: 'column',
                minHeight: '100vh', // Ensure no collapse
                overflow: 'hidden'
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
                        <h1 className="hero-headline">
                            WORDPRESS<br />
                            EXPERT & <span style={{ color: 'var(--accent-color)' }}>RAW CODE</span><br />
                            ENGINEER.
                        </h1>

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

                    {/* Responsive Video Container (Shown on Tablet/Mobile) */}
                    <div className="hero-video-inline">
                        <video
                            ref={videoRef1}
                            src="/Wireframe1.webm"
                            muted
                            loop
                            playsInline
                            disablePictureInPicture
                            preload="auto"
                            width="500"
                            height="500"
                            aria-hidden="true"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="hero-buttons" style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        gap: '12px'
                    }}>
                        <HoverButton href="/works" variant="solid">EXPLORE_WORKS</HoverButton>
                        <HoverButton href="/contact" variant="outline">START_MISSION</HoverButton>
                    </div>
                </motion.div>

                {/* Right Video (Shown only on Large Desktop) */}
                <motion.div
                    className="hero-video-aside"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as any, delay: 0.4 }}
                >
                    <video
                        ref={videoRef2}
                        src="/Wireframe1.webm"
                        muted
                        loop
                        playsInline
                        disablePictureInPicture
                        preload="auto"
                        width="500"
                        height="500"
                        aria-hidden="true"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
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

                <div className="hero-marquee-inner" style={{ display: 'flex', gap: '0.4em' }}>
                    {title.split(" ").map((word, wordIdx) => (
                        <div key={wordIdx} style={{ overflow: 'hidden', display: 'flex' }}>
                            <motion.span
                                className="hero-marquee-word"
                                initial={{ y: '102%' }}
                                animate={isReady ? { y: 0 } : { y: '102%' }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: 0.6 + (wordIdx * 0.15)
                                }}
                                style={{ display: 'inline-block' }}
                            >
                                {word}
                            </motion.span>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    );
};

export default Hero;
