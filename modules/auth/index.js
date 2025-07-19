const express = require('express');
const router = express.Router();

// Simple login endpoint placeholder
router.post('/login', (req, res) => {
  res.json({ message: 'login route' });
});

module.exports = router;
