import React from 'react';
import { motion } from 'framer-motion';

/* ─── Simple Icons CDN helper ─────────────────────────────────────────────── */
const SI = (slug: string) => `https://cdn.simpleicons.org/${slug}`;

/* ─── DATA ─────────────────────────────────────────────────────────────────── */
type Skill = { name: string; icon: string };

const categories: { label: string; dir: number; items: Skill[] }[] = [
    {
        label: 'Vibe Code Apps',
        dir: -1,
        items: [
            { name: 'Vibe JS', icon: SI('javascript') },
            { name: 'React Ultra', icon: SI('react') },
            { name: 'Framer Motion', icon: SI('framer') },
            { name: 'App Logic', icon: SI('simpleicons') },
            { name: 'Motion Engine', icon: SI('greensock') },
        ],
    },
    {
        label: 'Ultra AI Usage',
        dir: 1,
        items: [
            { name: 'Gemini AI', icon: SI('googlegemini') },
            { name: 'Prompt Engineering', icon: SI('anthropic') },
            { name: 'AI Models', icon: SI('huggingface') },
            { name: 'Automation', icon: SI('zapier') },
            { name: 'Neural Flow', icon: SI('tensorflow') },
        ],
    },
    {
        label: 'Business Growth',
        dir: -1,
        items: [
            { name: 'Growth Loops', icon: SI('buffer') },
            { name: 'Data Analytics', icon: SI('googleanalytics') },
            { name: 'Conversion Logic', icon: SI('hubspot') },
            { name: 'SaaS Strategy', icon: SI('stripe') },
            { name: 'Viral Engines', icon: SI('tiktok') },
        ],
    },
    {
        label: 'Web Core',
        dir: 1,
        items: [
            { name: 'Vite', icon: SI('vite') },
            { name: 'Next.js', icon: SI('nextdotjs') },
            { name: 'TypeScript', icon: SI('typescript') },
            { name: 'Web Architecture', icon: SI('blueprint') },
            { name: 'Edge Performance', icon: SI('vercel') },
        ],
    },
];

/* ─── SKILL PILL ──────────────────────────────────────────────────────────── */
const SkillPill = React.memo(({ skill }: { skill: Skill }) => (
    <span
        style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            padding: '5px 13px',
            border: '1px solid var(--border-color)',
            borderRadius: '0',
            backgroundColor: 'rgba(var(--text-color-rgb), 0.03)',
            flexShrink: 0,
            whiteSpace: 'nowrap',
        }}
    >
        <img
            src={skill.icon}
            alt={`${skill.name} icon`}
            width={13}
            height={13}
            loading="lazy"
            style={{
                display: 'block',
                flexShrink: 0,
                filter: 'brightness(0) saturate(0%) invert(var(--icon-invert, 0))',
                opacity: 0.65,
            }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        {skill.name}
    </span>
));

/* ─── MARQUEE ROW ─────────────────────────────────────────────────────────── */
const SkillRow = React.memo(({ category, index }: { category: typeof categories[0], index: number }) => {
    // Repeat items to ensure full width coverage on all screens
    const repeatedItems = [...category.items, ...category.items, ...category.items, ...category.items, ...category.items, ...category.items];
    const duration = 25 + index * 5;

    return (
        <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{
                display: 'flex',
                alignItems: 'center',
                borderTop: '1px solid var(--border-color)',
                overflow: 'hidden',
                position: 'relative',
                width: '100%'
            }}
        >
            <div style={{
                flexShrink: 0,
                width: 'clamp(100px, 12vw, 160px)',
                padding: '1.2rem 1.2rem 1.2rem 0',
                borderRight: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-color)',
                zIndex: 5,
                display: 'flex',
                alignItems: 'center'
            }}>
                <span style={{ fontSize: '7.5px', fontWeight: 900, letterSpacing: '0.2em', opacity: 0.28, textTransform: 'uppercase', display: 'block' }}>
                    {category.label}
                </span>
            </div>

            <div style={{ flex: 1, overflow: 'hidden', position: 'relative', padding: '0.9rem 0' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '40px', background: 'linear-gradient(to right, var(--bg-color), transparent)', zIndex: 2 }} />
                <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '40px', background: 'linear-gradient(to left, var(--bg-color), transparent)', zIndex: 2 }} />

                <motion.div
                    animate={{ x: category.dir === -1 ? ['0%', '-50%'] : ['-50%', '0%'] }}
                    transition={{ duration, repeat: Infinity, ease: 'linear' }}
                    style={{ display: 'flex', gap: '10px', willChange: 'transform' }}
                >
                    {repeatedItems.map((skill, i) => (
                        <SkillPill key={`${skill.name}-${i}`} skill={skill} />
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
});

/* ─── MAIN SECTION ────────────────────────────────────────────────────────── */
const TechStack: React.FC = React.memo(() => {
    return (
        <section id="stack" style={{ backgroundColor: 'var(--bg-color)', position: 'relative', zIndex: 2 }}>
            <style>{`
              [data-theme="dark"] #stack img { filter: brightness(0) saturate(0%) invert(1); opacity: 0.65; }
              [data-theme="light"] #stack img { filter: brightness(0) saturate(0%) invert(0); opacity: 0.55; }
            `}</style>

            <div className="container">
                {/* ── Header ──────────────────────────────────────── */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
                    flexWrap: 'wrap',
                    gap: '2rem'
                }}>
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}
                        >
                            <div style={{ width: '28px', height: '1px', backgroundColor: 'var(--accent-color)' }} />
                            <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.3em', opacity: 0.4, textTransform: 'uppercase' }}>
                                03 / ARCHITECTURE
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                fontSize: 'clamp(2.2rem, 7vw, 5rem)',
                                fontWeight: 900,
                                lineHeight: 0.85,
                                letterSpacing: '-0.05em',
                                opacity: 0.7,
                                margin: 0,
                                textTransform: 'uppercase',
                            }}
                        >
                            Tech<br />
                            <span style={{ color: 'var(--accent-color)' }}>Stack.</span>
                        </motion.h2>
                    </div>

                    {/* ── Stats moved to top right ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        style={{
                            display: 'flex',
                            gap: 'clamp(2rem, 4vw, 4rem)',
                            flexWrap: 'wrap',
                            paddingBottom: '0.5rem'
                        }}
                    >
                        {[
                            ['50+', 'Tools'],
                            ['100%', 'Performance'],
                            ['4.9s', 'Load Avg'],
                        ].map(([val, label]) => (
                            <div key={label} style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--accent-color)', lineHeight: 1 }}>
                                    {val}
                                </div>
                                <div style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.15em', opacity: 0.3, textTransform: 'uppercase', marginTop: '4px' }}>
                                    {label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div style={{ borderBottom: '1px solid var(--border-color)' }}>
                    {categories.map((cat, i) => (
                        <SkillRow key={cat.label} category={cat} index={i} />
                    ))}
                </div>
            </div >
        </section >
    );
});

export default TechStack;
