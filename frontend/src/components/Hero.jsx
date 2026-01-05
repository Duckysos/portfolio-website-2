import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="home" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Background Elements */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: 'absolute',
                        top: '20%',
                        left: '10%',
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(circle, var(--primary-color) 0%, transparent 70%)',
                        borderRadius: '50%',
                        filter: 'blur(60px)'
                    }}
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, 100, 0],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: 'absolute',
                        bottom: '10%',
                        right: '10%',
                        width: '400px',
                        height: '400px',
                        background: 'radial-gradient(circle, var(--secondary-color) 0%, transparent 70%)',
                        borderRadius: '50%',
                        filter: 'blur(80px)'
                    }}
                />
            </div>

            <div className="container" style={{ textAlign: 'center', zIndex: 1 }}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ fontSize: '1.5rem', color: 'var(--accent-color)', marginBottom: '1rem' }}
                >
                    HELLO, I'M
                </motion.h2>
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="gradient-text"
                    style={{
                        fontSize: 'clamp(3rem, 8vw, 5rem)',
                        fontWeight: '800',
                        marginBottom: '1.5rem',
                        lineHeight: 1.1
                    }}
                >
                    IAN KHO
                </motion.h1>
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{
                        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                        marginBottom: '1rem',
                        color: 'white'
                    }}
                >
                    DATA ENGINEER
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{
                        fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                        maxWidth: '600px',
                        margin: '0 auto 2rem',
                        color: '#ccc',
                        padding: '0 1rem'
                    }}
                >
                    Currently looking for a job!
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
