require('dotenv').config();
require('../shared/utils/validateEnv')();
const express = require('express');
const path = require('path');
const app = express();
const checkSupabaseConnection = require('../shared/utils/checkSupabaseConnection');

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(path.join(__dirname, '../docs/swagger.yaml'));



app.use(express.json());

// Serve built frontend if available
const frontendPath = path.join(__dirname, 'public', 'dist');
app.use(express.static(frontendPath));

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
const usersRouter = require('../modules/users');
const categoriesRouter = require('../modules/categories');
const plansRouter = require('../modules/plans');
app.use("/products", subscriptionAccess, productsRouter);
app.use("/progress", subscriptionAccess, progressRouter);

app.use('/categories', categoriesRouter);
app.use('/plans', plansRouter);

app.use("/payments", paymentsRouter);
app.use('/subscriptions', subscriptionsRouter);
app.use('/notifications', notificationsRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// Send React app for any other route
// Use middleware to handle all unmatched routes and serve the front-end
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

const port = process.env.PORT || 8080;
process.env.PORT = port;
checkSupabaseConnection().then(ok => {
  if (ok) {
    console.log('Supabase connection verified');
  } else {
    console.error('Failed to connect to Supabase');
  }
});
app.listen(port, () => {
  console.log(`LearnPro server running on port ${port}`);
});
