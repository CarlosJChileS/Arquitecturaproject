const express = require('express');
const router = express.Router();
const {
  getAllSubscriptions,
  addSubscription
} = require('../../core/application/subscriptionsService');
const subscriptions = require('../../core/domain/subscriptions');

router.get('/', async (req, res) => {
  try {
    const all = await getAllSubscriptions();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const subscription = await addSubscription(req.body);
    res.status(201).json(subscription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = { router, subscriptions };
