const express = require('express');

const router = express.Router();

const notifications = require('../data/notifications');

// GET all notifications
router.get('/', (req, res) => {
  res.json(notifications);
});

// GET one notification
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  const notification = notifications.find(
    (item) => item.id === id
  );

  if (!notification) {
    return res.status(404).json({
      message: 'Notification not found'
    });
  }

  res.json(notification);
});

// Mark notification as read
router.patch('/:id/read', (req, res) => {
  const id = Number(req.params.id);

  const notification = notifications.find(
    (item) => item.id === id
  );

  if (!notification) {
    return res.status(404).json({
      message: 'Notification not found'
    });
  }

  notification.read = true;

  res.json(notification);
});

module.exports = router;