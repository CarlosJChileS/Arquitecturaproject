const express = require('express');
const app = express();
app.use(express.json());

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

app.use('/', router);

if (require.main === module) {
  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => {
    console.log(`Notifications service running on port ${PORT}`);
  });
}

module.exports = router;
