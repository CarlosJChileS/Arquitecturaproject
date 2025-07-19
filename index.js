const express = require('express');
const app = express();
app.use(express.json());

// Middleware
const subscriptionAccess = require("./shared/middleware/subscriptionAccess");
// Routers from individual services
const paymentsRouter = require("./services/payments-service");
const productsRouter = require('./services/products-service');
const subscriptionsRouter = require('./services/subscriptions-service');
const progressRouter = require('./services/progress-service');
const notificationsRouter = require('./services/notifications-service');
const authRouter = require('./services/auth-service');
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
