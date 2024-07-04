// src/components/VirtualKeyboard.js
import React from 'react';
import './VirtualKeyboard.css';

const VirtualKeyboard = ({ onLetterClick, disabledLetters }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="virtual-keyboard">
      {alphabet.map((letter) => (
        <button
          key={letter}
          className="key-button"
          onClick={() => onLetterClick(letter)}
          disabled={disabledLetters.includes(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default VirtualKeyboard;
