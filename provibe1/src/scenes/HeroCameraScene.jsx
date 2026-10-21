import { useLayoutEffect, useRef } from 'react';
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
    const mm = gsap.matchMedia();

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

    const heroTrack = document.getElementById('hero-camera-track') || '#hero-camera-track';

    // ========================================================
    // DESKTOP & TABLET LANDSCAPE TIMELINE (min-width: 769px)
    // ========================================================
    mm.add('(min-width: 769px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroTrack,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          onUpdate: (self) => {
            if (self.progress > 0.02) {
              if (idleFloat.isActive()) idleFloat.pause();
            } else {
              if (idleFloat.paused()) idleFloat.play();
            }
          }
        }
      });

      // Initial balanced desktop state
      gsap.set(machineStageRef.current, {
        scale: 0.88,
        x: '16vw',
        y: '2vh',
        rotateX: 2,
        rotateY: -6,
        rotateZ: 0,
        opacity: 1,
        transformOrigin: '50% 50%'
      });

      gsap.set(shakerStageRef.current, {
        opacity: 0,
        scale: 0.45,
        x: '22vw',
        y: '18vh',
        rotateZ: -16,
        rotateY: 20,
        transformOrigin: '50% 50%'
      });

      // STAGE 1: Push into 4K Display
      tl.to(machineStageRef.current, {
        scale: 1.7,
        x: '-5vw',
        y: '24vh',
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

      // STAGE 2: Contactless Payment Unit
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
          scale: 1.8,
          x: '4vw',
          y: '10vh',
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

      // STAGE 3: Dispensing Bay
      tl.to(paymentCalloutRef.current, {
        opacity: 0,
        y: -16,
        duration: 0.8,
        ease: 'power1.in'
      }, 5.4)
        .to(machineStageRef.current, {
          scale: 1.9,
          x: '-2vw',
          y: '-18vh',
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

      // STAGE 4: Shaker Reveal
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
        .to(machineStageRef.current, {
          scale: 0.82,
          x: '-16vw',
          y: '0vh',
          opacity: 0.4,
          filter: 'blur(5px) brightness(0.65)',
          rotateX: 2,
          rotateY: -10,
          duration: 2.4,
          ease: 'power1.inOut'
        }, 8.0)
        .to(shakerStageRef.current, {
          opacity: 1,
          scale: 1.12,
          x: '8vw',
          y: '0vh',
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

      // STAGE 5: Dual Lockup
      tl.to(shakerCalloutRef.current, {
        opacity: 0,
        y: -16,
        duration: 0.8,
        ease: 'power1.in'
      }, 10.6)
        .to(machineStageRef.current, {
          scale: 0.92,
          x: '-18vw',
          y: '2vh',
          opacity: 1,
          filter: 'blur(0px) brightness(1)',
          rotateX: 2,
          rotateY: -6,
          duration: 2.4,
          ease: 'power1.inOut'
        }, 10.6)
        .to(shakerStageRef.current, {
          scale: 0.88,
          x: '18vw',
          y: '4vh',
          opacity: 1,
          rotateZ: 8,
          rotateY: -10,
          duration: 2.4,
          ease: 'power1.inOut'
        }, 10.6);
    });

    // ========================================================
    // MOBILE & TABLET PORTRAIT TIMELINE (max-width: 768px)
    // ========================================================
    mm.add('(max-width: 768px)', () => {
      const tlMobile = gsap.timeline({
        scrollTrigger: {
          trigger: heroTrack,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.1,
          onUpdate: (self) => {
            if (self.progress > 0.02) {
              if (idleFloat.isActive()) idleFloat.pause();
            } else {
              if (idleFloat.paused()) idleFloat.play();
            }
          }
        }
      });

      // Mobile initial state: Centered machine lower down to let hero text breathe
      gsap.set(machineStageRef.current, {
        scale: 0.55,
        x: '0vw',
        y: '22vh',
        rotateX: 2,
        rotateY: 0,
        rotateZ: 0,
        opacity: 1,
        transformOrigin: '50% 50%'
      });

      gsap.set(shakerStageRef.current, {
        opacity: 0,
        scale: 0.4,
        x: '0vw',
        y: '16vh',
        rotateZ: -12,
        rotateY: 15,
        transformOrigin: '50% 50%'
      });

      // MOBILE STAGE 1: Zoom in on 4K Touchscreen
      tlMobile.to(machineStageRef.current, {
        scale: 1.3,
        x: '0vw',
        y: '20vh',
        rotateX: 3,
        rotateY: -1,
        duration: 2.5,
        ease: 'power1.inOut'
      }, 0)
        .to(screenLightRef.current, {
          opacity: 0.8,
          duration: 1.8,
          ease: 'power1.inOut'
        }, 0.6)
        .to(displayCalloutRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power1.out'
        }, 1.0);

      // MOBILE STAGE 2: Contactless Payment Terminal
      tlMobile.to(displayCalloutRef.current, {
        opacity: 0,
        y: -14,
        duration: 0.8,
        ease: 'power1.in'
      }, 2.8)
        .to(screenLightRef.current, {
          opacity: 0.2,
          duration: 1.2,
          ease: 'power1.out'
        }, 2.8)
        .to(machineStageRef.current, {
          scale: 1.4,
          x: '-3vw',
          y: '8vh',
          rotateX: 2,
          rotateY: 2,
          duration: 2.4,
          ease: 'power1.inOut'
        }, 2.8)
        .to(paymentCalloutRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power1.out'
        }, 3.6);

      // MOBILE STAGE 3: Dispensing Bay (Callout positioned at top on mobile)
      tlMobile.to(paymentCalloutRef.current, {
        opacity: 0,
        y: -14,
        duration: 0.8,
        ease: 'power1.in'
      }, 5.4)
        .to(machineStageRef.current, {
          scale: 1.4,
          x: '0vw',
          y: '-14vh',
          rotateX: -2,
          rotateY: 0,
          duration: 2.4,
          ease: 'power1.inOut'
        }, 5.4)
        .to(dispenserLightRef.current, {
          opacity: 0.9,
          scale: 1.1,
          duration: 1.6,
          ease: 'power1.out'
        }, 5.8)
        .to(dispenserCalloutRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power1.out'
        }, 6.2);

      // MOBILE STAGE 4: Shaker Emerges in Center
      tlMobile.to(dispenserCalloutRef.current, {
        opacity: 0,
        y: -14,
        duration: 0.8,
        ease: 'power1.in'
      }, 8.0)
        .to(dispenserLightRef.current, {
          opacity: 0.15,
          duration: 1.2,
          ease: 'power1.out'
        }, 8.0)
        .to(machineStageRef.current, {
          scale: 0.52,
          x: '0vw',
          y: '-8vh',
          opacity: 0.28,
          filter: 'blur(4px) brightness(0.65)',
          duration: 2.4,
          ease: 'power1.inOut'
        }, 8.0)
        .to(shakerStageRef.current, {
          opacity: 1,
          scale: 0.92,
          x: '0vw',
          y: '2vh',
          rotateZ: 4,
          rotateY: -6,
          duration: 2.4,
          ease: 'power1.out'
        }, 8.2)
        .to(shakerCalloutRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power1.out'
        }, 8.8);

      // MOBILE STAGE 5: Dual Lockup - Balanced on phone screen
      tlMobile.to(shakerCalloutRef.current, {
        opacity: 0,
        y: -14,
        duration: 0.8,
        ease: 'power1.in'
      }, 10.6)
        .to(machineStageRef.current, {
          scale: 0.58,
          x: '-18vw',
          y: '2vh',
          opacity: 1,
          filter: 'blur(0px) brightness(1)',
          duration: 2.4,
          ease: 'power1.inOut'
        }, 10.6)
        .to(shakerStageRef.current, {
          scale: 0.65,
          x: '18vw',
          y: '4vh',
          opacity: 1,
          rotateZ: 6,
          duration: 2.4,
          ease: 'power1.inOut'
        }, 10.6);
    });

    // Fade out viewport when entering products section
    const productsSection = document.getElementById('products') || '#products';
    gsap.to(viewportRef.current, {
      opacity: 0,
      pointerEvents: 'none',
      scrollTrigger: {
        trigger: productsSection,
        start: 'top 85%',
        end: 'top 30%',
        scrub: true,
      }
    });

    ScrollTrigger.refresh();

    return () => {
      idleFloat.kill();
      mm.revert();
    };
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
          <div className="hud-title">ACTIVE BLEND</div>
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
