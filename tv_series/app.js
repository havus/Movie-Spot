if (!process.env.NODE_ENV || process.env.NODE_ENV === 'dev') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.ATLAS_CLUSTER, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(require('morgan')(process.env.NODE_ENV));
app.use(require('cors')());
app.use(express.json());

const tvSeries = require('./routes/tvSeries');
app.use('/tvSeries', tvSeries);

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports = app;