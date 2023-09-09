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

    // status += ` Current Board: ${currentBoard}`;

    function updateCurrentBoard(nextMoveIndex) {
        if (winners.current[nextMoveIndex]) {
            let currentPlayableBoardIndexes = winners.current.map((value, index) => value == null ? index : null);
            let nextCurrentBoards = currentPlayableBoardIndexes.filter(x => x != null);
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
            <div className={winner ? "winner" : "status"}>{status}</div>
            <div className="game-board">
                <div className="game-row">
                    <Board
                        squares={gameState[0]} onPlay={handlePlay}
                        boardIndex={0} isCurrentBoardActve={currentBoard.includes(0)} winner={winners.current[0]} />
                    <Board
                        squares={gameState[1]} onPlay={handlePlay}
                        boardIndex={1} isCurrentBoardActve={currentBoard.includes(1)} winner={winners.current[1]} />
                    <Board
                        squares={gameState[2]} onPlay={handlePlay}
                        boardIndex={2} isCurrentBoardActve={currentBoard.includes(2)} winner={winners.current[2]} />
                </div>
                <div className="game-row">
                    <Board
                        squares={gameState[3]} onPlay={handlePlay}
                        boardIndex={3} isCurrentBoardActve={currentBoard.includes(3)} winner={winners.current[3]} />
                    <Board
                        squares={gameState[4]} onPlay={handlePlay}
                        boardIndex={4} isCurrentBoardActve={currentBoard.includes(4)} winner={winners.current[4]} />
                    <Board
                        squares={gameState[5]} onPlay={handlePlay}
                        boardIndex={5} isCurrentBoardActve={currentBoard.includes(5)} winner={winners.current[5]} />
                </div>
                <div className="game-row">
                    <Board
                        squares={gameState[6]} onPlay={handlePlay}
                        boardIndex={6} isCurrentBoardActve={currentBoard.includes(6)} winner={winners.current[6]} />
                    <Board
                        squares={gameState[7]} onPlay={handlePlay}
                        boardIndex={7} isCurrentBoardActve={currentBoard.includes(7)} winner={winners.current[7]} />
                    <Board
                        squares={gameState[8]} onPlay={handlePlay}
                        boardIndex={8} isCurrentBoardActve={currentBoard.includes(8)} winner={winners.current[8]} />
                </div>
            </div>
            <div className="game-info">
                <ol>{/*TODO*/}</ol>
            </div>
            <div className="game-rules">
                <h3>How to Play?</h3>
                <ul className="game-rules-section">
                    <li>Just like in regular tic-tac-toe, the two players (X and O) take turns, starting with X.</li>
                    <li>The game starts with X playing wherever they want in any of the 81 empty spots.</li>
                    <li>Next the opponent plays, however they are forced to play in the small board indicated by the relative location of the previous move. <br/></li>
                    <li>For example, if X plays in the top right square of a small (3 × 3) board, then O has to play in the small board located at the top right of the larger board.</li>
                    <li>Playing any of the available spots decides in which small board the next player plays.</li>
                </ul>                    
                <ul className="game-rules-section">
                    <li>If a move is played so that it is to win a small board by the rules of normal tic-tac-toe, then the entire small board is marked as won by the player in the larger board.</li>
                    <li>Once a small board is won by a player or it is filled completely, no more moves may be played in that board.</li>
                    <li>If a player is sent to such a board, then that player may play in any other board.</li>
                </ul>

                <h3>How to Win?</h3>
                <ul className="game-rules-section">
                    <li>Game play ends when either a player wins the larger board or there are no legal moves remaining, in which case the game is a draw</li>
                </ul>
            </div>
        </div>
    )
}

