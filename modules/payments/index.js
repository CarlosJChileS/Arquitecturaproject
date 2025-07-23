const paymentsRouter = require('./payments');
const { handleStripeWebhook } = require('./payments');
const { router: subscriptionsRouter, subscriptions } = require('./subscriptions');

module.exports = {
  paymentsRouter,
  subscriptionsRouter,
  subscriptions,
  handleStripeWebhook
};
