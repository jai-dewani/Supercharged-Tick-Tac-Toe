import { redisClient } from './clients/redisClient.js'
import './util.js';

var gameState = {
    users: [
        {
            name: "Jaid",
            move: "X"
        },
        {
            name: "Power",
            move: "O"
        }
    ],
    state: "000000000",
    currentMove: 0 / 1,
    currentBox: [0] /*(0-9)*/
}

/* 
move: [x,y]  
index = x + y*9
*/
export async function MakeMove(gameId, move) {
    var state = await GetGameState(gameId);
    var currentMoveIndex = state["currentMove"]
    var moveType = state["users"][currentMoveIndex]["move"]
    var index = move[0] + move[1] * 9;
    state["state"].replaceAt(index, moveType) // Adjust the state with the current move
    state["currentMove"] = currentMoveIndex ^ 1; // Flip the next currentMove
    await SetGameState(gameId, state);
    return state;
}

export async function JoinGame(gameId, username) {
    var state = await GetGameState(gameId);
    if (state) {
        if (CheckIfUserExistsInGame(state, username)) {
            return state;
        } else if (state["users"].length == 1) {
            state["users"][1] = { name: username, move: "O" }
            await SetGameState(gameId, state);
            return state;
        }
    } else {
        return false;
    }
}

export async function CreateGame(gameId, username) {
    var state = CreateNewGameState(username);
    await SetGameState(gameId, state);
    return state;
}

export async function SetGameState(gameId, state) {
    var stringifiedState = JSON.stringify(state);
    await redisClient.set(gameId, stringifiedState);
}

export async function GetGameState(gameId) {
    var rawGameState = await redisClient.get(gameId);
    console.log(`GetGameState `, gameId, rawGameState);
    return JSON.parse(rawGameState);
}

function CheckIfUserExistsInGame(state, username) {
    if (state["users"].filter(x => x["name"] == username).length === 1)
        return true;
    return false;
}

function CreateNewGameState(username) {
    return {
        users: [
            {
                name: username,
                move: "X"
            }
        ],
        state: "0".repeat(81),
        currentMove: 0,
        currentBox: [4]
    }
}
