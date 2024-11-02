import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  sellerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  products: [{
    productId: String,
    quantity: Number,
    price: Number
  }],
  date: { 
    type: Date, 
    default: Date.now 
  }
});

export const Sale = mongoose.model('Sale', saleSchema);