if (!process.env.NODE_ENV || process.env.NODE_ENV === 'dev') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.ATLAS_CLUSTER, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use(require('morgan')(process.env.NODE_ENV));
app.use(require('cors')());
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.json());

const routes = require('./routes/');
app.use('/', routes);

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports = app;