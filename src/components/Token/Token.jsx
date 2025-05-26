import React from 'react';
import './Token.css';

function Token({ indices }) {
  if (!indices || indices.length === 0) return null;

  return (
    <div className="token-container">
      {indices.map((playerIndex) => (
        <div
          key={playerIndex}
          className={`token player-${playerIndex}`}
        >
          {playerIndex === 0 ? '👸' : '👑'}
        </div>
      ))}
    </div>
  );
}

export default Token;