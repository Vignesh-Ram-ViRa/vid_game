import React, { useState, useEffect } from 'react';
import { images, placeholderImage } from '../../constants/images.js';
import { tiles } from '../../constants/titles.js';
import Modal from '../Modal/Modal.jsx';
import Token from '../Token/Token.jsx';
import Dice from '../Dice/Dice.jsx';
import './Board.css';

function Board() {
  const [playerPositions, setPlayerPositions] = useState([0, 0]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [modalData, setModalData] = useState(null);
  const [rolled, setRolled] = useState(false);
  const [currentRoll, setCurrentRoll] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const rollDice = () => {
    if (rolled) return;

    const roll = Math.floor(Math.random() * 6) + 1;
    setCurrentRoll(roll);

    const newPositions = [...playerPositions];
    newPositions[currentPlayer] = Math.min(
      newPositions[currentPlayer] + roll,
      tiles.length - 1
    );

    setPlayerPositions(newPositions);
    setModalData(tiles[newPositions[currentPlayer]]);
    setRolled(true);
  };

  const closeModal = () => {
    setModalData(null);
    setCurrentPlayer((prev) => (prev + 1) % 2);
    setRolled(false);
    setCurrentRoll(null);
  };

  const renderBoardTiles = () => {
    const boardSize = 9;
    const boardLayout = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));

    // Create the perimeter path
    const positions = [];

    // Top row (left to right)
    for (let i = 0; i < boardSize; i++) positions.push([0, i]);
    // Right column (top to bottom, excluding top corner)
    for (let i = 1; i < boardSize; i++) positions.push([i, boardSize - 1]);
    // Bottom row (right to left, excluding right corner)
    for (let i = boardSize - 2; i >= 0; i--) positions.push([boardSize - 1, i]);
    // Left column (bottom to top, excluding bottom and top corners)
    for (let i = boardSize - 2; i > 0; i--) positions.push([i, 0]);

    // Place tiles on the board
    tiles.forEach((tile, index) => {
      if (positions[index]) {
        const [row, col] = positions[index];
        boardLayout[row][col] = { ...tile, index };
      }
    });

    return (
      <div className="board-grid">
        {boardLayout.map((row, rowIndex) =>
          row.map((tile, colIndex) => {
            // Center tile
            if (rowIndex === 4 && colIndex === 4) {
              return (
                <div key="center" className="center-tile">
                  Vidhya turns<br />30+1
                </div>
              );
            }

            // Empty tiles
            if (!tile) {
              return <div key={`${rowIndex}-${colIndex}`} className="empty-tile" />;
            }

            // Game tiles
            const isPlayerHere = playerPositions.includes(tile.index);
            const tokenIndices = playerPositions.reduce((acc, pos, i) => {
              if (pos === tile.index) acc.push(i);
              return acc;
            }, []);

            const getImageSrc = () => {
              if (tile.image && images[tile.image]) {
                return images[tile.image];
              }
              if (tile.type === 'start' || tile.type === 'finish') {
                return images[tile.type];
              }
              return placeholderImage;
            };

            const getTileClass = () => {
              let classes = 'game-tile';
              switch (tile.type) {
                case 'danger':
                  classes += ' danger';
                  break;
                case 'romance':
                  classes += ' romance';
                  break;
                case 'challenge':
                  classes += ' challenge';
                  break;
                case 'trivia':
                  classes += ' trivia';
                  break;
                default:
                  classes += ' default';
              }
              return classes;
            };

            return (
              <div
                key={tile.index}
                className={getTileClass()}
                style={{
                  backgroundImage: `url(${getImageSrc()})`
                }}
                onClick={() => setModalData(tile)}
                onTouchStart={() => setModalData(tile)}
              >
                {/* Dark overlay for better text readability */}
                <div className="tile-overlay" />

                {/* Tile content */}
                <div className="tile-content">
                  {tile.icon && (
                    <div className="tile-icon">
                      {tile.icon}
                    </div>
                  )}
                  <div className="tile-year">
                    {tile.year}
                  </div>
                </div>

                {/* Player tokens */}
                {isPlayerHere && <Token indices={tokenIndices} />}

                {/* Error handling for missing images */}
                <img
                  src={getImageSrc()}
                  alt=""
                  className="tile-hidden-image"
                  onError={(e) => {
                    e.target.parentElement.style.backgroundImage = `url(${placeholderImage})`;
                  }}
                />
              </div>
            );
          })
        )}
      </div>
    );
  };

  return (
    <div className="board-container">
      <h1 className="board-title">
        Vidhya turns 30+1 - The Board Game - By Vira
      </h1>

      <div className="board-wrapper">
        {renderBoardTiles()}
      </div>

      {/* Game status */}
      <div className="game-status">
        <p className="current-player">
          Current Player: {currentPlayer === 0 ? '👸 Vidhya' : '👑 Vira'}
        </p>
        {currentRoll && (
          <p className="last-roll">
            Last Roll: {currentRoll}
          </p>
        )}
      </div>

      <Dice onRoll={rollDice} rolled={rolled} currentRoll={currentRoll} />
      <Modal data={modalData} onClose={closeModal} />
    </div>
  );
}

export default Board;