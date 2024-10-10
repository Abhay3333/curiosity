const mongoose = require('mongoose');

const connectDB = process.env.MONGODB_URI;

// Include options to avoid deprecation warnings and ensure compatibility
mongoose.connect(connectDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Connection error:', err));
