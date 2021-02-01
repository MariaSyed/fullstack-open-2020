const mongoose = require('mongoose');
const config = require('./config');

const mongoUrl = config.MONGODB_URI;

module.exports = {
  connect: () => {
    mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  },
};