const express = require('express');
const app = express();
app.use(express.json());

// Modules
const subscriptionAccess = require("./shared/middleware/subscriptionAccess");
const paymentsRouter = require("./modules/payments");
const productsRouter = require('./modules/products');
const subscriptionsRouter = require('./modules/subscriptions');
const progressRouter = require('./modules/progress');
const notificationsRouter = require('./modules/notifications');
const authRouter = require('./modules/auth');
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
