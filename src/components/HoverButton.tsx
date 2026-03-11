import React, { useRef, useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface HoverButtonProps {
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
    children: React.ReactNode;
    variant?: 'solid' | 'outline';
    download?: string | boolean;
    style?: React.CSSProperties;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    isActive?: boolean;
    ariaLabel?: string;
}

const HoverButton: React.FC<HoverButtonProps> = ({
    href,
    onClick,
    children,
    variant = 'solid',
    download,
    style,
    className,
    type = 'button',
    disabled = false,
    isActive = false,
    ariaLabel
}) => {
    const buttonRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
    const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        setHoverPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        setIsHovered(true);
    };

    const handleMouseLeave = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        if (!buttonRef.current) return;
        buttonPos(e);
        setIsHovered(false);
    };

    const buttonPos = (e: MouseEvent) => {
        const rect = buttonRef.current!.getBoundingClientRect();
        setHoverPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        return rect;
    }

    const baseBg = isActive ? 'var(--accent-color)' : (variant === 'solid' ? 'var(--text-color)' : 'transparent');
    const baseText = isActive ? '#fff' : (variant === 'solid' ? 'var(--bg-color)' : 'var(--text-color)');
    const border = isActive ? '1px solid var(--accent-color)' : (variant === 'solid' ? '1px solid transparent' : '1px solid var(--text-color)');

    const hoverBg = isActive ? 'var(--text-color)' : (variant === 'solid' ? 'var(--bg-color)' : 'var(--text-color)');
    const hoverText = isActive ? 'var(--bg-color)' : (variant === 'solid' ? 'var(--text-color)' : 'var(--bg-color)');

    const commonStyle: React.CSSProperties = {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 5vw, 2.5rem)',
        borderRadius: '100px',
        fontWeight: 700,
        fontSize: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        backgroundColor: baseBg,
        color: baseText,
        border: border,
        overflow: 'hidden',
        cursor: disabled ? 'not-allowed' : 'pointer',
        textDecoration: 'none',
        opacity: disabled ? 0.5 : 1,
        ...style
    };

    const content = (
        <>
            <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>{children}</span>
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
                    willChange: 'clip-path',
                    '--x': `${hoverPos.x}px`,
                    '--y': `${hoverPos.y}px`
                } as any}
            >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{children}</span>
            </motion.div>
        </>
    );

    if (href) {
        return (
            <motion.a
                ref={buttonRef}
                href={href}
                download={download}
                className={className}
                aria-label={ariaLabel}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={commonStyle}
            >
                {content}
            </motion.a>
        );
    }

    return (
        <motion.button
            ref={buttonRef}
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={className}
            aria-label={ariaLabel}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ ...commonStyle, fontFamily: 'inherit' }}
        >
            {content}
        </motion.button>
    );
};

export default HoverButton;
