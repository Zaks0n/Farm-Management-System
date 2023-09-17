const mongoose = require('mongoose'); // 6.0.12

const DB_HOST = process.env.DB_HOST || '127.0.0.1',
      DB_PORT = process.env.DB_PORT || 27017,
      DB_DATABASE = process.env.DB_DATABASE || 'testing',
      DB_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

const dbClient = {
  dbConnect: () => {
    this.connected = false;
    mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true}, () => {
      this.connected = true;
    }, err => console.log(err.message)
  )},
  isAlive: () => {
    return this.connected
  }
}


module.exports = dbClient;
