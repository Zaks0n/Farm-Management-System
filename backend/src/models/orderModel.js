const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderStatus: {
    type: String,
    required: true
  },
  customerId: {
    type: mongoose.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  cartId: {
    type: mongoose.Types.ObjectId,
    ref: 'Cart',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    onUpdate: Date.now()
  }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;