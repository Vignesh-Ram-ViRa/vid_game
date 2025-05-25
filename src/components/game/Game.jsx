import React, { useState, useEffect } from 'react';

// Image mapping for tiles - using placeholder for now, will be replaced with actual JPG files
const images = {
  1994: './1994.jpg',
  1995: './1995.jpg',
  1998: './1998.jpg',
  2000: './2000.jpg',
  2005: './2005.jpg',
  2006: './2006.jpg',
  2007: './2007.jpg',
  2010: './2010.jpg',
  2013: './2013.jpg',
  2014: './2014.jpg',
  2016: './2016.jpg',
  2017: './2017.jpg',
  2019: './2019.jpg',
  2020: './2020.jpg',
  2021: './2021.jpg',
  '2024a': './placeholder.jpg',
  '2025a': './placeholder.jpg',
  '2025b': './placeholder.jpg',
  trivia1: './placeholder.jpg',
  trivia2: './placeholder.jpg',
  trivia3: './placeholder.jpg',
  trivia4: './placeholder.jpg',
  trivia5: './placeholder.jpg',
  trivia6: './placeholder.jpg',
  challenge1: './placeholder.jpg',
  challenge2: './placeholder.jpg',
  challenge3: './placeholder.jpg',
  challenge4: './placeholder.jpg',
  challenge5: './placeholder.jpg',
  romance: './placeholder.jpg',
  danger: './placeholder.jpg',
  start: './test.jpg',
  finish: './test.jpg'
};

// Fallback placeholder image for demo purposes
const placeholderImage = 'https://via.placeholder.com/120x120/4a5568/ffffff?text=Image+Placeholder';

// Fixed tiles data
const tiles = [
  { type: 'start', year: '', description: 'Start: Babyhood', icon: '🌟' },
  {
    type: 'milestone',
    year: '1994',
    description: 'The Universe sighed... "She\'s here!"',
    image: '1994',
    icon: '👶'
  },
  {
    type: 'milestone',
    year: '1995',
    description: 'First Encounter: Met the love of her life. (Yes, me - as babies!)',
    image: '1995',
    icon: '💕'
  },
  {
    type: 'milestone',
    year: '1998',
    description: 'Brother Unlocked! (Trouble Level: High)',
    image: '1998',
    icon: '👦'
  },
  {
    type: 'milestone',
    year: '2000',
    description: 'Sisters vs Babyzilla',
    image: '2000',
    icon: '👭'
  },
  {
    type: 'milestone',
    year: '2005',
    description: 'Mastered the art of fake crying.',
    image: '2005',
    icon: '😭'
  },
  {
    type: 'milestone',
    year: '2006',
    description: 'Our origin story - summer vacations - where we started off by ignoring each other.',
    image: '2006',
    icon: '🏖️'
  },
  {
    type: 'milestone',
    year: '2007',
    description: 'Certified Grown-Up (Says the Government, not Mom)',
    image: '2007',
    icon: '🎓'
  },
  {
    type: 'milestone',
    year: '2010',
    description: 'First love bloomed. Ah, young and mushy times.',
    image: '2010',
    icon: '💝'
  },
  {
    type: 'milestone',
    year: '2013',
    description: 'College adventures begin. New friends, new dreams',
    image: '2013',
    icon: '🎓'
  },
  {
    type: 'milestone',
    year: '2014',
    description: 'Heartbreak Hotel Check-In (Exit in 2 Years)',
    image: '2014',
    icon: '💔'
  },
  {
    type: 'milestone',
    year: '2016',
    description: 'First Salary: Spent ₹5000 on earrings and shoes',
    image: '2016',
    icon: '💰'
  },
  {
    type: 'milestone',
    year: '2017',
    description: 'Self-Reboot 2.0 - Chennai Style',
    image: '2017',
    icon: '🔄'
  },
  {
    type: 'milestone',
    year: '2019',
    description: 'Match Locked: Love Arranged, Hearts Engaged',
    image: '2019',
    icon: '💍'
  },
  {
    type: 'milestone',
    year: '2020',
    description: 'Wedding Bells & Beast Mode Husband (Me, obviously)',
    image: '2020',
    icon: '👰'
  },
  {
    type: 'milestone',
    year: '2021',
    description: 'Promoted to Mom: No Leave. No Overtime Pay.',
    image: '2021',
    icon: '👶'
  },
  {
    type: 'milestone',
    year: '2024',
    description: 'License to Drive (Confidence still in 1st Gear)',
    image: '2024a',
    icon: '🚗'
  },
  {
    type: 'milestone',
    year: '2025a',
    description: 'Veena Goes Viral: Strings still attached.',
    image: '2025a',
    icon: '🎵'
  },
  {
    type: 'milestone',
    year: '2025b',
    description: 'Planning Our Epic First Foreign Trip (Still loading…)',
    image: '2025b',
    icon: '✈️'
  },
  {
    type: 'trivia',
    year: 'Trivia 1',
    description: 'What was Vidhya doing when the world was born for her in 1994?\nA) Crying\nB) Plotting world domination\nC) Practicing Veena in the womb\nD) All of the above',
    image: 'trivia1',
    icon: '❓'
  },
  {
    type: 'trivia',
    year: 'Trivia 2',
    description: 'What was her favorite vacation activity at your house?\nA) Sleeping\nB) Watching reels\nC) Ignoring you\nD) All, in that order',
    image: 'trivia2',
    icon: '❓'
  },
  {
    type: 'trivia',
    year: 'Trivia 3',
    description: 'What\'s her secret cure when she\'s upset?\nA) A hug from Vira\nB) Mushroom based anything\nC) Music + memes\nD) Shopping cart therapy',
    image: 'trivia3',
    icon: '❓'
  },
  {
    type: 'trivia',
    year: 'Trivia 4',
    description: 'Which magical phrase makes her instantly suspicious of you?\nA) "Nothing\'s wrong!"\nB) "You look good today!"\nC) "I love you."\nD) "Let\'s talk about this later."',
    image: 'trivia4',
    icon: '❓'
  },
  {
    type: 'trivia',
    year: 'Trivia 5',
    description: 'What did she not expect after marrying you?\nA) Romance\nB) Endless teasing\nC) Free tech support\nD) Free life advices',
    image: 'trivia5',
    icon: '❓'
  },
  {
    type: 'trivia',
    year: 'Trivia 6',
    description: 'What\'s her "don\'t disturb me" signal?\nA) The annoyed look\nB) Headphone on. World off.\nC) Sleep mode\nD) Working and mumbling',
    image: 'trivia6',
    icon: '❓'
  },
  {
    type: 'challenge',
    year: 'Challenge 1',
    description: 'Recite a Tamil movie love dialogue while staring into other\'s eyes... with full dramatic background score (mouth sound effects allowed).',
    image: 'challenge1',
    icon: '🎭'
  },
  {
    type: 'challenge',
    year: 'Challenge 2',
    description: 'Pretend to be a movie villain confessing your love.',
    image: 'challenge2',
    icon: '🎭'
  },
  {
    type: 'challenge',
    year: 'Challenge 3',
    description: 'Describe other\'s beauty using only vegetable metaphors',
    image: 'challenge3',
    icon: '🎭'
  },
  {
    type: 'challenge',
    year: 'Challenge 4',
    description: 'Mimic the other\'s "I\'m ignoring you" face for 5 seconds. They rate your accuracy.',
    image: 'challenge4',
    icon: '🎭'
  },
  {
    type: 'challenge',
    year: 'Challenge 5',
    description: 'Recreate a viral reel the other suggests.',
    image: 'challenge5',
    icon: '🎭'
  },
  {
    type: 'romance',
    year: 'Romance Zone',
    description: 'Do a surprise romantic task given by the other.',
    image: 'romance',
    icon: '❤️'
  },
  {
    type: 'danger',
    year: 'Danger Zone',
    description: 'Truth or Dare time! Perform as instructed.',
    image: 'danger',
    icon: '⚠️'
  },
  { type: 'finish', year: '', description: 'Finish: Queendom', icon: '👑' },
];

// Modal Component
function Modal({ data, onClose }) {
  if (!data) return null;

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
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: '16px'
      }} 
      onClick={onClose}
    >
      <div 
        style={{
          background: 'linear-gradient(135deg, #374151, #111827)',
          border: '2px solid #9CA3AF',
          borderRadius: '16px',
          padding: window.innerWidth < 768 ? '16px' : '24px',
          maxWidth: '512px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          color: 'white',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span style={{ fontSize: window.innerWidth < 768 ? '20px' : '24px' }}>{iconMap[data.type] || data.icon}</span>
          <h2 style={{ 
            fontSize: window.innerWidth < 768 ? '18px' : '20px', 
            fontWeight: 'bold', 
            textTransform: 'capitalize', 
            margin: 0 
          }}>{data.type}</h2>
        </div>
        
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
          <img 
            src={getImageSrc()}
            alt={`${data.year} - ${data.type}`}
            style={{
              width: window.innerWidth < 768 ? '150px' : '192px',
              height: window.innerWidth < 768 ? '112px' : '144px',
              objectFit: 'cover',
              borderRadius: '8px',
              border: '2px solid #4B5563'
            }}
            onError={(e) => {
              e.target.src = placeholderImage;
            }}
          />
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ 
            fontSize: window.innerWidth < 768 ? '16px' : '18px', 
            fontWeight: '600', 
            color: '#D1D5DB', 
            marginBottom: '8px', 
            margin: 0 
          }}>{data.year}</h3>
          <p style={{ 
            color: '#E5E7EB', 
            lineHeight: '1.625', 
            whiteSpace: 'pre-line', 
            margin: 0,
            fontSize: window.innerWidth < 768 ? '14px' : '16px'
          }}>{data.description}</p>
        </div>
        <button 
          style={{
            width: '100%',
            backgroundColor: '#4B5563',
            color: 'white',
            fontWeight: 'bold',
            padding: '12px 16px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            fontSize: window.innerWidth < 768 ? '14px' : '16px'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#6B7280'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4B5563'}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

// Token Component
function Token({ indices }) {
  if (!indices || indices.length === 0) return null;

  const isMobile = window.innerWidth < 768;

  return (
    <div style={{
      position: 'absolute',
      bottom: isMobile ? '2px' : '4px',
      right: isMobile ? '2px' : '4px',
      display: 'flex',
      gap: isMobile ? '2px' : '4px'
    }}>
      {indices.map((playerIndex) => (
        <div
          key={playerIndex}
          style={{
            width: isMobile ? '16px' : '24px',
            height: isMobile ? '16px' : '24px',
            borderRadius: '50%',
            border: '2px solid',
            borderColor: playerIndex === 0 ? '#93C5FD' : '#FCA5A5',
            backgroundColor: playerIndex === 0 ? '#3B82F6' : '#EF4444',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isMobile ? '8px' : '12px',
            fontWeight: 'bold'
          }}
        >
          {playerIndex === 0 ? '👑' : '👸'}
        </div>
      ))}
    </div>
  );
}

// Dice Component
function Dice({ onRoll, rolled, currentRoll }) {
  const [isRolling, setIsRolling] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    if (rolled || isRolling) return;
    
    setIsRolling(true);
    setTimeout(() => {
      setIsRolling(false);
      onRoll();
    }, 600);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: isMobile ? '16px' : '24px',
        right: isMobile ? '16px' : '24px',
        width: isMobile ? '60px' : '80px',
        height: isMobile ? '60px' : '80px',
        background: 'linear-gradient(135deg, #374151, #1F2937)',
        border: '2px solid #9CA3AF',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: rolled ? 'not-allowed' : 'pointer',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s',
        opacity: rolled ? 0.5 : 1,
        animation: isRolling ? 'bounce 0.6s infinite' : 'none',
        zIndex: 40
      }}
      onClick={handleClick}
      onMouseOver={(e) => {
        if (!rolled) e.target.style.transform = 'scale(1.1)';
      }}
      onMouseOut={(e) => {
        e.target.style.transform = 'scale(1)';
      }}
    >
      <div style={{ fontSize: isMobile ? '18px' : '24px', fontWeight: 'bold', color: 'white' }}>
        {currentRoll || '🎲'}
      </div>
    </div>
  );
}

// Main Board Component
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

    const boardWidth = isMobile ? 'min(95vw, 400px)' : 'min(90vw, 720px)';
    const gapSize = isMobile ? '2px' : '4px';

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(9, 1fr)',
        gridTemplateRows: 'repeat(9, 1fr)',
        gap: gapSize,
        width: boardWidth,
        height: boardWidth,
        aspectRatio: '1'
      }}>
        {boardLayout.map((row, rowIndex) =>
          row.map((tile, colIndex) => {
            // Center tile
            if (rowIndex === 4 && colIndex === 4) {
              return (
                <div 
                  key="center" 
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    border: '2px dashed #9CA3AF',
                    borderRadius: isMobile ? '4px' : '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: isMobile ? '4px' : '8px',
                    color: '#D1D5DB',
                    fontWeight: 'bold',
                    fontSize: isMobile ? '8px' : '14px',
                    lineHeight: '1.2'
                  }}
                >
                  Vidhya turns<br />30+1
                </div>
              );
            }

            // Empty tiles
            if (!tile) {
              return <div key={`${rowIndex}-${colIndex}`} style={{ backgroundColor: 'transparent' }} />;
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

            const getBorderColor = () => {
              switch (tile.type) {
                case 'danger': return '#EF4444';
                case 'romance': return '#EC4899';
                case 'challenge': return '#F97316';
                case 'trivia': return '#10B981';
                default: return '#9CA3AF';
              }
            };

            return (
              <div
                key={tile.index}
                style={{
                  position: 'relative',
                  border: '2px solid ' + getBorderColor(),
                  borderRadius: isMobile ? '4px' : '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${getImageSrc()})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                onClick={() => setModalData(tile)}
                onTouchStart={() => setModalData(tile)}
                onMouseOver={(e) => {
                  if (!isMobile) {
                    e.target.style.borderColor = 'white';
                    e.target.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isMobile) {
                    e.target.style.borderColor = getBorderColor();
                    e.target.style.transform = 'scale(1)';
                  }
                }}
              >
                {/* Dark overlay for better text readability */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }} />
                
                {/* Tile content */}
                <div style={{
                  position: 'relative',
                  zIndex: 10,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: isMobile ? '2px' : '4px',
                  color: 'white'
                }}>
                  {tile.icon && (
                    <div style={{
                      fontSize: isMobile ? '10px' : '16px',
                      alignSelf: 'flex-end',
                      animation: 'pulse 2s infinite',
                      filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
                    }}>
                      {tile.icon}
                    </div>
                  )}
                  <div style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: isMobile ? '6px' : '10px',
                    filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: isMobile ? '2px' : '4px',
                    padding: isMobile ? '1px' : '2px',
                    minHeight: isMobile ? '8px' : '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: '1.1'
                  }}>
                    {tile.year}
                  </div>
                </div>

                {/* Player tokens */}
                {isPlayerHere && <Token indices={tokenIndices} />}
                
                {/* Error handling for missing images */}
                <img 
                  src={getImageSrc()}
                  alt=""
                  style={{ display: 'none' }}
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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000, #1F2937)',
      color: 'white',
      padding: isMobile ? '8px' : '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: isMobile ? '100px' : '120px'
    }}>
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
            40%, 43% { transform: translateY(-30px); }
            70% { transform: translateY(-15px); }
            90% { transform: translateY(-4px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          
          @media (max-width: 767px) {
            body { 
              overflow-x: hidden; 
              -webkit-text-size-adjust: 100%;
            }
            * { 
              -webkit-tap-highlight-color: transparent; 
            }
          }
        `}
      </style>
      
      <h1 style={{
        fontSize: isMobile ? '16px' : '24px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: isMobile ? '16px' : '24px',
        color: '#D1D5DB',
        padding: isMobile ? '0 8px' : '0',
        lineHeight: '1.2'
      }}>
        Vidhya turns 30+1 - The Board Game - By Vira
      </h1>
      
      <div style={{
        background: 'linear-gradient(135deg, #000000, #374151)',
        padding: isMobile ? '12px' : '24px',
        borderRadius: isMobile ? '12px' : '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid #4B5563',
        marginBottom: isMobile ? '16px' : '24px',
        width: 'fit-content'
      }}>
        {renderBoardTiles()}
      </div>

      {/* Game status */}
      <div style={{
        textAlign: 'center',
        padding: isMobile ? '0 16px' : '0'
      }}>
        <p style={{ 
          fontSize: isMobile ? '14px' : '18px', 
          fontWeight: '600', 
          margin: '8px 0' 
        }}>
          Current Player: {currentPlayer === 0 ? '👑 Player 1' : '👸 Player 2'}
        </p>
        {currentRoll && (
          <p style={{ 
            fontSize: isMobile ? '12px' : '16px', 
            color: '#D1D5DB', 
            margin: '4px 0' 
          }}>
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