const socket = require('socket.io-client')('http://localhost:3200');
// Replace 'http://localhost:3000' with the actual URL of your socket server

// Subscribe to the room
socket.emit('joinGame', 'qw', 'ABGEVA');

// Listen for events in the room
socket.on('connect', () => {
  console.log('Connected to socket server');
});

socket.on('gameState', (newGameState) => {
  console.log(`App.js New Game state - ${JSON.stringify(newGameState)}`)
});

socket.on('disconnect', () => {
  console.log('Disconnected from socket server');
});
