const db = require('../config/db');

// GET all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        id,
        title,
        description,
        category,
        priority,
        status,
        assignee,
        due_date AS dueDate,
        created_at,
        updated_at
      FROM tasks
      ORDER BY id DESC
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching tasks:', error);

    res.status(500).json({
      message: 'Error fetching tasks',
      error: error.message
    });
  }
};


// CREATE a task
exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      priority,
      status,
      assignee,
      dueDate
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: 'Task title is required'
      });
    }

    const [result] = await db.query(
      `
      INSERT INTO tasks
      (title, description, category, priority, status, assignee, due_date)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        title.trim(),
        description || null,
        category || 'General',
        priority || 'Medium',
        status || 'To Do',
        assignee || 'Unassigned',
        dueDate || null
      ]
    );

    const [rows] = await db.query(
      `
      SELECT
        id,
        title,
        description,
        category,
        priority,
        status,
        assignee,
        due_date AS dueDate,
        created_at,
        updated_at
      FROM tasks
      WHERE id = ?
      `,
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating task:', error);

    res.status(500).json({
      message: 'Error creating task',
      error: error.message
    });
  }
};


// UPDATE a task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      category,
      priority,
      status,
      assignee,
      dueDate
    } = req.body;

    const [result] = await db.query(
      `
      UPDATE tasks
      SET
        title = COALESCE(?, title),
        description = COALESCE(?, description),
        category = COALESCE(?, category),
        priority = COALESCE(?, priority),
        status = COALESCE(?, status),
        assignee = COALESCE(?, assignee),
        due_date = COALESCE(?, due_date)
      WHERE id = ?
      `,
      [
        title,
        description,
        category,
        priority,
        status,
        assignee,
        dueDate,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    const [rows] = await db.query(
      `
      SELECT
        id,
        title,
        description,
        category,
        priority,
        status,
        assignee,
        due_date AS dueDate,
        created_at,
        updated_at
      FROM tasks
      WHERE id = ?
      `,
      [id]
    );

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error updating task:', error);

    res.status(500).json({
      message: 'Error updating task',
      error: error.message
    });
  }
};


// DELETE a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      'DELETE FROM tasks WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
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