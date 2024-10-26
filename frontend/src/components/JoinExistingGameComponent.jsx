import React, { useState } from "react";

export default function JoinExistingGame({ startGame }) {
    const [userId, setUserId] = useState("");
    const [gameId, setGameId] = useState("");

    return (
        <div className="joinExistingGame" style={{ margin: "0 auto" }}>
            <h3>Join an existing game</h3>
            <div className="joinExistingGame-userId">
                <div style={{margin: "0 10px 0 0"}}>
                    User Id - 
                </div>
                <div>
                    <input type="text" value={userId} onChange={e => setUserId(e.target.value)} />
                </div>
            </div>
            <div className="joinExistingGame-gameId">
                <div style={{margin: "0 10px 0 0"}}>
                    Game Id - 
                </div>
                <input type="text" value={gameId} onChange={e => setGameId(e.target.value)} />
            </div>

            <input className="userIdButton" type="button" value="Join" onClick={() => startGame(userId, gameId)} />

        </div>
    )

}