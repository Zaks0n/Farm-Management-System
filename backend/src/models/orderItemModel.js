const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
});

const OrderItem = mongoose.model('OrderItem', OrderItemSchema);

module.exports = OrderItem;