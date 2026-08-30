const express = require('express');
const cors = require('cors');
require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const activityRoutes = require('./routes/activityRoutes');
const teamRoutes = require('./routes/teamRoutes'); 

const app = express();
const PORT = process.env.PORT || 5000;

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

// Start Server (Single listener)
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});