require('dotenv').config();

const { PORT, MONGODB_URI, SECRET } = process.env;

module.exports = { PORT, MONGODB_URI, SECRET };
