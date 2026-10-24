import { useState, useRef } from 'react';
import {
  Clock,
  Smartphone,
  Zap,
  MapPin,
  Users,
  Mail,
  Phone,
  Globe,
  ArrowUpRight,
  ShieldCheck,
  Droplets,
  Wrench,
  Award,
  Sparkles,
  Flame,
  Activity,
  Dumbbell,
  Coffee,
  CheckCircle2,
  ChevronDown,
  Check
} from 'lucide-react';
import logoImg from '../assets/logo (2).png';
import s1Img from '../assets/s1.png';
import shakerImg from '../assets/shaker.png';
import shakerCupImg from '../assets/shaker1.png';
import wheyImg from '../assets/whey.png';
import massGainerImg from '../assets/mass gainer.png';
import creatineImg from '../assets/creatine.png';
import preWorkoutImg from '../assets/pre workout.png';
import ShakeCycleAnimation from './ShakeCycleAnimation';
import './Overlay.css';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Overlay = () => {
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeAthleteTab, setActiveAthleteTab] = useState(0);
  const [expandedSlots, setExpandedSlots] = useState({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    custom: true
  });
  const [allExpanded, setAllExpanded] = useState(true);

  const toggleSlotExpand = (slotKey, e) => {
    e.stopPropagation();
    setExpandedSlots(prev => {
      const updated = { ...prev, [slotKey]: !prev[slotKey] };
      const allVals = Object.values(updated);
      setAllExpanded(allVals.every(Boolean));
      return updated;
    });
  };

  const toggleAllSlots = (e) => {
    e.stopPropagation();
    const nextState = !allExpanded;
    setAllExpanded(nextState);
    setExpandedSlots({
      0: nextState,
      1: nextState,
      2: nextState,
      3: nextState,
      4: nextState,
      5: nextState,
      custom: nextState
    });
  };

  const toggleFaq = (index) => {
    setActiveFaq(prev => prev === index ? -1 : index);
  };

  const athleteCategories = [
    {
      title: "STRENGTH & HYPERTROPHY",
      icon: <Dumbbell size={24} className="text-primary" />,
      tag: "26g - 27g PROTEIN",
      description: "Clinically formulated 100% Whey Protein & High-Calorie Mass Gainers. Rapid amino acid and carb delivery directly after heavy resistance training to kickstart muscle protein synthesis and maximize size.",
      products: [
        "100% Whey Protein (Slots 1 & 2)",
        "Complex Mass Gainer",
        "High-Calorie Mass Gainer (Slots 3 & 4)"
      ],
      highlight: "Optimal 50% Higher Protein Absorption"
    },
    {
      title: "ENDURANCE & RUNNERS",
      icon: <Activity size={24} className="text-primary" />,
      tag: "LEAN & HYDRATING",
      description: "Fast-absorbing Whey Protein paired with ATP-boosting Creatine and Pre-Workout. Designed for runners, cyclists, and endurance athletes who need sustained stamina and rapid muscle recovery without feeling weighed down.",
      products: [
        "Pure Whey Isolate",
        "Lean Whey Protein",
        "Micronised Creatine / Pre-Workout"
      ],
      highlight: "Light on Stomach & Fast Recovery"
    },
    {
      title: "CROSSFIT & HIIT",
      icon: <Flame size={24} className="text-primary" />,
      tag: "INTENSE POWER",
      description: "Pre-workout performance formulas and Pure Micronised Creatine. Engineered for explosive ATP resynthesis, high anaerobic power output, and laser-sharp focus during grueling WODs.",
      products: ["Pre-Workout 200", "Micronised Creatine"],
      highlight: "200mg Caffeine & Raw ATP Energy"
    },
    {
      title: "DAILY ACTIVE & WELLNESS",
      icon: <Sparkles size={24} className="text-primary" />,
      tag: "CLEAN MACROS",
      description: "Low-calorie, zero-added-sugar clean protein shakes. Perfect for active individuals, tech park professionals, and fitness enthusiasts wanting healthy nutrition on the go.",
      products: [
        "Clean Whey Blend",
        "Whey Protein — Flavour 1 & 2",
        "Daily Micronised Creatine"
      ],
      highlight: "Zero Added Sugar & 100% Guilt-Free"
    }
  ];

  const flavorList = [
    {
      slot: "SLOT 01",
      name: "WHEY PROTEIN — FLAVOUR 1",
      metrics: [
        { label: "27g Protein", highlight: true },
        { label: "135 kcal", highlight: false }
      ],
      desc: "Fast-absorbing whey for lean muscle recovery. Stocked with your gym's #1 bestseller flavour.",
      accent: "#38bdf8",
      icon: <Dumbbell size={28} style={{ color: "#38bdf8" }} />
    },
    {
      slot: "SLOT 02",
      name: "WHEY PROTEIN — FLAVOUR 2",
      metrics: [
        { label: "26g Protein", highlight: true },
        { label: "130 kcal", highlight: false }
      ],
      desc: "A second pure whey option so members can switch up their daily post-workout shake taste.",
      accent: "#60a5fa",
      icon: <Dumbbell size={28} style={{ color: "#60a5fa" }} />
    },
    {
      slot: "SLOT 03",
      name: "MASS GAINER — FLAVOUR 1",
      metrics: [
        { label: "22g Protein", highlight: true },
        { label: "55g Carbs", highlight: false },
        { label: "320 kcal", highlight: false }
      ],
      desc: "High-calorie mass blend with complex carbs and protein for serious size and bulking.",
      accent: "#f59e0b",
      icon: <Activity size={28} style={{ color: "#f59e0b" }} />
    },
    {
      slot: "SLOT 04",
      name: "MASS GAINER — FLAVOUR 2",
      metrics: [
        { label: "22g Protein", highlight: true },
        { label: "55g Carbs", highlight: false },
        { label: "320 kcal", highlight: false }
      ],
      desc: "A second rich mass gainer option tailored for heavy lifters and high-calorie recovery.",
      accent: "#fb923c",
      icon: <Activity size={28} style={{ color: "#fb923c" }} />
    },
    {
      slot: "SLOT 05",
      name: "MICRONISED CREATINE",
      metrics: [
        { label: "5g Creatine", highlight: true },
        { label: "15 kcal", highlight: false }
      ],
      desc: "Pure micronised creatine served chilled in a refreshing drink for raw strength and ATP power.",
      accent: "#a855f7",
      icon: <Zap size={28} style={{ color: "#a855f7" }} />
    },
    {
      slot: "SLOT 06",
      name: "PRE-WORKOUT DRINK",
      metrics: [
        { label: "7g Active Blend", highlight: true },
        { label: "20 kcal", highlight: false }
      ],
      desc: "High-energy pre-workout with 200mg caffeine for explosive muscle pumps and laser focus.",
      accent: "#ef4444",
      icon: <Flame size={28} style={{ color: "#ef4444" }} />
    }
  ];

  const faqData = [
    {
      q: "What is a smart sports nutrition vending machine?",
      a: "A ProVibe smart kiosk is an automated, self-service dispenser that freshly prepares and cold-dispenses Whey Protein, Mass Gainer, Micronised Creatine, and Pre-Workout on demand. Equipped with 6 dedicated supplement slots, instant 4°C chilling, and UPI QR payment, it serves a fresh, lump-free drink in just 50 seconds."
    },
    {
      q: "Where can I find or install a ProVibe vending machine?",
      a: "ProVibe smart kiosks are launching across premier gyms, fitness studios, and sports facilities in Kerala, with nationwide expansion across India underway. If you are a gym owner or facility manager, contact us to schedule a free site inspection and zero-cost machine installation."
    },
    {
      q: "Does the gym invest anything, and what is the profit share?",
      a: "Zero upfront investment. ProVibe covers 100% of the machine, installation, restocking, and maintenance, while the gym partner earns a flat 10% profit share on every cup dispensed."
    },
    {
      q: "How are the 6 supplement slots configured?",
      a: "Each machine comes with 6 dedicated slots designed for complete workout nutrition: 2 flavours of Whey Protein, 2 flavours of Mass Protein, 1 Creatine drink, and 1 Pre-Workout drink. Gym owners can select the best-selling flavours for each category.",
      hasSlots: true
    },
    {
      q: "How does payment work for customers?",
      a: "Payment is 100% cashless and instant via UPI. Customers simply scan the dynamic QR code on the touchscreen using Google Pay, PhonePe, Paytm, CRED, or BHIM. The transaction is verified in under 3 seconds, and the dispense cycle begins immediately."
    },
    {
      q: "How does the machine clean and sanitize itself?",
      a: "ProVibe machines are equipped with an automated CIP (Clean-In-Place) sanitization system. After every dispense, the mixing funnel receives an automatic high-pressure water rinse. In addition, our team conducts regular scheduled deep-cleaning and hygiene checks."
    },
    {
      q: "What are the electrical and water installation requirements?",
      a: "The machine requires a standard 15A single-phase electrical socket and takes less than 1 square meter of floor space. For water, the machine can either connect to a standard RO water line or operate using internal 20L food-grade water containers."
    },
    {
      q: "What warranty and technical support is provided?",
      a: "Every ProVibe kiosk comes with 24/7 smart stock tracking, automatic refill alerts, and complete hardware maintenance handled entirely by our on-ground technical support team - at zero cost to the gym."
    }
  ];

  return (
    <div className="overlay-container">

      {/* ========================================================
          1. HERO SECTION (Direct High-Impact Model)
          ======================================================== */}
      <section id="home" className="hero-reference-section">
        <div className="hero-radial-bg"></div>
        <div className="container hero-reference-container">
          
          <div className="hero-reference-copy">
            <div className="hero-badge-pill">
              <span className="live-pulse-dot"></span>
              <span>INDIA'S SMARTEST SPORTS NUTRITION KIOSK</span>
            </div>

            <h1 className="hero-reference-title">
              <span>BUILT FOR THE</span>
              <span className="text-primary text-glow">SERIOUS ATHLETE.</span>
            </h1>

            {/* Mobile-Only Machine Showcase (Shown prominently in phone viewports) */}
            <div className="hero-mobile-visual">
              <div className="machine-image-wrapper">
                <div className="machine-glow-halo"></div>
                <img
                  src={s1Img}
                  alt="ProVibe Smart Protein Vending Machine"
                  className="hero-machine-img"
                />
              </div>
            </div>

            <p className="hero-reference-desc">
              India's smartest sports nutrition vending machine — 6 dedicated supplement slots (Whey, Mass Gainer, Creatine & Pre-Workout), cold-dispensed on demand in 50 seconds, powered by UPI.
            </p>

            <div className="hero-reference-btns">
              <a href="#process" className="btn btn-primary">
                HOW IT'S MADE
              </a>
              <a href="#flavors" className="btn btn-outline">
                EXPLORE FLAVORS
              </a>
            </div>

            {/* Quick Stats Ribbon */}
            <div className="hero-stats-ribbon">
              <div className="stat-item">
                <span className="stat-number text-primary">6</span>
                <span className="stat-label">Supplement Slots<br /><small>Customizable</small></span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number text-primary">50s</span>
                <span className="stat-label">Dispense Time<br /><small>Cold & Fresh</small></span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number text-primary">100%</span>
                <span className="stat-label">UPI Powered<br /><small>Contactless</small></span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number text-primary">0g</span>
                <span className="stat-label">Shaker Mess<br /><small>Zero Cleanup</small></span>
              </div>
            </div>
          </div>

          {/* Hero Machine Showcase Visual (Desktop viewports) */}
          <div className="hero-reference-visual hero-desktop-visual">
            <div className="machine-glow-halo"></div>
            <div className="machine-image-wrapper">
              <img
                src={s1Img}
                alt="ProVibe Smart Protein Vending Machine"
                className="hero-machine-img"
              />
              
              {/* Feature Tags Floating Around Machine */}
              <div className="floating-tag tag-top-right">
                <span className="tag-dot"></span>
                <span>22" & 32" HD TOUCH DISPLAY</span>
              </div>
              
              <div className="floating-tag tag-mid-left">
                <span className="tag-dot"></span>
                <span>4°C INSTANT CHILL SYSTEM</span>
              </div>

              <div className="floating-tag tag-bottom-right">
                <span className="tag-dot"></span>
                <span>100% CASHLESS UPI QR</span>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================
          2. BUILT FOR THE SERIOUS ATHLETE (Core Value Pillars)
          ======================================================== */}
      <section id="athlete-value" className="section-padding bg-surface-dark">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow text-primary">PEAK CONVENIENCE. ZERO COMPROMISE.</span>
            <h2>BUILT FOR THE <span className="text-primary">SERIOUS ATHLETE.</span></h2>
            <p className="max-w-2xl mx-auto mt-4">
              We built the machine we always wished existed — cold, fresh, protein-perfect shakes without the mess of powder, the wait of a café, or the expense of a supplement store.
            </p>
          </div>

          <div className="grid-3-col mt-12">
            <div className="feature-pillar-card">
              <div className="pillar-icon-box">
                <Droplets size={32} className="text-primary" />
              </div>
              <h3>COLD-DISPENSED FRESHNESS</h3>
              <p>
                Chilled to the perfect 4°C temperature instantly — refreshing, silky post-workout protein, every single time.
              </p>
            </div>

            <div className="feature-pillar-card highlight-card">
              <div className="pillar-icon-box">
                <Clock size={32} className="text-primary" />
              </div>
              <h3>SCAN & GO IN UNDER A MINUTE</h3>
              <p>
                Tap your UPI app, select your flavor, collect your shake — dispensed fresh in just 50 seconds.
              </p>
            </div>

            <div className="feature-pillar-card">
              <div className="pillar-icon-box">
                <ShieldCheck size={32} className="text-primary" />
              </div>
              <h3>PREMIUM PROTEIN BLEND</h3>
              <p>
                Carefully formulated with high-quality protein and real flavor profiles — clinically backed, zero artificial syrups.
              </p>
            </div>
          </div>

          {/* 4 Quality Assurance Badges */}
          <div className="quality-badges-row mt-12">
            <div className="quality-badge-item">
              <Award className="text-primary" size={24} />
              <div>
                <strong>QUALITY FIRST</strong>
                <span>GMP & FSSAI certified grade</span>
              </div>
            </div>

            <div className="quality-badge-item">
              <Droplets className="text-primary" size={24} />
              <div>
                <strong>HYGIENE OBSESSED</strong>
                <span>Auto CIP sanitization flush</span>
              </div>
            </div>

            <div className="quality-badge-item">
              <Wrench className="text-primary" size={24} />
              <div>
                <strong>HIGH RELIABILITY</strong>
                <span>Industrial refrigeration build</span>
              </div>
            </div>

            <div className="quality-badge-item">
              <Users className="text-primary" size={24} />
              <div>
                <strong>24/7 SUPPORT</strong>
                <span>1-year warranty & maintenance</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================
          3. THE STORY BEHIND PROVIBE
          ======================================================== */}
      <section id="about-story" className="section-padding story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <span className="section-eyebrow text-primary">OUR ORIGIN & PURPOSE</span>
              <h2>THE STORY BEHIND <span className="text-primary">PROVIBE.</span></h2>
              
              <p className="mt-6 text-lead">
                Every fitness journey shares one familiar frustration: you finish a hard workout ready to refuel, only to choose between an unwashed shaker bottle, an overpriced café smoothie, or nothing at all.
              </p>

              <p className="mt-4">
                Born in Kerala's vibrant fitness community, ProVibe started with a simple question: why can't premium workout nutrition be as effortless as grabbing a cup of coffee? So we brought the answer to life — a smart sports nutrition kiosk custom-configured to dispense freshly mixed, chilled Whey Protein, Mass Gainer, Micronised Creatine, and Pre-Workout in just 50 seconds.
              </p>

              <p className="mt-4">
                Every ProVibe kiosk is carefully sourced, custom-calibrated, and tested for Indian gym conditions, instant UPI payments, and serious athletes. Launching across Kerala with a vision to power fitness hubs nationwide across India, we are building the future of everyday gym nutrition — curated for athletes, managed by us.
              </p>

              <div className="quote-callout mt-8">
                <span className="quote-mark">“</span>
                <blockquote>Fitness shouldn't wait. Neither should your protein.</blockquote>
              </div>
            </div>

            <div className="story-cards-col">
              <div className="mission-card">
                <h4 className="text-primary">ONE SCAN, ONE PERFECT SHAKE</h4>
                <p>
                  To make freshly blended, chilled workout nutrition — from Pre-Workout energy to post-workout Whey and Mass recovery — instantly accessible in one UPI scan. Zero powder, zero mess, zero compromise.
                </p>
              </div>

              <div className="mission-card">
                <h4 className="text-primary">INFRASTRUCTURE NETWORK</h4>
                <p>
                  To build India's largest smart sports nutrition kiosk network — starting across Kerala's premier gyms and fitness centers, and rapidly expanding nationwide across India.
                </p>
              </div>

              <div className="mission-card">
                <h4 className="text-primary">TAILORED FOR INDIAN GYMS</h4>
                <p>
                  Every machine is custom-calibrated for Indian fitness centers — combining heavy-duty cooling and mixing hardware with instant UPI payments, automated sanitization, and certified supplement blends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================
          4. FOR EVERY ATHLETE. EVERY GOAL.
          ======================================================== */}
      <section id="athletes" className="section-padding bg-surface-dark">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow text-primary">TARGETED NUTRITION</span>
            <h2>FOR EVERY ATHLETE. <span className="text-primary">EVERY GOAL.</span></h2>
            <p className="max-w-2xl mx-auto mt-4">
              Whatever your training looks like this week, your protein should keep up with it.
            </p>
          </div>

          <div className="athlete-tabs-nav mt-8">
            {athleteCategories.map((cat, idx) => (
              <button
                key={idx}
                className={`athlete-tab-btn ${activeAthleteTab === idx ? 'active' : ''}`}
                onClick={() => setActiveAthleteTab(idx)}
              >
                {cat.icon}
                <span>{cat.title}</span>
              </button>
            ))}
          </div>

          {/* Active Athlete Tab Card */}
          <div className="athlete-tab-content mt-8">
            <div className="athlete-showcase-card">
              <div className="athlete-card-meta">
                <span className="category-pill">{athleteCategories[activeAthleteTab].tag}</span>
                <span className="highlight-pill text-primary">{athleteCategories[activeAthleteTab].highlight}</span>
              </div>
              <h3>{athleteCategories[activeAthleteTab].title}</h3>
              <p className="mt-4 athlete-desc">
                {athleteCategories[activeAthleteTab].description}
              </p>
              
              <div className="athlete-product-chips mt-6">
                <strong>Recommended Dispenser Formulations:</strong>
                <div className="chips-row mt-2">
                  {athleteCategories[activeAthleteTab].products.map((p, i) => (
                    <span key={i} className="product-chip">
                      <Check size={16} className="text-primary" />
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================
          6. HOW YOUR SHAKE IS ACTUALLY MADE (4 Mechanical Steps)
          ======================================================== */}
      <section id="process" className="section-padding bg-surface-dark process-section">
        <div className="container">
          <div className="section-header inside-machine-header">
            <span className="section-eyebrow text-accent-gold">INSIDE THE MACHINE</span>
            <h2 className="inside-machine-heading">
              <span className="heading-row">
                <span className="word-group">HOW YOUR</span>
                <span className="word-group word-group-space">SHAKE</span>
              </span>
              <span className="heading-row">
                <span className="word-group">IS ACTUALLY</span>
                <span className="word-group word-group-space">MADE.</span>
              </span>
            </h2>
            <p className="inside-machine-desc max-w-2xl mt-4">
              No pre-mixed bottles. Every cup is built fresh, in front of you, in four real mechanical steps.
            </p>
          </div>

          {/* Connected 4-Node Milestone Timeline */}
          <div className="inside-machine-timeline-wrapper">
            <div className="timeline-track-line">
              <div className="timeline-pulse-beam"></div>
            </div>

            <div className="inside-machine-nodes">
              {/* Node 1: Water Fill */}
              <div className="machine-node-item">
                <div className="node-circle-bubble">
                  <svg viewBox="0 0 40 40" width="38" height="38" className="node-svg">
                    <defs>
                      <linearGradient id="waterDropGrad" x1="20%" y1="0%" x2="80%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#0284c7" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M20 6 C20 6 10 18 10 25 C10 30.5 14.5 35 20 35 C25.5 35 30 30.5 30 25 C30 18 20 6 20 6 Z"
                      fill="url(#waterDropGrad)"
                      filter="drop-shadow(0 0 8px rgba(56, 189, 248, 0.55))"
                    />
                  </svg>
                </div>
                <h4 className="node-title">WATER FILL</h4>
                <p className="node-desc">Chilled water measured in</p>
              </div>

              {/* Node 2: Protein Powder */}
              <div className="machine-node-item">
                <div className="node-circle-bubble">
                  <svg viewBox="0 0 40 40" width="38" height="38" className="node-svg">
                    <defs>
                      <linearGradient id="powderScoopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#cbd5e1" />
                      </linearGradient>
                    </defs>
                    <circle cx="15.5" cy="15.5" r="7.5" fill="url(#powderScoopGrad)" filter="drop-shadow(0 0 6px rgba(255, 255, 255, 0.35))" />
                    <path d="M20 20 L31 31" stroke="url(#powderScoopGrad)" strokeWidth="3.5" strokeLinecap="round" />
                  </svg>
                </div>
                <h4 className="node-title protein-title">
                  <span className="title-word">PROTEIN</span>
                  <span className="title-word title-word-space">POWDER</span>
                </h4>
                <p className="node-desc">Your flavor dispensed to dose</p>
              </div>

              {/* Node 3: High-Speed Mix */}
              <div className="machine-node-item">
                <div className="node-circle-bubble">
                  <svg viewBox="0 0 40 40" width="38" height="38" className="node-svg node-swirl-icon">
                    <defs>
                      <linearGradient id="vortexSwirlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c084fc" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M20 20 m -2 0 a 2 2 0 1 0 4 0 a 4.5 4.5 0 1 0 -9 0 a 7.5 7.5 0 1 0 15 0 a 10.5 10.5 0 1 0 -21 0"
                      fill="none"
                      stroke="url(#vortexSwirlGrad)"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      filter="drop-shadow(0 0 8px rgba(129, 140, 248, 0.6))"
                    />
                  </svg>
                </div>
                <h4 className="node-title">HIGH-SPEED MIX</h4>
                <p className="node-desc">Spinner blends it lump-free</p>
              </div>

              {/* Node 4: Fresh Serve */}
              <div className="machine-node-item">
                <div className="node-circle-bubble serve-bubble">
                  <svg viewBox="0 0 40 40" width="38" height="38" className="node-svg">
                    <defs>
                      <linearGradient id="shakeCupGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#fb923c" />
                        <stop offset="100%" stopColor="#ea580c" />
                      </linearGradient>
                    </defs>
                    <path d="M22 6 L25 13" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
                    <rect x="11.5" y="13" width="17" height="3" rx="1.5" fill="#f8fafc" />
                    <path
                      d="M13.5 16 L15.5 32.5 C15.7 33.5 16.5 34 17.5 34 L22.5 34 C23.5 34 24.3 33.5 24.5 32.5 L26.5 16 Z"
                      fill="url(#shakeCupGrad)"
                      filter="drop-shadow(0 0 8px rgba(234, 88, 12, 0.6))"
                    />
                  </svg>
                </div>
                <h4 className="node-title">FRESH SERVE</h4>
                <p className="node-desc">Delivered to you in 50s</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================
          7. 7 FLAVOR SLOTS. YOUR CHOICE.
          ======================================================== */}
      <section id="flavors" className="section-padding flavors-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow text-primary">MENU CUSTOMIZATION</span>
            <h2>6 SUPPLEMENT SLOTS. <span className="text-primary">COMPLETE FUEL.</span></h2>
            <p className="max-w-2xl mx-auto mt-4">
              Every machine is engineered with 6 dedicated slots: 2 for Whey Protein, 2 for Mass Gainer, 1 for Creatine, and 1 for Pre-Workout — covering every athlete's goal from warm-up to recovery.
            </p>
          </div>

          <div className="flavors-grid mt-12">
            {flavorList.map((flavor, index) => (
              <div key={index} className="flavor-card">
                <div className="flavor-slot-pill">{flavor.slot}</div>
                <div className="flavor-icon-circle" style={{ borderColor: flavor.accent }}>
                  {flavor.icon}
                </div>
                <h4>{flavor.name}</h4>
                <div className="flavor-metrics-row">
                  {flavor.metrics.map((m, mIdx) => (
                    <span
                      key={mIdx}
                      className={`metric-chip ${m.highlight ? 'text-primary' : ''}`}
                    >
                      {m.label}
                    </span>
                  ))}
                </div>
                <p className="flavor-desc">{flavor.desc}</p>
              </div>
            ))}

            {/* Custom formulation slot */}
            <div className="flavor-card custom-slot-card">
              <div className="custom-card-header">
                <div className="flavor-slot-pill">ANY SUPPLEMENT</div>
                <div className="flavor-icon-circle" style={{ borderColor: 'var(--color-primary)' }}>
                  <Sparkles size={28} className="text-primary" />
                </div>
              </div>
              <div className="custom-card-body">
                <h4>YOUR CUSTOM BLENDS</h4>
                <div className="flavor-metrics-row">
                  <span className="metric-chip text-primary">Customisable</span>
                  <span className="metric-chip">Gym Discretion</span>
                </div>
                <p className="flavor-desc">
                  Gym owners can choose their preferred flavors across our 2 Whey, 2 Mass Gainer, 1 Creatine, and 1 Pre-Workout slots according to member demand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================
          8. HOW IT WORKS (Live Cycle Demonstration)
          ======================================================== */}
      <section id="how" className="section-padding bg-surface-dark how-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow text-primary">LIVE CYCLE DEMONSTRATION</span>
            <h2>FROM ORDER TO SHAKE <span className="text-primary">IN 50 SECONDS.</span></h2>
            <p className="max-w-2xl mx-auto mt-4">
              Watch the full automated dispense cycle unfold below — zero queues, UPI tap-and-go, and cold-mixed in 50 seconds.
            </p>
          </div>

          {/* Interactive Stickman Live Cycle Demonstration */}
          <ShakeCycleAnimation />

          <div className="grid-3-col mt-12">
            <div className="step-card">
              <div className="step-badge">STEP 01</div>
              <div className="step-icon-box">
                <Smartphone size={36} className="text-primary" />
              </div>
              <h4>BROWSE & TOUCH</h4>
              <p>
                Walk up to any ProVibe kiosk. Browse the intuitive touchscreen, inspect nutritional breakdown, and pick your shake.
              </p>
            </div>

            <div className="step-card">
              <div className="step-badge">STEP 02</div>
              <div className="step-icon-box">
                <Zap size={36} className="text-primary" />
              </div>
              <h4>INSTANT UPI SCAN</h4>
              <p>
                Scan the dynamic on-screen QR with GPay, PhonePe, Paytm, or CRED. Approved securely in under 5 seconds.
              </p>
            </div>

            <div className="step-card">
              <div className="step-badge">STEP 03</div>
              <div className="step-icon-box">
                <Droplets size={36} className="text-primary" />
              </div>
              <h4>COLD SHAKE IN 50s</h4>
              <p>
                Freshly blended, chilled to 4°C, and dispensed into your ready-to-sip cup. Grab it and get back to your workout!
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================
          9. ZERO CAPITAL INVESTMENT FOR GYMS
          ======================================================== */}
      <section id="gyms" className="section-padding gym-partner-section">
        <div className="container">
          <div className="gym-partner-grid">
            <div className="gym-partner-content">
              <span className="section-eyebrow text-primary">GYM & FACILITY PARTNERSHIPS</span>
              <h2>ZERO CAPITAL INVESTMENT.<br className="gym-title-br" /> <span className="text-primary">MORE VALUE FOR YOUR GYM.</span></h2>
              <p className="mt-4 text-lead">
                Turn your gym into a complete fitness destination — with zero investment and zero operational hassle.
              </p>

              <div className="value-checklist mt-8">
                <div className="value-item">
                  <div className="check-icon-circle"><Check size={18} className="text-primary" /></div>
                  <div>
                    <strong>Zero Upfront Investment</strong>
                    <p>Machine delivery, hardware installation, and setup are 100% covered by ProVibe.</p>
                  </div>
                </div>

                <div className="value-item">
                  <div className="check-icon-circle"><Check size={18} className="text-primary" /></div>
                  <div>
                    <strong>Automated Restocking & Inventory</strong>
                    <p>IoT cloud telemetry alerts us when canisters run low. We handle regular restocking seamlessly.</p>
                  </div>
                </div>

                <div className="value-item">
                  <div className="check-icon-circle"><Check size={18} className="text-primary" /></div>
                  <div>
                    <strong>Zero Maintenance Headaches</strong>
                    <p>From automatic CIP sanitization flushes to 24/7 technical on-site repair, we maintain everything.</p>
                  </div>
                </div>

                <div className="value-item">
                  <div className="check-icon-circle"><Check size={18} className="text-primary" /></div>
                  <div>
                    <strong>Boost Member Retention</strong>
                    <p>Give members instant post-workout recovery right on the gym floor — no warm shaker bottles.</p>
                  </div>
                </div>

                <div className="value-item">
                  <div className="check-icon-circle"><Check size={18} className="text-primary" /></div>
                  <div>
                    <strong>Flat 10% Profit Share</strong>
                    <p>Earn a guaranteed 10% profit share on every shake and supplement cup dispensed tracked transparently in real time.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a href="#contact" className="btn btn-primary">
                  INSTALL PROVIBE IN YOUR GYM
                </a>
              </div>
            </div>

            <div className="gym-partner-visual">
              <div className="partner-card-frame">
                <img src={s1Img} alt="ProVibe Machine in Gym" className="partner-machine-visual" />
                <div className="partner-stat-pill">
                  <CheckCircle2 size={18} className="text-primary" />
                  <span>Turnkey Installation • Takes &lt; 1 m²</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================
          10. FREQUENTLY ASKED QUESTIONS (Accordion)
          ======================================================== */}
      <section id="faq" className="section-padding bg-surface-dark faq-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow text-primary">COMMON INQUIRIES</span>
            <h2>FREQUENTLY ASKED <span className="text-primary">QUESTIONS.</span></h2>
            <p className="max-w-2xl mx-auto mt-4">
              Everything you need to know about ProVibe smart sports nutrition kiosks, zero-cost gym installations, and our 6-slot supplement lineup.
            </p>
          </div>

          <div className="faq-accordion-container mt-12">
            {faqData.map((item, idx) => (
              <div
                key={idx}
                className={`faq-item ${activeFaq === idx ? 'open' : ''}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className="faq-question-row">
                  <h4>{item.q}</h4>
                  <ChevronDown
                    size={20}
                    className={`faq-arrow ${activeFaq === idx ? 'rotated' : ''}`}
                  />
                </div>
                {activeFaq === idx && (
                  <div className="faq-answer-content" onClick={(e) => e.stopPropagation()}>
                    <p className="faq-answer-lead">{item.a}</p>

                    {item.hasSlots && (
                      <div className="faq-slots-wrapper">
                        <div className="faq-slots-toolbar">
                          <span className="faq-slots-eyebrow">
                            <span className="dot-primary"></span>
                            6 DEDICATED SLOTS BREAKDOWN
                          </span>
                          <button
                            type="button"
                            className="faq-slots-toggle-btn"
                            onClick={(e) => toggleAllSlots(e)}
                          >
                            {allExpanded ? 'Collapse All' : 'Expand All'}
                          </button>
                        </div>

                        <div className="faq-slots-grid">
                          {flavorList.map((slotItem, sIdx) => {
                            const isSlotOpen = expandedSlots[sIdx] !== false;
                            return (
                              <div
                                key={sIdx}
                                className={`faq-slot-card ${isSlotOpen ? 'open' : 'collapsed'}`}
                                onClick={(e) => toggleSlotExpand(sIdx, e)}
                              >
                                <div className="faq-slot-header">
                                  <div className="faq-slot-header-left">
                                    <span
                                      className="faq-slot-badge"
                                      style={{
                                        borderColor: `${slotItem.accent}55`,
                                        color: slotItem.accent,
                                        backgroundColor: `${slotItem.accent}14`
                                      }}
                                    >
                                      {slotItem.slot}
                                    </span>
                                    <h5 className="faq-slot-title">{slotItem.name}</h5>
                                  </div>
                                  <div className="faq-slot-header-right">
                                    <ChevronDown
                                      size={16}
                                      className={`faq-slot-chevron ${isSlotOpen ? 'rotated' : ''}`}
                                    />
                                  </div>
                                </div>

                                <div className="faq-slot-metrics">
                                  {slotItem.metrics.map((m, mIdx) => (
                                    <span
                                      key={mIdx}
                                      className={`faq-metric-tag ${m.highlight ? 'highlight' : ''}`}
                                    >
                                      {m.label}
                                    </span>
                                  ))}
                                </div>

                                {isSlotOpen && (
                                  <p className="faq-slot-desc">{slotItem.desc}</p>
                                )}
                              </div>
                            );
                          })}

                          {/* Custom Blends Card */}
                          {(() => {
                            const isCustomOpen = expandedSlots['custom'] !== false;
                            return (
                              <div
                                className={`faq-slot-card faq-custom-slot-card ${isCustomOpen ? 'open' : 'collapsed'}`}
                                onClick={(e) => toggleSlotExpand('custom', e)}
                              >
                                <div className="faq-slot-header">
                                  <div className="faq-slot-header-left">
                                    <span className="faq-slot-badge custom">ANY SUPPLEMENT</span>
                                    <h5 className="faq-slot-title text-primary">YOUR CUSTOM BLENDS</h5>
                                  </div>
                                  <div className="faq-slot-header-right">
                                    <ChevronDown
                                      size={16}
                                      className={`faq-slot-chevron ${isCustomOpen ? 'rotated' : ''}`}
                                    />
                                  </div>
                                </div>

                                <div className="faq-slot-metrics">
                                  <span className="faq-metric-tag highlight">Customisable</span>
                                  <span className="faq-metric-tag">Gym Discretion</span>
                                </div>

                                {isCustomOpen && (
                                  <p className="faq-slot-desc">
                                    Gym owners can choose their preferred flavors across our 2 Whey, 2 Mass Gainer, 1 Creatine, and 1 Pre-Workout slots according to member demand.
                                  </p>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ========================================================
          11. READY TO FUEL UP? (Direct Contact Channels)
          ======================================================== */}
      <section id="contact" className="section-padding contact-hub-section">
        <div className="container">
          <div className="section-header text-center mb-8">
            <span className="section-eyebrow text-primary">CONTACT & PARTNERSHIPS</span>
            <h2>READY TO <span className="text-primary">FUEL UP?</span></h2>
            <p className="max-w-2xl mx-auto mt-4 text-lead">
              ProVibe smart kiosks are rolling out across gyms and fitness studios with ₹0 upfront cost and a 10% profit share for gym partners. Reach out directly to install a kiosk at your facility.
            </p>
          </div>

          {/* Quick Action CTA Buttons */}
          <div className="contact-action-btns text-center mb-10">
            <a href="tel:+919605966902" className="btn btn-primary">
              <Phone size={18} style={{ marginRight: '8px' }} />
              CALL US NOW
            </a>
            <a href="mailto:provibe.fit@gmail.com" className="btn btn-outline">
              <Mail size={18} style={{ marginRight: '8px' }} />
              EMAIL US
            </a>
          </div>

          {/* Direct Contact Cards Grid */}
          <div className="contact-cards-grid">
            <a href="tel:+919605966902" className="contact-card-item">
              <div className="card-icon-circle">
                <Phone size={22} className="text-primary" />
              </div>
              <div className="card-text-block">
                <span className="card-label">CALL / WHATSAPP</span>
                <span className="card-value">+91 96059 66902</span>
              </div>
              <ArrowUpRight size={20} className="card-arrow text-primary" />
            </a>

            <a href="tel:+919207156454" className="contact-card-item">
              <div className="card-icon-circle">
                <Phone size={22} className="text-primary" />
              </div>
              <div className="card-text-block">
                <span className="card-label">CALL / WHATSAPP</span>
                <span className="card-value">+91 92071 56454</span>
              </div>
              <ArrowUpRight size={20} className="card-arrow text-primary" />
            </a>

            <a href="mailto:provibe.fit@gmail.com" className="contact-card-item">
              <div className="card-icon-circle">
                <Mail size={22} className="text-primary" />
              </div>
              <div className="card-text-block">
                <span className="card-label">DIRECT EMAIL</span>
                <span className="card-value">provibe.fit@gmail.com</span>
              </div>
              <ArrowUpRight size={20} className="card-arrow text-primary" />
            </a>

            <a href="https://instagram.com/provibe.fit" target="_blank" rel="noopener noreferrer" className="contact-card-item">
              <div className="card-icon-circle">
                <InstagramIcon />
              </div>
              <div className="card-text-block">
                <span className="card-label">INSTAGRAM</span>
                <span className="card-value">@provibe.fit</span>
              </div>
              <ArrowUpRight size={20} className="card-arrow text-primary" />
            </a>
          </div>
        </div>
      </section>


      {/* ========================================================
          12. FOOTER
          ======================================================== */}
      <footer className="footer-reference">
        <div className="container">
          <div className="footer-top-row">
            <div className="footer-brand-col">
              <a href="#home">
                <img src={logoImg} alt="ProVibe - Fuel Every Move" className="footer-logo" />
              </a>
              <p className="footer-description">
                India's smartest protein shake vending machine — cold-dispensed on demand in 50 seconds. Zero mess, instant UPI, powered for gyms and fitness centers.
              </p>
            </div>

            <div className="footer-links-col">
              <h5>EXPLORE</h5>
              <ul>
                <li><a href="#about-story">About Us</a></li>
                <li><a href="#athletes">Athletes</a></li>
                <li><a href="#process">How It's Made</a></li>
                <li><a href="#flavors">6 Supplement Slots</a></li>
                <li><a href="#how">How It Works</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h5>PARTNERS</h5>
              <ul>
                <li><a href="#gyms">Gym Partnerships</a></li>
                <li><a href="#contact">Install In Your Gym</a></li>
                <li><a href="mailto:provibe.fit@gmail.com">Corporate Inquiries</a></li>
              </ul>
            </div>

            <div className="footer-contact-col">
              <h5>DIRECT SUPPORT</h5>
              <p>WhatsApp / Call: <a href="tel:+919605966902">+91 96059 66902</a></p>
              <p>WhatsApp / Call: <a href="tel:+919207156454">+91 92071 56454</a></p>
              <p>Email: <a href="mailto:provibe.fit@gmail.com">provibe.fit@gmail.com</a></p>
              <div className="footer-social-row mt-4">
                <a href="https://instagram.com/provibe.fit" target="_blank" rel="noopener noreferrer" className="social-pill">
                  <InstagramIcon />
                  <span>@provibe.fit</span>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <p>© 2026 ProVibe Vending. All rights reserved.</p>
            <p className="made-in-india-tag">
              <span className="dot-green"></span> Engineered for Indian Athletes & Indian Gyms
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Overlay;
