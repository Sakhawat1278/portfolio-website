import React, { useState, useRef, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../data/projects';

interface ProjectCardProps {
    project: Project;
    index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = memo(({ project, index }) => {
    const [hovered, setHovered] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!videoRef.current || !project.video) return;
        if (hovered || isMobile) {
            videoRef.current.play().catch(() => { });
        } else {
            videoRef.current.pause();
            if (!isMobile) videoRef.current.currentTime = 0;
        }
    }, [hovered, isMobile, project.video]);

    return (
        <motion.div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '20px' }}
            transition={{
                duration: 0.6,
                delay: Math.min(index * 0.05, 0.3), // Stagger but cap it for better performance
                ease: [0.16, 1, 0.3, 1]
            }}
            style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'var(--bg-color)',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                height: '100%',
                cursor: 'pointer',
                willChange: 'transform, opacity'
            }}
            onClick={() => {
                if (project.link) {
                    const a = document.createElement('a');
                    a.href = project.link;
                    a.target = '_blank';
                    a.rel = 'noopener noreferrer';
                    a.click();
                }
            }}
        >
            {/* Top Image/Video Section */}
            <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/10', borderBottom: '1px solid var(--border-color)' }}>
                {project.video ? (
                    <motion.div
                        animate={{ scale: hovered ? 1.05 : 1 }}
                        transition={{ duration: 0.8 }}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <video
                            ref={videoRef}
                            src={project.video}
                            poster={project.image}
                            muted
                            loop
                            playsInline
                            preload="none"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </motion.div>
                ) : (
                    <div style={{ width: '100%', height: '100%', overflow: 'hidden', backgroundColor: 'rgba(var(--text-color-rgb), 0.05)' }}>
                        <motion.img
                            src={project.image || '/api/placeholder/800/600'}
                            alt={`Screenshot of ${project.title} - ${project.category} Project by Sakhawat Sohan`}
                            width="800"
                            height="500"
                            loading={index === 0 ? 'eager' : 'lazy'}
                            fetchPriority={index === 0 ? 'high' : 'low'}
                            decoding="async"
                            animate={{
                                y: (hovered || isMobile) ? '-70%' : '0%'
                            }}
                            transition={{
                                duration: (hovered || isMobile) ? 8 : 1,
                                ease: "linear",
                                repeat: (hovered || isMobile) ? Infinity : 0,
                                repeatType: "reverse"
                            }}
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                                display: 'block',
                                willChange: 'transform'
                            }}
                        />
                    </div>
                )}

                {/* Info Badge */}
                <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: 'var(--accent-color)',
                    color: '#fff',
                    padding: '3px 10px',
                    fontSize: '8px',
                    fontWeight: 900,
                    zIndex: 2,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    {project.tags[0] || 'Web'}
                </div>
            </div>

            {/* Content Section */}
            <div style={{
                padding: '1.4rem',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'rgba(var(--text-color-rgb), 0.02)'
            }}>
                <div style={{
                    fontSize: '8px',
                    fontWeight: 800,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-color)',
                    marginBottom: '0.6rem',
                    opacity: 0.8
                }}>
                    {project.category}
                </div>

                <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                    marginBottom: '0.8rem',
                    color: 'var(--text-color)'
                }}>
                    {project.title}
                </h3>

                <p style={{
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                    fontWeight: 300,
                    opacity: 0.6,
                    marginBottom: '1.2rem',
                    color: 'var(--text-color)',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {project.description}
                </p>

                {/* Footer with Tags */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(var(--text-color-rgb), 0.05)' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        {project.tags.slice(0, 2).map((tag: string) => (
                            <span key={tag} style={{
                                fontSize: '7px',
                                fontWeight: 700,
                                padding: '2px 6px',
                                border: '1px solid var(--border-color)',
                                opacity: 0.4,
                                textTransform: 'uppercase'
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="3" style={{ opacity: hovered ? 1 : 0.3, transition: '0.3s' }}>
                        <path d="M7 17L17 7M17 7H8M17 7V16" />
                    </svg>
                </div>
            </div>
        </motion.div>
    );
});

ProjectCard.displayName = 'ProjectCard';
export default ProjectCard;
