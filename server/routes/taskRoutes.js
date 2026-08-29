const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Map CRUD HTTP verbs to controller methods
router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;