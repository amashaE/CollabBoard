const dns = require('dns');
// Forces Node.js to use Google and Cloudflare DNS directly (bypasses ISP/Network blocks)
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const cors = require('cors');
const path = require('path');

// Ensure dotenv reads the .env file reliably
require('dotenv').config({ path: path.join(__dirname, '.env') });

const connectDB = require('./config/db');

const taskRoutes = require('./routes/taskRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const activityRoutes = require('./routes/activityRoutes');
const teamRoutes = require('./routes/teamRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/team', teamRoutes);

// Root Health Check Route
app.get('/', (req, res) => {
  res.send('SyncBoard REST API is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});