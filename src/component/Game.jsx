// src/components/Game.js
import React, { useEffect, useState } from 'react';
import VirtualKeyboard from './VirtualKeyboard';
import { useSelector, useDispatch } from 'react-redux';
import { getrandomWord } from '../redux/slices/randomword';
import './Game.css'; // Import the CSS file

const Game = () => {
  const [gameWon, setGameWon] = useState(false);
  const [attemptsHistory, setAttemptsHistory] = useState([]);
  const dispatch = useDispatch();
  const word = useSelector((state) => state.RandomWord.randomWord);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const newgame=()=>
    {
        dispatch(getrandomWord());
        setGameWon(false);
        setAttemptsHistory([]);
        setGuessedLetters([]);
        setAttempts(0);
    }
  useEffect(() => {
    dispatch(getrandomWord());
  }, [dispatch]);
  useEffect(()=>{
    if(word=='')
      {
        dispatch(getrandomWord());
      }
  },[word])
  useEffect(() => {
    if (word && word.length >= 7 && word.split('').every(letter => guessedLetters.includes(letter))) {
      setGameWon(true);
    }
  }, [guessedLetters, word]);

  const handleLetterClick = (letter) => {
    const newGuessedLetters = [...guessedLetters, letter];
    const newAttempts = attempts + 1;
    setGuessedLetters(newGuessedLetters);
    setAttempts(newAttempts);

    const currentWordState = word.split('').map((letter) =>
      newGuessedLetters.includes(letter) ? letter : '_'
    ).join('');

    const remainingLetters = word.split('').filter(letter => !newGuessedLetters.includes(letter)).length;
    setAttemptsHistory([...attemptsHistory, { attempt: newAttempts, remainingLetters, currentWordState, newGuessedLetters }]);
  };

  const handleTableClick = (attempt) => {
    const selectedAttempt = attemptsHistory.find(item => item.attempt === attempt);
    if (selectedAttempt) {
      setGuessedLetters(selectedAttempt.newGuessedLetters);
      setAttempts(selectedAttempt.attempt);
      setGameWon(false); // Reset game won state
    }
  };

  const displayWord = word ? word.split('').map((letter) => (
    guessedLetters.includes(letter) ? letter : '_'
  )).join(' ') : '';

  return (
    <div className="game-container">
      {word && word.length >= 7 ? (
        <>
          <h1>Guess the word</h1>
          <p className="word-display">{displayWord}</p>
          <VirtualKeyboard onLetterClick={handleLetterClick} disabledLetters={guessedLetters} />
          <p>Attempts: {attempts}</p>
          {gameWon && <p className="congrats-message">Congratulations! You have guessed the word in {attempts} attempts.</p>}
          
          <table className="attempts-table">
            <thead>
              <tr>
                <th>Attempt</th>
                <th>Remaining Letters</th>
              </tr>
            </thead>
            <tbody>
              {attemptsHistory.map(({ attempt, remainingLetters }, index) => (
                <tr key={index} onClick={() => handleTableClick(attempt)} style={{ cursor: 'pointer' }}>
                  <td>{attempt}</td>
                  <td>{remainingLetters}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={newgame}>New Game</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Game;
