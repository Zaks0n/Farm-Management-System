const mongoose = require('mongoose');

const FarmersSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
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
    farmName: {
        type: String,
        default: '',
    },
    farmSize: {
        type: Number,
        default: null,
    },
    farmLocation: {
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

const Farmers = mongoose.model('Farmers', FarmersSchema);
module.exports = Farmers;
