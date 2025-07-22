const Stripe = require('stripe');
const PaymentStrategy = require('../PaymentStrategy');

class StripeStrategy extends PaymentStrategy {
  constructor() {
    super();
    this.client = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2024-04-10',
    });
  }

  async createCheckout(amount, planId = 'plan', origin) {
    const session = await this.client.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: planId },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
    });
    return { url: session.url };
  }
}

module.exports = StripeStrategy;
