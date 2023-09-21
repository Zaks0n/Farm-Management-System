const mongoose = require('mongoose');

const CustomersSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: '',
    },
    token: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        onUpdate: Date.now,
    },
});

const Customers = mongoose.model('Customers', CustomersSchema);
module.exports = Customers;