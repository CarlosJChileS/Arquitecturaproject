const express = require('express');
const app = express();
app.use(express.json());

const router = express.Router();

// In-memory progress store for demo
const progress = [];

// Get user progress
router.get('/:userId', (req, res) => {
  const userProgress = progress.filter(p => p.userId === parseInt(req.params.userId));
  res.json(userProgress);
});

// Update progress
router.post('/', (req, res) => {
  const { userId, courseId, completed } = req.body;
  const entry = { id: progress.length + 1, userId, courseId, completed };
  progress.push(entry);
  res.status(201).json(entry);
});

app.use('/', router);

if (require.main === module) {
  const PORT = process.env.PORT || 3005;
  app.listen(PORT, () => {
    console.log(`Progress service running on port ${PORT}`);
  });
}

module.exports = router;
