const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true
  },
  products:
    [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      default: []
    }],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;