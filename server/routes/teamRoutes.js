const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.get('/', teamController.getTeamMembers);
router.get('/:id', teamController.getMemberById);

module.exports = router;