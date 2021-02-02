const mongoose = require('mongoose');
const config = require('./utils/config');
const mockDb = require('./tests/mockDb');

const mongoUrl = config.MONGODB_URI;

module.exports = {
  connect: () => {
    if (process.env.NODE_ENV === 'test') {
      mockDb.connect();
    } else {
      mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });
    }
  },
};
