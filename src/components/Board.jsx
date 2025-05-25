import React, { useState } from 'react';
import { tiles } from '../constants/titles.js';
import images from '../assets/images.js';
import Modal from './Modal.jsx';
import Dice from './Dice.jsx';
import Token from './Token.jsx';
import '../styles/board.css';

function Board() {
  const [playerPositions, setPlayerPositions] = useState([0, 0]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [modalData, setModalData] = useState(null);
  const [rolled, setRolled] = useState(false);

  const rollDice = () => {
    if (rolled) return;
    const roll = Math.floor(Math.random() * 6) + 1;
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
  };

  const renderBoardTiles = () => {
    const boardSize = 9; // 9x9 grid for 32 perimeter tiles
    const boardLayout = Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(null));

    const positions = [];

    // Top row (0, 0 to 8)
    for (let i = 0; i < boardSize; i++) positions.push([0, i]);
    // Right column (1 to 7, 8)
    for (let i = 1; i < boardSize - 1; i++) positions.push([i, boardSize - 1]);
    // Bottom row (8, 8 to 0)
    for (let i = boardSize - 1; i >= 0; i--) positions.push([boardSize - 1, i]);
    // Left column (7 to 1, 0)
    for (let i = boardSize - 2; i > 0; i--) positions.push([i, 0]);

    tiles.forEach((tile, index) => {
      if (!positions[index]) return; // safety check
      const [row, col] = positions[index];
      boardLayout[row][col] = { ...tile, index };
    });

    return boardLayout.map((row, rowIndex) =>
      row.map((tile, colIndex) => {
        if (!tile) {
          if (
            rowIndex === Math.floor(boardSize / 2) &&
            colIndex === Math.floor(boardSize / 2)
          ) {
            // Center cell for your title
            return (
              <div key="center-title" className="center-title-tile">
                Vidhya turns 30+1
              </div>
            );
          }
          return <div key={`${rowIndex}-${colIndex}`} className="empty-tile" />;
        }

        const isPlayerHere = playerPositions.includes(tile.index);
        const tokenIndices = playerPositions.reduce((acc, pos, i) => {
          if (pos === tile.index) acc.push(i);
          return acc;
        }, []);

        return (
          <div
            key={tile.index}
            className={`tile ${tile.type}`}
            style={{ backgroundImage: `url(${images[tile.image]})` }}
          >
            {tile.icon && <div className="tile-icon">{tile.icon}</div>}
            <div className="tile-year">{tile.year}</div>
            {isPlayerHere && <Token indices={tokenIndices} />}
          </div>
        );
      })
    );
  };

  return (
    <div className="board-container">
      <div className="board-grid">{renderBoardTiles()}</div>
      <Dice onRoll={rollDice} rolled={rolled} />
      {modalData && <Modal data={modalData} onClose={closeModal} />}
    </div>
  );
}

export default Board;
