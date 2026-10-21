import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

// Manage Lenis instance and ScrollTrigger globally
function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    window.lenis = lenis; // Expose globally for manual triggering

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateRaf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    // Smooth scroll for internal cross-page hash links
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      if (!href) return;
      
      // If the link is an anchor on the same page, intercept it
      try {
        const url = new URL(anchor.href);
        if (url.pathname === window.location.pathname && url.hash) {
          const target = document.querySelector(url.hash);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -40, duration: 1.2 });
            // Update URL without jumping
            window.history.pushState(null, '', url.hash);
          }
        }
      } catch (err) {
        // Ignore invalid URLs
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(updateRaf);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  // Handle route change effects
  useEffect(() => {
    // Timeout gives DOM time to render before calculating heights
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      
      // If there's a hash in the URL on route load, scroll to it
      if (location.hash && window.lenis) {
        const target = document.querySelector(location.hash);
        if (target) {
          window.lenis.scrollTo(target, { offset: -40, immediate: true });
        }
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [location]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
