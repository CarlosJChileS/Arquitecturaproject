// Simple middleware to check subscription
const subscriptions = require('../modules/subscriptions').subscriptions;

module.exports = function (req, res, next) {
  const userId = parseInt(req.header('x-user-id'));
  const hasActive = subscriptions.find(s => s.userId === userId && s.active);
  if (!hasActive) {
    return res.status(403).json({ error: 'Subscription required' });
  }
  next();
};
