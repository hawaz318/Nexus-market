const express = require('express');
const userRouter = require('./routes/user.routes');
const globalErrorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());

// API Routes
app.use('/api/v1/users', userRouter);

// GLOBAL ERROR HANDLER (Must be at the very bottom)
app.use(globalErrorHandler);

module.exports = app;