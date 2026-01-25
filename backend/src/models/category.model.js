const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Category name is required'], 
    unique: true,
    trim: true 
  },
  slug: { type: String, lowercase: true },
  image: String, // Icon or thumbnail for the category
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null // Allows for Sub-categories (e.g., Electronics -> Mobile)
  }
}, { timestamps: true });

// Auto-generate slug before saving (e.g., "Home Decor" -> "home-decor")
categorySchema.pre('save', function(next) {
  this.slug = this.name.split(' ').join('-').toLowerCase();
  next();
});

module.exports = mongoose.model('Category', categorySchema);