import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import wss from './websocket.js';
import { errorHandler } from './middleware/errorHandler.js';
import { PORT } from './config/config.js';
import cors from 'cors';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Handle WebSocket upgrade requests
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});
app.use(cors());
app.use(express.json());


// Register routes
app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
