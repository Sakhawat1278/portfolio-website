import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import HoverButton from '../components/HoverButton';
import Footer from '../sections/Footer';
import ProjectCard from '../components/ProjectCard';
import { Helmet } from 'react-helmet-async';

const categories = ['All', 'Full Stack', 'Web App', 'WordPress', 'Android App', 'WP Plugin'];
const PROJECTS_PER_PAGE = 9;

const Works: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredProjects = useMemo(() => {
        let list = activeFilter === 'All'
            ? [...projects].sort((a, b) => {
                if (a.category === 'WordPress' && b.category !== 'WordPress') return -1;
                if (a.category !== 'WordPress' && b.category === 'WordPress') return 1;
                return 0;
            })
            : projects.filter((p) => p.category === activeFilter);
        return list;
    }, [activeFilter]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
    const paginatedProjects = useMemo(() => {
        const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
        return filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
    }, [filteredProjects, currentPage]);

    // Reset page when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeFilter]);

    // Scroll to top on page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="works-page" style={{
            backgroundColor: 'var(--bg-color)',
            minHeight: '100vh',
            paddingTop: 'calc(var(--header-height) + clamp(0px, 1vw, 16px))'
        }}>
            <Helmet>
                <title>Project Archive | Sakhawat Hossain Sohan — 47 Projects</title>
                <meta name="description" content="Explore 47 projects by Sakhawat Hossain Sohan including WordPress websites, Full Stack apps, Android applications, and custom WP plugins." />
                <link rel="canonical" href="https://sakhawatsohan.com/works" />
                <meta property="og:title" content="Project Archive | Sakhawat Hossain Sohan" />
                <meta property="og:description" content="Browse 47 projects spanning WordPress development, Full Stack engineering, Android apps, and custom WP plugins." />
                <meta property="og:url" content="https://sakhawatsohan.com/works" />
                <meta name="twitter:title" content="Project Archive | Sakhawat Hossain Sohan" />
                <meta name="twitter:description" content="Browse 47 projects spanning WordPress development, Full Stack engineering, Android apps, and custom WP plugins." />
            </Helmet>
            <style>
                {`
                    .projects-grid {
                        display: grid;
                        gap: clamp(16px, 3vw, 32px);
                        grid-template-columns: repeat(3, 1fr);
                        margin-bottom: 4rem;
                    }

                    @media (max-width: 1024px) {
                        .projects-grid {
                            grid-template-columns: repeat(2, 1fr);
                        }
                    }

                    @media (max-width: 640px) {
                        .projects-grid {
                            grid-template-columns: 1fr;
                        }
                        .works-header {
                            margin-bottom: 0.5rem !important;
                        }
                        .works-header h1 {
                            margin-bottom: 0.5rem !important;
                        }
                        .filter-container {
                            margin-bottom: 2rem !important;
                            gap: 8px !important;
                        }
                    }
                `}
            </style>

            <section style={{ paddingBottom: '4rem' }}>
                <div className="container">

                    {/* Header */}
                    <div className="works-header" style={{ marginBottom: '1.5rem' }}>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                fontSize: 'clamp(2.2rem, 8vw, 5rem)',
                                fontWeight: 900,
                                letterSpacing: '-0.05em',
                                lineHeight: 0.85,
                                marginBottom: '1rem',
                                color: 'var(--text-color)',
                                textTransform: 'uppercase'
                            }}
                        >
                            PROJECT<br />
                            <span style={{ color: 'var(--accent-color)' }}>ARCHIVE</span>
                        </motion.h1>
                    </div>

                    {/* Filters */}
                    <div className="filter-container" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '12px',
                        marginBottom: '3rem',
                        borderBottom: '1px solid var(--border-color)',
                        paddingBottom: '1.5rem'
                    }}>
                        {categories.map((cat) => (
                            <HoverButton
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                style={{
                                    backgroundColor: activeFilter === cat ? 'var(--accent-color)' : 'transparent',
                                    color: activeFilter === cat ? '#fff' : 'var(--text-color)',
                                    borderColor: activeFilter === cat ? 'var(--accent-color)' : 'var(--border-color)',
                                    fontSize: 'clamp(9px, 1.5vw, 10px)',
                                    padding: 'clamp(6px, 1vw, 8px) clamp(16px, 2vw, 24px)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em'
                                }}
                            >
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {cat}
                                    <span style={{ opacity: 0.5, fontSize: '0.8em' }}>
                                        {cat === 'All' ? projects.length : projects.filter(p => p.category === cat).length}
                                    </span>
                                </span>
                            </HoverButton>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="projects-grid">
                        <AnimatePresence mode="popLayout">
                            {paginatedProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Pagination UI */}
                    {totalPages > 1 && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '8px',
                            marginTop: '2rem',
                            padding: '3rem 0',
                            borderTop: '1px solid var(--border-color)'
                        }}>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    style={{
                                        width: 'clamp(35px, 5vw, 45px)',
                                        height: 'clamp(35px, 5vw, 45px)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: currentPage === page ? 'var(--accent-color)' : 'transparent',
                                        color: currentPage === page ? '#fff' : 'var(--text-color)',
                                        border: '1px solid var(--border-color)',
                                        fontSize: '11px',
                                        fontWeight: 900,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                                    }}
                                >
                                    {String(page).padStart(2, '0')}
                                </button>
                            ))}
                        </div>
                    )}

                </div>
            </section>

            <Footer theme={theme} />
        </div>
    );
};

export default Works;
