const express = require('express');
const cookieParser = require('cookie-parser');

// Import all routers
const userRouter = require('./routes/user.routes');
const storeRouter = require('./routes/store.routes');
const productRouter = require('./routes/product.routes');
const orderRouter = require('./routes/order.routes');
const categoryRouter = require('./routes/category.routes');
const reviewRouter = require('./routes/review.routes');
const globalErrorHandler = require('./middlewares/error.middleware');

const app = express();

// Global Middlewares
app.use(express.json());
app.use(cookieParser());

// MOUNTING ALL 6 ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/stores', storeRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/reviews', reviewRouter);

console.log({
  userRouter: typeof userRouter,
  storeRouter: typeof storeRouter,
  productRouter: typeof productRouter,
  orderRouter: typeof orderRouter,
  categoryRouter: typeof categoryRouter,
  reviewRouter: typeof reviewRouter,
  globalErrorHandler: typeof globalErrorHandler,
});

app.use(globalErrorHandler);

module.exports = app;