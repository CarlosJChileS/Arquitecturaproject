const express = require('express');
const app = express();
app.use(express.json());

const router = express.Router();

// In-memory subscription store for demo
const subscriptions = [];

// List subscriptions
router.get('/', (req, res) => {
  res.json(subscriptions);
});

// Create subscription (monthly/annual)
router.post('/', (req, res) => {
  const { userId, plan } = req.body;
  const subscription = { id: subscriptions.length + 1, userId, plan, active: true };
  subscriptions.push(subscription);
  res.status(201).json(subscription);
});

app.use('/', router);

if (require.main === module) {
  const PORT = process.env.PORT || 3006;
  app.listen(PORT, () => {
    console.log(`Subscriptions service running on port ${PORT}`);
  });
}

module.exports.subscriptions = subscriptions;
module.exports = router;
