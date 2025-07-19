const express = require('express');
const app = express();
app.use(express.json());

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`LearnPro server running on port ${PORT}`);
});
