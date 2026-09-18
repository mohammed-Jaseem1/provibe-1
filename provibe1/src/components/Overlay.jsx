import React, { useLayoutEffect, useRef } from 'react';
import {
  Clock,
  Smartphone,
  Layers,
  Zap,
  MapPin,
  Users,
  Mail,
  Phone,
  Globe
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logoImg from '../assets/logo (2).png';
import wheyImg from '../assets/whey.png';
import massGainerImg from '../assets/mass gainer.png';
import creatineImg from '../assets/creatine.png';
import preWorkoutImg from '../assets/pre workout.png';
import './Overlay.css';

gsap.registerPlugin(ScrollTrigger);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);


const Overlay = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth fade out of hero copy as 3D camera engages
      gsap.to('.hero-content', {
        opacity: 0,
        y: -40,
        scale: 0.96,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: '#hero-camera-track',
          start: 'top top',
          end: '14% top',
          scrub: 1,
        }
      });

      // Product cards entrance reveal
      gsap.from('.product-card-html', {
        y: 45,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.products-grid',
          start: 'top 85%',
        }
      });

      // Smooth cinematic parallax for vending machine showcase
      gsap.fromTo('.vending-img',
        { scale: 1.08, y: 50 },
        {
          scale: 1,
          y: 0,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: '.vending-section',
            start: 'top 85%',
            end: 'center 40%',
            scrub: 1.2
          }
        }
      );

      // Staggered reveal for benefits
      gsap.from('.benefit-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.benefits-grid',
          start: 'top 82%',
        }
      });

      // Staggered reveal for value points
      gsap.from('.value-point', {
        x: -35,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.value-list',
          start: 'top 82%',
        }
      });

      // Contact buttons bounce reveal
      gsap.from('.contact-item', {
        scale: 0.92,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.contact-grid',
          start: 'top 88%',
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="overlay-container">

      {/* Hero Section & 3D Camera Track */}
      <div id="hero-camera-track" className="hero-camera-track">
        <section id="home" className="hero-section section-padding">
          <div className="container hero-content">
            <span className="hero-eyebrow text-primary">SMART SPORTS NUTRITION</span>
            <h1 className="hero-title">
              <span>FUEL</span>
              <span className="text-stroke">EVERY</span>
              <span className="text-primary">MOVE.</span>
            </h1>
            <p className="hero-desc">SMART SPORTS NUTRITION<br />RIGHT INSIDE YOUR GYM.</p>
            <div className="hero-btns">
              <a href="#products" className="btn btn-primary">EXPLORE PROVIBE</a>
              <a href="#contact" className="btn btn-outline">BRING PROVIBE TO YOUR GYM</a>
            </div>

            <div className="hero-scroll-cue">
              <span className="scroll-cue-text">SCROLL TO EXPLORE 3D CAMERA</span>
              <div className="scroll-cue-line">
                <div className="scroll-cue-dot"></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Product Section */}
      <section id="products" className="products-section section-padding">
        <div className="container">
          <div className="products-header">
            <h2>YOUR ESSENTIALS.</h2>
            <h2 className="text-primary">ONE SMART MACHINE.</h2>
            <div className="sub-headers mt-4">
              <h3>PICK YOUR PROTEIN.</h3>
              <h3>PICK YOUR FLAVOUR.</h3>
              <h3>FUEL YOUR MOVE.</h3>
            </div>
          </div>

          <div className="products-grid mt-8">
            {/* 1. Whey Protein */}
            <div className="product-card-html">
              <div className="product-img-wrapper">
                <img src={wheyImg} alt="MuscleBlaze Biozyme Performance Whey Protein" className="product-card-img" />
              </div>
              <h4>WHEY PROTEIN</h4>
              <p>Rich Chocolate • 2kg</p>
              <span className="desc">Biozyme Performance Whey clinically proven for 50% higher protein absorption.</span>
            </div>

            {/* 2. Mass Gainer */}
            <div className="product-card-html">
              <div className="product-img-wrapper">
                <img src={massGainerImg} alt="MuscleBlaze Weight Gainer" className="product-card-img" />
              </div>
              <h4>MASS GAINER</h4>
              <p>Chocolate Flavour • 2kg</p>
              <span className="desc">High-calorie complex carbs & clean protein matrix engineered for muscle bulk.</span>
            </div>

            {/* 3. Creatine */}
            <div className="product-card-html">
              <div className="product-img-wrapper">
                <img src={creatineImg} alt="MuscleBlaze CreAMP Micronised Creatine" className="product-card-img" />
              </div>
              <h4>CREATINE</h4>
              <p>CreAMP Micronised • 100g</p>
              <span className="desc">Pure unflavoured monohydrate supporting ATP resynthesis, strength & raw power.</span>
            </div>

            {/* 4. Pre-Workout */}
            <div className="product-card-html">
              <div className="product-img-wrapper">
                <img src={preWorkoutImg} alt="MuscleBlaze Pre-Workout 200" className="product-card-img" />
              </div>
              <h4>PRE-WORKOUT</h4>
              <p>Fruit Splash • 100g</p>
              <span className="desc">200mg Caffeine & 2200mg L-Citrulline for razor focus, intense energy & vasodilation.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vending Machine Section */}
      <section id="vending" className="vending-section section-padding">
        <div className="container flex-row">
          <div className="vending-text">
            <h2>SMART NUTRITION.</h2>
            <h2 className="text-primary">RIGHT INSIDE YOUR GYM.</h2>
            <p className="mt-4">Why wait for your fuel? After a tough workout, your body needs the right nutrition. But getting it shouldn't be another challenge.</p>
          </div>
          <div className="vending-image-container">
            {/* We use a colored div to simulate the machine image for now */}
            <div className="vending-img placeholder-machine">
              <div className="screen-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="benefits-section section-padding">
        <div className="container">
          <h2 className="text-center mb-8">WHY CHOOSE OUR <span className="text-primary">GYM<br />VENDING SOLUTION?</span></h2>

          <div className="benefits-grid mt-8">
            <div className="benefit-card">
              <Clock className="icon text-primary" size={48} />
              <h4>24/7 CONVENIENCE</h4>
              <p>Nutrition available when members need it.</p>
            </div>
            <div className="benefit-card">
              <Layers className="icon text-primary" size={48} />
              <h4>MODERN GYM EXPERIENCE</h4>
              <p>No need to leave the workout environment.</p>
            </div>
            <div className="benefit-card">
              <Smartphone className="icon text-primary" size={48} />
              <h4>MULTIPLE CHOICES</h4>
              <p>Whey, mass gainer, creatine and pre-workout in one location.</p>
            </div>
            <div className="benefit-card">
              <Zap className="icon text-primary" size={48} />
              <h4>FAST & EASY</h4>
              <p>Simple vending experience with minimal waiting.</p>
            </div>
            <div className="benefit-card">
              <MapPin className="icon text-primary" size={48} />
              <h4>INSIDE THE GYM</h4>
              <p>Adds a premium, innovative facility feature.</p>
            </div>
            <div className="benefit-card">
              <Users className="icon text-primary" size={48} />
              <h4>MEMBER-FRIENDLY</h4>
              <p>Designed around the needs of today's fitness community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Section */}
      <section id="gyms" className="value-section section-padding">
        <div className="container">
          <h2>MORE VALUE</h2>
          <h2 className="text-primary">FOR YOUR GYM.</h2>
          <p className="subtitle mt-2">Turn Your Gym Into a Complete Fitness Destination - With Zero Investment.</p>

          <div className="value-list mt-8">
            <div className="value-point">
              <div className="check">✓</div>
              <p>Adds an additional member convenience</p>
            </div>
            <div className="value-point">
              <div className="check">✓</div>
              <p>Enhances the gym's modern image</p>
            </div>
            <div className="value-point">
              <div className="check">✓</div>
              <p>Provides nutrition access without requiring a full supplement store</p>
            </div>
            <div className="value-point">
              <div className="check">✓</div>
              <p>Improves member experience</p>
            </div>
            <div className="value-point">
              <div className="check">✓</div>
              <p>Makes better use of available gym space</p>
            </div>
            <div className="value-point">
              <div className="check">✓</div>
              <p>Creates an attractive additional service opportunity</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="cta-section section-padding">
        <div className="container text-center">
          <h2>POWER YOUR MEMBERS.</h2>
          <h2 className="text-primary mb-4">ELEVATE YOUR GYM.</h2>

          <p className="mx-auto max-w-2xl text-lg mb-8">
            Interested in installing our vending machine at your gym?<br />
            Let's bring smart sports nutrition closer to your members.
          </p>

          <a href="mailto:provibevending@gmail.com" className="btn btn-primary mb-12">INSTALL PROVIBE IN YOUR GYM</a>

          <div className="contact-grid mt-8">
            <a href="tel:+919605966902" className="contact-item">
              <Phone className="text-primary" />
              <span>+91 96059 66902</span>
            </a>
            <a href="tel:+919207156454" className="contact-item">
              <Phone className="text-primary" />
              <span>+91 92071 56454</span>
            </a>
            <a href="https://instagram.com/provibe.fit" className="contact-item">
              <InstagramIcon />
              <span>@provibe.fit</span>
            </a>
            <a href="mailto:provibevending@gmail.com" className="contact-item">
              <Mail className="text-primary" />
              <span>provibevending@gmail.com</span>
            </a>
            <a href="https://www.provibe.fit" className="contact-item">
              <Globe className="text-primary" />
              <span>www.provibe.fit</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container text-center">
          <a href="#home" style={{ display: 'inline-block', marginBottom: '1.25rem' }}>
            <img src={logoImg} alt="ProVibe" style={{ height: '46px', width: 'auto', opacity: 0.9 }} />
          </a>
          <p>© 2026 ProVibe Vending. Fuel Every Move.</p>
        </div>
      </footer>
    </div>
  );
};

export default Overlay;
