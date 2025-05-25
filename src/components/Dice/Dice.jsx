import React, { useState, useEffect } from 'react';
import './Dice.css';

function Dice({ onRoll, rolled, currentRoll }) {
  const [isRolling, setIsRolling] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    if (rolled || isRolling) return;
    
    setIsRolling(true);
    setTimeout(() => {
      setIsRolling(false);
      onRoll();
    }, 600);
  };

  const getDiceClasses = () => {
    let classes = 'dice-container';
    if (rolled) classes += ' disabled';
    if (isRolling) classes += ' rolling';
    return classes;
  };

  return (
    <div 
      className={getDiceClasses()}
      onClick={handleClick}
    >
      <div className="dice-number">
        {currentRoll || '🎲'}
      </div>
    </div>
  );
}

export default Dice;