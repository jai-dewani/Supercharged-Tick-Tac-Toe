import React, { useRef, useState } from "react";
import Board from "./Board.js";
import calculateWinnder from "./util.js";

export default function Game() {
    const [isXNext, setIsXNext] = useState(true);
    const [gameState, setGameState] = useState(Array.from({ length: 9 }, () => new Array(9).fill(null)));
    const winners = useRef(Array(9).fill(null));
    //Use [] to store all boards which can be active at once, 
    //and only send isActive check down the components
    //Initialize currentBoard
    const [currentBoard, setCurrentBoard] = useState([4]);

    // useEffect(() => {
    //     console.log('useEffect ran. count is: ', count);
    //   }, [gameState]);

    const winner = calculateWinnder(winners.current);
    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next player: ${(isXNext ? "X" : "O")}`;
    }

    status += ` Current Board: ${currentBoard}`;

    function updateCurrentBoard(nextMoveIndex) {
        if (winners.current[nextMoveIndex]) {
            let currentPlayableBoardIndexes = winners.current.map((value, index) => value == null ? index : null);
            let nextCurrentBoards = currentPlayableBoardIndexes.filter(x => x!=null);
            console.log('currentPlayableBoardIndexes', currentPlayableBoardIndexes);
            console.log("nextCurrentBoards", nextCurrentBoards)
            setCurrentBoard(nextCurrentBoards);
        } else {
            setCurrentBoard([nextMoveIndex]);
        }
    }



    function handlePlay(nextMoveBoardIndex, nextMoveIndex) {
        if (winner) {
            return;
        }
        console.log("currentBoard", currentBoard);
        console.log("nextMoveIndex", nextMoveIndex);
        // console.log("boards", boards);

        let newBoards = gameState.slice();
        let newNextMoveBoard = newBoards[nextMoveBoardIndex].slice();
        newNextMoveBoard[nextMoveIndex] = isXNext ? "X" : "O";
        newBoards[nextMoveBoardIndex] = newNextMoveBoard;

        setGameState(newBoards);
        setIsXNext(!isXNext);
        
        checkForBoardWin(newNextMoveBoard, nextMoveBoardIndex);
        updateCurrentBoard(nextMoveIndex);
    }

    function checkForBoardWin(boardState, boardIndex) {
        // let boardState = gameState[boardIndex];
        // console.log(boardState);
        let boardWinner = calculateWinnder(boardState);
        if (boardWinner) {
            let newWinners = winners.current.slice();

            newWinners[boardIndex] = boardWinner;
            console.log("boardWinner", boardWinner, boardIndex);
            console.log("Winners: ", newWinners);

            winners.current = newWinners;
        }
    }

    return (
        <div className="game">
            <div className="status">{status}</div>
            <div className="game-board">
                <div className="game-row">
                    <Board
                        squares={gameState[0]} onPlay={handlePlay}
                        boardIndex={0} isCurrentBoard={currentBoard.includes(0)} winner={winner} />
                    <Board
                        squares={gameState[1]} onPlay={handlePlay}
                        boardIndex={1} isCurrentBoard={currentBoard.includes(1)} winner={winner} />
                    <Board
                        squares={gameState[2]} onPlay={handlePlay}
                        boardIndex={2} isCurrentBoard={currentBoard.includes(2)} winner={winner} />
                </div>
                <div className="game-row">
                    <Board
                        squares={gameState[3]} onPlay={handlePlay}
                        boardIndex={3} isCurrentBoard={currentBoard.includes(3)} winner={winner} />
                    <Board
                        squares={gameState[4]} onPlay={handlePlay}
                        boardIndex={4} isCurrentBoard={currentBoard.includes(4)} winner={winner} />
                    <Board
                        squares={gameState[5]} onPlay={handlePlay}
                        boardIndex={5} isCurrentBoard={currentBoard.includes(5)} winner={winner} />
                </div>
                <div className="game-row">
                    <Board
                        squares={gameState[6]} onPlay={handlePlay}
                        boardIndex={6} isCurrentBoard={currentBoard.includes(6)} winner={winner} />
                    <Board
                        squares={gameState[7]} onPlay={handlePlay}
                        boardIndex={7} isCurrentBoard={currentBoard.includes(7)} winner={winner} />
                    <Board
                        squares={gameState[8]} onPlay={handlePlay}
                        boardIndex={8} isCurrentBoard={currentBoard.includes(8)} winner={winner} />
                </div>
            </div>
            <div className="game-info">
                <ol>{/*TODO*/}</ol>
            </div>
        </div>
    )
}

