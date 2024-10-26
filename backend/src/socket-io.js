import { Server } from 'socket.io';
import { CreateGame, JoinGame, SetGameState, GetGameState, MakeMove } from './gameState.js'
import { validateAndAddUsername, createGameId } from './validateUserData.js'
import './util.js'

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  
let io;
export const socketConnection = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*"
        }
    });
    io.on('connection', (socket) => {
        socket.on('createGame', async (username) => {

            console.log(`createGame | createGame - ${username}`);

            socket.data.username = username;
            var gameId = await createGameId();
            var state = await CreateGame(gameId, username);
            socket.join(gameId);
            socket.emit('startGame', gameId);
            socket.emit('gameState', state);
        })

        socket.on('joinGame', async (username, gameId) => {

            console.log(`joinGame | joinGame called in socket. username:${username} gameId:${gameId}`);

            var gameState = await JoinGame(gameId, username)
            if(gameState){
                // User has joined the game
                socket.join(gameId);
                socket.emit('startGame', gameId)
                socket.emit('gameState', gameState);
                await updateGameState(socket, gameId);
            }else{
                // state is false, notify the user couldn't join the game
                socket.emit('error', `Couldn't join the game`)
            }
        })

        socket.on('gameState', async(gameId, gameState) => {

            console.log(`gameState | Set Game State called ${JSON.stringify(gameState)}`);

            await SetGameState(gameId, gameState);
            await updateGameState(socket, gameId);
        })

        socket.on('getGameState', async(gameId) => {
            console.log(`getGameState | Get game state called with gameId - ${gameId}`)            
            await updateGameState(socket, gameId);
        })
    });
};

async function updateGameState(socket, gameId){
    console.log(`updateGameState | Sending game state - ${gameId}`)
    var gameState = await GetGameState(gameId);
    socket.emit('gameState', gameState);
    socket.to(gameId).emit('gameState', gameState);
}

export const sendMessage = (roomId, key, message) => io.to(roomId).emit(key, message);

export const getRooms = () => io.sockets.adapter.rooms;

export const joinRoom = (roomName) => io.join(roomName);
