const mongoose = require('mongoose');

// Cache connection across serverless invocations
// Without this, every request would open a new DB connection
let isConnected = false;

async function connectDB() {
  if (isConnected) {
    return; // Reuse existing connection
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in environment variables');
  }

  const conn = await mongoose.connect(process.env.MONGO_URI);

  isConnected = conn.connections[0].readyState === 1;
  console.log(`MongoDB connected: ${conn.connection.host}`);
}

module.exports = connectDB;
