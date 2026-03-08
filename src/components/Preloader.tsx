import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
    onComplete: () => void;
    theme: 'light' | 'dark';
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    // Left panel is always dark, right panel always light — contrast is fixed regardless of theme
    const leftBg = '#ff4212';
    const rightBg = '#F0EDE8';
    const accentColor = '#ff4212';

    useEffect(() => {
        const duration = 2400;
        const startTime = Date.now();

        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const t = Math.min(elapsed / duration, 1);
            const eased = Math.floor((1 - Math.pow(1 - t, 2.2)) * 100);
            setProgress(eased);

            if (t < 1) {
                requestAnimationFrame(updateProgress);
            } else {
                setTimeout(() => {
                    setIsComplete(true);
                    setTimeout(onComplete, 1000);
                }, 300);
            }
        };

        requestAnimationFrame(updateProgress);
    }, [onComplete]);

    const paddedProgress = String(progress).padStart(2, '0');

    const panelExit = { duration: 1.0, ease: [0.76, 0, 0.24, 1] as any };

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 2000,
                        display: 'flex',
                        pointerEvents: 'auto',
                        overflow: 'hidden',
                    }}
                >
                    {/* ── LEFT PANEL (dark) ── */}
                    <motion.div
                        exit={{ x: '-100%' }}
                        transition={panelExit}
                        style={{
                            width: '50%',
                            height: '100%',
                            backgroundColor: leftBg,
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            padding: '36px 40px',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Top-left label */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 0.4, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            style={{
                                fontSize: '9px',
                                fontWeight: 700,
                                letterSpacing: '0.3em',
                                textTransform: 'uppercase',
                                color: '#FFFFFF',
                                fontFamily: 'var(--font-primary)',
                            }}
                        >
                            Sakhawat Hossain
                        </motion.div>

                        {/* Large number — left half (dark side) */}
                        <div style={{
                            position: 'absolute',
                            right: 0,
                            top: '50%',
                            transform: 'translate(50%, -50%)',
                            zIndex: 10,
                            lineHeight: 1,
                            overflow: 'hidden',
                            pointerEvents: 'none',
                        }}>
                            <motion.div
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                                style={{
                                    fontSize: 'clamp(5rem, 18vw, 22rem)',
                                    fontWeight: 300,
                                    letterSpacing: '-0.06em',
                                    fontFamily: 'var(--font-primary)',
                                    color: '#FFFFFF',
                                    fontVariantNumeric: 'tabular-nums',
                                    whiteSpace: 'nowrap',
                                    // Clip left half: only show left portion of text
                                    clipPath: 'inset(0 50% 0 0)',
                                }}
                            >
                                {paddedProgress}
                            </motion.div>
                        </div>


                        {/* Progress bar — left bottom */}
                        <motion.div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                height: '2px',
                                width: `${progress}%`,
                                backgroundColor: accentColor,
                            }}
                        />
                    </motion.div>

                    {/* ── CENTER DIVIDER (the split line) ── */}
                    <motion.div
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: 0,
                            width: '1px',
                            height: '100%',
                            backgroundColor: accentColor,
                            zIndex: 20,
                            transform: 'translateX(-50%)',
                        }}
                    />

                    {/* ── RIGHT PANEL (light) ── */}
                    <motion.div
                        exit={{ x: '100%' }}
                        transition={panelExit}
                        style={{
                            width: '50%',
                            height: '100%',
                            backgroundColor: rightBg,
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            padding: '36px 40px',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Top-right: orange dot */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 300, delay: 0.5 }}
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: accentColor,
                                    position: 'relative',
                                }}
                            >
                                <motion.div
                                    animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    style={{
                                        position: 'absolute',
                                        inset: -3,
                                        borderRadius: '50%',
                                        border: `1px solid ${accentColor}`,
                                    }}
                                />
                            </motion.div>
                        </div>

                        {/* Large number — right half (light side) */}
                        <div style={{
                            position: 'absolute',
                            left: 0,
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 10,
                            lineHeight: 1,
                            overflow: 'hidden',
                            pointerEvents: 'none',
                        }}>
                            <motion.div
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                                style={{
                                    fontSize: 'clamp(5rem, 18vw, 22rem)',
                                    fontWeight: 300,
                                    letterSpacing: '-0.06em',
                                    fontFamily: 'var(--font-primary)',
                                    color: '#0A0A0A',
                                    fontVariantNumeric: 'tabular-nums',
                                    whiteSpace: 'nowrap',
                                    // Clip right half
                                    clipPath: 'inset(0 0 0 50%)',
                                }}
                            >
                                {paddedProgress}
                            </motion.div>
                        </div>

                        {/* Bottom-right: percentage label */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 0.35, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            style={{
                                fontSize: '9px',
                                fontWeight: 700,
                                letterSpacing: '0.3em',
                                textTransform: 'uppercase',
                                color: '#0A0A0A',
                                fontFamily: 'var(--font-primary)',
                                textAlign: 'right',
                            }}
                        >
                            {progress < 100 ? 'Loading' : 'Ready'}
                        </motion.div>

                        {/* Progress bar — right bottom (mirrored) */}
                        <motion.div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                height: '2px',
                                width: `${progress}%`,
                                backgroundColor: accentColor,
                            }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
