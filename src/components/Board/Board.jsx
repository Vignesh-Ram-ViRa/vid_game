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
  
  // Animation states
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatingPlayer, setAnimatingPlayer] = useState(null);
  const [animationPosition, setAnimationPosition] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const animateTokenMovement = async (playerIndex, startPos, endPos, rollValue) => {
    setIsAnimating(true);
    setAnimatingPlayer(playerIndex);
    
    // Animate step by step
    for (let step = 1; step <= rollValue; step++) {
      const currentPos = Math.min(startPos + step, tiles.length - 1);
      setAnimationPosition(currentPos);
      
      // Wait for animation step (300ms per step)
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Break if we've reached the end
      if (currentPos >= tiles.length - 1) break;
    }
    
    // Animation complete
    setIsAnimating(false);
    setAnimatingPlayer(null);
    setAnimationPosition(null);
    
    // Now update the actual player position and show modal
    const newPositions = [...playerPositions];
    const finalPosition = Math.min(startPos + rollValue, tiles.length - 1);
    newPositions[playerIndex] = finalPosition;
    
    // Check if player reached the finish tile
    const finishTileIndex = tiles.findIndex(tile => tile.type === 'finish');
    if (finalPosition === finishTileIndex) {
      setShowConfetti(true);
    }
    
    setPlayerPositions(newPositions);
    setModalData(tiles[finalPosition]);
  };

  const rollDice = () => {
    if (rolled || isAnimating) return;

    const roll = Math.floor(Math.random() * 6) + 1;
    setCurrentRoll(roll);
    setRolled(true);

    const startPosition = playerPositions[currentPlayer];
    
    // Start the animation
    animateTokenMovement(currentPlayer, startPosition, startPosition + roll, roll);
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
                videoSrc="./video/32years.mp4"
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
        const staticTokenIndices = playerPositions.reduce((acc, pos, i) => {
          // FIXED: Don't show the animating player at their original position
          if (pos === tile.index && !(isAnimating && i === animatingPlayer)) {
            acc.push(i);
          }
          return acc;
        }, []);

        // Check if this tile has the animating token
        const hasAnimatingToken = isAnimating && 
          animatingPlayer !== null && 
          animationPosition === tile.index;

        // Combine static and animating tokens
        const allTokenIndices = [...staticTokenIndices];
        if (hasAnimatingToken) {
          allTokenIndices.push(animatingPlayer);
        }

        const getImageSrc = () => {
          if (tile.image && images[tile.image]) {
            return images[tile.image];
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
            onClick={() => !isAnimating && setModalData(tile)}
            onTouchStart={() => !isAnimating && setModalData(tile)}
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

            {/* Player tokens (including animating ones) */}
            {allTokenIndices.length > 0 && (
              <Token 
                indices={allTokenIndices} 
                isAnimating={hasAnimatingToken}
                animatingPlayer={animatingPlayer}
              />
            )}

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
      <Dice 
        onRoll={rollDice} 
        rolled={rolled} 
        currentRoll={currentRoll}
        disabled={isAnimating}
      />
      <Modal data={modalData} onClose={closeModal} />
      <Confetti 
        show={showConfetti} 
        onComplete={handleConfettiComplete}
      />
    </div>
  );
}

export default Board;