const express = require('express');
const router = express.Router();

// stub payment endpoints
router.post('/stripe', (req, res) => {
  // pretend to process payment with Stripe
  res.json({ status: 'success', provider: 'stripe' });
});

router.post('/paypal', (req, res) => {
  // pretend to process payment with PayPal
  res.json({ status: 'success', provider: 'paypal' });
});

module.exports = router;
