import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer style={{ padding: '3rem 0', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '4rem' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
                    <a href="https://github.com/Duckysos" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.5rem', color: 'white', transition: 'color 0.3s' }} className="social-icon">
                        <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/iankho2002" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.5rem', color: 'white', transition: 'color 0.3s' }} className="social-icon">
                        <FaLinkedin />
                    </a>
                    <a href="mailto:iankho2002@gmail.com" style={{ fontSize: '1.5rem', color: 'white', transition: 'color 0.3s' }} className="social-icon">
                        <FaEnvelope />
                    </a>
                </div>
                <p style={{ color: '#888' }}>
                    &copy; {new Date().getFullYear()} Ian Kho. Built with React & FastAPI.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
