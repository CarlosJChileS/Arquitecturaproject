const express = require('express');
const router = express.Router();
const {
  getUserProgress,
  addProgress
} = require('../../core/application/progressService');

router.get('/:userId', (req, res) => {
  const userProgress = getUserProgress(parseInt(req.params.userId));
  res.json(userProgress);
});

router.post('/', (req, res) => {
  const entry = addProgress(req.body);
  res.status(201).json(entry);
});

module.exports = router;
