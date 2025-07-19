const express = require('express');
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

module.exports = { router, subscriptions };
