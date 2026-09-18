import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import machineImg from '../assets/shaker.png'; // User's actual ProVibe vending machine visual
import shakerCupImg from '../assets/shaker1.png'; // User's actual ProVibe shaker cup visual
import './HeroCameraScene.css';

gsap.registerPlugin(ScrollTrigger);

const HeroCameraScene = () => {
  const viewportRef = useRef(null);
  const cameraRigRef = useRef(null);
  const machineStageRef = useRef(null);
  const machineImgRef = useRef(null);
  const shakerStageRef = useRef(null);
  const shakerImgRef = useRef(null);
  const screenLightRef = useRef(null);
  const dispenserLightRef = useRef(null);
  const ambientLightRef = useRef(null);

  // HUD callout refs
  const displayCalloutRef = useRef(null);
  const paymentCalloutRef = useRef(null);
  const dispenserCalloutRef = useRef(null);
  const shakerCalloutRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Subtle idle floating animation when near the top
      const idleFloat = gsap.to(machineImgRef.current, {
        y: -12,
        rotateX: '+=1.5',
        rotateY: '+=1.5',
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });

      const isMobile = window.innerWidth <= 768;

      // 2. Cinematic Camera Scroll Timeline
      const heroTrack = document.getElementById('hero-camera-track');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroTrack || '#hero-camera-track',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2, // Silk-smooth damping with Lenis
          onUpdate: (self) => {
            // Smoothly suspend idle float as scroll engages
            if (self.progress > 0.02) {
              if (idleFloat.isActive()) idleFloat.pause();
            } else {
              if (idleFloat.paused()) idleFloat.play();
            }
          }
        }
      });

      // Set initial balanced composition states
      gsap.set(machineStageRef.current, {
        scale: isMobile ? 0.75 : 0.88,
        x: isMobile ? '0vw' : '16vw', // Beautifully balanced against hero copy on desktop
        y: isMobile ? '10vh' : '2vh',
        rotateX: 2,
        rotateY: isMobile ? 0 : -6,
        rotateZ: 0,
        opacity: 1,
        transformOrigin: '50% 50%'
      });

      gsap.set(shakerStageRef.current, {
        opacity: 0,
        scale: 0.45,
        x: isMobile ? '0vw' : '22vw',
        y: '18vh',
        rotateZ: -16,
        rotateY: 20,
        transformOrigin: '50% 50%'
      });

      // ========================================================
      // STAGE 1: Full Overview -> PUSH-IN TO 4K SMART DISPLAY
      // ========================================================
      tl.to(machineStageRef.current, {
        scale: isMobile ? 1.45 : 1.7,
        x: isMobile ? '0vw' : '-5vw',
        y: isMobile ? '16vh' : '24vh',
        rotateX: 4,
        rotateY: -2,
        duration: 2.5,
        ease: 'power1.inOut'
      }, 0)
        .to(screenLightRef.current, {
          opacity: 0.85,
          duration: 1.8,
          ease: 'power1.inOut'
        }, 0.6)
        .to(displayCalloutRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power1.out'
        }, 1.0);

      // ========================================================
      // STAGE 2: 4K DISPLAY -> CONTACTLESS PAYMENT UNIT
      // ========================================================
      tl.to(displayCalloutRef.current, {
        opacity: 0,
        y: -16,
        duration: 0.8,
        ease: 'power1.in'
      }, 2.8)
        .to(screenLightRef.current, {
          opacity: 0.25,
          duration: 1.2,
          ease: 'power1.out'
        }, 2.8)
        .to(machineStageRef.current, {
          scale: isMobile ? 1.55 : 1.8,
          x: isMobile ? '0vw' : '4vw',
          y: isMobile ? '8vh' : '10vh',
          rotateX: 2,
          rotateY: 3,
          duration: 2.4,
          ease: 'power1.inOut'
        }, 2.8)
        .to(paymentCalloutRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power1.out'
        }, 3.6);

      // ========================================================
      // STAGE 3: PAYMENT -> AUTOMATED DISPENSING BAY
      // ========================================================
      tl.to(paymentCalloutRef.current, {
        opacity: 0,
        y: -16,
        duration: 0.8,
        ease: 'power1.in'
      }, 5.4)
        .to(machineStageRef.current, {
          scale: isMobile ? 1.65 : 1.9,
          x: isMobile ? '0vw' : '-2vw',
          y: isMobile ? '-14vh' : '-18vh',
          rotateX: -2,
          rotateY: 2,
          duration: 2.4,
          ease: 'power1.inOut'
        }, 5.4)
        .to(dispenserLightRef.current, {
          opacity: 0.95,
          scale: 1.15,
          duration: 1.6,
          ease: 'power1.out'
        }, 5.8)
        .to(dispenserCalloutRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power1.out'
        }, 6.2);

      // ========================================================
      // STAGE 4: DISPENSER -> SIGNATURE SHAKER REVEAL
      // ========================================================
      tl.to(dispenserCalloutRef.current, {
        opacity: 0,
        y: -16,
        duration: 0.8,
        ease: 'power1.in'
      }, 8.0)
        .to(dispenserLightRef.current, {
          opacity: 0.15,
          duration: 1.2,
          ease: 'power1.out'
        }, 8.0)
        // Machine gently recedes with subtle depth blur
        .to(machineStageRef.current, {
          scale: isMobile ? 0.72 : 0.82,
          x: isMobile ? '0vw' : '-16vw',
          y: isMobile ? '-8vh' : '0vh',
          opacity: 0.4,
          filter: 'blur(5px) brightness(0.65)',
          rotateX: 2,
          rotateY: -10,
          duration: 2.4,
          ease: 'power1.inOut'
        }, 8.0)
        // Shaker emerges dynamically into heroic focus
        .to(shakerStageRef.current, {
          opacity: 1,
          scale: isMobile ? 0.95 : 1.12,
          x: isMobile ? '0vw' : '8vw',
          y: isMobile ? '6vh' : '0vh',
          rotateZ: 6,
          rotateY: -8,
          duration: 2.4,
          ease: 'power1.out'
        }, 8.2)
        .to(shakerCalloutRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power1.out'
        }, 8.8);

      // ========================================================
      // STAGE 5: GRAND FINALE -> DUAL MACHINE & SHAKER LOCKUP
      // ========================================================
      tl.to(shakerCalloutRef.current, {
        opacity: 0,
        y: -16,
        duration: 0.8,
        ease: 'power1.in'
      }, 10.6)
        // Machine returns to razor-sharp focus on the left
        .to(machineStageRef.current, {
          scale: isMobile ? 0.72 : 0.92,
          x: isMobile ? '-20vw' : '-18vw',
          y: isMobile ? '4vh' : '2vh',
          opacity: 1,
          filter: 'blur(0px) brightness(1)',
          rotateX: 2,
          rotateY: -6,
          duration: 2.4,
          ease: 'power1.inOut'
        }, 10.6)
        // Shaker settles in heroic balance on the right
        .to(shakerStageRef.current, {
          scale: isMobile ? 0.75 : 0.88,
          x: isMobile ? '20vw' : '18vw',
          y: isMobile ? '6vh' : '4vh',
          opacity: 1,
          rotateZ: 8,
          rotateY: -10,
          duration: 2.4,
          ease: 'power1.inOut'
        }, 10.6);

      // Fade out viewport when entering products section
      const productsSection = document.getElementById('products');
      gsap.to(viewportRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        scrollTrigger: {
          trigger: productsSection || '#products',
          start: 'top 85%',
          end: 'top 30%',
          scrub: true,
        }
      });

      // Recalculate trigger coordinates accurately
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={viewportRef} className="hero-camera-viewport">
      {/* 3D Dynamic Lighting Layers */}
      <div className="camera-lighting-layer">
        <div ref={ambientLightRef} className="ambient-neon-glow" />
        <div className="top-rim-spotlight" />
        <div ref={screenLightRef} className="screen-backlight-pulse" />
        <div ref={dispenserLightRef} className="dispenser-spotlight" />
      </div>

      {/* 3D Perspective Virtual Camera Rig */}
      <div ref={cameraRigRef} className="camera-rig">
        {/* Machine 3D Stage */}
        <div ref={machineStageRef} className="machine-stage">
          <img
            ref={machineImgRef}
            src={machineImg}
            alt="ProVibe 3D Smart Vending Machine"
            className="machine-graphic"
          />
        </div>

        {/* Shaker Cup 3D Stage */}
        <div ref={shakerStageRef} className="shaker-stage">
          <img
            ref={shakerImgRef}
            src={shakerCupImg}
            alt="ProVibe Signature Shaker Cup"
            className="shaker-graphic"
          />
        </div>
      </div>

      {/* Floor 3D Grid for Depth */}
      <div className="floor-3d-grid" />

      {/* HUD / Dynamic Camera Callout Overlays */}
      <div className="camera-hud-layer">
        {/* 1. Touchscreen close-up callout */}
        <div ref={displayCalloutRef} className="hud-callout display-callout">
          <span className="hud-badge">
            <span className="hud-ping-dot" />
            01 // SMART DISPLAY
          </span>
          <div className="hud-title">4K INTERACTIVE UI</div>
          <div className="hud-desc">Real-time nutritional facts, flavor customization, and instant macro breakdown.</div>
        </div>

        {/* 2. Payment close-up callout */}
        <div ref={paymentCalloutRef} className="hud-callout payment-callout">
          <span className="hud-badge">
            <span className="hud-ping-dot" />
            02 // FAST CHECKOUT
          </span>
          <div className="hud-title">TAP • SELECT • GO</div>
          <div className="hud-desc">Instant contactless tap-to-pay via UPI, Apple Pay, cards, and member wristbands.</div>
        </div>

        {/* 3. Dispenser close-up callout */}
        <div ref={dispenserCalloutRef} className="hud-callout dispenser-callout">
          <span className="hud-badge">
            <span className="hud-ping-dot" />
            03 // PRECISION DISPENSE
          </span>
          <div className="hud-title">ACTIVE CHILLED BLEND</div>
          <div className="hud-desc">Automated hygiene-sealed dispense bay ready in under 30 seconds.</div>
        </div>

        {/* 4. Shaker closeup callout */}
        <div ref={shakerCalloutRef} className="hud-callout shaker-callout">
          <span className="hud-badge">
            <span className="hud-ping-dot" />
            04 // ON-DEMAND FUEL
          </span>
          <div className="hud-title">WHEY • CREATINE • PRE-WORKOUT</div>
          <div className="hud-desc">Premium sports nutrition mixed with micro-vortex technology for zero clumps.</div>
        </div>
      </div>
    </div>
  );
};

export default HeroCameraScene;
