import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const ContactSection = lazy(() => import('../sections/Contact'));
const Footer = lazy(() => import('../sections/Footer'));

const SectionFallback = () => (
    <div style={{ minHeight: '30vh', width: '100%' }} aria-hidden="true" />
);

interface PageProps {
    theme: 'light' | 'dark';
}

const ContactPage: React.FC<PageProps> = ({ theme }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%', backgroundColor: 'var(--bg-color)' }}
        >
            <main style={{ padding: 'var(--header-height) 0 0', backgroundColor: 'var(--bg-color)' }}>
                <Helmet>
                    <title>Contact | Sakhawat Hossain Sohan — Get In Touch</title>
                    <meta name="description" content="Reach out to Sakhawat Hossain Sohan for WordPress development, full-stack engineering, Android apps, or any project collaboration. Let's build something great." />
                    <link rel="canonical" href="https://sakhawatsohan.com/contact" />
                    <meta property="og:title" content="Contact Sakhawat Hossain Sohan" />
                    <meta property="og:description" content="Reach out for WordPress development, full-stack engineering, Android apps, or any project collaboration." />
                    <meta property="og:url" content="https://sakhawatsohan.com/contact" />
                    <meta name="twitter:title" content="Contact Sakhawat Hossain Sohan" />
                    <meta name="twitter:description" content="Reach out for WordPress development, full-stack engineering, Android apps, or any project collaboration." />
                </Helmet>
                <Suspense fallback={<SectionFallback />}>
                    <ContactSection theme={theme} variant="classic" />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                    <Footer theme={theme} />
                </Suspense>
            </main>
        </motion.div>
    );
};

export default ContactPage;
