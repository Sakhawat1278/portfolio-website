import React from 'react';
import { motion } from 'framer-motion';

/* ─── DATA ─────────────────────────────────────────────────────────────────── */
const experience = [
    {
        period: '04/2024 – Present',
        title: 'Business Growth Associate',
        org: 'E-GUIDER GLOBAL',
        location: 'Remote',
        description:
            'Contractual remote role focused on business growth and client acquisition via strategic planning and technical implementation for expansion.',
        tags: ['Strategic Planning', 'Business Growth', 'Client Acquisition'],
        current: true,
    },
    {
        period: '05/2025 – 01/2026',
        title: 'WordPress Developer',
        org: 'Softvence Agency',
        location: 'Dhaka, Bangladesh',
        description:
            'Specialized in web development and design solutions. Optimized application efficiency by 30% through Methodist code optimization and performance auditing.',
        tags: ['WordPress', 'Optimization', 'Web Development'],
        current: false,
    },
];

const education = [
    {
        period: '03/2021 – 04/2025',
        title: 'BSc in CSE',
        org: 'Daffodil International University',
        location: 'Dhaka, Bangladesh',
        description:
            'Currently pursuing a Bachelor of Science in Computer Science and Engineering. Focused on algorithm design and software engineering principles.',
        tags: ['Data Structures', 'Algorithms', 'Software Engineering'],
        current: true,
    },
    {
        period: '2018 – 2020',
        title: 'Higher School Certificate',
        org: 'Savar Model College',
        location: 'Savar, Dhaka',
        description:
            'Completed secondary education with a focus on Science. Developed strong foundational knowledge in mathematics and physics.',
        tags: ['Science', 'Mathematics', 'Physics'],
        current: false,
    },
];

/* ─── TIMELINE ENTRY ──────────────────────────────────────────────────────── */
const TimelineEntry = ({
    item,
    index,
    isLast,
}: {
    item: typeof experience[0];
    index: number;
    isLast: boolean;
}) => {

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.55, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', gap: '0', position: 'relative' }}
        >
            {/* Rail + dot */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '28px', flexShrink: 0 }}>
                {/* Dot */}
                <div
                    style={{
                        width: item.current ? '10px' : '7px',
                        height: item.current ? '10px' : '7px',
                        borderRadius: '50%',
                        backgroundColor: item.current ? 'var(--accent-color)' : 'var(--border-color)',
                        border: item.current ? '2px solid var(--accent-color)' : '1.5px solid var(--border-color)',
                        flexShrink: 0,
                        marginTop: '3px',
                        boxShadow: item.current ? '0 0 0 3px rgba(var(--accent-color-rgb, 255,66,18),0.15)' : 'none',
                        zIndex: 1,
                        position: 'relative',
                    }}
                />
                {/* Rail */}
                {!isLast && (
                    <div
                        style={{
                            flex: 1,
                            width: '1px',
                            backgroundColor: 'var(--border-color)',
                            marginTop: '6px',
                        }}
                    />
                )}
            </div>

            {/* Content */}
            <div
                style={{
                    flex: 1,
                    paddingLeft: '1rem',
                    paddingBottom: isLast ? '1.5rem' : '2rem',
                }}
            >
                {/* Period */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                    <span
                        style={{
                            fontSize: '8px',
                            fontWeight: 800,
                            letterSpacing: '0.18em',
                            color: item.current ? 'var(--accent-color)' : 'var(--text-color)',
                            opacity: item.current ? 1 : 0.4,
                            textTransform: 'uppercase',
                        }}
                    >
                        {item.period}
                    </span>

                    {item.current && (
                        <span
                            style={{
                                fontSize: '6.5px',
                                fontWeight: 900,
                                letterSpacing: '0.15em',
                                color: '#fff',
                                backgroundColor: 'var(--accent-color)',
                                padding: '2px 6px',
                                borderRadius: '0',
                                textTransform: 'uppercase',
                            }}
                        >
                            Current
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3
                    style={{
                        fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        margin: '0 0 0.2rem',
                        lineHeight: 1.2,
                    }}
                >
                    {item.title}
                </h3>

                {/* Org + location */}
                <div
                    style={{
                        fontSize: '8.5px',
                        fontWeight: 600,
                        opacity: 0.35,
                        letterSpacing: '0.06em',
                        marginBottom: '0.65rem',
                    }}
                >
                    {item.org}
                    <span style={{ opacity: 0.5, margin: '0 5px' }}>·</span>
                    {item.location}
                </div>

                {/* Description — always visible but truncatable */}
                <p
                    style={{
                        fontSize: 'clamp(0.8rem, 0.95vw, 0.875rem)',
                        fontWeight: 300,
                        lineHeight: 1.7,
                        opacity: 0.55,
                        margin: '0 0 0.75rem',
                    }}
                >
                    {item.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {item.tags.map((tag) => (
                        <span
                            key={tag}
                            style={{
                                fontSize: '7px',
                                fontWeight: 800,
                                letterSpacing: '0.1em',
                                padding: '3px 8px',
                                border: '1px solid var(--border-color)',
                                borderRadius: '0',
                                opacity: 0.45,
                                textTransform: 'uppercase',
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div >
    );
};

/* ─── MAIN SECTION ────────────────────────────────────────────────────────── */
const ExperienceEducation: React.FC = () => {
    return (
        <section
            id="experience"
            style={{
                backgroundColor: 'var(--bg-color)',
                position: 'relative',
                zIndex: 2,
            }}
        >
            <div className="container">

                {/* ── Header ──────────────────────────────────────── */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
                        flexWrap: 'wrap',
                        gap: '1.5rem',
                    }}
                >
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}
                        >
                            <div style={{ width: '28px', height: '1px', backgroundColor: 'var(--accent-color)' }} />
                            <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.3em', opacity: 0.7, textTransform: 'uppercase' }}>
                                06 / CHRONICLES
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                fontSize: 'clamp(2.2rem, 6vw, 5rem)',
                                fontWeight: 800,
                                lineHeight: 0.9,
                                letterSpacing: '-0.04em',
                                textTransform: 'uppercase',
                                margin: 0,
                            }}
                        >
                            Experience &<br />
                            <span style={{ color: 'var(--accent-color)' }}>Education.</span>
                        </motion.h2>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.18 }}
                        style={{
                            fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
                            fontWeight: 300,
                            lineHeight: 1.7,
                            opacity: 0.4,
                            maxWidth: '260px',
                            alignSelf: 'flex-end',
                            margin: 0,
                        }}
                    >
                        Four years of professional experience across startups, agencies, and global products.
                    </motion.p>
                </div>

                {/* ── Two-column timeline ──────────────────────────── */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
                        gap: 'clamp(3rem, 6vw, 6rem)',
                        alignItems: 'start',
                    }}
                >
                    {/* EXPERIENCE column */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                marginBottom: '2rem',
                                paddingBottom: '1rem',
                                borderBottom: '1px solid var(--border-color)',
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2">
                                <rect x="2" y="7" width="20" height="14" rx="2" />
                                <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                            </svg>
                            <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.25em', opacity: 0.5, textTransform: 'uppercase' }}>
                                Work Experience
                            </span>
                            <span style={{ fontSize: '8px', fontWeight: 800, color: 'var(--accent-color)', marginLeft: 'auto', opacity: 0.6 }}>
                                {experience.length} roles
                            </span>
                        </motion.div>

                        {experience.map((item, i) => (
                            <TimelineEntry
                                key={i}
                                item={item}
                                index={i}
                                isLast={i === experience.length - 1}
                            />
                        ))}
                    </div>

                    {/* EDUCATION column */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: 12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                marginBottom: '2rem',
                                paddingBottom: '1rem',
                                borderBottom: '1px solid var(--border-color)',
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2">
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                <path d="M6 12v5c3 3 9 3 12 0v-5" />
                            </svg>
                            <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.25em', opacity: 0.5, textTransform: 'uppercase' }}>
                                Education & Certs
                            </span>
                            <span style={{ fontSize: '8px', fontWeight: 800, color: 'var(--accent-color)', marginLeft: 'auto', opacity: 0.6 }}>
                                {education.length} entries
                            </span>
                        </motion.div>

                        {education.map((item, i) => (
                            <TimelineEntry
                                key={i}
                                item={item}
                                index={i}
                                isLast={i === education.length - 1}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceEducation;
