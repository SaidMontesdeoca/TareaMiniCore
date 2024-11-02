import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import salesRoutes from './routes/salesRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/sales', salesRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/sales_commission')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});