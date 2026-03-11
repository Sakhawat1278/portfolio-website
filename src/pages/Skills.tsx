import React from 'react';
import { motion } from 'framer-motion';
import { skillGroups } from '../data/skills';
import Footer from '../sections/Footer';
import { Helmet } from 'react-helmet-async';

const Skills: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
                minHeight: '100vh',
                backgroundColor: 'var(--bg-color)',
                color: 'var(--text-color)',
                width: '100%'
            }}
        >
            <main style={{ padding: 'var(--header-height) 0 0' }}>
                <Helmet>
                    <title>Skills | Sakhawat Hossain Sohan — Technical Capabilities</title>
                    <meta name="description" content="A comprehensive breakdown of Sakhawat Hossain Sohan's technical skills including WordPress, PHP, React, Next.js, Flutter, Android, and more." />
                    <link rel="canonical" href="https://sakhawatsohan.com/skills" />
                    <meta property="og:title" content="Skills & Technical Capabilities | Sakhawat Hossain Sohan" />
                    <meta property="og:description" content="Expert-level skills in WordPress, PHP, React, Next.js, Flutter, Android, and full-stack development." />
                    <meta property="og:url" content="https://sakhawatsohan.com/skills" />
                    <meta name="twitter:title" content="Skills | Sakhawat Hossain Sohan" />
                    <meta name="twitter:description" content="Expert-level skills in WordPress, PHP, React, Next.js, Flutter, Android, and full-stack development." />
                </Helmet>
                <section style={{ padding: 'var(--section-py) 0 0' }}>
                    <div className="container">
                        <div style={{ maxWidth: '1200px', marginBottom: '3rem' }}>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}
                            >
                                <div style={{ width: '28px', height: '1px', backgroundColor: 'var(--accent-color)' }} />
                                <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.3em', opacity: 0.4, textTransform: 'uppercase' }}>
                                    Professional Capabilities
                                </span>
                            </motion.div>

                            <motion.h1
                                className="skills-main-title"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    fontSize: 'clamp(2.2rem, 8vw, 5rem)',
                                    fontWeight: 900,
                                    lineHeight: 0.85,
                                    letterSpacing: '-0.05em',
                                    textTransform: 'uppercase',
                                    margin: 0
                                }}
                            >
                                Mastery &<br />
                                <span style={{ color: 'var(--accent-color)' }}>Skills.</span>
                            </motion.h1>

                            <motion.p
                                className="skills-main-paragraph"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                style={{ maxWidth: '800px', opacity: 0.6, fontSize: '1.2rem', fontWeight: 300, lineHeight: 1.6 }}
                            >
                                A comprehensive breakdown of my engineering technical stack, design-to-code workflow, and strategic implementation methodologies.
                            </motion.p>
                        </div>

                        {/* Skill Groups */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                            {skillGroups.map((group) => (
                                <div key={group.category} className="skill-category-wrapper" style={{ paddingTop: '2rem' }}>
                                    <h3 style={{
                                        fontSize: '10px',
                                        fontWeight: 900,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.4em',
                                        opacity: 0.25,
                                        marginBottom: '1.5rem'
                                    }}>
                                        {group.category}
                                    </h3>

                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
                                        gap: '4rem 2rem'
                                    }}>
                                        {group.skills.map((skill, skillIdx) => (
                                            <motion.div
                                                key={skill.name}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.1 * skillIdx }}
                                            >
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.2rem' }}>
                                                    <h4 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>
                                                        {skill.name}
                                                    </h4>
                                                    <div style={{ color: 'var(--accent-color)', fontWeight: 800, fontSize: '10px', letterSpacing: '0.1em' }}>
                                                        {skill.level}% MASTERY
                                                    </div>
                                                </div>

                                                <div style={{
                                                    width: '100%',
                                                    height: '1px',
                                                    backgroundColor: 'var(--border-color)',
                                                    marginBottom: '2rem',
                                                    position: 'relative',
                                                    overflow: 'hidden'
                                                }}>
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${skill.level}%` }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                                                        style={{
                                                            position: 'absolute',
                                                            left: 0, top: 0, bottom: 0,
                                                            backgroundColor: 'var(--accent-color)'
                                                        }}
                                                    />
                                                </div>

                                                <p style={{ opacity: 0.6, fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem', fontWeight: 300 }}>
                                                    {skill.description}
                                                </p>

                                                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                                    {skill.subSkills.map(sub => (
                                                        <span key={sub} style={{
                                                            fontSize: 'clamp(8px, 2vw, 9px)',
                                                            fontWeight: 700,
                                                            padding: '4px 8px',
                                                            backgroundColor: 'rgba(var(--text-color-rgb), 0.04)',
                                                            borderRadius: '0',
                                                            opacity: 0.8
                                                        }}>
                                                            {sub}
                                                        </span>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <div style={{ marginTop: '4rem' }}>
                    <Footer theme={theme} />
                </div>
                <style>{`
                    @media (max-width: 1024px) {
                        .skills-main-paragraph {
                            margin-top: 2rem !important;
                        }
                        .skill-category-wrapper {
                            padding-top: 0 !important;
                        }
                    }
                `}</style>
            </main>
        </motion.div>
    );
};

export default Skills;
