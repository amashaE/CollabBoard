const express = require('express');
const cors = require('cors');
require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Root Health Check Route
app.get('/', (req, res) => {
  res.send('SyncBoard REST API is running...');
});

// Start Server
app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
// Fix: Use the PORT variable in the console log
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
    });