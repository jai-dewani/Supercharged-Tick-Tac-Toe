import { createClient } from 'redis';

var hostname = "127.0.0.1"
var password = "" 
var port = "6379"


export const redisClient = createClient({
    // password: password, 
    socket: {
        host: hostname, 
        port: port,
        // tls: true
    }
})

redisClient.on('connect', () => console.log('Redis connecting'));
redisClient.on('ready', () => console.log('Redis ready'));
redisClient.on('error', err => console.log('Redis Client', err))
await redisClient.connect();
