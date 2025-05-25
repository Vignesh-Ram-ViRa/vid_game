import React from 'react';
import Board from './components/Board.jsx';
import './styles/board.css';

function App() {
  return (
    <div className="app-container">
      <h1 className="game-title">
        Vidhya turns 30+1 - The Board Game - By Vira
      </h1>
      {<Board />}
    </div>
  );
}

export default App;
