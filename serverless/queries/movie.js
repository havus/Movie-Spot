const axios = require('axios');
const client = require('../config.redis');

const movies = async _ => {
  const dataR = await client.getAsync('movies');
  if (dataR) {
    return JSON.parse(dataR);
  } else {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `http://35.240.128.174/movie`,
      })
      client.set('movies', JSON.stringify(data), 'EX', 300);
      return data;
    } catch({response}) {
      return response.data;
    }
  }
};

const movie = async (parent, args, context, info) => {
  const dataR = await client.getAsync('movies');
  if (dataR) {
    const filter = JSON.parse(dataR).filter(el => el._id == args.id);
    return filter[0];
  } else {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `http://35.240.128.174/movie/${args.id}`,
      })
      return data;
    } catch({response}) {
      return response.data;
    }
  }
};

module.exports = { movies, movie };