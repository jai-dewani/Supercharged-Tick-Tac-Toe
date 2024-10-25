import { io } from 'socket.io-client';

const URL = 'http://localhost:3200';
// const URL = process.env.NODE_ENV === 'https://backend:3200' ? undefined : 'http://localhost:3200';

export const socket = io(URL);
