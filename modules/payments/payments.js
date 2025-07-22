const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const paypal = require('@paypal/checkout-server-sdk');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
});

const paypalEnv = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID || '',
  process.env.PAYPAL_CLIENT_SECRET || ''
);
const paypalClient = new paypal.core.PayPalHttpClient(paypalEnv);

router.post('/stripe', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: req.body.planId || 'plan' },
            unit_amount: Math.round(req.body.amount * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/paypal', async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: { currency_code: 'USD', value: req.body.amount },
      },
    ],
  });

  try {
    const order = await paypalClient.execute(request);
    const approve = order.result.links.find((l) => l.rel === 'approve');
    res.json({ approvalUrl: approve.href });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
