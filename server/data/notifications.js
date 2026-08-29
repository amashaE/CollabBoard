const notifications = [
  {
    id: 1,
    message: 'Member 3 assigned you a new task',
    type: 'task',
    read: false,
    createdAt: '2026-08-28T09:30:00'
  },

  {
    id: 2,
    message: 'Task "Login UI" was completed',
    type: 'success',
    read: false,
    createdAt: '2026-08-28T09:10:00'
  },

  {
    id: 3,
    message: 'Database Design deadline is tomorrow',
    type: 'warning',
    read: true,
    createdAt: '2026-08-28T08:30:00'
  },

  {
    id: 4,
    message: 'You were assigned "Create Dashboard"',
    type: 'task',
    read: false,
    createdAt: '2026-08-28T08:00:00'
  },

  {
    id: 5,
    message: 'New comment added to "Kanban Board"',
    type: 'info',
    read: true,
    createdAt: '2026-08-27T16:30:00'
  }
];

module.exports = notifications;