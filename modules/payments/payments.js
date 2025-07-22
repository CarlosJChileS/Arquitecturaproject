const express = require('express');
const router = express.Router();
const PaymentFactory = require('../../shared/patterns/payment/PaymentFactory');
const PaymentContext = require('../../shared/patterns/payment/PaymentContext');

router.post('/stripe', async (req, res) => {
  const processor = PaymentFactory.createProcessor('stripe');
  const context = new PaymentContext(processor);
  try {
    const session = await context.createCheckout(
      req.body.amount,
      req.body.planId,
      req.headers.origin
    );
    res.json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/paypal', async (req, res) => {
  const processor = PaymentFactory.createProcessor('paypal');
  const context = new PaymentContext(processor);
  try {
    const order = await context.createCheckout(req.body.amount);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
