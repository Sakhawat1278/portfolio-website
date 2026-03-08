import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ServicesProps {
    theme: 'light' | 'dark';
}

const services = [
    {
        num: '01',
        title: 'SYSTEM ARCHITECTURE',
        tag: 'Infrastructure',
        description: 'Designing resilient backbones for high-stakes products. Bridging server ecosystems with scalable engineering for bulletproof reliability.',
        tools: ['Microservices', 'K8s', 'AWS', 'Docker', 'Terraform'],
    },
    {
        num: '02',
        title: 'INTERFACE DYNAMICS',
        tag: 'Interaction',
        description: 'Crafting immersive interfaces where every pixel serves its purpose. Merging aesthetics with rigid usability for seamless experiences.',
        tools: ['React', 'Framer', 'GSAP', 'Three.js', 'WebGL'],
    },
    {
        num: '03',
        title: 'FULL STACK ENGINE',
        tag: 'Performance',
        description: 'Building blazing-fast platforms with millisecond precision. Every layer is optimized for performance and industrial reliability.',
        tools: ['Next.js', 'TypeScript', 'Node.js', 'Prisma', 'PostgreSQL'],
    },
    {
        num: '04',
        title: 'AI INTEGRATION',
        tag: 'Intelligence',
        description: 'Implementing intelligent agents and predictive systems into production workflows to automate and elevate business logic.',
        tools: ['OpenAI', 'LangChain', 'Python', 'Vector DB', 'PyTorch'],
    },
];

const Services: React.FC<ServicesProps> = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeService = services[activeIndex];

    return (
        <section id="services" style={{ backgroundColor: 'var(--bg-color)', position: 'relative', zIndex: 2 }}>
            <div className="container">

                {/* ── Section Header ──────────────────────────────────────── */}
                <div style={{ marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}
                    >
                        <div style={{ width: '28px', height: '1px', backgroundColor: 'var(--accent-color)' }} />
                        <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.3em', opacity: 0.4, textTransform: 'uppercase' }}>
                            02 / CAPABILITIES
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
                            textTransform: 'uppercase',
                            margin: 0,
                        }}
                    >
                        Precision<br />
                        <span style={{ color: 'var(--accent-color)' }}>Dynamics.</span>
                    </motion.h2>
                </div>

                {/* ── DESKTOP/TABLET INTERACTIVE LAYOUT ────────────────────────────── */}
                <div className="services-desktop-layout">
                    {/* BIG CARD (Detail Focus) */}
                    <div style={{
                        backgroundColor: 'rgba(var(--text-color-rgb), 0.02)',
                        minHeight: '520px',
                        marginBottom: '2rem',
                        padding: 'clamp(2rem, 5vw, 6rem)',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                style={{ maxWidth: '850px', zIndex: 2, width: '100%' }}
                            >
                                <span style={{
                                    fontSize: '11px',
                                    fontWeight: 800,
                                    color: 'var(--accent-color)',
                                    letterSpacing: '0.35em',
                                    textTransform: 'uppercase',
                                    display: 'block',
                                    marginBottom: '1.5rem'
                                }}>
                                    {activeService.tag} // {activeService.num}
                                </span>

                                <div style={{ minHeight: 'clamp(5rem, 10vw, 10rem)', display: 'flex', alignItems: 'flex-start' }}>
                                    <h3 style={{
                                        fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                                        fontWeight: 900,
                                        lineHeight: 0.9,
                                        margin: 0,
                                        letterSpacing: '-0.05em',
                                        textTransform: 'uppercase'
                                    }}>
                                        {activeService.title}
                                    </h3>
                                </div>

                                <p style={{
                                    fontSize: '1.1rem',
                                    lineHeight: 1.6,
                                    opacity: 0.6,
                                    fontWeight: 300,
                                    maxWidth: '600px',
                                    margin: '2rem 0 3rem'
                                }}>
                                    {activeService.description}
                                </p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                                    {activeService.tools.map(tool => (
                                        <span key={tool} style={{
                                            fontSize: '9px',
                                            fontWeight: 800,
                                            opacity: 0.4,
                                            letterSpacing: '0.15em',
                                            border: '1px solid var(--border-color)',
                                            padding: '5px 12px',
                                            textTransform: 'uppercase'
                                        }}>
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Industrial Watermark */}
                        <div style={{
                            position: 'absolute',
                            right: '-5%',
                            bottom: '-10%',
                            fontSize: 'min(30vw, 400px)',
                            fontWeight: 900,
                            opacity: 0.02,
                            lineHeight: 1,
                            pointerEvents: 'none'
                        }}>
                            {activeService.num}
                        </div>
                    </div>

                    {/* SELECTOR GRID (4 Cards) */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1px',
                        backgroundColor: 'var(--border-color)',
                        border: '1px solid var(--border-color)'
                    }}>
                        {services.map((service, index) => {
                            const isActive = activeIndex === index;
                            return (
                                <motion.div
                                    key={service.num}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    animate={{
                                        backgroundColor: isActive ? 'var(--accent-color)' : 'var(--bg-color)',
                                        color: isActive ? '#fff' : 'var(--text-color)'
                                    }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        padding: '2.5rem 2rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        minHeight: '220px'
                                    }}
                                >
                                    <span style={{ fontSize: '12px', fontWeight: 800, opacity: isActive ? 0.7 : 0.2 }}>{service.num}</span>
                                    <div style={{ minHeight: '2.8rem', display: 'flex', alignItems: 'flex-end' }}>
                                        <h4 style={{
                                            fontSize: '1.05rem',
                                            fontWeight: 800,
                                            margin: 0,
                                            lineHeight: 1.2,
                                            textTransform: 'uppercase',
                                            letterSpacing: '-0.02em',
                                            width: '100%'
                                        }}>
                                            {service.title}
                                        </h4>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* ── MOBILE FULLY OPEN LAYOUT ────────────────────────────── */}
                <div className="services-mobile-layout" style={{ display: 'none', flexDirection: 'column', gap: '2rem' }}>
                    {services.map((service) => (
                        <div
                            key={service.num}
                            style={{
                                backgroundColor: 'rgba(var(--text-color-rgb), 0.02)',
                                padding: '2.5rem 1.5rem',
                                borderLeft: '3px solid var(--accent-color)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <span style={{
                                fontSize: '10px',
                                fontWeight: 800,
                                color: 'var(--accent-color)',
                                letterSpacing: '0.2rem',
                                textTransform: 'uppercase',
                                display: 'block',
                                marginBottom: '1rem'
                            }}>
                                {service.tag} // {service.num}
                            </span>

                            <h3 style={{
                                fontSize: '1.8rem',
                                fontWeight: 800,
                                lineHeight: 1.1,
                                margin: '0 0 1.2rem',
                                textTransform: 'uppercase',
                                letterSpacing: '-0.02em'
                            }}>
                                {service.title}
                            </h3>

                            <p style={{
                                fontSize: '1rem',
                                lineHeight: 1.6,
                                opacity: 0.6,
                                fontWeight: 300,
                                marginBottom: '2rem'
                            }}>
                                {service.description}
                            </p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                                {service.tools.map(tool => (
                                    <span key={tool} style={{
                                        fontSize: '8px',
                                        fontWeight: 800,
                                        opacity: 0.4,
                                        letterSpacing: '0.1em',
                                        border: '1px solid var(--border-color)',
                                        padding: '4px 10px',
                                        textTransform: 'uppercase'
                                    }}>
                                        {tool}
                                    </span>
                                ))}
                            </div>

                            {/* Faded background number */}
                            <div style={{
                                position: 'absolute',
                                right: '-5%',
                                bottom: '-5%',
                                fontSize: '100px',
                                fontWeight: 900,
                                opacity: 0.02,
                                lineHeight: 1,
                                pointerEvents: 'none'
                            }}>
                                {service.num}
                            </div>
                        </div>
                    ))}
                </div>

                <style>{`
                    @media (max-width: 768px) {
                        .services-desktop-layout { display: none !important; }
                        .services-mobile-layout { display: flex !important; }
                    }
                `}</style>

            </div>
        </section>
    );
};

export default Services;
