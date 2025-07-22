class PaymentStrategy {
  async createCheckout(amount, planId, origin) {
    throw new Error('createCheckout must be implemented');
  }
}

module.exports = PaymentStrategy;
