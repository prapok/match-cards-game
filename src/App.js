import React from 'react';
import { setUpGameGrid, addEventListeners, getGameConfig, stopTimer } from './components';
import './style.scss';

export default function App() {

    const difficultyConfig = {
      easy: 3,
      medium: 6,
      hard: 9,
    };

  const resetBoard = () => {
    stopTimer();
    document.getElementById("timer").innerHTML = '00:00';
    setUpGame();
  }
  
  const changeDifficulty = (e) => {
    const difficulty = e.target.getAttribute('data-id');
    const cards = difficultyConfig[difficulty];
    resetBoard();
    setUpGame(cards);
  };
  
  const setUpDifficulty = () => {
    const difficultyButtons = document.getElementsByClassName('difficultyButton');
    for(let i = 0; i< difficultyButtons.length; i++) {
        difficultyButtons[i].addEventListener('click', changeDifficulty);
    }
  }

  /* fetch gameconfig and listeners */
  function setUpGame(n = 3) {
    getGameConfig(n).then((response) => {
        if(!response) {
            alert('No response from server');
            return;
        }
        document.getElementById('resetBoard').addEventListener('click', resetBoard);
        setUpGameGrid(5, response);
        addEventListeners(response);
        setUpDifficulty();    
    }, () => alert('Cant connect to config server \n Please start the server in a new terminal'));
  }
  //  game setup called
  setUpGame();

  return (
    <div className="App wrapper">
      <center><h1>Match Cards</h1></center>
      <div className="optHeader">
       
        <div className="timer" id="timer">00:00</div>
        <div className="difficulty">
            <button id="resetBoard" className="resetButton btn">Restart</button>
            <button className="difficultyButton btn" data-id="easy"> Easy </button>
            <button className="difficultyButton btn" data-id="medium"> Medium </button>
            <button className="difficultyButton btn" data-id="hard"> Hard </button>
        </div>
      </div>
      <div className="container">
        <div className="content" id="content"></div>
      </div>
    </div>
  );

}