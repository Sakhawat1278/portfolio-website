import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HoverButton from '../components/HoverButton';

// ─── INTERNAL API CONFIG ──────────────────────────────────────────────────
// Automatically use the live endpoint if on localhost to avoid 404s
const API_ENDPOINT = '/api/contact';

interface ContactProps {
    theme: 'light' | 'dark';
    hideExtras?: boolean;
    variant?: 'classic' | 'step';
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
                fontSize: 'clamp(2.2rem, 8vw, 5rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                flexWrap: 'wrap',
                gap: '0.15em',
                width: '100%',
                wordBreak: 'normal',
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

    return (
        <HoverButton
            type="submit"
            disabled={status === 'sending'}
            variant="solid"
            style={{
                width: 'auto',
                minWidth: '180px',
                height: '50px',
                padding: '0 2.5rem',
                backgroundColor: status === 'success' ? '#00c853' : status === 'error' ? '#ff4212' : 'var(--text-color)',
            }}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={status}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                    {labels[status]}
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
                </motion.div>
            </AnimatePresence>
        </HoverButton>
    );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const Contact: React.FC<ContactProps> = ({ hideExtras = false, variant = 'step' }) => {
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

    const [currentStep, setCurrentStep] = useState(0);
    const steps = [
        { id: 'name', label: '01_IDENTIFICATION', placeholder: 'Full Name', type: 'text' },
        { id: 'email', label: '02_COMM_CHANNEL', placeholder: 'Email Address', type: 'email' },
        { id: 'message', label: '03_MISSION_OBJECTIVES', placeholder: 'Define your mission...', type: 'textarea' }
    ];

    const nextStep = () => {
        if (currentStep === 0 && !formData.name) return;
        if (currentStep === 1 && !formData.email) return;
        if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(prev => prev - 1);
    };

    const isLastStep = currentStep === steps.length - 1;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLastStep) {
            nextStep();
            return;
        }
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
            setCurrentStep(0);
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
        fontSize: '1.4rem',
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
            style={{
                backgroundColor: 'var(--bg-color)',
                color: 'var(--text-color)',
                position: 'relative',
                zIndex: 2,
                boxSizing: 'border-box',
                paddingTop: 'var(--section-py)'
            }}
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
                            style={{ fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '1.2rem', opacity: 0.7 }}
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


                        {/* Number & Map Row Integration — hidden on homepage */}
                        {!hideExtras && (
                            <motion.div
                                variants={itemVariants}
                                style={{
                                    marginTop: '2.5rem',
                                    width: '100%',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                    gap: '1rem',
                                    alignItems: 'stretch',
                                    maxWidth: '500px'
                                }}
                            >
                                {/* Number Box */}
                                <div style={{
                                    padding: '1.5rem',
                                    backgroundColor: 'rgba(var(--text-color-rgb), 0.03)',
                                    border: '1px solid var(--border-color)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    minHeight: '160px',
                                    boxSizing: 'border-box'
                                }}>
                                    <span style={{ fontSize: '9px', fontWeight: 800, opacity: 0.3, letterSpacing: '0.2rem', textTransform: 'uppercase' }}>VOICE_CHANNEL</span>
                                    <a href="tel:+88001887695162" style={{
                                        fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                                        fontWeight: 700,
                                        color: '#ff4212',
                                        textDecoration: 'none',
                                        letterSpacing: '-0.02em',
                                        marginTop: 'auto'
                                    }}>
                                        +880 01887695162
                                    </a>
                                </div>

                                {/* Map Box */}
                                <div style={{
                                    backgroundColor: 'rgba(var(--text-color-rgb), 0.05)',
                                    border: '1px solid var(--border-color)',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    minHeight: '160px'
                                }}>
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58356.12450868843!2d90.21985399999999!3d23.9158586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755e905260f8981%3A0xe6792f3929424e75!2sSavar!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2) opacity(0.6)' }}
                                        allowFullScreen={false}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '10px',
                                        right: '10px',
                                        fontSize: '8px',
                                        fontWeight: 800,
                                        opacity: 0.4,
                                        letterSpacing: '0.1em',
                                        backgroundColor: 'var(--bg-color)',
                                        padding: '4px 8px'
                                    }}>
                                        SAVAR_DHAKA
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* RIGHT */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={containerVariants}
                        className="contact-content-side"
                    >
                        <motion.div variants={itemVariants} className="contact-form-container" style={{ position: 'relative' }}>
                            {/* Progress bar (only for step variant) */}
                            {variant === 'step' && (
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '2px',
                                    backgroundColor: 'rgba(var(--text-color-rgb), 0.05)',
                                    zIndex: 10
                                }}>
                                    <motion.div
                                        animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                                        style={{
                                            height: '100%',
                                            backgroundColor: '#ff4212',
                                            boxShadow: '0 0 10px #ff4212'
                                        }}
                                    />
                                </div>
                            )}

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
                            </div>

                            <form
                                ref={formRef}
                                onSubmit={handleSubmit}
                                style={{
                                    minHeight: variant === 'step' ? 'clamp(320px, 40vh, 400px)' : 'auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    zIndex: 1,
                                    padding: '0'
                                }}
                            >
                                <div style={{ flex: 1 }}>
                                    {variant === 'step' ? (
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={currentStep}
                                                initial={{ x: 20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                exit={{ x: -20, opacity: 0 }}
                                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                            >
                                                <div style={{ marginBottom: '2.5rem' }}>
                                                    <label htmlFor={`${steps[currentStep].id}-input`}>
                                                        <motion.span
                                                            animate={{ opacity: 0.8, color: '#ff4212' }}
                                                            style={{ fontSize: '10px', fontWeight: 900, display: 'block', letterSpacing: '0.2rem', marginBottom: '1rem', textTransform: 'uppercase' }}
                                                        >
                                                            {steps[currentStep].label}
                                                        </motion.span>
                                                    </label>
                                                    {steps[currentStep].type === 'textarea' ? (
                                                        <textarea
                                                            id={`${steps[currentStep].id}-input`}
                                                            name={steps[currentStep].id}
                                                            value={formData[steps[currentStep].id as keyof typeof formData]}
                                                            onChange={handleChange}
                                                            placeholder={steps[currentStep].placeholder}
                                                            required
                                                            style={{ ...inputStyle(steps[currentStep].id), minHeight: '180px', resize: 'none' } as any}
                                                            onFocus={() => setIsFocused(steps[currentStep].id)}
                                                            onBlur={() => setIsFocused(null)}
                                                        />
                                                    ) : (
                                                        <input
                                                            id={`${steps[currentStep].id}-input`}
                                                            type={steps[currentStep].type}
                                                            name={steps[currentStep].id}
                                                            value={formData[steps[currentStep].id as keyof typeof formData]}
                                                            onChange={handleChange}
                                                            placeholder={steps[currentStep].placeholder}
                                                            required
                                                            style={inputStyle(steps[currentStep].id) as any}
                                                            onFocus={() => setIsFocused(steps[currentStep].id)}
                                                            onBlur={() => setIsFocused(null)}
                                                        />
                                                    )}
                                                    <motion.div
                                                        layoutId="contact-focus-line"
                                                        style={{ height: '2px', backgroundColor: '#ff4212', width: '100%', marginTop: '-1px' }}
                                                    />
                                                </div>

                                                <div style={{ fontSize: '9px', fontWeight: 800, opacity: 0.3, letterSpacing: '0.1em' }}>
                                                    STEP_0{currentStep + 1} / 0{steps.length}
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    ) : (
                                        <div style={{ display: 'grid', gap: '2rem' }}>
                                            {steps.map((step) => (
                                                <div key={step.id} style={{ position: 'relative' }}>
                                                    <label htmlFor={`${step.id}-input`}>
                                                        <motion.span
                                                            animate={{ opacity: isFocused === step.id ? 0.8 : 0.2, color: isFocused === step.id ? '#ff4212' : 'var(--text-color)' }}
                                                            style={{ fontSize: '9px', fontWeight: 900, position: 'absolute', top: '-0.8rem', left: 0, letterSpacing: '0.1em' }}
                                                        >
                                                            {step.label}
                                                        </motion.span>
                                                    </label>
                                                    {step.type === 'textarea' ? (
                                                        <textarea
                                                            id={`${step.id}-input`}
                                                            name={step.id}
                                                            value={formData[step.id as keyof typeof formData]}
                                                            onChange={handleChange}
                                                            placeholder={step.placeholder}
                                                            required
                                                            style={{ ...inputStyle(step.id), minHeight: '160px', resize: 'none' } as any}
                                                            onFocus={() => setIsFocused(step.id)}
                                                            onBlur={() => setIsFocused(null)}
                                                        />
                                                    ) : (
                                                        <input
                                                            id={`${step.id}-input`}
                                                            type={step.type}
                                                            name={step.id}
                                                            value={formData[step.id as keyof typeof formData]}
                                                            onChange={handleChange}
                                                            placeholder={step.placeholder}
                                                            required
                                                            style={inputStyle(step.id) as any}
                                                            onFocus={() => setIsFocused(step.id)}
                                                            onBlur={() => setIsFocused(null)}
                                                        />
                                                    )}
                                                    {isFocused === step.id && (
                                                        <motion.div layoutId="contact-focus-line"
                                                            style={{ position: 'absolute', bottom: '-1px', left: 0, height: '2px', backgroundColor: '#ff4212', width: '100%', zIndex: 3 }}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Footer row */}
                                <div className="contact-form-bottom" style={{ marginTop: variant === 'step' ? 'auto' : '2.5rem' }}>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        {variant === 'step' ? (
                                            <>
                                                {currentStep > 0 && (
                                                    <HoverButton
                                                        type="button"
                                                        onClick={prevStep}
                                                        variant="outline"
                                                        style={{ height: '50px', padding: '0 2rem' }}
                                                    >
                                                        PREV
                                                    </HoverButton>
                                                )}
                                                {!isLastStep ? (
                                                    <HoverButton
                                                        type="button"
                                                        onClick={nextStep}
                                                        variant="solid"
                                                        style={{ height: '50px', padding: '0 2.5rem' }}
                                                    >
                                                        CONTINUE
                                                    </HoverButton>
                                                ) : (
                                                    <SubmitButton status={status} />
                                                )}
                                            </>
                                        ) : (
                                            <SubmitButton status={status} />
                                        )}
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', textAlign: 'right' }}>
                                        <span style={{ fontSize: '8px', fontWeight: 900, opacity: 0.2, letterSpacing: '0.2rem' }}>BUFFER_SYNC</span>
                                        <span style={{ fontSize: '12px', fontWeight: 800 }}>{time.toLocaleTimeString()} UTC+6</span>
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
