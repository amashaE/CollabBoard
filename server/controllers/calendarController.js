const Task = require('../models/Task');

// @desc    Get all tasks sorted chronologically by due date (for calendar view)
// @route   GET /api/calendar/deadlines
// @access  Private
const getDeadlines = async (req, res) => {
  try {
    const { status, from, to } = req.query;

    // Build dynamic filter
    const filter = { dueDate: { $ne: null } };

    if (status) {
      filter.status = status;
    }

    if (from || to) {
      filter.dueDate = { ...filter.dueDate };
      if (from) filter.dueDate.$gte = new Date(from);
      if (to) filter.dueDate.$lte = new Date(to);
    }

    const tasks = await Task.find(filter)
      .sort({ dueDate: 1 }) // chronological order, soonest first
      .select('title description dueDate status priority assignedTo')
      .populate('assignedTo', 'name email');

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error('Error fetching calendar deadlines:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching deadlines',
    });
  }
};

module.exports = {
  getDeadlines,
};
