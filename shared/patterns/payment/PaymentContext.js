class PaymentContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  async createCheckout(amount, planId, origin) {
    return this.strategy.createCheckout(amount, planId, origin);
  }
}

module.exports = PaymentContext;
