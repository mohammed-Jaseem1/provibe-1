import React from 'react';
import shakerImg from '../assets/shaker.png';

const CupScene = () => {
  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 5, // Above background, below text (overlay is z-index 10)
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <img 
        src={shakerImg} 
        alt="ProVibe Shaker" 
        style={{
          width: 'auto',
          height: '70vh',
          maxWidth: '80vw',
          objectFit: 'contain',
          filter: 'drop-shadow(0 25px 30px rgba(57, 255, 20, 0.2))', // Neon green shadow
          transform: 'translate(25vw, 10vh) scale(1.2) rotate(15deg)' // Fixed starting position
        }}
      />
    </div>
  );
};

export default CupScene;
