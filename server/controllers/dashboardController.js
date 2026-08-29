const { tasks } = require("../data/mockStore");

// Get Dashboard Statistics
const getDashboardStats = (req, res) => {

  const totalTasks = tasks.length;

  const todo = tasks.filter(
    (task) => task.status === "To Do"
  ).length;

  const inProgress = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const done = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const progress = totalTasks > 0
    ? Math.round((done / totalTasks) * 100)
    : 0;

  res.json({
    totalTasks,
    todo,
    inProgress,
    done,
    progress
  });
};


// Get Recent Tasks
const getRecentTasks = (req, res) => {

  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  res.json(recentTasks);
};


module.exports = {
  getDashboardStats,
  getRecentTasks
};