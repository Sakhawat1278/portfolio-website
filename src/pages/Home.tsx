import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const Hero = lazy(() => import('../sections/Hero'));
const About = lazy(() => import('../sections/About'));
const Services = lazy(() => import('../sections/Services'));
const TechStack = lazy(() => import('../sections/TechStack'));
const SelectedWorks = lazy(() => import('../sections/SelectedWorks'));
const Testimonials = lazy(() => import('../sections/Testimonials'));
const ExperienceEducation = lazy(() => import('../sections/ExperienceEducation'));
const Contact = lazy(() => import('../sections/Contact'));
const Footer = lazy(() => import('../sections/Footer'));

const HeroFallback = () => (
    <div style={{ height: '100vh', width: '100%', backgroundColor: 'var(--bg-color)' }} aria-hidden="true" />
);

const SectionFallback = () => (
    <div style={{ height: '300px', width: '100%', backgroundColor: 'var(--bg-color)', opacity: 0.1 }} aria-hidden="true" />
);

interface HomeProps {
    theme: 'light' | 'dark';
    isLoading: boolean;
}

const Home: React.FC<HomeProps> = ({ theme }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ width: '100%', backgroundColor: 'var(--bg-color)' }}
        >
            <Helmet>
                <title>Sakhawat Hossain Sohan | WordPress Expert & App Developer</title>
                <meta name="description" content="Sakhawat Hossain Sohan is a top-tier WordPress expert, full-stack developer, and Android app specialist. Expert in Next.js, Flutter, and complex PHP architectures." />
                <link rel="canonical" href="https://sakhawatsohan.com" />
                <meta property="og:url" content="https://sakhawatsohan.com" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            <main id="main-content">
                <Suspense fallback={<HeroFallback />}>
                    <Hero />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                    <About theme={theme} />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                    <Services theme={theme} />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                    <TechStack />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                    <SelectedWorks />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                    <Testimonials />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                    <ExperienceEducation />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                    <Contact theme={theme} hideExtras={true} />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                    <Footer theme={theme} />
                </Suspense>
            </main>
        </motion.div>
    );
};

export default Home;
