const subscriptions = require('../domain/subscriptions');

function getAllSubscriptions() {
  return subscriptions;
}

function addSubscription({ userId, plan, active = true }) {
  const subscription = { id: subscriptions.length + 1, userId, plan, active };
  subscriptions.push(subscription);
  return subscription;
}

module.exports = { getAllSubscriptions, addSubscription };
