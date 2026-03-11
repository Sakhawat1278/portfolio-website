import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const testimonials = [
    {
        id: '01',
        quote:
            "Working with Sohan was one of the best engineering decisions we made. He delivered a platform that outperformed every benchmark — ahead of schedule. The quality of thought in every interaction is remarkable.",
        name: 'Marcus Ellis',
        role: 'CTO',
        company: 'NeuralPath Inc.',
        initial: 'M',
        rating: 5,
    },
    {
        id: '02',
        quote:
            "Sohan brought a rare combination of aesthetic vision and engineering rigor. Our infrastructure went from a mess of scripts to a clean, observable system in 6 weeks. He doesn't just build — he architects with intention.",
        name: 'Priya Sharma',
        role: 'Head of Product',
        company: 'Aether Systems',
        initial: 'P',
        rating: 5,
    },
    {
        id: '03',
        quote:
            "The motion design work Sohan delivered completely elevated our product's feel. Engagement metrics improved 40% after the redesign. I've never seen someone care this deeply about the kinetic layer.",
        name: 'Lena Hoffmann',
        role: 'Co-founder',
        company: 'Kinetic Studio',
        initial: 'L',
        rating: 5,
    },
    {
        id: '04',
        quote:
            "Exceptional technical depth. Sohan didn't just meet the requirements, he improved our entire CI/CD pipeline while redesigning the core UI. A true full-stack weapon.",
        name: 'David Chen',
        role: 'VP of Engineering',
        company: 'Synthetix',
        initial: 'D',
        rating: 5,
    },
];

const Card = ({ t, isActive }: { t: typeof testimonials[0]; isActive: boolean; }) => {
    return (
        <motion.div
            initial={false}
            animate={{
                opacity: isActive ? 1 : 0.2,
                scale: isActive ? 1 : 0.85,
                filter: isActive ? 'blur(0px)' : 'blur(4px)',
                zIndex: isActive ? 10 : 0
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
                width: 'clamp(280px, 85vw, 550px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2.5rem',
                padding: 'clamp(2rem, 4vw, 4rem)',
                border: '1px solid var(--border-color)',
                backgroundColor: isActive ? 'rgba(var(--text-color-rgb), 0.03)' : 'transparent',
                position: 'relative',
                userSelect: 'none',
                height: 'fit-content'
            }}
        >
            {/* Top Indicator Line */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: isActive ? '100%' : '0%',
                height: '2px',
                backgroundColor: 'var(--accent-color)',
                transition: 'width 0.6s ease'
            }} />

            {/* ID + Feedback Node */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.3em', color: 'var(--accent-color)', opacity: 0.8 }}>
                    {t.id} // SECURE_FEEDBACK_NODE
                </span>
                <div style={{ display: 'flex', gap: '3px' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} style={{
                            width: '4px',
                            height: '4px',
                            backgroundColor: i < t.rating ? 'var(--accent-color)' : 'var(--border-color)',
                            opacity: isActive ? 1 : 0.3
                        }} />
                    ))}
                </div>
            </div>

            {/* Quote */}
            <p style={{
                fontSize: 'clamp(1.1rem, 1.4vw, 1.4rem)',
                fontWeight: 300,
                lineHeight: 1.6,
                opacity: isActive ? 0.9 : 0.4,
                margin: 0,
                fontFamily: 'var(--font-primary)',
                letterSpacing: '-0.02em',
                fontStyle: 'italic'
            }}>
                "{t.quote}"
            </p>

            {/* Attribution - Industrial Style */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginTop: 'auto' }}>
                <div style={{
                    width: '45px',
                    height: '45px',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 800,
                    color: 'var(--accent-color)',
                    backgroundColor: 'rgba(var(--text-color-rgb), 0.05)'
                }}>
                    {t.initial}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.name}</span>
                    <span style={{ fontSize: '9px', fontWeight: 600, opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t.role} // {t.company}</span>
                </div>
            </div>
        </motion.div>
    );
};

const Testimonials: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [swiper, setSwiper] = useState<any>(null);

    const nextSlide = () => {
        if (swiper) swiper.slideNext();
    };
    const prevSlide = () => {
        if (swiper) swiper.slidePrev();
    };

    return (
        <section
            id="testimonials"
            style={{
                backgroundColor: 'var(--bg-color)',
                position: 'relative',
                zIndex: 2,
                overflow: 'hidden'
            }}
        >
            <div className="container">
                {/* ── Header Area ────────────────────────────── */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginBottom: 'clamp(0.5rem, 2vw, 1.5rem)',
                    flexWrap: 'wrap',
                    gap: '1rem'
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
                                05 / TESTIMONIALS
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.08 }}
                            style={{
                                fontSize: 'clamp(2.2rem, 7vw, 5rem)',
                                fontWeight: 900,
                                lineHeight: 0.85,
                                letterSpacing: '-0.05em',
                                textTransform: 'uppercase',
                                margin: 0,
                                opacity: 0.7,
                            }}
                        >
                            Industrial<br />
                            <span style={{ color: 'var(--accent-color)' }}>Trust.</span>
                        </motion.h2>
                    </div>
                </div>

                {/* ── Slider Content ──────────────────────────── */}
                <div style={{
                    position: 'relative',
                    width: '100vw',
                    marginLeft: 'calc(-50vw + 50%)',
                    overflow: 'hidden',
                    padding: '1.5rem 0 2rem 0',
                    cursor: 'grab'
                }}>
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={window.innerWidth < 768 ? 20 : 30}
                        slidesPerView={'auto'}
                        centeredSlides={true}
                        loop={false}
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                        onSwiper={(swiper) => setSwiper(swiper)}
                        style={{ width: '100%' }}
                    >
                        {testimonials.map((t) => (
                            <SwiperSlide key={t.id} style={{ width: 'auto' }}>
                                {({ isActive }) => (
                                    <Card t={t} isActive={isActive} />
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* ── Progress Indicators ────────────────────────── */}
                <div style={{
                    marginTop: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '1.5rem'
                }}>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                        {testimonials.map((_, i) => (
                            <motion.div
                                key={i}
                                initial={false}
                                animate={{
                                    width: activeIndex === i ? '50px' : '12px',
                                    backgroundColor: activeIndex === i ? 'var(--accent-color)' : 'rgba(var(--text-color-rgb), 0.1)'
                                }}
                                style={{ height: '3px', cursor: 'pointer' }}
                                onClick={() => {
                                    if (swiper) swiper.slideTo(i);
                                    setActiveIndex(i);
                                }}
                            />
                        ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap-reverse', justifyContent: 'flex-end', width: '100%' }}>
                        {/* Navigation Controls - Sharp Corners */}
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                onClick={prevSlide}
                                aria-label="Previous testimonial"
                                style={{
                                    background: 'transparent',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-color)',
                                    width: '45px',
                                    height: '45px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-color)'; e.currentTarget.style.color = 'var(--accent-color)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-color)'; }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                onClick={nextSlide}
                                aria-label="Next testimonial"
                                style={{
                                    background: 'transparent',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-color)',
                                    width: '45px',
                                    height: '45px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-color)'; e.currentTarget.style.color = 'var(--accent-color)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-color)'; }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                        {/* Counter */}
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                            <span style={{ fontSize: '18px', fontWeight: 900, color: 'var(--accent-color)' }}>
                                0{activeIndex + 1}
                            </span>
                            <span style={{ fontSize: '10px', fontWeight: 600, opacity: 0.2, letterSpacing: '0.2rem' }}>
                                / 0{testimonials.length}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
