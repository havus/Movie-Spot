const TvSeries = require('../models/tvSeries');

class TvSeriesController {
  static add(req, res, next) {
    const { title, overview, poster_path, popularity, status, tag } = req.body;

    TvSeries.create({ title, overview, poster_path, popularity, status, tag })
      .then(one => {
        res.status(201).json(one);
      })
      .catch( next );
  }

  static findAll(req, res, next) {
    TvSeries.find()
      .then(data => {
        res.status(200).json(data);
      })
      .catch( next );
  }

  static findOne(req, res, next) {
    TvSeries.findOne({ _id: req.params.id})
      .then(one => {
        res.status(200).json(one);
      })
      .catch( next );
  }

  static updateOne(req, res, next) {
    let { title, overview, popularity, status, tag } = req.body;

    TvSeries.findByIdAndUpdate(req.params.id , { title, overview, popularity, status, tag }, { new: true })
      .then(one => {
        res.status(200).json({ message: 'TvSeries updated!', one });
      })
      .catch( next );
  }

  static deleteOne(req, res, next) {
    TvSeries.deleteOne({ _id: req.params.id })
    .then(_ => {
      res.status(200).json({ message: 'TvSeries deleted!' })
    })
    .catch( next );
  }
}

module.exports = TvSeriesController;