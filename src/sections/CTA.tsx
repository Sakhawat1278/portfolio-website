import { motion } from 'framer-motion';
import HoverButton from '../components/HoverButton';

const CTA: React.FC = () => {
    return (
        <section style={{
            padding: 'var(--section-py) var(--section-px)',
            backgroundColor: 'var(--bg-color)',
            borderTop: '1px solid var(--border-color)',
            position: 'relative'
        }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: '3rem' }}
                >
                    <span style={{
                        fontSize: '9px',
                        fontWeight: 900,
                        letterSpacing: '0.4em',
                        textTransform: 'uppercase',
                        color: 'var(--accent-color)',
                        opacity: 0.6,
                        display: 'block',
                        marginBottom: '1rem'
                    }}>
                        Protocol 07 / Communication
                    </span>
                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                        fontWeight: 800,
                        lineHeight: 1,
                        letterSpacing: '-0.04em',
                        textTransform: 'uppercase'
                    }}>
                        Initialize<br />
                        Collaboration.
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    style={{ maxWidth: '450px', marginBottom: '4rem' }}
                >
                    <p style={{ fontSize: '1.1rem', opacity: 0.4, fontWeight: 300, lineHeight: 1.6 }}>
                        Transforming complex requirements into industrial-grade digital ecosystems. Secure your next movement in the digital landscape.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <HoverButton
                        href="/contact"
                        variant="solid"
                        style={{
                            padding: '1.2rem 2.5rem',
                        }}
                    >
                        <span>Start Manifesting</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s ease' }} className="cta-arrow">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" />
                        </svg>
                    </HoverButton>
                </motion.div>
            </div>

            <style>{`
                a:hover .cta-arrow {
                    transform: translateX(4px);
                }
            `}</style>
        </section>
    );
};

export default CTA;
