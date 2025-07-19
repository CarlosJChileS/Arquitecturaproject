const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

// Serve built frontend if available
const frontendPath = path.join(__dirname, 'public', 'dist');
app.use(express.static(frontendPath));

// Middleware
const subscriptionAccess = require("../shared/middleware/subscriptionAccess");
// Routers from individual modules
const authRouter = require('../modules/auth');
const productsRouter = require('../modules/products');
const {
  paymentsRouter,
  subscriptionsRouter,
} = require('../modules/payments');
const notificationsRouter = require('../modules/notifications');
const progressRouter = require('../modules/products/progress');
app.use("/products", subscriptionAccess, productsRouter);
app.use("/progress", subscriptionAccess, progressRouter);

app.use("/payments", paymentsRouter);
app.use('/subscriptions', subscriptionsRouter);
app.use('/notifications', notificationsRouter);
app.use('/auth', authRouter);

// Send React app for any other route
// Use middleware to handle all unmatched routes and serve the front-end
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`LearnPro server running on port ${PORT}`);
});
