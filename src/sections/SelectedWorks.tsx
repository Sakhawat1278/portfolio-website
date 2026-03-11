import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects as allProjects } from '../data/projects';

/* ─── DATA ─────────────────────────────────────────────────────────────────── */
const featuredIds = ['1', '2', '3', '4', '5', '13'];
const projects = allProjects.filter(p => featuredIds.includes(p.id));


// ... (stats update in the JSX below)
const worksStats = [['47', 'Projects'], ['03+', 'Years'], ['12+', 'Clients']];

import ProjectCard from '../components/ProjectCard';

/* ─── MAIN SECTION ────────────────────────────────────────────────────────── */
const SelectedWorks: React.FC = () => {
    return (
        <section
            id="works"
            style={{
                backgroundColor: 'var(--bg-color)',
                position: 'relative',
                zIndex: 2,
                padding: 'var(--section-py) 0 0'
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
                                    opacity: 0.7,
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
                                fontSize: 'clamp(2.2rem, 6vw, 5rem)',
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
                        <ProjectCard key={project.id} project={project} index={index} />
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
                    <motion.div
                        whileHover={{ x: 4, opacity: 0.9 }}
                    >
                        <Link
                            to="/works"
                            aria-label="View all my projects in the full archive"
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
                            View Full Project Archive
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M7 17L17 7M17 7H8M17 7V16" />
                            </svg>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default SelectedWorks;
