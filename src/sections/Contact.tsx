import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── INTERNAL API CONFIG ──────────────────────────────────────────────────
// Automatically use the live endpoint if on localhost to avoid 404s
const API_ENDPOINT = window.location.hostname === 'localhost'
    ? 'https://sohanux.com/api/contact'
    : '/api/contact';

interface ContactProps {
    theme: 'light' | 'dark';
}

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
        visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 100 } as any },
        hidden: { opacity: 0, y: 50, transition: { type: "spring", damping: 25, stiffness: 100 } as any },
    };
    return (
        <motion.h2
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            style={{
                fontSize: 'clamp(1.8rem, 8vw, 5.5rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                flexWrap: 'wrap',
                gap: '0.15em',
                width: '100%',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
            }}
        >
            {words.map((word, index) => (
                <span key={index} style={{ overflow: 'hidden', display: 'inline-block', maxWidth: '100%', wordBreak: 'break-word' }}>
                    <motion.span
                        variants={child}
                        style={{
                            display: 'inline-block',
                            maxWidth: '100%',
                            color: word.toLowerCase().includes("communication") || word.toLowerCase().includes("link") ? '#ff4212' : 'inherit'
                        }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </motion.h2>
    );
};

// ─── SUBMIT BUTTON ────────────────────────────────────────────────────────────
type Status = 'idle' | 'sending' | 'success' | 'error';

const SubmitButton = ({ status }: { status: Status }) => {
    const labels: Record<Status, string> = {
        idle: 'EXECUTE_HANDSHAKE',
        sending: 'TRANSMITTING...',
        success: 'UPLINK_CONFIRMED ✓',
        error: 'RETRY_TRANSMISSION',
    };
    const colors: Record<Status, string> = {
        idle: 'var(--text-color)',
        sending: '#888',
        success: '#00c853',
        error: '#ff4212',
    };

    return (
        <motion.button
            type="submit"
            disabled={status === 'sending'}
            whileHover={status !== 'sending' ? { scale: 1.02 } : {}}
            whileTap={status !== 'sending' ? { scale: 0.97 } : {}}
            style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '0 28px',
                height: '48px',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                backgroundColor: colors[status],
                color: status === 'idle' ? 'var(--bg-color)' : '#fff',
                border: 'none',
                cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-primary)',
                transition: 'background-color 0.4s ease, color 0.3s ease',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
            }}
        >
            <AnimatePresence mode="wait">
                <motion.span
                    key={status}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    {labels[status]}
                </motion.span>
            </AnimatePresence>
            {status === 'sending' && (
                <motion.div
                    style={{
                        width: '14px',
                        height: '14px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTopColor: '#fff',
                        borderRadius: '50%',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                />
            )}
        </motion.button>
    );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const Contact: React.FC<ContactProps> = () => {
    const [isFocused, setIsFocused] = useState<string | null>(null);
    const [time, setTime] = useState(new Date());
    const [status, setStatus] = useState<Status>('idle');
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) return;
        setStatus('sending');

        const payload = {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            sent_time: time.toLocaleString('en-US', { timeZone: 'Asia/Dhaka', hour12: true }),
        };

        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error('Submission failed');

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (err) {
            console.error('Submission error:', err);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
    };
    const itemVariants = {
        hidden: { y: 40, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
    };

    const inputStyle = (id: string) => ({
        width: '100%',
        maxWidth: '100%',
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: `1px solid ${isFocused === id ? 'transparent' : 'var(--border-color)'}`,
        display: 'block',
        padding: '1.5rem 0',
        fontSize: '1.1rem',
        color: 'var(--text-color)',
        outline: 'none',
        fontFamily: 'var(--font-primary)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        letterSpacing: '0.02em',
        borderRadius: 0,
        position: 'relative' as const,
        zIndex: 2,
        boxSizing: 'border-box' as const,
    });

    return (
        <section
            id="contact"
            className="contact-section"
            style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', position: 'relative', zIndex: 2, boxSizing: 'border-box' }}
        >
            <div className="container">
                <div className="contact-grid">
                    {/* LEFT */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={containerVariants}
                        className="contact-sticky-side contact-left-info"
                    >
                        <motion.span
                            variants={itemVariants}
                            style={{ fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '1.2rem', opacity: 0.4 }}
                        >
                            07 / THE UPLINK
                        </motion.span>
                        <AnimatedHeading text="Initiate the communication link." />
                        <motion.p
                            variants={itemVariants}
                            style={{ fontSize: 'clamp(1rem, 1.2vw, 1.1rem)', fontWeight: 300, lineHeight: 1.6, marginTop: '2.5rem', opacity: 0.6, maxWidth: '400px' }}
                        >
                            Whether it's a new <span style={{ color: 'var(--accent-color)' }}>system architecture</span>, a complex <span style={{ color: 'var(--accent-color)' }}>web engine</span>, or a <span style={{ color: 'var(--accent-color)' }}>creative design discovery</span>,
                            I'm ready to collaborate. Let's build something that <span style={{ color: 'var(--accent-color)' }}>scales</span>.
                        </motion.p>
                    </motion.div>

                    {/* RIGHT */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={containerVariants}
                        className="contact-content-side"
                    >
                        <motion.div variants={itemVariants} className="contact-form-container">
                            {/* Background FX */}
                            <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
                                    <svg width="100%" height="100%" style={{ display: 'block' }}>
                                        {[...Array(6)].map((_, i) => (
                                            <motion.circle
                                                key={i}
                                                r="1.5"
                                                fill="#ff4212"
                                                animate={{
                                                    x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                                                    y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                                                    opacity: [0, 0.5, 0]
                                                }}
                                                transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
                                            />
                                        ))}
                                    </svg>
                                </div>
                                <motion.div
                                    animate={{ opacity: isFocused ? 0.15 : 0, scale: isFocused ? 1 : 0.8 }}
                                    style={{
                                        position: 'absolute',
                                        width: '400px', height: '400px',
                                        background: 'radial-gradient(circle, #ff4212 0%, transparent 70%)',
                                        filter: 'blur(40px)',
                                        left: '50%',
                                        top: isFocused === 'name' ? '15%' : isFocused === 'email' ? '35%' : '60%',
                                        transform: 'translate(-50%, -50%)',
                                        transition: 'top 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                                    }}
                                />
                            </div>

                            <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'grid', gap: '2.5rem', position: 'relative', zIndex: 1 }}>
                                {/* Name */}
                                <div style={{ position: 'relative' }}>
                                    <motion.span
                                        animate={{ opacity: isFocused === 'name' ? 0.8 : 0.2, color: isFocused === 'name' ? '#ff4212' : 'var(--text-color)' }}
                                        style={{ fontSize: '9px', fontWeight: 900, position: 'absolute', top: '-0.8rem', left: 0, letterSpacing: '0.1em' }}
                                    >
                                        01_IDENTIFICATION
                                    </motion.span>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Full Name"
                                        required
                                        style={inputStyle('name') as any}
                                        onFocus={() => setIsFocused('name')}
                                        onBlur={() => setIsFocused(null)}
                                    />
                                    {isFocused === 'name' && (
                                        <motion.div layoutId="contact-focus-line" transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                            style={{ position: 'absolute', bottom: '-1px', left: 0, height: '2px', backgroundColor: '#ff4212', width: '100%', zIndex: 3 }}
                                        />
                                    )}
                                </div>

                                {/* Email */}
                                <div style={{ position: 'relative' }}>
                                    <motion.span
                                        animate={{ opacity: isFocused === 'email' ? 0.8 : 0.2, color: isFocused === 'email' ? '#ff4212' : 'var(--text-color)' }}
                                        style={{ fontSize: '9px', fontWeight: 900, position: 'absolute', top: '-0.8rem', left: 0, letterSpacing: '0.1em' }}
                                    >
                                        02_COMM_CHANNEL
                                    </motion.span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email Address"
                                        required
                                        style={inputStyle('email') as any}
                                        onFocus={() => setIsFocused('email')}
                                        onBlur={() => setIsFocused(null)}
                                    />
                                    {isFocused === 'email' && (
                                        <motion.div layoutId="contact-focus-line" transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                            style={{ position: 'absolute', bottom: '-1px', left: 0, height: '2px', backgroundColor: '#ff4212', width: '100%', zIndex: 3 }}
                                        />
                                    )}
                                </div>

                                {/* Message */}
                                <div style={{ position: 'relative' }}>
                                    <motion.span
                                        animate={{ opacity: isFocused === 'message' ? 0.8 : 0.2, color: isFocused === 'message' ? '#ff4212' : 'var(--text-color)' }}
                                        style={{ fontSize: '9px', fontWeight: 900, position: 'absolute', top: '-0.8rem', left: 0, letterSpacing: '0.1em' }}
                                    >
                                        03_MISSION_OBJECTIVES
                                    </motion.span>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Define your mission..."
                                        required
                                        style={{ ...inputStyle('message'), minHeight: '160px', resize: 'none' } as any}
                                        onFocus={() => setIsFocused('message')}
                                        onBlur={() => setIsFocused(null)}
                                    />
                                    {isFocused === 'message' && (
                                        <motion.div layoutId="contact-focus-line" transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                            style={{ position: 'absolute', bottom: '-1px', left: 0, height: '2px', backgroundColor: '#ff4212', width: '100%', zIndex: 3 }}
                                        />
                                    )}
                                </div>

                                {/* Footer row */}
                                <div className="contact-form-bottom">
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                        <span style={{ fontSize: '8px', fontWeight: 900, opacity: 0.2, letterSpacing: '0.2rem' }}>SYSTEM_TIME</span>
                                        <span style={{ fontSize: '12px', fontWeight: 800 }}>{time.toLocaleTimeString()} UTC+6</span>
                                    </div>
                                    <div style={{ width: 'auto' }}>
                                        <SubmitButton status={status} />
                                    </div>
                                </div>
                            </form>
                        </motion.div>

                        <div className="contact-links-row">
                            <motion.div whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 400 }}>
                                <span style={{ fontSize: '9px', fontWeight: 800, opacity: 0.2, letterSpacing: '0.2rem', display: 'block', marginBottom: '0.6rem' }}>PRIMARY_UPLINK</span>
                                <a href="mailto:contact@sohanux.com" style={{ fontSize: '14px', fontWeight: 700, color: '#ff4212', textDecoration: 'none', borderBottom: '1px solid currentColor', paddingBottom: '2px' }}>CONTACT@SOHANUX.COM</a>
                            </motion.div>
                            <motion.div whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 400 }}>
                                <span style={{ fontSize: '9px', fontWeight: 800, opacity: 0.2, letterSpacing: '0.2rem', display: 'block', marginBottom: '0.6rem' }}>LOCATION</span>
                                <span style={{ fontSize: '14px', fontWeight: 700, borderBottom: '1px solid rgba(var(--text-color-rgb), 0.2)', paddingBottom: '2px' }}>DHAKA, BANGLADESH</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
