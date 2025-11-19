import React from 'react';
import { motion } from 'framer-motion';

const projects = [
    {
        title: "Neural Machine Translation System",
        description: "Built an English to German translation model using a GRU encoder and decoder with attention. Added subword tokenization, a custom training loop, and BLEU score evaluation.",
        tags: ["Python", "PyTorch", "NumPy", "Matplotlib"],
        color: "var(--primary-color)"
    },
    {
        title: "Sentiment Classification System",
        description: "Created a sentiment analysis pipeline for IMDB reviews using custom tokenizers and feature extraction. Trained a logistic regression model with both count features and embedding features.",
        tags: ["Python", "scikit-learn", "NumPy", "Pandas"],
        color: "var(--secondary-color)"
    },
    {
        title: "Distributed Messaging Service",
        description: "Built a RESTful microservice for asynchronous message routing using messaging queues and in-memory storage. Designed modular components and carried out integration testing.",
        tags: ["Java/Python", "Spring Boot/FastAPI", "Kafka", "Redis", "Docker"],
        color: "var(--accent-color)"
    },
    {
        title: "PizzaDronz Application",
        description: "Developed the back end for a drone based pizza delivery service. Implemented an A* based flight pathing system and an order validation module.",
        tags: ["Java", "JUnit", "Algorithms (A*)", "JSON"],
        color: "#10b981" // Emerald Green
    },
    {
        title: "Agent-Based Modelling of UK Dietary Shifts",
        description: "Developed a hybrid agent-based model to simulate UK dietary behavior changes under social, governmental, and media pressures. Ran large scale experiments and validated model outputs.",
        tags: ["Python", "Mesa", "Pandas", "NumPy"],
        color: "#f59e0b" // Amber
    }
];

const Projects = () => {
    return (
        <section id="projects" className="section">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="gradient-text"
                    style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}
                >
                    Selected Works
                </motion.h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="glass-panel"
                            style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
                        >
                            <div>
                                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: project.color, marginBottom: '1.5rem', opacity: 0.8 }}></div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{project.title}</h3>
                                <p style={{ color: '#ccc', marginBottom: '1.5rem', lineHeight: '1.6' }}>{project.description}</p>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {project.tags.map(tag => (
                                    <span key={tag} style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.1)', borderRadius: '20px' }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    style={{ textAlign: 'center', marginTop: '4rem' }}
                >
                    <a href="/projects" style={{
                        padding: '1rem 2.5rem',
                        background: 'transparent',
                        border: '2px solid var(--primary-color)',
                        color: 'white',
                        borderRadius: '50px',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        display: 'inline-block'
                    }}
                        onMouseOver={(e) => {
                            e.target.style.background = 'var(--primary-color)';
                            e.target.style.boxShadow = '0 0 20px rgba(109, 40, 217, 0.5)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        View All Projects
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
