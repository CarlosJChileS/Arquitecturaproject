const express = require('express');
const router = express.Router();
const {
  getAllSubscriptions,
  addSubscription
} = require('../../core/application/subscriptionsService');
const subscriptions = require('../../core/domain/subscriptions');

router.get('/', (req, res) => {
  res.json(getAllSubscriptions());
});

router.post('/', (req, res) => {
  const subscription = addSubscription(req.body);
  res.status(201).json(subscription);
});

module.exports = { router, subscriptions };
