import React, { useState, useEffect } from "react";
import Board from "./Board";
import "../styles/Game.css";

const levelConfigs = [
  { levelName: "Level 1", gridSize: 3, cellLitDuration: 1000, levelDuration: 5000, levelPassingScore: 2 },
  { levelName: "Level 2", gridSize: 4, cellLitDuration: 700, levelDuration: 5000, levelPassingScore: 4 },
  { levelName: "Level 3", gridSize: 5, cellLitDuration: 500, levelDuration: 5000, levelPassingScore: 6 },
];

const Game = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [litCell, setLitCell] = useState(null);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(levelConfigs[0].levelDuration / 1000);

  const { gridSize, cellLitDuration, levelDuration, levelPassingScore, levelName } = levelConfigs[currentLevel];

  useEffect(() => {
    const timer = setInterval(() => {
      const randomCell = Math.floor(Math.random() * gridSize * gridSize);
      setLitCell(randomCell);
    }, cellLitDuration);

    return () => clearInterval(timer);
  }, [gridSize, cellLitDuration]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeRemaining <= 0) {
      if (score >= levelPassingScore) {
        if (currentLevel < levelConfigs.length - 1) {
          setCurrentLevel((prev) => prev + 1);
          setScore(0);
          setTimeRemaining(levelConfigs[currentLevel + 1].levelDuration / 1000);
        } else {
          alert(`Congratulations! Final Score: ${score}`);
          resetGame();
        }
      } else {
        alert("Game Over! You did not pass the level.");
        resetGame();
      }
    }
  }, [timeRemaining, score, currentLevel, levelPassingScore]);

  const handleCellClick = (index) => {
    if (index === litCell) {
      setScore((prev) => prev + 1);
    } else {
      setScore((prev) => Math.max(0, prev - 1));
    }
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setTimeRemaining(levelConfigs[0].levelDuration / 1000);
  };

  return (
    <div className="game">
      <h2>Memory Board</h2>
      <div className="game-info">
        <p>{levelName}</p>
        <p>Score: {score}</p>
        <p>Time: {timeRemaining}s</p>
      </div>
      <Board gridSize={gridSize} litCell={litCell} handleCellClick={handleCellClick} />
    </div>
  );
};

export default Game;
