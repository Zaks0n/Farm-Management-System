const mongoose = require('mongoose');


const CartSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;