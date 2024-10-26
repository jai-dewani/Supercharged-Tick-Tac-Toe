import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {    
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 4000  
    port: 4000, 
},
})