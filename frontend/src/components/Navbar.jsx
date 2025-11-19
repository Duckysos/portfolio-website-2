import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, item) => {
        setIsOpen(false); // Close menu on click
        if (item === 'Projects' || item === 'Learning') {
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
                }, 100);
            }
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const navItems = ['Home', 'About', 'Projects', 'Learning', 'Contact'];

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
                padding: '1rem 2rem',
                background: scrolled || isOpen ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
                backdropFilter: scrolled || isOpen ? 'blur(10px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
                transition: 'all 0.3s ease'
            }}
        >
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '1px', zIndex: 1001 }}>
                    PORTFOLIO<span style={{ color: 'var(--accent-color)' }}>.</span>
                </Link>

                {/* Desktop Menu */}
                <ul style={{ display: 'flex', gap: '2rem' }} className="desktop-menu">
                    {navItems.map((item) => (
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

                {/* Mobile Menu Button */}
                <div
                    className="mobile-menu-btn"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ cursor: 'pointer', zIndex: 1001, display: 'none' }}
                >
                    <div style={{
                        width: '25px',
                        height: '2px',
                        background: 'white',
                        marginBottom: '6px',
                        transition: 'all 0.3s ease',
                        transform: isOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none'
                    }}></div>
                    <div style={{
                        width: '25px',
                        height: '2px',
                        background: 'white',
                        marginBottom: '6px',
                        opacity: isOpen ? 0 : 1,
                        transition: 'all 0.3s ease'
                    }}></div>
                    <div style={{
                        width: '25px',
                        height: '2px',
                        background: 'white',
                        transition: 'all 0.3s ease',
                        transform: isOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none'
                    }}></div>
                </div>

                {/* Mobile Menu Overlay */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            width: '100%',
                            background: 'rgba(10, 10, 10, 0.95)',
                            backdropFilter: 'blur(10px)',
                            padding: '2rem',
                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1.5rem'
                        }}
                    >
                        {navItems.map((item) => (
                            <div key={item} onClick={() => setIsOpen(false)}>
                                {item === 'Projects' || item === 'Learning' ? (
                                    <Link
                                        to={`/${item.toLowerCase()}`}
                                        style={{ fontSize: '1.2rem', fontWeight: '500' }}
                                    >
                                        {item}
                                    </Link>
                                ) : (
                                    <a
                                        href={`#${item.toLowerCase()}`}
                                        onClick={(e) => handleNavClick(e, item)}
                                        style={{ fontSize: '1.2rem', fontWeight: '500' }}
                                    >
                                        {item}
                                    </a>
                                )}
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>
            <style>{`
                @media (max-width: 768px) {
                    .desktop-menu { display: none !important; }
                    .mobile-menu-btn { display: block !important; }
                }
            `}</style>
        </motion.nav>
    );
};

export default Navbar;
