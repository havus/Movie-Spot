const axios = require('axios');

class Movie {
  static async add(req, res, next) {
    const { title, overview, poster_path, popularity, status, tag } = req.body;

    try {
      const { data } = await axios({
        method: 'POST',
        url: `${process.env.MOVIE_SERVICE_URL}`,
        data: { title, overview, poster_path, popularity, status, tag }
      });
      res.status(200).json(data);
    } catch({response}) {
      next(response.data);
    }
  }

  static async findAll(req, res, next) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${process.env.MOVIE_SERVICE_URL}`,
      });
      res.status(200).json(data);
    } catch({ response }) {
      next(response.data);
    }
  }
  
  static async findOne(req, res, next) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${process.env.MOVIE_SERVICE_URL}/${req.params.id}`,
      });
      res.status(200).json(data);
    } catch({ response }) {
      next(response.data);
    }
  }

  static async updateOne(req, res, next) {
    const { title, overview, popularity, status, tag } = req.body;

    try {
      const { data } = await axios({
        method: 'PUT',
        url: `${process.env.MOVIE_SERVICE_URL}/${req.params.id}`,
        data: { title, overview, popularity, status, tag }
      });
      res.status(200).json(data);
    } catch({response}) {
      next(response.data);
    }
  }

  static async deleteOne(req, res, next) {
    try {
      const { data } = await axios({
        method: 'DELETE',
        url: `${process.env.MOVIE_SERVICE_URL}/${req.params.id}`,
      });
      res.status(200).json(data);
    } catch({response}) {
      next(response.data);
    }
  }
}

module.exports = Movie;