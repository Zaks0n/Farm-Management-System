const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config('.env');

const dbConn = async () => {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/farm_db', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConn;