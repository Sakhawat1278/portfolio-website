import React, { useRef, useEffect, useState, type MouseEvent } from 'react';
import { motion, useTransform, useMotionValue, animate, useInView } from 'framer-motion';

const IconDiscovery = () => (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.circle
            cx="11" cy="11" r="7"
            stroke="currentColor" strokeWidth="1.2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.path
            d="M20 20L16 16"
            stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
        />
    </svg>
);

const IconArchitecture = () => (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.rect
            x="3" y="3" width="18" height="18" rx="2"
            stroke="currentColor" strokeWidth="1.2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.path
            d="M3 9H21M9 21V3"
            stroke="currentColor" strokeWidth="1.2" strokeDasharray="1 3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
        />
    </svg>
);

const IconEngineering = () => (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
            d="M16 18L22 12L16 6"
            stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut" }}
        />
        <motion.path
            d="M8 6L2 12L8 18"
            stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut" }}
        />
        <motion.path
            d="M13 4L11 20"
            stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
        />
    </svg>
);

const IconOptimization = () => (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
            d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
            stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0, fill: "rgba(255, 66, 18, 0)" }}
            whileInView={{ pathLength: 1, fill: "rgba(255, 66, 18, 0)" }}
            viewport={{ once: true }}
            whileHover={{ fill: "rgba(255, 66, 18, 0.2)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
        />
    </svg>
);

const StatCounter = ({ value, label, index }: { value: string, label: string, index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    const suffix = value.replace(/[0-9.]/g, '');

    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => {
        if (suffix === 'M') {
            return latest.toFixed(1) + suffix;
        }
        return Math.floor(latest).toString().padStart(2, '0') + suffix;
    });

    useEffect(() => {
        if (isInView) {
            animate(count, numericValue, {
                duration: 2,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
            });
        }
    }, [isInView, numericValue, count, index]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            style={{ textAlign: 'center' }}
        >
            <motion.div
                style={{
                    fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                    fontWeight: 800,
                    color: '#ff4212',
                    lineHeight: 1,
                    marginBottom: '1rem'
                }}
            >
                {rounded}
            </motion.div>
            <div style={{
                fontSize: '10px',
                letterSpacing: '0.2rem',
                textTransform: 'uppercase',
                opacity: 0.5,
                fontWeight: 600
            }}>
                {label}
            </div>
        </motion.div>
    );
};

interface ProcessCardProps {
    step: any;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ step }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setHoverPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        setIsHovered(true);
    };

    const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setHoverPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        setIsHovered(false);
    };

    const textContent = (color: string) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: 'auto' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: color }}>{step.title}</h3>
            <p style={{ fontSize: '14px', lineHeight: 1.7, opacity: 0.6, fontWeight: 300, color: color }}>{step.desc}</p>
        </div>
    );

    return (
        <motion.div
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
                backgroundColor: 'var(--bg-color)',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 1,
                overflow: 'hidden',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: 'clamp(2.5rem, 5vw, 3.5rem) clamp(1.5rem, 5vw, 2.5rem)',
                boxSizing: 'border-box',
                borderRight: '1px solid var(--border-color)',
                borderBottom: '1px solid var(--border-color)',
            }}
        >
            {/* Identity Layer */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem', position: 'relative', zIndex: 4 }}>
                <motion.span
                    animate={{ color: isHovered ? 'var(--bg-color)' : '#ff4212' }}
                    transition={{ duration: 0.4 }}
                    style={{ fontSize: '12px', fontWeight: 800, opacity: 0.8 }}
                >
                    {step.id}
                </motion.span>
                <motion.div
                    animate={{ color: isHovered ? 'var(--bg-color)' : 'var(--text-color)' }}
                    transition={{ duration: 0.4 }}
                    style={{ opacity: 0.8 }}
                >
                    {step.icon}
                </motion.div>
            </div>

            {/* Standard Text Layer */}
            {textContent('var(--text-color)')}

            {/* Refill Text Layer */}
            <motion.div
                initial={false}
                animate={{
                    clipPath: isHovered
                        ? `circle(150% at var(--x) var(--y))`
                        : `circle(0% at var(--x) var(--y))`
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'var(--text-color)',
                    padding: 'clamp(2.5rem, 5vw, 3.5rem) clamp(1.5rem, 5vw, 2.5rem)',
                    zIndex: 2,
                    pointerEvents: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    '--x': `${hoverPos.x}px`,
                    '--y': `${hoverPos.y}px`
                } as any}
            >
                <div style={{ height: 'calc(12px + 1.5rem + 42px)', marginBottom: '2.5rem' }} />
                {textContent('var(--bg-color)')}
            </motion.div>
        </motion.div>
    );
};

const AnimatedHeading = ({ text }: { text: string }) => {
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 100,
            } as any,
        },
        hidden: {
            opacity: 0,
            y: 50,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 100,
            } as any,
        },
    };

    return (
        <motion.h2
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            style={{
                fontSize: 'clamp(2.2rem, 8vw, 6rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.15em',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
            }}
        >
            {words.map((word, index) => {
                const lowerWord = word.toLowerCase();
                const isHighlighted = lowerWord.includes("vibe") || lowerWord.includes("rigor") || lowerWord.includes("code") || lowerWord.includes("algorithmic");
                return (
                    <span key={index} style={{ overflow: 'hidden', display: 'inline-block', maxWidth: '100%', wordBreak: 'break-word' }}>
                        <motion.span
                            variants={child}
                            style={{
                                display: 'inline-block',
                                maxWidth: '100%',
                                color: isHighlighted ? '#ff4212' : 'inherit'
                            }}
                        >
                            {word}
                        </motion.span>
                    </span>
                );
            })}
        </motion.h2>
    );
};

interface AboutProps {
    theme?: 'light' | 'dark';
}

const About: React.FC<AboutProps> = ({ theme }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
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

    const processSteps = [
        { id: '01', title: 'DISCOVERY', desc: 'Deep diving into business goals, user needs, and technical constraints to map the path forward.', icon: <IconDiscovery /> },
        { id: '02', title: 'ARCHITECTURE', desc: 'Designing scalable systems and intuitive interfaces that bridge the gap between code and design.', icon: <IconArchitecture /> },
        { id: '03', title: 'ENGINEERING', desc: 'Building with precision using React, TypeScript, and Framer Motion for a seamless digital experience.', icon: <IconEngineering /> },
        { id: '04', title: 'OPTIMIZATION', desc: 'Refining every pixel and line of code for maximum performance and global scalability.', icon: <IconOptimization /> }
    ];

    return (
        <section
            id="about"
            style={{
                backgroundColor: 'var(--bg-color)',
                color: 'var(--text-color)',
                position: 'relative',
                zIndex: 2,
                width: '100%',
                boxSizing: 'border-box'
            }}
        >
            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                {/* Intro Narrative Section */}
                <div className="about-grid">
                    {/* Left Side: Bold Label & Sticky Statement */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={containerVariants}
                        className="about-sticky-side"
                    >
                        <motion.span
                            variants={itemVariants}
                            style={{
                                fontSize: '10px',
                                letterSpacing: '0.4em',
                                textTransform: 'uppercase',
                                fontWeight: 600,
                                display: 'block',
                                marginBottom: '1.2rem',
                                opacity: 0.4
                            }}
                        >
                            01 / THE ARCHITECT
                        </motion.span>

                        <AnimatedHeading text="Merging Algorithmic Rigor with Vibe Code." />
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={containerVariants}
                        className="about-content-side"
                    >

                        {/* Portrait Image Integration */}
                        <motion.div
                            variants={itemVariants}
                            className="about-portrait-wrapper"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <motion.img
                                src="/My_Self-2.png"
                                alt="Sohan Hossain Portrait"
                                initial={{ scale: 1.1, filter: 'grayscale(1) brightness(0.4)' }}
                                whileInView={{
                                    scale: 1,
                                    filter: theme === 'dark' ? 'grayscale(0.5) brightness(0.9) contrast(1.1)' : 'grayscale(0.3) brightness(1) contrast(1)'
                                }}
                                transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    width: 'calc(100% + 4px)',
                                    height: 'calc(100% + 4px)',
                                    marginLeft: '-2px',
                                    marginTop: '-2px',
                                    objectFit: 'cover',
                                    objectPosition: 'top center',
                                }}
                                whileHover={{ scale: 1.05 }}
                            />

                            {/* Creative Overlay Grid */}
                            <div style={{
                                position: 'absolute',
                                inset: '3px',
                                backgroundImage: `radial-gradient(circle, rgba(var(--text-color-rgb), 0.1) 1px, transparent 1px)`,
                                backgroundSize: '30px 30px',
                                opacity: 0.3,
                                pointerEvents: 'none',
                                zIndex: 2
                            }} />

                            {/* Cinematic Overlay */}
                            <div style={{
                                position: 'absolute',
                                inset: '-2px',
                                background: 'linear-gradient(to bottom, transparent 50%, var(--bg-color))',
                                pointerEvents: 'none',
                                zIndex: 4
                            }} />

                            {/* Decorative Label */}
                            <div style={{
                                position: 'absolute',
                                bottom: '40px',
                                left: '40px',
                                fontSize: '10px',
                                letterSpacing: '0.3em',
                                color: '#ff4212',
                                fontWeight: 600,
                                zIndex: 5,
                                textTransform: 'uppercase'
                            }}>
                                SOHAN UX
                            </div>
                        </motion.div>

                        {/* Relocated Intro Paragraph */}
                        <motion.p
                            variants={itemVariants}
                            style={{
                                fontSize: 'clamp(1rem, 1.8vw, 1.4rem)',
                                fontWeight: 300,
                                lineHeight: 1.6,
                                marginBottom: '2rem',
                                color: 'var(--text-color)',
                                opacity: 0.9
                            }}
                        >
                            I am <span style={{ color: 'var(--accent-color)', fontWeight: 700 }}>Sakhawat Hossain Sohan</span>, a Full-Stack Systems Engineer and BSc CSE graduate with <span style={{ color: 'var(--accent-color)', fontWeight: 600 }}>3+ years of professional experience</span>. I bridge the gap between low-level system performance (C/C++, Java) and high-level creative manifesting through **Vibe Code**.
                        </motion.p>

                        <motion.p
                            variants={itemVariants}
                            style={{
                                fontSize: 'clamp(1rem, 1.8vw, 1.4rem)',
                                fontWeight: 300,
                                lineHeight: 1.6,
                                marginBottom: '2rem',
                                opacity: 0.9
                            }}
                        >
                            My mission is to deliver **industrial-grade software** that scales infinitely. By leveraging **Ultra-Level AI** and **Business Growth strategies**, I transform complex technical problems into seamless, revenue-driving digital ecosystems.
                        </motion.p>

                        <motion.p
                            variants={itemVariants}
                            style={{
                                fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
                                fontWeight: 300,
                                lineHeight: 1.8,
                                marginBottom: '3rem',
                                opacity: 0.6
                            }}
                        >
                            Specializing in <span style={{ color: 'var(--accent-color)' }}>C/C++</span>, <span style={{ color: 'var(--accent-color)' }}>Java</span>, and advanced
                            <span style={{ color: 'var(--accent-color)' }}> web technologies</span>, I architect systems that excel in performance and reliability.
                            Every line of code is a deliberate step toward architectural perfection.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '2rem',
                                width: '100%'
                            }}
                        >
                            <div>
                                <h4 style={{ fontSize: '11px', fontWeight: 600, marginBottom: '1rem', opacity: 0.9, letterSpacing: '0.1em' }}>EXPERTISE</h4>
                                <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', opacity: 0.7, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                    <li>SYSTEM ARCHITECTURE</li>
                                    <li>VIBE CODE ENGINEERING</li>
                                    <li>ULTRA AI AUTOMATION</li>
                                    <li>GROWTH LOOPS & SCALING</li>
                                </ul>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '11px', fontWeight: 600, marginBottom: '1rem', opacity: 0.9, letterSpacing: '0.1em' }}>FOCUS</h4>
                                <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', opacity: 0.7, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                    <li>AI AUTOMATION</li>
                                    <li>VIRAL STRATEGIES</li>
                                    <li>RAPID PROTOTYPING</li>
                                    <li>GROWTH LOOPS</li>
                                </ul>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Key Stats Section */}
                <div style={{ marginTop: '8rem', marginBottom: '6rem', width: '100%' }}>
                    <div className="about-stats-grid">
                        {[
                            { label: 'Years Experience', value: '03+' },
                            { label: 'Efficiency Gain', value: '45%' },
                            { label: 'Codebase Lines', value: '1.2M' },
                            { label: 'Growth Surge', value: '250%' }
                        ].map((stat, index) => (
                            <StatCounter key={stat.label} value={stat.value} label={stat.label} index={index} />
                        ))}
                    </div>
                </div>

                {/* Working Methodology Section */}
                <div style={{ marginTop: '5rem', width: '100%' }}>
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.4 }}
                        viewport={{ once: true }}
                        style={{
                            fontSize: '10px',
                            letterSpacing: '0.4em',
                            textTransform: 'uppercase',
                            fontWeight: 600,
                            display: 'block',
                            marginBottom: '4rem',
                            textAlign: 'center'
                        }}
                    >
                        Working Methodology
                    </motion.span>

                    <div className="about-process-grid" style={{ borderTop: '1px solid var(--border-color)', borderLeft: '1px solid var(--border-color)' }}>
                        {processSteps.map((step) => (
                            <ProcessCard key={step.id} step={step} />
                        ))}
                    </div>
                </div>
            </div>
        </section >
    );
};

export default About;
