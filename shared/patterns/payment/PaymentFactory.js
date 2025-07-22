class PaymentFactory {
  static createProcessor(type) {
    switch (type) {
      case 'stripe':
        return new (require('./processors/StripeStrategy'))();
      case 'paypal':
        return new (require('./processors/PaypalStrategy'))();
      default:
        throw new Error('Unknown payment processor');
    }
  }
}

module.exports = PaymentFactory;
