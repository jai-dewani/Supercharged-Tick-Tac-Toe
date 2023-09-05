import React, { useState } from "react";

function Square({ value, onSquareClick, isActive }) {
    return (
        <button
            className={isActive ? "activeSquare" : "square"}
            onClick={isActive ? onSquareClick: null}
        >
            {value}
        </button>
    )
}

export default function Board({ squares, onPlay, boardIndex, isCurrentBoard, winner }) {

    function handleClick(index) {
        if (squares[index]) {
            return;
        }
        onPlay(boardIndex, index);
    }

    return (
        <div className="board">
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} isActive={isCurrentBoard} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} isActive={isCurrentBoard} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} isActive={isCurrentBoard} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} isActive={isCurrentBoard} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} isActive={isCurrentBoard} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} isActive={isCurrentBoard} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} isActive={isCurrentBoard} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} isActive={isCurrentBoard} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} isActive={isCurrentBoard} />
            </div>
        </div>
    )
}