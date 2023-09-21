const mongoose = require('mongoose');


const CartSchema = new mongoose.Schema({
  totalPrice: {
    type: Number,
    default: 0.0
  },
  customerId: {
    type: mongoose.Types.ObjectId,
    ref: 'Customer',
  },
  products: {
    type: [{
      type: mongoose.Types.ObjectId,
      ref: 'Product'
    }],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;