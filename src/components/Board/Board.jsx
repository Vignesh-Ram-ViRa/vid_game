import React, { useState, useEffect } from 'react';
import { images, placeholderImage } from '../../constants/images.js';
import { tiles } from '../../constants/titles.js';
import Modal from '../Modal/Modal.jsx';
import Token from '../Token/Token.jsx';
import Dice from '../Dice/Dice.jsx';
import Header from '../Header/Header.jsx';
import Confetti from '../Confetti/Confetti.jsx';
import './Board.css';
import BackgroundMusicPlayer from '../MusicPlayer/BackgroundMusicPlayer.jsx';
import CenterTile from '../CenterTile/CenterTile.jsx';

function Board() {
  const [playerPositions, setPlayerPositions] = useState([0, 0]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [modalData, setModalData] = useState(null);
  const [rolled, setRolled] = useState(false);
  const [currentRoll, setCurrentRoll] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showConfetti, setShowConfetti] = useState(false);

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
    const newPosition = Math.min(
      newPositions[currentPlayer] + roll,
      tiles.length - 1
    );
    newPositions[currentPlayer] = newPosition;

    // Check if player reached the finish tile
    const finishTileIndex = tiles.findIndex(tile => tile.type === 'finish');
    if (newPosition === finishTileIndex) {
      setShowConfetti(true);
    }

    setPlayerPositions(newPositions);
    setModalData(tiles[newPosition]);
    setRolled(true);
  };

  const closeModal = () => {
    setModalData(null);
    setCurrentPlayer((prev) => (prev + 1) % 2);
    setRolled(false);
    setCurrentRoll(null);
  };

  const handleConfettiComplete = () => {
    setShowConfetti(false);
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

    // Create the grid elements
    const gridElements = [];

    boardLayout.forEach((row, rowIndex) => {
      row.forEach((tile, colIndex) => {
        const gridKey = `${rowIndex}-${colIndex}`;

        // Handle center tile (spans 3x3 from position 3,3 to 5,5)
        if (rowIndex >= 3 && rowIndex <= 5 && colIndex >= 3 && colIndex <= 5) {
          // Only render the center tile once at position 3,3
          if (rowIndex === 3 && colIndex === 3) {
            gridElements.push(
              <CenterTile
                key="center-tile"
                videoSrc="./video/full.mp4"
                images={images}
                placeholderImage={placeholderImage}
              />
            );
          }
          // Skip all other positions in the 3x3 center area
          return;
        }

        // Empty tiles (areas not on the perimeter and not in center)
        if (!tile) {
          gridElements.push(
            <div key={gridKey} className="empty-tile" />
          );
          return;
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

        gridElements.push(
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
      });
    });

    return (
      <div className="board-grid">
        {gridElements}
      </div>
    );
  };

  return (
    <div className="board-container">
      <Header 
        currentPlayer={currentPlayer}
        currentRoll={currentRoll}
      />
      
      <div className="board-wrapper">
        {renderBoardTiles()}
      </div>

      <BackgroundMusicPlayer />
      <Dice onRoll={rollDice} rolled={rolled} currentRoll={currentRoll} />
      <Modal data={modalData} onClose={closeModal} />
      <Confetti 
        show={showConfetti} 
        onComplete={handleConfettiComplete}
      />
    </div>
  );
}

export default Board;