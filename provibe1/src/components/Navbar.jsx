import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoImg from '../assets/logo (2).png';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#home" className="logo" onClick={() => setMobileMenuOpen(false)}>
          <img src={logoImg} alt="ProVibe - Fuel Every Move" className="logo-img" />
        </a>
        
        <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#home" onClick={() => setMobileMenuOpen(false)}>HOME</a>
          <a href="#products" onClick={() => setMobileMenuOpen(false)}>PRODUCTS</a>
          <a href="#benefits" onClick={() => setMobileMenuOpen(false)}>HOW IT WORKS</a>
          <a href="#gyms" onClick={() => setMobileMenuOpen(false)}>FOR GYMS</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>CONTACT</a>
        </nav>

        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
