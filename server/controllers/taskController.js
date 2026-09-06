const mongoose = require('mongoose');
const Task = require('../models/Task');

const formatTask = (task) => {
  const taskObject = task.toObject ? task.toObject() : task;

  return {
    id: taskObject._id.toString(),
    title: taskObject.title,
    description: taskObject.description,
    category: taskObject.category,
    priority: taskObject.priority,
    status: taskObject.status,
    assignee: taskObject.assignee,
    dueDate: taskObject.dueDate,
    created_at: taskObject.createdAt,
    updated_at: taskObject.updatedAt
  };
};

// GET ALL TASKS
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.status(200).json(tasks.map(formatTask));
  } catch (error) {
    console.error('Error fetching tasks:', error);

    res.status(500).json({
      message: 'Error fetching tasks',
      error: error.message
    });
  }
};

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      priority,
      status,
      assignee,
      dueDate,
      date
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: 'Task title is required'
      });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description || '',
      category: category || 'General',
      priority: priority || 'Medium',
      status: status || 'To Do',
      assignee: assignee || 'Unassigned',
      dueDate: dueDate || date || null
    });

    res.status(201).json(formatTask(task));
  } catch (error) {
    console.error('Error creating task:', error);

    res.status(500).json({
      message: 'Error creating task',
      error: error.message
    });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid task ID'
      });
    }

    const {
      title,
      description,
      category,
      priority,
      status,
      assignee,
      dueDate,
      date
    } = req.body;

    const updateData = {};

    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (priority !== undefined) updateData.priority = priority;
    if (status !== undefined) updateData.status = status;
    if (assignee !== undefined) updateData.assignee = assignee;

    if (dueDate !== undefined) {
      updateData.dueDate = dueDate;
    } else if (date !== undefined) {
      updateData.dueDate = date;
    }

    const task = await Task.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    res.status(200).json(formatTask(task));
  } catch (error) {
    console.error('Error updating task:', error);

    res.status(500).json({
      message: 'Error updating task',
      error: error.message
    });
  }
};

// UPDATE TASK STATUS
exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid task ID'
      });
    }

    if (!['To Do', 'In Progress', 'Done'].includes(status)) {
      return res.status(400).json({
        message: 'Invalid status'
      });
    }

    const task = await Task.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    res.status(200).json(formatTask(task));
  } catch (error) {
    console.error('Error updating task status:', error);

    res.status(500).json({
      message: 'Error updating task status',
      error: error.message
    });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid task ID'
      });
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    res.status(200).json({
      message: 'Task deleted successfully',
      id
    });
  } catch (error) {
    console.error('Error deleting task:', error);

    res.status(500).json({
      message: 'Error deleting task',
      error: error.message
    });
  }
};