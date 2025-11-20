import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectsPage from './pages/ProjectsPage';
import LearningPage from './pages/LearningPage';
import SecretPage from './pages/SecretPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';

// Home Component to keep the single-page scroll layout for the main landing
const Home = () => (
  <>
    <Hero />
    <About />
    <Projects />
    <Contact />
  </>
);

const KonamiCodeListener = () => {
  const navigate = useNavigate();
  const [input, setInput] = React.useState([]);
  const konamiCode = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "b", "a"
  ];

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      setInput((prev) => {
        const newInput = [...prev, e.key];
        if (newInput.length > konamiCode.length) {
          newInput.shift();
        }
        return newInput;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  React.useEffect(() => {
    if (JSON.stringify(input) === JSON.stringify(konamiCode)) {
      navigate('/secret-vault');
      setInput([]); // Reset after success
    }
  }, [input, navigate]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <KonamiCodeListener />
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/learning" element={<LearningPage />} />
            <Route path="/secret-vault" element={<SecretPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
