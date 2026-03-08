import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── DATA ─────────────────────────────────────────────────────────────────── */
const projects = [
    {
        num: '01',
        title: 'Neural Interface',
        year: '2024',
        role: 'Vibe Engineering + AI',
        category: 'Experimental',
        description:
            'A high-fidelity neural data platform with real-time rendering of complex neuro-maps and ultra-level AI telemetry update cycles.',
        tools: ['React', 'WebGL', 'AI Core', 'D3.js'],
        status: 'Live',
        video: 'https://videos.pexels.com/video-files/3129671/3129671-hd_1280_720_30fps.mp4',
        image: '/projects/synapse_mockup.png',
    },
    {
        num: '02',
        title: 'Vortex Engine',
        year: '2023',
        role: 'Business Growth + Dev',
        category: 'SaaS Architecture',
        description:
            'Scalable e-commerce engine handling 850K concurrent users with ultra-optimized growth loops and intelligent edge routing.',
        tools: ['Next.js', 'Vibe Code', 'Redis', 'Vercel'],
        status: 'Operational',
        video: 'https://videos.pexels.com/video-files/3255249/3255249-hd_1280_720_25fps.mp4',
        image: '/projects/vortex_mockup.png',
    },
];

// ... (stats update in the JSX below)
const worksStats = [['02', 'Projects'], ['03+', 'Years'], ['12+', 'Clients']];

/* ─── PROJECT CARD ──────────────────────────────────────────────────────────── */
const ProjectCard = ({
    project,
    index,
}: {
    project: (typeof projects)[0];
    index: number;
}) => {
    const [hovered, setHovered] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Play/pause video with hover for performance
    useEffect(() => {
        if (!videoRef.current) return;
        if (hovered) {
            videoRef.current.play().catch(() => { });
        } else {
            videoRef.current.pause();
        }
    }, [hovered]);

    const statusColor =
        project.status === 'Live' || project.status === 'Operational' || project.status === 'Deployed'
            ? '#22c55e'
            : project.status === 'Prototype'
                ? '#f59e0b'
                : 'var(--accent-color)';

    return (
        <motion.div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: 'relative',
                borderRadius: '0',
                overflow: 'hidden',
                aspectRatio: '4 / 3',
                cursor: 'pointer',
                display: 'block',
                border: '1px solid var(--border-color)',
            }}
        >
            {/* ── VIDEO / POSTER BACKGROUND ──────────────────── */}
            <motion.div
                animate={{ scale: hovered ? 1.06 : 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                }}
            >
                <video
                    ref={videoRef}
                    src={project.video}
                    poster={project.image}
                    muted
                    loop
                    playsInline
                    preload="none"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </motion.div>

            {/* ── GRADIENT OVERLAYS ───────────────────────────── */}
            {/* Always-on dark gradient at bottom */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1,
                    background:
                        'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.0) 70%)',
                    pointerEvents: 'none',
                }}
            />

            {/* Hover tint (subtle top darken) */}
            <motion.div
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1,
                    background: 'rgba(0,0,0,0.18)',
                    pointerEvents: 'none',
                }}
            />

            {/* ── ACCENT BORDER RING (hover) ──────────────────── */}
            <motion.div
                animate={{
                    opacity: hovered ? 1 : 0,
                    boxShadow: hovered
                        ? 'inset 0 0 0 1.5px var(--accent-color)'
                        : 'inset 0 0 0 0px transparent',
                }}
                transition={{ duration: 0.35 }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '0',
                    zIndex: 4,
                    pointerEvents: 'none',
                }}
            />

            {/* ── TOP BADGES ──────────────────────────────────── */}
            <div
                style={{
                    position: 'absolute',
                    top: '18px',
                    left: '18px',
                    right: '18px',
                    zIndex: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {/* Project number */}
                <div
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '100px',
                        padding: '5px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                    }}
                >
                    <span
                        style={{
                            fontSize: '8px',
                            fontWeight: 900,
                            color: 'var(--accent-color)',
                            letterSpacing: '0.08em',
                        }}
                    >
                        {project.num}
                    </span>
                    <span style={{ width: '1px', height: '8px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
                    <span
                        style={{
                            fontSize: '7px',
                            fontWeight: 700,
                            color: 'rgba(255,255,255,0.6)',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                        }}
                    >
                        {project.category}
                    </span>
                </div>

                {/* Status dot */}
                <div
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '100px',
                        padding: '5px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                    }}
                >
                    <motion.div
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            backgroundColor: statusColor,
                            flexShrink: 0,
                        }}
                    />
                    <span
                        style={{
                            fontSize: '7px',
                            fontWeight: 800,
                            color: 'rgba(255,255,255,0.55)',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                        }}
                    >
                        {project.status}
                    </span>
                </div>
            </div>

            {/* ── BOTTOM INFO PANEL ────────────────────────────── */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 3,
                    padding: '1.8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem',
                }}
            >
                {/* Title */}
                <motion.h3
                    animate={{ y: hovered ? -4 : 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontSize: 'clamp(1.4rem, 2.8vw, 2rem)',
                        fontWeight: 700,
                        letterSpacing: '-0.03em',
                        color: '#ffffff',
                        margin: 0,
                        lineHeight: 1.1,
                    }}
                >
                    {project.title}
                </motion.h3>

                {/* Role + year */}
                <motion.span
                    animate={{ opacity: hovered ? 0.5 : 0.35 }}
                    style={{
                        fontSize: '8.5px',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        color: 'rgba(255,255,255,0.45)',
                        textTransform: 'uppercase',
                    }}
                >
                    {project.role} · {project.year}
                </motion.span>

                {/* Description — expands on hover */}
                <AnimatePresence>
                    {hovered && (
                        <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                fontSize: 'clamp(0.78rem, 1vw, 0.88rem)',
                                fontWeight: 300,
                                lineHeight: 1.7,
                                color: 'rgba(255,255,255,0.65)',
                                margin: 0,
                                overflow: 'hidden',
                            }}
                        >
                            {project.description}
                        </motion.p>
                    )}
                </AnimatePresence>

                {/* Tools + CTA row */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                    }}
                >
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {project.tools.slice(0, 3).map((t) => (
                            <span
                                key={t}
                                style={{
                                    fontSize: '7px',
                                    fontWeight: 800,
                                    letterSpacing: '0.1em',
                                    padding: '3px 8px',
                                    borderRadius: '4px',
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                    color: 'rgba(255,255,255,0.6)',
                                    textTransform: 'uppercase',
                                    backdropFilter: 'blur(4px)',
                                }}
                            >
                                {t}
                            </span>
                        ))}
                    </div>

                    <motion.a
                        href="#"
                        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontSize: '8px',
                            fontWeight: 900,
                            letterSpacing: '0.18em',
                            color: 'var(--accent-color)',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                        }}
                    >
                        View
                        <svg
                            width="11"
                            height="11"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                        >
                            <path d="M7 17L17 7M17 7H8M17 7V16" />
                        </svg>
                    </motion.a>
                </div>
            </div>
        </motion.div>
    );
};

/* ─── MAIN SECTION ────────────────────────────────────────────────────────── */
const SelectedWorks: React.FC = () => {
    return (
        <section
            id="works"
            style={{
                backgroundColor: 'var(--bg-color)',
                position: 'relative',
                zIndex: 2,
            }}
        >
            <div className="container">

                {/* ── Header ──────────────────────────────────────── */}
                <div className="works-header">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                marginBottom: '1rem',
                            }}
                        >
                            <motion.div
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    backgroundColor: 'var(--accent-color)',
                                }}
                            />
                            <span
                                style={{
                                    fontSize: '10px',
                                    fontWeight: 800,
                                    letterSpacing: '0.3em',
                                    opacity: 0.4,
                                    textTransform: 'uppercase',
                                }}
                            >
                                04 / SELECTED WORKS
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                fontSize: 'clamp(2.8rem, 6vw, 6rem)',
                                fontWeight: 800,
                                lineHeight: 0.9,
                                letterSpacing: '-0.04em',
                                margin: 0,
                                textTransform: 'uppercase',
                            }}
                        >
                            Selected
                            <br />
                            <span style={{ color: 'var(--accent-color)' }}>Works.</span>
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="works-stats-col"
                    >
                        <p
                            style={{
                                fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
                                fontWeight: 300,
                                lineHeight: 1.7,
                                opacity: 0.4,
                                maxWidth: '260px',
                                margin: 0,
                                textAlign: 'right',
                            }}
                        >
                            Hover a card to play the project video and explore details.
                        </p>

                        {/* Stats row */}
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            {worksStats.map(([val, label]) => (
                                <div key={label} className="works-stat-item">
                                    <div
                                        style={{
                                            fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
                                            fontWeight: 800,
                                            letterSpacing: '-0.04em',
                                            color: 'var(--accent-color)',
                                            lineHeight: 1,
                                        }}
                                    >
                                        {val}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: '7.5px',
                                            fontWeight: 700,
                                            letterSpacing: '0.12em',
                                            opacity: 0.3,
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        {label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* ── 2-COL CARD GRID ─────────────────────────────── */}
                <div className="works-grid">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.num} project={project} index={index} />
                    ))}
                </div>

                {/* ── Footer ──────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
                        flexWrap: 'wrap',
                        gap: '1rem',
                    }}
                >
                    <span
                        style={{
                            fontSize: '8px',
                            fontWeight: 700,
                            letterSpacing: '0.2em',
                            opacity: 0.18,
                            textTransform: 'uppercase',
                        }}
                    >
                        Archive v3.2 · {projects.length.toString().padStart(2, '0')} Projects · 2023–2024
                    </span>
                    <motion.a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 4, opacity: 0.9 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '9px',
                            fontWeight: 800,
                            letterSpacing: '0.18em',
                            color: 'var(--text-color)',
                            textDecoration: 'none',
                            opacity: 0.3,
                            textTransform: 'uppercase',
                        }}
                    >
                        All Projects on GitHub
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M7 17L17 7M17 7H8M17 7V16" />
                        </svg>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default SelectedWorks;
