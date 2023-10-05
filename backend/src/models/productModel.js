const mongoose = require('mongoose');

const ProudctSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  stock: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model('Product', ProudctSchema);

module.exports = Product;
