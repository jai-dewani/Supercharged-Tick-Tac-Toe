import { io } from 'socket.io-client';

const URL = 'https://backend-v1.agreeablemushroom-f8dccb51.westus2.azurecontainerapps.io';
// const URL = process.env.NODE_ENV === 'https://backend:3200' ? undefined : 'http://localhost:3200';

export const socket = io(URL);
