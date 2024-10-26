import Board from "./BoardComponent.jsx";
import React, { useRef, useEffect, useState } from "react";
import { calculateWinnder, ReplaceAt } from "../service/util.js";
import { socket } from "../service/socket.js";



export default function Game({ userId, gameId }) {
    const [users, setUsers] = useState();
    const [currentMoveIndex, setCurrentMoveIndex] = useState();
    const [gameState, setGameState] = useState("0".repeat(81));
    const [currentBoard, setCurrentBoard] = useState([4]);
    const winners = useRef(Array(9).fill(null));

    const [isConnected] = useState(socket.isConnected);

    const [gameWinner, setGameWinner] = useState(null);
    const [statusMessage, setStatusMessage] = useState("");

    async function updateGameState(state) {
        console.log(`App.js New Game state - ${JSON.stringify(state)}`)
        setUsers(state.users);
        setGameState(state.state);
        setCurrentBoard(state.currentBox);
        setCurrentMoveIndex(state.currentMove);
    }

    useEffect(() => {
        socket.on('gameState', updateGameState)
        console.log(`Initial value of isConnected - ${isConnected}`)
        console.log(`value of isConnected - ${isConnected}`)

        socket.emit('getGameState', gameId)

        return () => {
            socket.off('gameState', updateGameState);
        };
    }, [])

    useEffect(() => {
        UpdateStatusMessage()
    }, [currentMoveIndex])


    useEffect(() => {
        checkAndUpdateBoardWinnerStatus()
    }, [gameState])


    function UpdateStatusMessage() {
        console.log('UpdateStatusMessage', gameWinner, currentPlayerIndex(), currentPlayerMove());
        
        if (gameWinner) {
            setStatusMessage("Game ended, " + gameWinner + " won the game")
        } else if (!currentPlayerMove()) {
            setStatusMessage("Opponents move")
        } else {
            setStatusMessage("Your Move")
        }
    }

    function currentPlayerIndex() {
        console.log('currentPlayerIndex', users)
        if(users){
            return users[0].name === userId ? 0 : 1;
        }
    }

    function currentPlayerMove() {
        return currentMoveIndex === currentPlayerIndex()
    }

    function currentPlayerSign() {
        var user = users.filter(x => x.name === userId);
        console.log(users, user, userId);

        return user[0].move;
    }

    function checkAndUpdateBoardWinnerStatus() {
        let newWinners = winners.current.splice();
        for (let i = 0; i < 9; i++) {
            newWinners[i] = calculateWinnder(gameState.sector(i));
        }
        winners.current = newWinners;
        var winner = calculateWinnder(winners.current)
        if (winner) {
            setGameWinner(winner)
        }
    }

    function updateCurrentBoard(nextMoveIndex) {
        if (winners.current[nextMoveIndex]) {
            let currentPlayableBoardIndexes = winners.current.map((value, index) => value == null ? index : null);
            let nextCurrentBoards = currentPlayableBoardIndexes.filter(x => x != null);
            console.log('currentPlayableBoardIndexes', currentPlayableBoardIndexes);
            console.log("nextCurrentBoards", nextCurrentBoards)
            setCurrentBoard(nextCurrentBoards);
            return nextCurrentBoards;
        } else {
            setCurrentBoard([nextMoveIndex]);
            return [nextMoveIndex]
        }
    }

    function handleMove(boardIndex, moveIndex) {
        console.log(`handleMove ${boardIndex}, ${moveIndex}, ${JSON.stringify(currentMoveIndex)}, ${JSON.stringify(users)}, ${userId}`);

        if (currentPlayerMove()) {
            var clickIndex = boardIndex * 9 + moveIndex;
            var moveSign = currentPlayerSign();
            console.log(`handleMove ${boardIndex} ${moveIndex} ${moveSign}`);
            var newBoard = ReplaceAt(gameState, clickIndex, moveSign)
            var newMoveIndex = currentMoveIndex ^ 1;

            setGameState(newBoard);

            var currentBoard = updateCurrentBoard(moveIndex);
            setCurrentMoveIndex(newMoveIndex);
            SendGameState(newBoard, newMoveIndex, currentBoard)
        }
    }

    function SendGameState(newBoard, newMoveIndex, moveIndex) {
        var state = {
            users: users,
            state: newBoard,
            currentMove: newMoveIndex,
            currentBox: moveIndex,
        }
        console.log(`SendGameState ${JSON.stringify(state)}`)
        socket.emit('gameState', gameId, state);
    }



    return (
        <div>
            <div className={gameWinner ? "winner" : "status"}>{statusMessage}</div>
            <div className="game">
                <div className="status">UserID: {userId}</div>
                <div className="status">GameID: {gameId}</div>
                <div className="game-board">
                    <div className="game-row">
                        <Board
                            squares={gameState.sector(0)} onPlay={handleMove}
                            boardIndex={0} isCurrentBoardActve={currentBoard.includes(0)} winner={winners.current[0]} />
                        <Board
                            squares={gameState.sector(1)} onPlay={handleMove}
                            boardIndex={1} isCurrentBoardActve={currentBoard.includes(1)} winner={winners.current[1]} />
                        <Board
                            squares={gameState.sector(2)} onPlay={handleMove}
                            boardIndex={2} isCurrentBoardActve={currentBoard.includes(2)} winner={winners.current[2]} />
                    </div>
                    <div className="game-row">
                        <Board
                            squares={gameState.sector(3)} onPlay={handleMove}
                            boardIndex={3} isCurrentBoardActve={currentBoard.includes(3)} winner={winners.current[3]} />
                        <Board
                            squares={gameState.sector(4)} onPlay={handleMove}
                            boardIndex={4} isCurrentBoardActve={currentBoard.includes(4)} winner={winners.current[4]} />
                        <Board
                            squares={gameState.sector(5)} onPlay={handleMove}
                            boardIndex={5} isCurrentBoardActve={currentBoard.includes(5)} winner={winners.current[5]} />
                    </div>
                    <div className="game-row">
                        <Board
                            squares={gameState.sector(6)} onPlay={handleMove}
                            boardIndex={6} isCurrentBoardActve={currentBoard.includes(6)} winner={winners.current[6]} />
                        <Board
                            squares={gameState.sector(7)} onPlay={handleMove}
                            boardIndex={7} isCurrentBoardActve={currentBoard.includes(7)} winner={winners.current[7]} />
                        <Board
                            squares={gameState.sector(8)} onPlay={handleMove}
                            boardIndex={8} isCurrentBoardActve={currentBoard.includes(8)} winner={winners.current[8]} />
                    </div>
                </div>
                <div className="game-info">
                    <ol>{/*TODO*/}</ol>
                </div>
            </div>
        </div>

    )
}