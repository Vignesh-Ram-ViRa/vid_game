import React from 'react';
import './Header.css';

function Header({ currentPlayer, currentRoll }) {
  return (
    <header className="game-header">
      <div className="header-logo">
        <h1 className="logo-text">
          Vidhya turns 30+1 - The Board Game - By Vira
        </h1>
      </div>
      
      <div className="header-status">
        <div className="status-item current-player">
          <span className="player-label">Current Player:</span>
          <span className="player-name">
            {currentPlayer === 0 ? '👸 Vidhya' : '👑 Vira'}
          </span>
        </div>
        
        {currentRoll && (
          <div className="status-item last-roll">
            <span className="roll-label">Last Roll:</span>
            <span className="roll-value">{currentRoll}</span>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;