import express from 'express';
import { createServer } from 'node:http';
import ConfigureExpress from './expressConfig.js';
import { socketConnection } from './src/socket-io.js';
// import apiRouter from './api.js'


const app = express();
// const router = express.Router();
app.configure = ConfigureExpress;
app.configure();

// app.use(apiRouter)

const server = createServer(app);
socketConnection(server);

server.listen(3200, () => {
  console.log("Server started on localhost:3200");
});