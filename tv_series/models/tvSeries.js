const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TvSeriesSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title required!'],
  },
  overview: {
    type: String,
    required: [true, 'Overview required!'],
  },
  poster_path: {
    image_url: {
      type: String,
      required: [true, 'Poster path required!'],
    },
    delete_url: {
      type: String,
      required: [true, 'Url delete image required!'],  
    }
  },
  popularity: {
    type: Number,
    required: [true, 'Popularity required!'],
  },
  tag: {
    type: Array,
    default: [],
  },
  status: {
    type: String,
    default: 'Not yet released!'
  },
}, { timestamps: true, versionKey: false });

const TvSeries = mongoose.model('TvSeries', TvSeriesSchema);

module.exports = TvSeries;
