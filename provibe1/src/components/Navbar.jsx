import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import logoImg from '../assets/logo (2).png';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const isMobile = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => { isMobile.current = window.innerWidth <= 860; };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is active
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // Close menu on Escape
  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') { setMobileMenuOpen(false); setFeaturesOpen(false); } };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closeAll = () => {
    setMobileMenuOpen(false);
    setFeaturesOpen(false);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    closeAll();
    if (location.pathname === '/') {
      // Already on home — just scroll to top
      if (window.lenis) window.lenis.scrollTo(0, { duration: 1 });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => window.scrollTo(0, 0), 100);
    }
  };

  const handleHashLink = (hash) => (e) => {
    e.preventDefault();
    closeAll();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } else {
      const el = document.querySelector(hash);
      if (el) {
        if (window.lenis) window.lenis.scrollTo(el, { offset: -40, duration: 1.2 });
        else el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleFeatures = () => {
    if (isMobile.current) setFeaturesOpen(prev => !prev);
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="/" className="logo" onClick={handleHomeClick}>
          <img src={logoImg} alt="ProVibe - Fuel Every Move" className="logo-img" />
        </a>

        {/* Backdrop for mobile drawer */}
        <div
          className={`mobile-backdrop ${mobileMenuOpen ? 'active' : ''}`}
          onClick={closeAll}
          aria-hidden="true"
        />

        <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#about-story" className="nav-link" onClick={handleHashLink('#about-story')}>ABOUT US</a>
          <a href="#athletes" className="nav-link" onClick={handleHashLink('#athletes')}>ATHLETES</a>
          <a href="#process" className="nav-link" onClick={handleHashLink('#process')}>HOW IT'S MADE</a>
          <a href="#flavors" className="nav-link" onClick={handleHashLink('#flavors')}>FLAVORS</a>
          <a href="#how" className="nav-link" onClick={handleHashLink('#how')}>HOW IT WORKS</a>
          <a href="#faq" className="nav-link" onClick={handleHashLink('#faq')}>FAQ</a>
          <a href="#contact" className="nav-link" onClick={handleHashLink('#contact')}>CONTACT</a>
          <a href="#contact" className="nav-btn-cta" onClick={handleHashLink('#contact')}>
            GET IN TOUCH
          </a>
        </nav>

        <button
          className="mobile-menu-btn"
          onClick={() => { setMobileMenuOpen(prev => !prev); }}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
