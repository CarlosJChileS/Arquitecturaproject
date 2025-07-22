const paypal = require('@paypal/checkout-server-sdk');
const PaymentStrategy = require('../PaymentStrategy');

class PaypalStrategy extends PaymentStrategy {
  constructor() {
    super();
    const env = new paypal.core.SandboxEnvironment(
      process.env.PAYPAL_CLIENT_ID || '',
      process.env.PAYPAL_CLIENT_SECRET || ''
    );
    this.client = new paypal.core.PayPalHttpClient(env);
  }

  async createCheckout(amount) {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: { currency_code: 'USD', value: amount },
        },
      ],
    });
    const order = await this.client.execute(request);
    const approval = order.result.links.find((l) => l.rel === 'approve');
    return { approvalUrl: approval.href };
  }
}

module.exports = PaypalStrategy;
