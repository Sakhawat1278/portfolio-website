import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
    onComplete: () => void;
    theme: 'light' | 'dark';
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete, theme }) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Sophisticated non-linear progress
        const duration = 2400; // Total duration in ms
        const startTime = Date.now();

        const updateProgress = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const percentage = Math.min(elapsed / duration, 1);

            // Easing function for progress feel
            const easedProgress = Math.floor(percentage * 100);

            setProgress(easedProgress);

            if (percentage < 1) {
                requestAnimationFrame(updateProgress);
            } else {
                setTimeout(() => {
                    setIsComplete(true);
                    setTimeout(onComplete, 1200); // Wait for exit animation
                }, 400);
            }
        };

        requestAnimationFrame(updateProgress);
    }, [onComplete]);

    const bgColor = theme === 'dark' ? '#0A0A0A' : '#FAF7F0';
    const textColor = theme === 'dark' ? '#FAF7F0' : '#0A0A0A';
    const accentColor = '#ff4212';

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        y: '-100%',
                        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
                    }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: bgColor,
                        zIndex: 2000,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: textColor,
                        overflow: 'hidden'
                    }}
                >
                    {/* Background Grid Decoration */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `linear-gradient(${textColor}08 1px, transparent 1px), linear-gradient(90deg, ${textColor}08 1px, transparent 1px)`,
                        backgroundSize: '80px 80px',
                        opacity: 0.5
                    }} />

                    {/* Sophisticated Architectural Counter */}
                    <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                fontSize: 'clamp(6rem, 15vw, 12rem)',
                                fontWeight: 800,
                                fontVariantNumeric: 'tabular-nums',
                                lineHeight: 1,
                                letterSpacing: '-0.05em',
                                display: 'flex',
                                alignItems: 'baseline'
                            }}
                        >
                            <span>{progress.toString().padStart(3, '0')}</span>
                            <span style={{ fontSize: '0.2em', marginLeft: '0.5rem', opacity: 0.3 }}>%</span>
                        </motion.div>

                        <div style={{
                            marginTop: '2rem',
                            width: '240px',
                            height: '1px',
                            backgroundColor: `${textColor}20`,
                            position: 'relative',
                            margin: '2rem auto'
                        }}>
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    height: '100%',
                                    backgroundColor: accentColor,
                                    width: `${progress}%`
                                }}
                            />
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            style={{
                                fontSize: '11px',
                                letterSpacing: '0.4em',
                                textTransform: 'uppercase',
                                fontWeight: 600
                            }}
                        >
                            Initialising Systems
                        </motion.div>
                    </div>

                    {/* Scanning Line Effect */}
                    <motion.div
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            height: '1px',
                            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                            opacity: 0.2,
                            zIndex: 2
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
