import React from "react";
import ListGameRules from "./ListGameRulesComponent";
import CreateNewGameComponent from "./CreateNewGameComponent";
import JoinExistingGame from "./JoinExistingGameComponent";

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