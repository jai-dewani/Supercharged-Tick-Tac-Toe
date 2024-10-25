import React, { useState } from "react";

export default function CreateNewGameComponent({ startGame }) {
    const [userId, setUserId] = useState("");

    return (
        <div className="joinNewGame">
            <h3>Create a new game</h3>
            <div className="joinNewGame-userId">
                <div className="userIdText">
                    User Id - 
                </div>
                <div className="underIdInput">
                    <input type="text" value={userId} onChange={e => setUserId(e.target.value)} />
                </div>
            </div>
            <input className="userIdButton" type="button" value="Create" onClick={() => startGame(userId)} />
        </div>
    )
}
