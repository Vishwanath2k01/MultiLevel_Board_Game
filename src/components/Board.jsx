import React from "react";
import "../styles/Board.css";

const Board = ({ gridSize, litCell, handleCellClick }) => {
  const cells = [];
  for (let i = 0; i < gridSize * gridSize; i++) {
    cells.push(
      <div
        key={i}
        className={`cell ${litCell === i ? "lit" : ""}`}
        onClick={() => handleCellClick(i)}
      ></div>
    );
  }

  return <div className="board" data-size={gridSize}>{cells}</div>;
};

export default Board;
