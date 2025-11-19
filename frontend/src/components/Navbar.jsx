import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, item) => {
        if (item === 'Projects' || item === 'Learning') {
            // Let the Link component handle it
            return;
        }

        e.preventDefault();
        const targetId = item.toLowerCase();

        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: targetId } });
        } else {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    // Handle scroll after navigation from another page
    useEffect(() => {
        if (location.pathname === '/' && location.state?.scrollTo) {
            const element = document.getElementById(location.state.scrollTo);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100); // Small delay to ensure DOM is ready
            }
            // Clear state to prevent scrolling on subsequent renders
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: '1.5rem 2rem',
                background: scrolled ? 'rgba(10, 10, 10, 0.8)' : 'transparent',
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
                transition: 'all 0.3s ease'
            }}
        >
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '1px' }}>
                    PORTFOLIO<span style={{ color: 'var(--accent-color)' }}>.</span>
                </Link>
                <ul style={{ display: 'flex', gap: '2rem' }}>
                    {['Home', 'About', 'Projects', 'Learning', 'Contact'].map((item) => (
                        <li key={item}>
                            {item === 'Projects' || item === 'Learning' ? (
                                <Link
                                    to={`/${item.toLowerCase()}`}
                                    style={{
                                        fontSize: '1rem',
                                        fontWeight: '500',
                                        position: 'relative',
                                        color: location.pathname === `/${item.toLowerCase()}` ? 'var(--primary-color)' : 'inherit'
                                    }}
                                >
                                    {item}
                                </Link>
                            ) : (
                                <a
                                    href={`#${item.toLowerCase()}`}
                                    onClick={(e) => handleNavClick(e, item)}
                                    style={{ fontSize: '1rem', fontWeight: '500', position: 'relative', cursor: 'pointer' }}
                                >
                                    {item}
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </motion.nav>
    );
};

export default Navbar;
