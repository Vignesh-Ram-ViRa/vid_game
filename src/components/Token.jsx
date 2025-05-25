// src/components/Token.js
import React from 'react';
import '../styles/tokens.css';

function Token({ player, position, isActive }) {
  return (
    <div
      className={`token player-${player} ${isActive ? 'active' : ''}`}
      style={{ gridArea: `tile-${position}` }}
    >
      <span className="token-label">{player === 1 ? '👑' : '👸'}</span>
    </div>
  );
}

export default Token;
