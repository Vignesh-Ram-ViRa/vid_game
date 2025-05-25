// src/components/Dice.js
import React, { useState } from 'react';
import '../styles/dice.css';

function Dice({ onRoll, rolled }) {
  const [face, setFace] = useState(1);

  const handleClick = () => {
    if (rolled) return;
    const result = Math.floor(Math.random() * 6) + 1;
    setFace(result);
    setTimeout(() => {
      onRoll();
    }, 500);
  };

  return (
    <div className="dice-container" onClick={handleClick}>
      <div className={`dice face-${face}`}>{face}</div>
    </div>
  );
}

export default Dice;
