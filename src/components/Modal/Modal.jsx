import React from 'react';
import { images, placeholderImage } from '../../constants/images.js';
import './Modal.css';

function Modal({ data, onClose }) {
  if (!data) return null;

  const eventTileYear = ["Challenge", "Trivia"].includes(data.year) ? " - " + data.image : '';
  const iconMap = {
    milestone: '🌟',
    trivia: '❓',
    challenge: '🎭',
    danger: '⚠️',
    romance: '❤️',
    start: '🌟',
    finish: '👑'
  };

  const getImageSrc = () => {
    if (data.image && images[data.image]) {
      return images[data.image];
    }
    if (data.type === 'start' || data.type === 'finish') {
      return images[data.type];
    }
    return placeholderImage;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-icon">{iconMap[data.type] || data.icon}</span>
          <h2 className="modal-title">{data.type}</h2>
        </div>

        <div className="modal-image-container">
          <img
            src={getImageSrc()}
            alt={`${data.year} - ${data.type}`}
            className="modal-image"
            onError={(e) => {
              e.target.src = placeholderImage;
            }}
          />
        </div>

        <div className="modal-text-content">
          <h3 className="modal-year">{data.year}{eventTileYear}</h3>
          <p className="modal-description">{data.description}</p>
        </div>

        <button className="modal-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;