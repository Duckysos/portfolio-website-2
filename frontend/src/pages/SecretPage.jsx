import React from 'react';
import { motion } from 'framer-motion';

const videos = [
    {
        title: "Clip 1",
        url: "https://www.youtube.com/embed/CNenkZ5KTso",
        description: "Sick clip"
    },
    {
        title: "Clip 2",
        url: "https://www.youtube.com/embed/sPyWjV_AdPg",
        description: "Sicker clip"
    },
    {
        title: "Clip 3",
        url: "https://www.youtube.com/embed/4I-6nZNy7BM",
        description: "Sickest clip"
    }
];

const SecretPage = () => {
    return (
        <div className="section" style={{ paddingTop: '120px', minHeight: '100vh' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h1 className="gradient-text" style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                        TOP SECRET
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--accent-color)', letterSpacing: '2px' }}>
                        CLASSIFIED CONTENT UNLOCKED
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    {videos.map((video, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="glass-panel"
                            style={{ overflow: 'hidden', padding: '0' }}
                        >
                            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                                <iframe
                                    src={video.url}
                                    title={video.title}
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{video.title}</h3>
                                <p style={{ color: '#ccc' }}>{video.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SecretPage;
