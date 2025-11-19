import React from 'react';
import { motion } from 'framer-motion';

const learningLogs = [
    {
        date: "November 2025",
        title: "Advanced React Patterns",
        description: "Deep diving into React performance optimization, custom hooks, and advanced state management with Context API and Redux Toolkit.",
        tags: ["React", "Performance", "State Management"]
    },
    {
        date: "October 2025",
        title: "FastAPI & Async Python",
        description: "Exploring asynchronous programming in Python using FastAPI. Building high-performance APIs and understanding the ASGI standard.",
        tags: ["Python", "FastAPI", "AsyncIO"]
    },
    {
        date: "September 2025",
        title: "Docker & Containerization",
        description: "Learning how to containerize full-stack applications using Docker and Docker Compose for consistent development and deployment environments.",
        tags: ["Docker", "DevOps", "Containers"]
    },
    {
        date: "August 2025",
        title: "Machine Learning Deployment",
        description: "Studying best practices for deploying ML models to production, including model versioning, monitoring, and serving using tools like MLflow.",
        tags: ["MLOps", "Deployment", "Python"]
    }
];

const LearningPage = () => {
    return (
        <div className="section" style={{ paddingTop: '120px', minHeight: '100vh' }}>
            <div className="container">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="gradient-text"
                    style={{ fontSize: '3rem', marginBottom: '4rem', textAlign: 'center' }}
                >
                    Learning Log
                </motion.h1>

                <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
                    {/* Vertical Line */}
                    <div style={{
                        position: 'absolute',
                        left: '20px',
                        top: 0,
                        bottom: 0,
                        width: '2px',
                        background: 'rgba(255,255,255,0.1)',
                        zIndex: 0
                    }}></div>

                    {learningLogs.map((log, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            style={{
                                marginBottom: '3rem',
                                paddingLeft: '60px',
                                position: 'relative'
                            }}
                        >
                            {/* Dot on timeline */}
                            <div style={{
                                position: 'absolute',
                                left: '11px',
                                top: '24px',
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                background: 'var(--primary-color)',
                                border: '4px solid #0a0a0a',
                                zIndex: 1
                            }}></div>

                            <div className="glass-panel" style={{ padding: '2rem' }}>
                                <span style={{
                                    display: 'inline-block',
                                    marginBottom: '0.5rem',
                                    color: 'var(--accent-color)',
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem'
                                }}>
                                    {log.date}
                                </span>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{log.title}</h3>
                                <p style={{ color: '#ccc', marginBottom: '1.5rem', lineHeight: '1.6' }}>{log.description}</p>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {log.tags.map(tag => (
                                        <span key={tag} style={{
                                            fontSize: '0.8rem',
                                            padding: '0.3rem 0.8rem',
                                            background: 'rgba(255,255,255,0.05)',
                                            borderRadius: '20px',
                                            border: '1px solid rgba(255,255,255,0.1)'
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LearningPage;
