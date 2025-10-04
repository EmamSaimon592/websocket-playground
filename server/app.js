// server/app.js
import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Vite dev server
    methods: ['GET', 'POST'],
  },
});

const port = 3000;

// Middleware
app.use(cors());

// Test route
app.get('/', (req, res) => {
  res.send('Server is up!');
});

// WebSocket connection
io.on('connection', socket => {
  console.log('User connected:', socket.id);

  socket.on('message', data => {
    console.log(`Message from ${socket.id}:`, data);

    // Broadcast message to all clients
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
