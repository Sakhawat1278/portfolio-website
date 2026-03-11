import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Footer from '../sections/Footer';
import HoverButton from '../components/HoverButton';
import { Helmet } from 'react-helmet-async';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';

const AboutPage: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
    // Scroll transforms removed per user request to simplify top section interaction

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', width: '100%' }}
        >
            <Helmet>
                <title>About | Sakhawat Hossain Sohan — WordPress Expert & App Developer</title>
                <meta name="description" content="Learn about Sakhawat Hossain Sohan — a BSc CSE graduate from Daffodil International University, WordPress plugin engineer, Android developer, and full-stack architect." />
                <link rel="canonical" href="https://sakhawatsohan.com/about" />
                <meta property="og:title" content="About Sakhawat Hossain Sohan" />
                <meta property="og:description" content="BSc CSE graduate — WordPress expert, Android developer, and full-stack engineer building high-performance digital ecosystems." />
                <meta property="og:url" content="https://sakhawatsohan.com/about" />
                <meta name="twitter:title" content="About Sakhawat Hossain Sohan" />
                <meta name="twitter:description" content="BSc CSE graduate — WordPress expert, Android developer, and full-stack engineer building high-performance digital ecosystems." />
            </Helmet>
            <main style={{ paddingTop: 'var(--header-height)', width: '100%' }}>
                {/* ── HERO PROTOCOL ─────────────────────────────────────── */}
                <section style={{ display: 'flex', alignItems: 'center', padding: 'var(--section-py) 0 0', position: 'relative' }}>
                    <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(1.5rem, 8vw, 4rem)', alignItems: 'center', width: '100%' }}>
                        <motion.div style={{ marginTop: '-4rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ width: '40px', height: '1px', backgroundColor: '#ff4212' }} />
                                <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.4em', textTransform: 'uppercase', opacity: 0.4 }}>
                                    Identity Protocol v4.0
                                </span>
                            </div>

                            <h1 style={{ fontSize: 'clamp(2.2rem, 8vw, 5rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.05em', textTransform: 'uppercase', margin: '0 0 clamp(1.5rem, 5vw, 3rem) -0.05em' }}>
                                The Systems <br />
                                <span style={{ color: '#ff4212' }}>Manifesto.</span>
                            </h1>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(1rem, 6vw, 3rem)', maxWidth: '1000px', marginBottom: '3rem' }}>
                                <p style={{ fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.7, opacity: 0.7 }}>
                                    My journey in engineering is driven by a singular obsession: <strong>Architectural Perfection</strong>.
                                    I started in the deep waters of <strong>C, C++, Java, and Python</strong>, where I learned that every byte is a choice and every instruction is a commitment.
                                    This fundamental rigor is the DNA of everything I build today.
                                    Whether operating as a deep <strong>WordPress Expert and Plugin Developer</strong>, building robust solutions as an <strong>Android App Developer</strong>, or crafting high-performance platforms as a <strong>Raw Code Website Developer</strong>, I apply the same low-level precision to high-level manifestation.
                                </p>
                                <p style={{ fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.7, opacity: 0.7 }}>
                                    As a <strong>BSc in CSE</strong> graduate from <strong>Daffodil International University</strong>,
                                    I don't just develop software; I engineer ecosystems. Beyond the code, I am a <strong>Quick Learner, Creative Thinker, Tech Explorer, and an avid Gamer</strong> at heart. I believe that code should not only function
                                    but should scale infinitely and intuitively. By merging my comprehensive language knowledge with
                                    industrial development protocols, I transform complex business challenges into
                                    highly optimized, SEO-friendly digital engines that dominate the market.
                                </p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            >
                                <HoverButton
                                    href="/Sakhawat_Hossain_CV_(5.0).pdf"
                                    variant="solid"
                                    download="Sakhawat_Hossain_CV.pdf"
                                    style={{ height: '54px', padding: '0 40px', width: 'fit-content' }}
                                >
                                    <span style={{ fontSize: '12px', letterSpacing: '0.15em', fontWeight: 800 }}>
                                        ACCESS_CV_PROTOCOL
                                    </span>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '12px' }}>
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                        <polyline points="14 2 14 8 20 8"></polyline>
                                        <line x1="16" y1="13" x2="8" y2="13"></line>
                                        <line x1="16" y1="17" x2="8" y2="17"></line>
                                        <polyline points="10 9 9 9 8 9"></polyline>
                                    </svg>
                                </HoverButton>
                            </motion.div>
                        </motion.div>

                        {/* Identity Anchor (Image) */}
                        <motion.div
                            style={{ position: 'relative' }}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div style={{
                                width: '100%',
                                maxWidth: '480px',
                                height: '580px',
                                marginLeft: 'auto',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                clipPath: 'polygon(15% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%, 0% 15%)'
                            }}>
                                <motion.img
                                    src="/About_Self.png"
                                    alt="Sakhawat Hossain Sohan — WordPress Expert & App Developer"
                                    loading="eager"
                                    fetchPriority="high"
                                    width="480"
                                    height="580"
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
                                        willChange: 'filter, transform',
                                        transform: 'translateZ(0)'
                                    }}
                                />

                                {/* Creative Overlay Grid (Homepage Style) */}
                                <div style={{
                                    position: 'absolute',
                                    inset: '3px',
                                    backgroundImage: `radial-gradient(circle, rgba(var(--text-color-rgb), 0.1) 1px, transparent 1px)`,
                                    backgroundSize: '30px 30px',
                                    opacity: 0.3,
                                    pointerEvents: 'none',
                                    zIndex: 2
                                }} />

                                {/* Cinematic Overlay (Homepage Style) */}
                                <div style={{
                                    position: 'absolute',
                                    inset: '-2px',
                                    background: 'linear-gradient(to bottom, transparent 50%, var(--bg-color))',
                                    pointerEvents: 'none',
                                    zIndex: 4
                                }} />


                            </div>

                            {/* Technical Status Overlay (External to Clip) */}
                            <div style={{
                                position: 'absolute',
                                bottom: '0px',
                                right: 'clamp(-20px, calc(-5vw + 20px), 0px)',
                                padding: '16px 24px',
                                backgroundColor: 'rgba(0,0,0,0.85)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '0',
                                zIndex: 10,
                                clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)'
                            }}>
                                <div style={{ fontSize: '9px', fontWeight: 900, color: '#ff4212', letterSpacing: '2px', marginBottom: '4px' }}>CORE_IDENTITY</div>
                                <div style={{ fontSize: '13px', fontWeight: 800, color: 'white', textTransform: 'uppercase' }}>SAKHAWAT HOSSAIN SOHAN</div>
                            </div>
                        </motion.div>
                    </div>

                </section>

                {/* ── CORE CAPABILITIES GRID ─────────────────────────────── */}
                <section style={{ padding: 'var(--section-py) 0 0' }}>
                    <div className="container" style={{ position: 'relative' }}>
                        <Swiper
                            modules={[Pagination]}
                            pagination={{
                                clickable: true,
                                bulletClass: 'swiper-pagination-bullet industrial-bullet',
                                bulletActiveClass: 'swiper-pagination-bullet-active',
                            }}
                            spaceBetween={30}
                            slidesPerView={1}
                            centeredSlides={true}
                            initialSlide={0}
                            breakpoints={{
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 60,
                                    centeredSlides: false,
                                    allowTouchMove: false,
                                }
                            }}
                            className="capabilities-swiper"
                        >
                            {/* Systems Card */}
                            <SwiperSlide>
                                <motion.div className="capability-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                    <span style={{ fontSize: '9px', fontWeight: 900, color: '#ff4212', letterSpacing: '0.2em', display: 'block', marginBottom: '1.2rem' }}>01_CORE_ENGINEERING</span>
                                    <h3 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Systems Logic</h3>
                                    <p style={{ opacity: 0.5, lineHeight: 1.7, marginBottom: '2rem', fontWeight: 300 }}>
                                        Rigorous background in <strong>C/C++ and Java</strong> from <strong>BSc in CSE</strong>.
                                        Specializing in low-level memory architecture, multithreaded systems, and native <strong>Android Development</strong>.
                                    </p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {['C/C++', 'Java', 'Android SDK', 'BSc CSE'].map(t => (
                                            <span key={t} style={{ fontSize: '8px', fontWeight: 800, padding: '4px 8px', backgroundColor: 'rgba(var(--text-color-rgb), 0.05)', borderRadius: '0', opacity: 0.4 }}>{t}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            </SwiperSlide>

                            {/* Plugin Card */}
                            <SwiperSlide>
                                <motion.div className="capability-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                                    <span style={{ fontSize: '9px', fontWeight: 900, color: '#ff4212', letterSpacing: '0.2em', display: 'block', marginBottom: '1.2rem' }}>02_WP_ARCHITECTURE</span>
                                    <h3 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Plugin Mastery</h3>
                                    <p style={{ opacity: 0.5, lineHeight: 1.7, marginBottom: '2rem', fontWeight: 300 }}>
                                        Expert-level <strong>WordPress Plugin Engineering</strong>.
                                        Crafting custom logic engines, API integrations, and scalable PHP architectures that power high-traffic ecosystems.
                                    </p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {['WP Plugins', 'PHP 8.x', 'Custom Hooks', 'WooCommerce'].map(t => (
                                            <span key={t} style={{ fontSize: '8px', fontWeight: 800, padding: '4px 8px', backgroundColor: 'rgba(var(--text-color-rgb), 0.05)', borderRadius: '0', opacity: 0.4 }}>{t}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            </SwiperSlide>

                            {/* AI & Frontend Card */}
                            <SwiperSlide>
                                <motion.div className="capability-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                                    <span style={{ fontSize: '9px', fontWeight: 900, color: '#ff4212', letterSpacing: '0.2em', display: 'block', marginBottom: '1.2rem' }}>03_VIBE_CODE_AI</span>
                                    <h3 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Hyper-Web</h3>
                                    <p style={{ opacity: 0.5, lineHeight: 1.7, marginBottom: '2rem', fontWeight: 300 }}>
                                        High-concept <strong>React & Next.js</strong> development infused with AI Automation.
                                        Manifesting visceral animations and hyper-efficient engineering workflows with Claude & GPT.
                                    </p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {['React Ecosystem', 'TypeScript', 'AI Core', 'Framer Motion'].map(t => (
                                            <span key={t} style={{ fontSize: '8px', fontWeight: 800, padding: '4px 8px', backgroundColor: 'rgba(var(--text-color-rgb), 0.05)', borderRadius: '0', opacity: 0.4 }}>{t}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </section>

                {/* ── ACADEMIC PROTOCOL REDESIGN ───────────────────────────── */}
                <section style={{
                    padding: 'var(--section-py) 0 0',
                    backgroundColor: 'var(--bg-color)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Technical Backdrop */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `radial-gradient(circle at 2px 2px, var(--border-color) 1px, transparent 0)`,
                        backgroundSize: '40px 40px',
                        opacity: 0.2,
                        pointerEvents: 'none'
                    }} />

                    <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                        {/* Section Header Protocol */}
                        <div style={{ marginBottom: '3rem' }}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}
                            >
                                <span style={{ width: '30px', height: '1px', backgroundColor: '#ff4212' }} />
                                <span style={{ fontSize: '10px', fontWeight: 900, color: '#ff4212', letterSpacing: '0.4em', textTransform: 'uppercase' }}>
                                    INTERNAL_ACADEMIC_AUDIT_v4.2
                                </span>
                            </motion.div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
                                <motion.h2
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    style={{
                                        fontSize: 'clamp(2.2rem, 6vw, 5rem)',
                                        fontWeight: 800,
                                        lineHeight: 0.9,
                                        letterSpacing: '-0.04em',
                                        textTransform: 'uppercase',
                                        margin: 0
                                    }}
                                >
                                    The <br />
                                    <span style={{ color: '#ff4212' }}>Daffodil</span> <br />
                                    Protocol.
                                </motion.h2>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 0.5 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 }}
                                    style={{ textAlign: 'right', fontSize: '9px', fontWeight: 800, letterSpacing: '0.2em' }}
                                >
                                    CORE_ENGINEERING_DATA <br />
                                    7F2-DIU / ENGINES_&_ARCH
                                </motion.div>
                            </div>
                        </div>

                        {/* Bento Grid Redesign */}
                        <div
                            className="daffodil-grid"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(12, 1fr)',
                                gap: '1.5rem',
                                gridAutoRows: 'minmax(100px, auto)'
                            }}>

                            {/* Narrative Block (Left Span 7) */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                style={{
                                    gridColumn: 'span 7',
                                    padding: 'clamp(1.5rem, 5vw, 3rem)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '0px',
                                    backgroundColor: 'rgba(var(--text-color-rgb), 0.01)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}
                                className="about-narrative-bento daffodil-item"
                            >
                                <p style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.4rem)', fontWeight: 300, lineHeight: 1.6, opacity: 0.8, margin: 0 }}>
                                    My engineering DNA was forged at <strong>Daffodil International University</strong>, where I specialized in Computer Science and Engineering.
                                    This immersive 4-year cycle focused on building high-performance logic engines and scalable digital architectures.
                                    Formal academic rigor ensures that every line of code is optimized for performance and security.
                                </p>
                            </motion.div>

                            {/* Verification Card (Right Span 5, Row Span 2) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="daffodil-item"
                                style={{
                                    gridColumn: 'span 5',
                                    gridRow: 'span 2',
                                    position: 'relative',
                                    padding: 'clamp(1.5rem, 5vw, 3rem)',
                                    backgroundColor: 'var(--text-color)',
                                    color: 'var(--bg-color)',
                                    borderRadius: '0px',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow: '0 40px 80px rgba(0,0,0,0.1)',
                                    minHeight: 'auto'
                                }}
                            >
                                {/* Scanline Animation */}
                                <motion.div
                                    animate={{ top: ['-10%', '110%'] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        width: '100%',
                                        height: '2px',
                                        backgroundColor: '#ff4212',
                                        opacity: 0.1,
                                        zIndex: 3
                                    }}
                                />

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'clamp(2rem, 8vw, 5rem)' }}>
                                    <div style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.3em', opacity: 0.4 }}>CREDENTIAL_VERIFICATION</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
                                        <span style={{ fontSize: '8px', fontWeight: 900, letterSpacing: '0.1em' }}>LIVE_NODE</span>
                                    </div>
                                </div>

                                <div style={{ marginBottom: 'auto' }}>
                                    <div style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, textTransform: 'uppercase' }}>
                                        BSc in <br />
                                        <span style={{ color: '#ff4212' }}>CSE</span>
                                    </div>
                                    <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '2rem', opacity: 0.6 }}>DAFFODIL INTERNATIONAL UNIVERSITY</div>
                                </div>

                                <div style={{ marginTop: 'clamp(2rem, 8vw, 5rem)', padding: '2rem 0', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                        <div>
                                            <div style={{ fontSize: '8px', fontWeight: 900, opacity: 0.3, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Session</div>
                                            <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>2021 – 2025</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '8px', fontWeight: 900, opacity: 0.3, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Status</div>
                                            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ff4212' }}>COMPLETED</div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ fontSize: '8px', fontWeight: 800, opacity: 0.2, letterSpacing: '0.2em', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>TIMESTAMP_ID: 2026_SESSION</span>
                                    <span>ARCH_MODE: PRODUCTION</span>
                                </div>
                            </motion.div>

                            {/* Core Modules (Bottom Span 7) */}
                            <div
                                className="daffodil-item daffodil-modules"
                                style={{ gridColumn: 'span 7', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', backgroundColor: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: '0px', overflow: 'hidden' }}>
                                {[
                                    { label: 'Computational Logic', code: 'CSE_101', icon: '01' },
                                    { label: 'Software Architecture', code: 'CSE_402', icon: '02' },
                                    { label: 'Algorithmic Optimization', code: 'CSE_203', icon: '03' },
                                    { label: 'System Design', code: 'CSE_301', icon: '04' }
                                ].map((mod, i) => (
                                    <motion.div
                                        key={mod.code}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 * i }}
                                        whileHover={{ backgroundColor: 'rgba(var(--text-color-rgb), 0.04)' }}
                                        style={{
                                            padding: '2rem 1.5rem',
                                            backgroundColor: 'var(--bg-color)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '1.5rem',
                                            cursor: 'default'
                                        }}
                                    >
                                        <div style={{ fontSize: '9px', fontWeight: 900, color: '#ff4212', opacity: 0.6 }}>{mod.icon}</div>
                                        <div>
                                            <div style={{ fontSize: '8px', fontWeight: 800, opacity: 0.3, letterSpacing: '0.1em', marginBottom: '0.4rem' }}>{mod.code}</div>
                                            <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.3 }}>{mod.label}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                        </div>
                    </div>

                    {/* Media Query Support (Inline Styles for simplicity as it's a single file edit) */}
                    <style>{`
                        @media (max-width: 1024px) {
                            .daffodil-grid {
                                grid-template-columns: 1fr !important;
                                display: flex !important;
                                flex-direction: column !important;
                                gap: 1rem !important;
                            }
                            .daffodil-item {
                                grid-column: span 12 !important;
                                width: 100% !important;
                            }
                            .daffodil-modules {
                                grid-template-columns: 1fr 1fr !important;
                            }
                        }
                        @media (max-width: 600px) {
                            .daffodil-modules {
                                grid-template-columns: 1fr !important;
                            }
                        }

                        /* Capabilities Swiper Protocol */
                        .capabilities-swiper {
                            padding-bottom: 4rem !important;
                        }
                        
                        .industrial-bullet {
                            width: 12px !important;
                            height: 3px !important;
                            border-radius: 0 !important;
                            background: rgba(var(--text-color-rgb), 0.1) !important;
                            opacity: 1 !important;
                            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
                        }
                        
                        .swiper-pagination-bullet-active {
                            width: 40px !important;
                            background: var(--accent-color) !important;
                        }

                        .about-final-cta {
                            padding-bottom: 4rem !important;
                        }

                        @media (max-width: 1024px) {
                            .about-final-cta {
                                padding-bottom: 2rem !important;
                            }
                        }
                    `}</style>
                </section>

                {/* ── FINAL CALL TO ACTION ────────────────────────────────── */}
                <section className="about-final-cta" style={{ padding: 'var(--section-py) 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="container"
                    >
                        <h2 style={{ fontSize: 'clamp(2.5rem, 10vw, 5rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.05em', marginBottom: '2rem', textTransform: 'uppercase' }}>
                            Ready to build <br />
                            <span style={{ color: '#ff4212' }}>the future?</span>
                        </h2>

                        <HoverButton
                            href="/contact"
                            variant="solid"
                        >
                            LET_S_START
                        </HoverButton>
                    </motion.div>
                </section>

                <Footer theme={theme} />
            </main>
        </motion.div>
    );
};

export default AboutPage;
