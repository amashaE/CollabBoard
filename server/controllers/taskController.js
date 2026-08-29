let { tasks } = require('../data/mockStore');

exports.getAllTasks = (req, res) => {
  res.json(tasks);
};

exports.createTask = (req, res) => {
  const newTask = { id: Date.now().toString(), ...req.body };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

exports.updateTask = (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...req.body };
    return res.json(tasks[index]);
  }
  res.status(404).json({ message: 'Task not found' });
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(t => t.id !== id);
  res.json({ message: 'Task deleted successfully' });
};