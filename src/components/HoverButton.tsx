import React, { useRef, useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface HoverButtonProps {
    href: string;
    children: React.ReactNode;
    variant?: 'solid' | 'outline';
    download?: string | boolean;
    style?: React.CSSProperties;
    className?: string;
}

const HoverButton: React.FC<HoverButtonProps> = ({ href, children, variant = 'solid', download, style, className }) => {
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = (e: MouseEvent<HTMLAnchorElement>) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        setHoverPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        setIsHovered(true);
    };

    const handleMouseLeave = (e: MouseEvent<HTMLAnchorElement>) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        setHoverPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        setIsHovered(false);
    };

    const isSolid = variant === 'solid';

    const baseBg = isSolid ? 'var(--text-color)' : 'transparent';
    const baseText = isSolid ? 'var(--bg-color)' : 'var(--text-color)';
    const border = isSolid ? '1px solid transparent' : '1px solid var(--text-color)';

    const hoverBg = isSolid ? 'var(--bg-color)' : 'var(--text-color)';
    const hoverText = isSolid ? 'var(--text-color)' : 'var(--bg-color)';

    return (
        <motion.a
            ref={buttonRef}
            href={href}
            download={download}
            className={className}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 5vw, 2.5rem)',
                borderRadius: '50px',
                fontWeight: 600,
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                backgroundColor: baseBg,
                color: baseText,
                border: border,
                overflow: 'hidden',
                cursor: 'pointer',
                textDecoration: 'none',
                ...style // Allow custom styles like height
            }}
        >
            {/* The base text layer */}
            <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>

            {/* The refilling overlay layer that grows via clip-path */}
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
                    // Pass the exact instantaneous coordinate as a CSS variable mapping!
                    '--x': `${hoverPos.x}px`,
                    '--y': `${hoverPos.y}px`
                } as any}
            >
                {/* Ensure the text perfectly overlaps the base text */}
                <span>{children}</span>
            </motion.div>
        </motion.a>
    );
};

export default HoverButton;
