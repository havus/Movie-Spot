const axios = require('axios');
const client = require('../config.redis');

const tvSeries = async () => {
  const dataR = await client.getAsync('tvSeries');
  if (dataR) {
    return JSON.parse(dataR);
  } else {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `http://34.87.108.205/tvSeries`,
      })
      client.set('tvSeries', JSON.stringify(data), 'EX', 300);
      return data;
    } catch({ response }) {
      return response.data;
    }
  }
};

const tvSeriesDetail = async (parent, args, context, info) => {
  const dataR = await client.getAsync('tvSeries');
  if (dataR) {
    const filter = JSON.parse(dataR).filter(el => el._id == args.id);
    return filter[0];
  } else {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `http://34.87.108.205/tvSeries/${args.id}`,
      })
      return data;
    } catch({ response }) {
      return response.data;
    }
  }
};

module.exports = { tvSeries, tvSeriesDetail };