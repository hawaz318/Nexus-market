const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports'] 
  },
  images: [String], 
  stock: { type: Number, default: 0 },
  
  // RELATIONSHIPS
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

// ADVANCED: Indexing for Search Performance
// This allows us to search by name and description together
productSchema.index({ name: 'text', description: 'text' });

module.exports =
  mongoose.models.Product || mongoose.model('Product', productSchema);