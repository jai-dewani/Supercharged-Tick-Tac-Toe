import React from "react";

function Square({ value, onSquareClick, isActive }) {
    return (
        <button
            className={isActive ? "activeSquare" : "square"}
            onClick={isActive ? onSquareClick : null}
        >
            {value}
        </button>
    )
}

export default function Board({ squares, onPlay, boardIndex, isCurrentBoardActve, winner }) {

    function handleClick(index) {
        if (squares[index]) {
            return;
        }
        onPlay(boardIndex, index);
    }

    return (
        <div className="board">
            <div className="inner-board">

                <div className="board-row">
                    <Square value={squares[0]} onSquareClick={() => handleClick(0)} isActive={isCurrentBoardActve} />
                    <Square value={squares[1]} onSquareClick={() => handleClick(1)} isActive={isCurrentBoardActve} />
                    <Square value={squares[2]} onSquareClick={() => handleClick(2)} isActive={isCurrentBoardActve} />
                </div>
                <div className="board-row">
                    <Square value={squares[3]} onSquareClick={() => handleClick(3)} isActive={isCurrentBoardActve} />
                    <Square value={squares[4]} onSquareClick={() => handleClick(4)} isActive={isCurrentBoardActve} />
                    <Square value={squares[5]} onSquareClick={() => handleClick(5)} isActive={isCurrentBoardActve} />
                </div>
                <div className="board-row">
                    <Square value={squares[6]} onSquareClick={() => handleClick(6)} isActive={isCurrentBoardActve} />
                    <Square value={squares[7]} onSquareClick={() => handleClick(7)} isActive={isCurrentBoardActve} />
                    <Square value={squares[8]} onSquareClick={() => handleClick(8)} isActive={isCurrentBoardActve} />
                </div>
                <div className="result">
                    {winner ? winner : ""}
                </div>
            </div>
        </div>
    )
}