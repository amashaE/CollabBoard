const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Map CRUD HTTP verbs to controller methods
router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getTasks } = require('../controllers/taskController');

// GET /api/tasks?search=code&priority=High&status=To Do
router.get('/', getTasks);

module.exports = router;