import React from "react";

export default function ListGameRules() {
    return (
        <div className="game-rules">
            <h3>How to Play?</h3>
            <ul className="game-rules-section">
                <li>Just like in regular tic-tac-toe, the two players (X and O) take turns, starting with X.</li>
                <li>The game starts with X playing wherever they want in any of the 81 empty spots.</li>
                <li>Next the opponent plays, however they are forced to play in the small board indicated by the relative location of the previous move. <br /></li>
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
    )
}