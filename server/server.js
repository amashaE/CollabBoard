const dns = require('dns');
// Forces Node.js to use Google and Cloudflare DNS directly (bypasses ISP/Network blocks)
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const cors = require('cors');
const path = require('path');

// Ensure dotenv reads the .env file reliably
require('dotenv').config({ path: path.join(__dirname, '.env') });

const connectDB = require('./config/db');

const dns = require('dns');

// Fix MongoDB Atlas SRV DNS resolution
dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectMongoDB = require('./config/mongodb');

const taskRoutes = require('./routes/taskRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const activityRoutes = require('./routes/activityRoutes');
const teamRoutes = require('./routes/teamRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

<<<<<<< HEAD
// Connect to MongoDB Atlas
connectDB();

=======
// ================================
>>>>>>> 02dbb0dd41c4385cf6f4c775bbc64db8d030eb4a
// Middleware
// ================================
app.use(cors());
app.use(express.json());

// ================================
// API Routes
// ================================
app.use('/api/tasks', taskRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/team', teamRoutes);

// ================================
// Root Health Check
// ================================
app.get('/', (req, res) => {
  res.status(200).send('SyncBoard REST API is running...');
});

<<<<<<< HEAD
// Start Server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
=======
// ================================
// Start Server
// ================================
const startServer = async () => {
  try {
    await connectMongoDB();

    app.listen(PORT, () => {
      console.log(`Backend server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
>>>>>>> 02dbb0dd41c4385cf6f4c775bbc64db8d030eb4a
