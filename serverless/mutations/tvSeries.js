const axios = require('axios');
const client = require('../config.redis');

const addTvSeries = async (parent, args, context, info) => {
  const { title, overview, popularity, tag, status, poster_path } = args;
  
  const dataR = await client.getAsync('tvSeries');
  try {
    const { data } = await axios({
      method: 'POST',
      url: `http://34.87.108.205/tvSeries`,
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
      client.set('tvSeries', JSON.stringify(temp), 'EX', 60);
    }
    return data;
  } catch({ response }) {
    return response.data;
  }
};

const editTvSeries = async (parent, args, context, info) => {
  const { id, title, overview, popularity, tag, status } = args;
  try {
    const { data } = await axios({
      method: 'PUT',
      url: `http://34.87.108.205/tvSeries/${id}`,
      data: {
        title,
        overview,
        popularity,
        tag,
        status,
      }
    })
    const dataR = await client.getAsync('tvSeries');
    if (dataR) {
      const temp = JSON.parse(dataR);  
      const idx = temp.findIndex(el => {
        return el._id == args.id
      });

      temp[idx] = data;
      client.set('tvSeries', JSON.stringify(temp), 'EX', 60);
    }
    return data;
  } catch({ response }) {
    return response.data;
  }
};

const deleteTvSeries = async (parent, args, context, info) => {
  const dataR = await client.getAsync('tvSeries');
  try {
    const { data } = await axios({
      method: 'DELETE',
      url: `http://34.87.108.205/tvSeries/${args.id}`,
    })

    if (dataR) {
      const temp = JSON.parse(dataR).filter(el => el._id !== args.id);
      client.set('tvSeries', JSON.stringify(temp), 'EX', 60);
    }
    return data;
  } catch({ response }) {
    return response.data;
  }
};

module.exports = { addTvSeries, editTvSeries, deleteTvSeries };