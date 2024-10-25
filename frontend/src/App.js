import React, { useState } from "react";
import { socket } from "./service/socket.js";
import Game from "./components/GameComponent.js";
import Introduction from "./components/Introduction.js";

export default function App() {
    const [userId, setUserId] = useState("");
    const [gameId, setGameId] = useState("");
    const [showIntroPage, setShowIntropage] = useState(true);


    socket.on('startGame', async (gameId) => {
        console.log(`startGame event ${gameId}`);
        setShowIntropage(false);
        await setGameId(gameId);
    })

    function startGame(userId, gameId) {
        console.log(userId, gameId)
        setUserId(userId)
        if (gameId === undefined) {
            console.log("Createing a new game")
            socket.emit('createGame', userId);
        } else {
            setGameId(gameId);
            console.log("Join a existing game")
            socket.emit('joinGame', userId, gameId)
        }
    }

    return (
        <div>
            {showIntroPage
                ? <Introduction startGame={startGame} />
                :
                <div>
                    <Game userId={userId} gameId={gameId}/>
                </div>
            }
        </div>
    )
}

