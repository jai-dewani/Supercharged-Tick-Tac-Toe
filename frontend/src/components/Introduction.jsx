import React from "react";
import ListGameRules from "./ListGameRulesComponent.jsx";
import CreateNewGameComponent from "./CreateNewGameComponent.jsx";
import JoinExistingGame from "./JoinExistingGameComponent.jsx";

export default function Introduction({ startGame }) {
    return (
        <div>
            <div className="joinGame">
                <CreateNewGameComponent startGame={startGame} />
                <div className="or">Or</div>
                <JoinExistingGame startGame={startGame} />
            </div>
            <ListGameRules />
        </div>
    )
}