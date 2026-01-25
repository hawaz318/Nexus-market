const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const app = require('./app');

// 1. Load Environment Variables (Must be first!)
dotenv.config();

// 2. Connect to Database
connectDB();

// 3. Start the Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// 4. Handle Unhandled Promise Rejections (e.g., if DB fails after start)
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});