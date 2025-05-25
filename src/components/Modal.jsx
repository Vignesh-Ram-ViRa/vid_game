// src/components/Modal.js
import React from 'react';
import '../styles/modal.css';

function Modal({ visible, onClose, content }) {
  if (!visible) return null;

  const { type, year, description } = content;

  const iconMap = {
    milestone: '🌟',
    trivia: '❓',
    challenge: '❗',
    danger: '❌',
    romance: '❤️',
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-icon">{iconMap[type]}</span>
          <h2 className="modal-title">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </h2>
        </div>
        <div className="modal-content">
          <h3>{year}</h3>
          <p>{description}</p>
        </div>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
