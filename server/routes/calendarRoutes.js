const express = require('express');
const router = express.Router();
const { getDeadlines } = require('../controllers/calendarController');
// const { protect } = require('../middleware/authMiddleware'); // uncomment if auth is required

// @route   GET /api/calendar/deadlines
// @desc    Get tasks sorted chronologically by due date
router.get('/deadlines', /* protect, */ getDeadlines);

module.exports = router;
