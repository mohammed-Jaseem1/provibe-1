import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Smartphone, Droplets, Utensils, RotateCw, Check } from 'lucide-react';
import './ShakeCycleAnimation.css';

const STAGES = [
  {
    id: 0,
    caption: 'A customer walks up',
    subtext: 'Walks up to the ProVibe smart kiosk with zero wait',
    duration: 3200,
    stickmanPos: 56, // % from left
    stickmanAction: 'walking',
    activeIcon: null,
    hatchOpen: false,
    hasCup: false
  },
  {
    id: 1,
    caption: 'Selects flavor on touch display',
    subtext: 'Browses 6 customizable flavors & nutrition profile',
    duration: 2600,
    stickmanPos: 56,
    stickmanAction: 'tapping',
    activeIcon: 'screen',
    hatchOpen: false,
    hasCup: false
  },
  {
    id: 2,
    caption: 'Pays instantly via UPI',
    subtext: 'Scans QR code with GPay, PhonePe, Paytm, or CRED',
    duration: 2800,
    stickmanPos: 56,
    stickmanAction: 'paying',
    activeIcon: 'upi',
    hatchOpen: false,
    hasCup: false
  },
  {
    id: 3,
    caption: 'Water → powder → high-speed mix',
    subtext: '12,000 RPM cyclone vortex mixes clump-free at 4°C',
    duration: 4200,
    stickmanPos: 50,
    stickmanAction: 'waiting',
    activeIcon: 'mixing',
    hatchOpen: false,
    hasCup: false
  },
  {
    id: 4,
    caption: 'Ice-cold shake ready in 50 seconds!',
    subtext: 'Touchless automated hatch opens with freshly blended cup',
    duration: 3000,
    stickmanPos: 56,
    stickmanAction: 'grabbing',
    activeIcon: 'dispense',
    hatchOpen: true,
    hasCup: true
  },
  {
    id: 5,
    caption: 'Zero mess, zero wait — straight back to training',
    subtext: 'No shaker bottles to clean, optimal post-workout fuel',
    duration: 3400,
    stickmanPos: 12,
    stickmanAction: 'walking-away',
    activeIcon: null,
    hatchOpen: false,
    hasCup: true
  }
];

const ShakeCycleAnimation = () => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef(null);

  const stage = STAGES[currentStageIdx];

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    timerRef.current = setTimeout(() => {
      setCurrentStageIdx((prev) => (prev + 1) % STAGES.length);
    }, stage.duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentStageIdx, isPlaying, stage.duration]);

  const handleStepClick = (index) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrentStageIdx(index);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleReset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrentStageIdx(0);
    setIsPlaying(true);
  };

  return (
    <div className="shake-cycle-container">
      {/* Main Animation Stage */}
      <div className="animation-stage-box">
        {/* Ambient Halo behind kiosk */}
        <div className="kiosk-glow-ambient"></div>

        {/* Stick Figure Actor */}
        <div
          className={`stickman-actor ${stage.stickmanAction}`}
          style={{
            left: `${stage.stickmanPos}%`,
            transition:
              stage.stickmanAction === 'walking' || stage.stickmanAction === 'walking-away'
                ? `left ${stage.duration / 1000}s linear`
                : 'left 0.4s ease'
          }}
        >
          <svg
            viewBox="0 0 100 180"
            className={`stickman-svg ${stage.stickmanAction === 'walking-away' ? 'flipped' : ''}`}
          >
            {/* Head */}
            <circle cx="50" cy="24" r="14" className="stick-part stick-head" />

            {/* Torso */}
            <line x1="50" y1="38" x2="50" y2="105" className="stick-part stick-spine" />

            {/* Left Arm */}
            <path
              d="M 50 48 L 30 72 L 20 95"
              className="stick-part stick-arm-left"
            />

            {/* Right Arm (interactive for tapping, paying, grabbing) */}
            <path
              d={
                stage.stickmanAction === 'tapping'
                  ? 'M 50 48 L 78 45 L 105 42'
                  : stage.stickmanAction === 'paying'
                    ? 'M 50 48 L 75 58 L 92 65'
                    : stage.stickmanAction === 'grabbing'
                      ? 'M 50 48 L 75 105 L 95 135'
                      : 'M 50 48 L 68 74 L 80 95'
              }
              className="stick-part stick-arm-right"
            />

            {/* Smartphone in right hand during payment */}
            {stage.stickmanAction === 'paying' && (
              <rect
                x="88"
                y="54"
                width="8"
                height="15"
                rx="2"
                className="stick-phone-prop"
              />
            )}

            {/* Left Leg */}
            <path
              d="M 50 105 L 34 140 L 32 172"
              className="stick-part stick-leg-left"
            />

            {/* Right Leg */}
            <path
              d="M 50 105 L 66 138 L 68 172"
              className="stick-part stick-leg-right"
            />

            {/* Left Foot */}
            <ellipse cx="28" cy="173" rx="8" ry="3.5" className="stick-part stick-foot" />

            {/* Right Foot */}
            <ellipse cx="72" cy="173" rx="8" ry="3.5" className="stick-part stick-foot" />

            {/* Held Shaker Cup when walking away */}
            {stage.hasCup && (
              <g className="held-cup-prop">
                <rect x="18" y="80" width="12" height="22" rx="3" fill="#E5FF52" />
                <rect x="16" y="77" width="16" height="4" rx="2" fill="#ffffff" />
              </g>
            )}
          </svg>
        </div>

        {/* Smart Kiosk Unit (Right Side) */}
        <div className="kiosk-unit-frame">
          {/* Top Screen */}
          <div className={`kiosk-screen-panel ${stage.activeIcon === 'screen' ? 'screen-active' : ''}`}>
            {stage.id === 0 && <span className="screen-text pulse">TOUCH TO FUEL</span>}
            {stage.id === 1 && (
              <div className="screen-flavors-preview">
                <span className="mini-badge">CHOCOLATE SILK</span>
                <span className="mini-bar"></span>
              </div>
            )}
            {stage.id === 2 && (
              <div className="screen-upi-qr">
                <div className="mini-qr-box"></div>
                <span>UPI ₹120</span>
              </div>
            )}
            {stage.id === 3 && (
              <div className="screen-progress">
                <span className="screen-progress-label">BLENDING 4°C</span>
                <div className="screen-progress-bar">
                  <div className="screen-progress-fill"></div>
                </div>
              </div>
            )}
            {stage.id >= 4 && (
              <div className="screen-ready">
                <Check size={18} className="text-primary" />
                <span>FRESH SERVE</span>
              </div>
            )}
          </div>

          {/* Central UPI Button Icon */}
          <div className="kiosk-center-module">
            <div
              className={`upi-scanner-circle ${stage.activeIcon === 'upi' ? 'active-upi-glow' : ''}`}
            >
              <Smartphone size={20} className="kiosk-icon" />
              {stage.activeIcon === 'upi' && <span className="upi-radar-ring"></span>}
            </div>
          </div>

          {/* 3 Mechanical Process Indicators (Water, Powder, Vortex Swirl) */}
          <div className="kiosk-process-indicators">
            {/* Water Dosing Icon */}
            <div
              className={`process-indicator-bubble ${stage.activeIcon === 'mixing' ? 'active-water-glow' : ''
                }`}
              title="Chilled Water Injection"
            >
              <Droplets size={16} />
            </div>

            {/* Powder Scoop Icon */}
            <div
              className={`process-indicator-bubble ${stage.activeIcon === 'mixing' ? 'active-powder-glow' : ''
                }`}
              title="Gram-Accurate Protein Dosing"
            >
              <Utensils size={15} />
            </div>

            {/* Vortex Mixing Icon */}
            <div
              className={`process-indicator-bubble ${stage.activeIcon === 'mixing' ? 'active-vortex-glow rotating' : ''
                }`}
              title="12,000 RPM Cyclone Vortex"
            >
              <RotateCw size={16} />
            </div>
          </div>

          {/* Dispensing Hatch at Bottom */}
          <div className={`kiosk-dispenser-bay ${stage.hatchOpen ? 'bay-open' : ''}`}>
            <div className="dispenser-light-beam"></div>
            {stage.id >= 3 && stage.id <= 4 && (
              <div className={`cup-dispensed-graphic ${stage.hatchOpen ? 'cup-ready' : 'cup-filling'}`}>
                <div className="cup-body"></div>
                <div className="cup-cap"></div>
              </div>
            )}
          </div>
        </div>

        {/* Horizontal Glowing Floor Baseline */}
        <div className="stage-floor-line">
          <div className="floor-glow-core"></div>
        </div>

        {/* Live Dynamic Caption at Bottom Center */}
        <div className="cycle-caption-wrapper">
          <div className="cycle-caption-text text-glow">
            {stage.caption}
          </div>
          <div className="cycle-subtext">
            {stage.subtext}
          </div>
        </div>
      </div>

      {/* Interactive Controls & Step Timeline Bar */}
      <div className="cycle-controls-bar">
        <button
          className="cycle-ctrl-btn"
          onClick={togglePlay}
          title={isPlaying ? 'Pause Animation' : 'Play Animation'}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
        </button>

        <div className="cycle-steps-pills">
          {STAGES.map((s, idx) => (
            <button
              key={s.id}
              className={`step-pill-btn ${currentStageIdx === idx ? 'active' : ''}`}
              onClick={() => handleStepClick(idx)}
            >
              <span className="step-dot"></span>
              <span className="step-pill-title">0{idx + 1}</span>
            </button>
          ))}
        </div>

        <button className="cycle-ctrl-btn" onClick={handleReset} title="Restart Loop">
          <RotateCcw size={15} />
          <span>REPLAY</span>
        </button>
      </div>
    </div>
  );
};

export default ShakeCycleAnimation;
