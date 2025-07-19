const express = require('express');
const app = express();
app.use(express.json());

// Modules
const subscriptionAccess = require("./middleware/subscriptionAccess");
const paymentsRouter = require("./modules/payments");
const coursesRouter = require('./modules/courses');
const subscriptionsRouter = require('./modules/subscriptions');
const progressRouter = require('./modules/progress');
const notificationsRouter = require('./modules/notifications');
app.use("/courses", subscriptionAccess, coursesRouter);
app.use("/progress", subscriptionAccess, progressRouter);

app.use("/payments", paymentsRouter);
app.use('/subscriptions', subscriptionsRouter);
app.use('/notifications', notificationsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`LearnPro server running on port ${PORT}`);
});
