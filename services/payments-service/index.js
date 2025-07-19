const express = require('express');
const app = express();
app.use(express.json());

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

app.use('/', router);

if (require.main === module) {
  const PORT = process.env.PORT || 3003;
  app.listen(PORT, () => {
    console.log(`Payments service running on port ${PORT}`);
  });
}

module.exports = router;
