import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

const projects = [
    {
        title: "Neural Machine Translation System",
        description: "Built an English to German translation model using a GRU encoder and decoder with attention. Added subword tokenization, a custom training loop, and BLEU score evaluation.",
        tags: ["Python", "PyTorch", "NumPy", "Matplotlib"],
        color: "var(--primary-color)",
        status: "completed",
        githubUrl: "https://github.com/Duckysos/neural-machine-translation"
    },
    {
        title: "Sentiment Classification System",
        description: "Created a sentiment analysis pipeline for IMDB reviews using custom tokenizers and feature extraction. Trained a logistic regression model with both count features and embedding features.",
        tags: ["Python", "scikit-learn", "NumPy", "Pandas"],
        color: "var(--secondary-color)",
        status: "completed",
        githubUrl: "https://github.com/Duckysos/sentiment-classification"
    },
    {
        title: "Distributed Messaging Service",
        description: "Built a RESTful microservice for asynchronous message routing using messaging queues and in-memory storage. Designed modular components and carried out integration testing.",
        tags: ["Java/Python", "Spring Boot/FastAPI", "Kafka", "Redis", "Docker"],
        color: "var(--accent-color)",
        status: "completed",
        githubUrl: "https://github.com/Duckysos/distributed-messaging"
    },
    {
        title: "PizzaDronz Application",
        description: "Developed the back end for a drone based pizza delivery service. Implemented an A* based flight pathing system and an order validation module.",
        tags: ["Java", "JUnit", "Algorithms (A*)", "JSON"],
        color: "#10b981", // Emerald Green
        status: "completed",
        githubUrl: "https://github.com/Duckysos/pizzadronz"
    },
    {
        title: "Agent-Based Modelling of UK Dietary Shifts",
        description: "Developed a hybrid agent-based model to simulate UK dietary behavior changes under social, governmental, and media pressures. Ran large scale experiments and validated model outputs.",
        tags: ["Python", "Mesa", "Pandas", "NumPy"],
        color: "#f59e0b", // Amber
        status: "completed",
        githubUrl: "https://github.com/Duckysos/agent-based-dietary-shifts"
    },
    {
        title: "AI Personal Assistant",
        description: "Currently developing a voice-activated personal assistant using LLMs and speech recognition.",
        tags: ["Python", "OpenAI API", "Whisper"],
        color: "#ec4899", // Pink
        status: "in-development",
        githubUrl: "https://github.com/Duckysos/ai-personal-assistant"
    }
];

const ProjectsPage = () => {
    const inDevelopmentProjects = projects.filter(project => project.status === 'in-development');
    const completedProjects = projects.filter(project => project.status === 'completed');

    const ProjectCard = ({ project }) => (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="glass-panel"
            style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', position: 'relative' }}
        >
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: project.color, opacity: 0.8 }}></div>
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'white', fontSize: '1.5rem', opacity: 0.8, transition: 'opacity 0.3s' }}
                        onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                        onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}
                        title="View on GitHub"
                    >
                        <FaGithub />
                    </a>
                </div>
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
    );

    return (
        <div className="section" style={{ paddingTop: '120px', minHeight: '100vh' }}>
            <div className="container">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="gradient-text"
                    style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}
                >
                    My Projects
                </motion.h1>

                {/* In Development Section */}
                <div style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--accent-color)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                        In Development
                    </h2>
                    <motion.div
                        layout
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}
                    >
                        {inDevelopmentProjects.map((project) => (
                            <ProjectCard key={project.title} project={project} />
                        ))}
                    </motion.div>
                </div>

                {/* Completed Section */}
                <div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--primary-color)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                        Completed
                    </h2>
                    <motion.div
                        layout
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}
                    >
                        {completedProjects.map((project) => (
                            <ProjectCard key={project.title} project={project} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;
