const express = require('express');
const app = express();
app.use(express.json());

const router = express.Router();

// Simple login endpoint placeholder
router.post('/login', (req, res) => {
  res.json({ message: 'login route' });
});

app.use('/', router);

if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`);
  });
}
module.exports = router;
