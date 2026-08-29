const express = require('express');

const router = express.Router();

const activity = require('../data/activity');

// GET all activity

router.get('/', (req, res) => {
  res.json(activity);
});

// GET one activity
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  const item = activity.find(
    (activityItem) => activityItem.id === id
  );

  if (!item) {
    return res.status(404).json({
      message: 'Activity not found'
    });
  }

  res.json(item);
});

module.exports = router;