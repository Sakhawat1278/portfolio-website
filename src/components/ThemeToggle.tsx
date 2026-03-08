import React, { useRef, useState, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeToggleProps {
    theme: 'light' | 'dark';
    onToggle: () => void;
    size?: number;
    className?: string;
    style?: React.CSSProperties;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle, size = 18, style }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = (e: MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        setHoverPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        setIsHovered(true);
    };

    const handleMouseLeave = (e: MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        setHoverPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        setIsHovered(false);
    };

    const baseBg = 'transparent';
    const baseText = 'var(--text-color)';
    const baseBorder = '1px solid var(--border-color)';

    const hoverBg = 'var(--text-color)';
    const hoverText = 'var(--bg-color)';

    // Extracted the SVG rendering so we can reuse it for the bottom and top layers
    const renderIcon = (col: string) => (
        <AnimatePresence mode="wait">
            {theme === 'light' ? (
                <motion.svg
                    key="sun"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: 'backOut' }}
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={col}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ position: 'absolute' }}
                >
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </motion.svg>
            ) : (
                <motion.svg
                    key="moon"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: 'backOut' }}
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={col}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ position: 'absolute' }}
                >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </motion.svg>
            )}
        </AnimatePresence>
    );

    return (
        <motion.button
            ref={buttonRef}
            onClick={onToggle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label="Toggle Theme"
            style={{
                position: 'relative',
                width: size * 2.22,
                height: size * 2.22,
                borderRadius: '50%',
                backgroundColor: baseBg,
                color: baseText,
                border: baseBorder,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                overflow: 'hidden',
                ...style
            }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Base normal layer */}
            <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                {renderIcon(baseText)}
            </span>

            {/* Expanding clipping overlay layer */}
            <motion.div
                initial={false}
                animate={{
                    clipPath: isHovered
                        ? `circle(150% at var(--x) var(--y))`
                        : `circle(0% at var(--x) var(--y))`
                }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: hoverBg,
                    color: hoverText,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    pointerEvents: 'none',
                    '--x': `${hoverPos.x}px`,
                    '--y': `${hoverPos.y}px`
                } as any}
            >
                {renderIcon(hoverText)}
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;
