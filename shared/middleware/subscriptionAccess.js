// Simple middleware to check subscription
// Access the subscription data from the payments module
const { subscriptions } = require('../../modules/payments');

module.exports = function (req, res, next) {
  const userId = parseInt(req.header('x-user-id'));
  const hasActive = subscriptions.find(s => s.userId === userId && s.active);
  if (!hasActive) {
    return res.status(403).json({ error: 'Subscription required' });
  }
  next();
};
