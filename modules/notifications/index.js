const express = require('express');
const router = express.Router();
const {
  getNotificationsByUser,
  addNotification
} = require('../../core/application/notificationsService');

router.get('/:userId', (req, res) => {
  const notes = getNotificationsByUser(parseInt(req.params.userId));
  res.json(notes);
});

router.post('/', (req, res) => {
  const note = addNotification(req.body);
  res.status(201).json(note);
});

module.exports = router;
