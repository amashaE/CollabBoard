let { tasks } = require('../data/mockStore');

// @desc    Get all tasks
// @route   GET /api/tasks
exports.getAllTasks = (req, res) => {
  try {
    res.status(200).json(tasks);
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
    const {
      title,
      description,
      status,
      priority,
      assignee,
      dueDate,
    } = req.body;

    // Validate task title
    if (!title || !title.trim()) {
      return res.status(400).json({
        message: 'Task title is required',
      });
    }

    // Create new task
    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description || '',
      status: status || 'To Do',
      priority: priority || 'Medium',
      assignee: assignee || 'Unassigned',
      date: dueDate || new Date().toISOString().split('T')[0],
    };

    // Add task to the task list
    tasks.push(newTask);

    // Return created task
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

    const taskIndex = tasks.findIndex(
      (task) => task.id === id
    );

    if (taskIndex === -1) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    // Update existing task
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...req.body,
    };

    res.status(200).json(tasks[taskIndex]);
  } catch (error) {
    res.status(500).json({
      message: 'Error updating task',
      error: error.message,
    });
  }
};

// @desc    Delete a task by ID
// @route   DELETE /api/tasks/:id
exports.deleteTask = (req, res) => {
  try {
    const { id } = req.params;

    const initialLength = tasks.length;

    tasks = tasks.filter(
      (task) => task.id !== id
    );

    if (tasks.length === initialLength) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    res.status(200).json({
      message: 'Task deleted successfully',
      id,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting task',
      error: error.message,
    });
  }
};

// Mock Task Data
let tasks = [
  { id: 1, title: 'Design Auth Screens', description: 'UI/UX layout', status: 'To Do', priority: 'High', assignee: 'Devindi' },
  { id: 2, title: 'Setup Database', description: 'Backend integration', status: 'In Progress', priority: 'High', assignee: 'Chamod' },
  { id: 3, title: 'Create Activity Feed', description: 'Frontend work', status: 'Done', priority: 'Medium', assignee: 'Tharunethu' }
];

const getTasks = (req, res) => {
  let { search, priority, status } = req.query;
  let filteredTasks = [...tasks];

  // 1. Text Search (Matches title or description)
  if (search) {
    const term = search.toLowerCase();
    filteredTasks = filteredTasks.filter(task => 
      task.title.toLowerCase().includes(term) || 
      task.description.toLowerCase().includes(term)
    );
  }

  // 2. Priority Filter
  if (priority && priority !== 'All') {
    filteredTasks = filteredTasks.filter(task => task.priority === priority);
  }

  // 3. Status Filter
  if (status && status !== 'All') {
    filteredTasks = filteredTasks.filter(task => task.status === status);
  }

  res.status(200).json(filteredTasks);
};

module.exports = { getTasks };