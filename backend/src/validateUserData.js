import { redisClient } from './clients/redisClient.js'
import { GenerateRandomGameID } from './util.js';

export async function createGameId(){
    var gameId = await GenerateRandomGameID()
    return gameId;
}

export async function validateAndAddUsername(gameId, username) {
    // Check if the username doesn't exists
    var key = "users-" + gameId
    var validUsername = await redisClient.sIsMember(key, username);
    var countOfPlayers = await redisClient.sCard(key);
    if(validUsername){
        console.log(`User:${username} exists in the game:${key}`);
        return true;
    }
    else if (!validUsername && countOfPlayers == 1) {
        console.log(`Adding username:${username} to game:${key}`)
        await redisClient.sAdd(key, username)
        return true;
    }    
    console.log(`Validation failed for username:${username}, validity:${validUsername} game:${key}. Players in game:${countOfPlayers}.`)
    return false
}

export async function validateData(gameId, username) {
    var key = "users-" + gameId
    var validUsername = await redisClient.sIsMember(key, username);
    var validGameId = await redisClient.get(gameId) != null;
    if(validGameId && validUsername){
        console.log(`Valid data for gameId:${gameId} username:${username}`)
        return true 
    }
    return false
}