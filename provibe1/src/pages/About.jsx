import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo (2).png';
import './About.css';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <div className="container">
        <div className="about-header text-center mb-12">
          <h2>ABOUT <span className="text-primary">US</span></h2>
          <h3 className="mt-4">Smarter Nutrition. Faster Recovery. Better Performance.</h3>
          <p className="mt-4 mx-auto max-w-2xl">
            We are building a smarter and more convenient way for fitness enthusiasts to access quality nutrition right inside their gym. Our <strong>protein vending machine for gyms</strong> provides quick and convenient <strong>protein shakes after workouts</strong>, helping members get the nutrition they need without leaving the fitness center.
          </p>
          <p className="mt-4 mx-auto max-w-2xl">
            Our <strong>protein shake vending machines</strong> are designed as a modern <strong>gym nutrition solution</strong> for gyms, fitness centers, and sports facilities. By combining automated technology with fitness nutrition, we make it easier for gym members to enjoy a convenient <strong>post-workout protein shake</strong> whenever they need it.
          </p>
        </div>

        <div className="about-grid mt-12">
          <div className="about-card">
            <h3 className="text-primary">Our Mission</h3>
            <p className="mt-4">
              Our mission is to make <strong>healthy gym nutrition</strong> more accessible, convenient, and automated. We help gym owners introduce an additional nutrition service that can operate throughout the day while improving the overall experience for their members.
            </p>
            <p className="mt-4">
              From <strong>protein shakes and fitness nutrition</strong> to healthy snacks and sports nutrition, our goal is to create a convenient <strong>gym food and nutrition vending solution</strong> that fits naturally into modern fitness centers.
            </p>
          </div>

          <div className="about-card">
            <h3 className="text-primary">What We Offer</h3>
            <p className="mt-4 mb-4">Our solutions are designed for:</p>
            <ul className="about-list">
              <li>Gyms and fitness centers</li>
              <li>Sports and training facilities</li>
              <li>Fitness studios</li>
              <li>Athletic centers</li>
              <li>Health and wellness spaces</li>
            </ul>
            <p className="mt-4">
              We provide <strong>protein vending machine installation</strong>, setup, and support, helping gym owners integrate automated nutrition into their facilities.
            </p>
          </div>

          <div className="about-card">
            <h3 className="text-primary">Why Protein Vending?</h3>
            <p className="mt-4">
              After an intense workout, convenience matters. Our <strong>protein shake vending machines for gyms</strong> allow members to access a freshly prepared protein shake quickly and conveniently, making post-workout nutrition easier to fit into their routine.
            </p>
            <p className="mt-4">
              For gym owners, automated nutrition vending can provide an additional service for members while making better use of available space.
            </p>
          </div>

          <div className="about-card">
            <h3 className="text-primary">Our Vision</h3>
            <p className="mt-4">
              We envision a future where <strong>automated gym nutrition</strong> is a normal part of every modern fitness center—making protein shakes and sports nutrition available conveniently whenever members need them.
            </p>
            <p className="mt-4">
              We are starting with a focus on <strong>Kerala</strong>, working to provide reliable <strong>protein vending machine solutions for gyms and fitness centers</strong>, with a vision to expand automated fitness nutrition solutions across India.
            </p>
          </div>
        </div>
      </div>

      <footer className="footer" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', marginTop: '4rem', padding: '3.5rem 0 2.5rem 0' }}>
        <div className="container text-center">
          <Link to="/" style={{ display: 'inline-block', marginBottom: '1.25rem' }}>
            <img src={logoImg} alt="ProVibe" style={{ height: '46px', width: 'auto', opacity: 0.95 }} />
          </Link>
          <p className="footer-tagline" style={{ color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>Fuel Every Move. Smart Sports Nutrition for Gyms.</p>
          <p className="copyright-text" style={{ color: '#666', fontSize: '0.82rem' }}>© 2026 ProVibe Vending. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
