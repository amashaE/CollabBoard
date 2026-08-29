const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
  getRecentTasks
} = require("../controllers/dashboardController");


// Dashboard statistics
router.get("/", getDashboardStats);


// Recent tasks
router.get("/recent-tasks", getRecentTasks);


module.exports = router;