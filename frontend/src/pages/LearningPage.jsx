import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import api from '../api';

const LearningPage = () => {
    const [learningLogs, setLearningLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await api.get('/learning-logs');
                setLearningLogs(response.data);
            } catch (err) {
                console.error("Error fetching logs", err);
            }
        };
        fetchLogs();
    }, []);

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
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
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
                                {log.github_link && (
                                    <a href={log.github_link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 'bold' }}>
                                        <FaGithub /> View Code
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LearningPage;
