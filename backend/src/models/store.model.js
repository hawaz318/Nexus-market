const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A store must have an owner (vendor)'],
    unique: true // One user = One store
  },
  storeName: { 
    type: String, 
    required: [true, 'A store must have a name'],
    unique: true,
    trim: true 
  },
  description: { type: String, required: true },
  logo: { type: String, default: 'default-store.png' },
  slug: String, // For SEO URLs like /stores/my-tech-shop
  isVerified: { type: Boolean, default: false }, // Admin can verify sellers
  averageRating: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0']
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true }, 
  toObject: { virtuals: true } 
});

// VIRTUAL POPULATE: Link products to store without storing a huge array of IDs
storeSchema.virtual('products', {
  ref: 'Product',
  foreignField: 'store',
  localField: '_id'
});


module.exports =
  mongoose.models.Store || mongoose.model('Store', storeSchema);