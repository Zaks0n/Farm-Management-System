const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customers',
    required: true
  },
  orderitems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderItem',
    required: true
  }],
  shippingAddress1: {
    type: String,
    required: true
  },
  shippingAddress2: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: 'Pending'
  },
  totalPrice: {
    type: Number
  },
  dateOrdered: {
    type: Date,
    default: Date.now()
  }
});

const Orders = mongoose.model('Orders', OrdersSchema);

module.exports = Orders;