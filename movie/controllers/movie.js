const Movie = require('../models/movie');

class MovieController {
  static add(req, res, next) {
    const { title, overview, poster_path, popularity, status, tag } = req.body;

    Movie.create({ title, overview, poster_path, popularity, status, tag })
      .then(one => {
        res.status(201).json(one);
      })
      .catch( next );
  }

  static findAll(req, res, next) {
    Movie.find()
      .then(data => {
        res.status(200).json(data);
      })
      .catch( next );
  }

  static findOne(req, res, next) {
    Movie.findOne({ _id: req.params.id})
      .then(one => {
        res.status(200).json(one);
      })
      .catch( next );
  }

  static updateOne(req, res, next) {
    let { title, overview, popularity, status, tag } = req.body;

    Movie.findByIdAndUpdate(req.params.id , { title, overview, popularity, status, tag }, { new: true })
      .then(one => {
        res.status(200).json({ message: 'Movie updated!', one });
      })
      .catch( next );
  }

  static deleteOne(req, res, next) {
    Movie.deleteOne({ _id: req.params.id })
    .then(_ => {
      res.status(200).json({ message: 'Movie deleted!' })
    })
    .catch( next );
  }
}

module.exports = MovieController;