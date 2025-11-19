import React from 'react';
import { motion } from 'framer-motion';

const skills = [
    "React", "Python", "Pytorch", "SQL", "JavaScript",
    "Google ADK", "Machine Learning", "Deep Learning"
];

const About = () => {
    return (
        <section id="about" className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="glass-panel"
                    style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            style={{
                                width: '200px',
                                height: '200px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '4px solid var(--primary-color)',
                                boxShadow: '0 0 20px rgba(109, 40, 217, 0.5)',
                                marginBottom: '2rem'
                            }}
                        >
                            <img
                                src="/profile.jpg"
                                alt="Ian Kho"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </motion.div>

                        <h2 className="gradient-text" style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '1rem' }}>About Me</h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: '#ddd', maxWidth: '700px' }}>
                            I am a Computer Science Graduate from the University of Edinburgh with a strong foundation in software engineering, data science and machine algorithms.
                            My main field of interest is Data Science and AI and its applications in solving real-world problems.
                            I enjoy tackling complex challenges through analytical problem-solving and thrive in collaborative environments where diverse perspectives contribute to stronger outcomes.
                        </p>
                    </div>

                    <div style={{ width: '100%' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--accent-color)', textAlign: 'center' }}>Technical Skills</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                            {skills.map((skill, index) => (
                                <motion.span
                                    key={skill}
                                    whileHover={{ scale: 1.1 }}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        borderRadius: '20px',
                                        fontSize: '0.9rem',
                                        color: 'white',
                                        border: '1px solid rgba(255, 255, 255, 0.2)'
                                    }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
