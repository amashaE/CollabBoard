const { tasks } = require('../data/mockStore');

// Allowed status values for the Kanban board
const VALID_STATUSES = ['To Do', 'In Progress', 'Done'];

// @desc    Get all tasks, categorized/filterable by search, priority, and status
// @route   GET /api/tasks
exports.getAllTasks = (req, res) => {
  try {
    const { search, priority, status } = req.query;
    
    // Create a copy of the mock store array to filter
    let filteredTasks = [...tasks];

    // 1. Handle Search Filter (Matches title or description, case-insensitive)
    if (search) {
      const term = search.toLowerCase();
      filteredTasks = filteredTasks.filter((task) =>
        (task.title && task.title.toLowerCase().includes(term)) ||
        (task.description && task.description.toLowerCase().includes(term))
      );
    }

    // 2. Handle Priority Filter
    if (priority && priority !== 'All') {
      filteredTasks = filteredTasks.filter((task) => task.priority === priority);
    }

    // 3. Handle Status Filter
    if (status && status !== 'All') {
      filteredTasks = filteredTasks.filter((task) => task.status === status);
    }

    res.status(200).json(filteredTasks);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching tasks',
      error: error.message,
    });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
exports.createTask = (req, res) => {
  try {
    const { title, description, status, priority, assignee, dueDate } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Task title is required' });
    }

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description || '',
      status: status || 'To Do',
      priority: priority || 'Medium',
      assignee: assignee || 'Unassigned',
      date: dueDate || new Date().toISOString().split('T')[0],
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({
      message: 'Error creating task',
      error: error.message,
    });
  }
};

// @desc    Update a task by ID
// @route   PUT /api/tasks/:id
exports.updateTask = (req, res) => {
  try {
    const { id } = req.params;
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    res.status(200).json(tasks[taskIndex]);
  } catch (error) {
    res.status(500).json({
      message: 'Error updating task',
      error: error.message,
    });
  }
};

// @desc    Move a task between To Do / In Progress / Done (fast board update)
// @route   PATCH /api/tasks/:id/status
exports.updateTaskStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        message: `Status must be one of: ${VALID_STATUSES.join(', ')}`,
      });
    }

    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    tasks[taskIndex] = { ...tasks[taskIndex], status };
    res.status(200).json(tasks[taskIndex]);
  } catch (error) {
    res.status(500).json({
      message: 'Error updating task status',
      error: error.message,
    });
  }
};

// @desc    Delete a task by ID
// @route   DELETE /api/tasks/:id
exports.deleteTask = (req, res) => {
  try {
    const { id } = req.params;
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);
    res.status(200).json({ message: 'Task deleted successfully', id });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting task',
      error: error.message,
    });
  }
};