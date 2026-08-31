const mockStore = require('../data/mockStore');

// @desc    Get all tasks
// @route   GET /api/tasks
exports.getAllTasks = (req, res) => {
  try {
    let { search, priority, status } = req.query;

    let filteredTasks = [...mockStore.tasks];

    // Search by title or description
    if (search) {
      const term = search.toLowerCase();

      filteredTasks = filteredTasks.filter((task) =>
        task.title.toLowerCase().includes(term) ||
        (task.description || '').toLowerCase().includes(term)
      );
    }

    // Filter by priority
    if (priority && priority !== 'All') {
      filteredTasks = filteredTasks.filter(
        (task) => task.priority === priority
      );
    }

    // Filter by status
    if (status && status !== 'All') {
      filteredTasks = filteredTasks.filter(
        (task) => task.status === status
      );
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

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description || '',
      status: status || 'To Do',
      priority: priority || 'Medium',
      assignee: assignee || 'Unassigned',
      date: dueDate || new Date().toISOString().split('T')[0],
    };

    mockStore.tasks.push(newTask);

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

    const taskIndex = mockStore.tasks.findIndex(
      (task) => String(task.id) === String(id)
    );

    if (taskIndex === -1) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    mockStore.tasks[taskIndex] = {
      ...mockStore.tasks[taskIndex],
      ...req.body,
    };

    res.status(200).json(mockStore.tasks[taskIndex]);
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

    const initialLength = mockStore.tasks.length;

    mockStore.tasks = mockStore.tasks.filter(
      (task) => String(task.id) !== String(id)
    );

    if (mockStore.tasks.length === initialLength) {
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


// Export search/filter function as an alias if another part
// of the project expects getTasks.
exports.getTasks = exports.getAllTasks;