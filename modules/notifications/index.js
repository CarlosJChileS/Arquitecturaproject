const express = require('express');
const router = express.Router();

// In-memory notifications store for demo
const notifications = [];

router.get('/:userId', (req, res) => {
  const userNotifications = notifications.filter(n => n.userId === parseInt(req.params.userId));
  res.json(userNotifications);
});

router.post('/', (req, res) => {
  const { userId, message } = req.body;
  const note = { id: notifications.length + 1, userId, message };
  notifications.push(note);
  res.status(201).json(note);
});

module.exports = router;
