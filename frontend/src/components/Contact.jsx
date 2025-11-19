import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '', honeypot: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await axios.post('http://localhost:8000/contact', formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '', honeypot: '' });
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 429) {
                setStatus('rate_limit');
            } else {
                setStatus('error');
            }
        }
    };

    return (
        <section id="contact" className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="glass-panel"
                    style={{ maxWidth: '600px', margin: '0 auto' }}
                >
                    <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Get In Touch</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Honeypot Field (Hidden) */}
                        <div style={{ display: 'none' }}>
                            <label>Don't fill this out if you're human:</label>
                            <input
                                type="text"
                                name="honeypot"
                                value={formData.honeypot}
                                onChange={handleChange}
                                tabIndex="-1"
                                autoComplete="off"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    color: 'white',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    color: 'white',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    color: 'white',
                                    outline: 'none',
                                    resize: 'vertical'
                                }}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            style={{
                                padding: '1rem',
                                background: 'var(--primary-color)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                transition: 'background 0.3s ease'
                            }}
                        >
                            {status === 'sending' ? 'Sending...' : 'Send Message'}
                        </button>
                        {status === 'success' && <p style={{ color: '#4ade80', textAlign: 'center' }}>Message sent successfully!</p>}
                        {status === 'error' && <p style={{ color: '#f87171', textAlign: 'center' }}>Failed to send message. Please try again.</p>}
                        {status === 'rate_limit' && <p style={{ color: '#f87171', textAlign: 'center' }}>You can only send one message per day.</p>}
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
