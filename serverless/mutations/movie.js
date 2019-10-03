const axios = require('axios');
const client = require('../config.redis');

const addMovie = async (parent, args, context, info) => {
  const { title, overview, popularity, tag, status, poster_path } = args;
  const dataR = await client.getAsync('movies');
  try {
    const { data } = await axios({
      method: 'POST',
      url: `http://35.240.128.174/movie`,
      data: {
        title,
        overview,
        popularity,
        tag,
        status,
        poster_path
      }
    })

    if (dataR) {
      const temp = JSON.parse(dataR);
      temp.push(data);
      client.set('movies', JSON.stringify(temp), 'EX', 300);
    }

    return data;
  } catch({ response }) {
    return response.data;
  }
};

const editMovie = async (parent, args, context, info) => {
  const { id, title, overview, popularity, tag, status } = args;
  try {
    const { data } = await axios({
      method: 'PUT',
      url: `http://35.240.128.174/movie/${id}`,
      data: {
        title,
        overview,
        popularity,
        tag,
        status,
      }
    })
    const dataR = await client.getAsync('movies');
    if (dataR) {
      const temp = JSON.parse(dataR);  
      const idx = temp.findIndex(el => {
        return el._id == args.id
      });

      temp[idx] = data;
      client.set('movies', JSON.stringify(temp), 'EX', 300);
    }
    return data;
  } catch({ response }) {
    return response.data;
  }
};

const deleteMovie = async (parent, args, context, info) => {
  const dataR = await client.getAsync('movies');
  try {
    const { data } = await axios({
      method: 'DELETE',
      url: `http://35.240.128.174/movie/${args.id}`,
    })

    if (dataR) {
      const temp = JSON.parse(dataR).filter(el => el._id !== args.id);
      client.set('movies', JSON.stringify(temp), 'EX', 300);
    }
    return data;
  } catch({ response }) {
    return response.data;
  }
};

module.exports = { addMovie, editMovie, deleteMovie };