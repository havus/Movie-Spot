import axios from 'axios';
import client from '../config/redis.config';

export const tvSeries = async () => {
  const dataR = await client.getAsync('tvSeries');
  if (dataR) {
    console.log('sudah ada');
    return JSON.parse(dataR);
  } else {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `http://localhost:3002/tvSeries`,
      })
      console.log('belum ada');
      client.set('tvSeries', JSON.stringify(data), 'EX', 60);
      return data;
    } catch(err) {
      return err;
    }
  }
};

export const tvSeriesDetail = async (parent, args, context, info) => {
  const dataR = await client.getAsync('tvSeries');
  if (dataR) {
    console.log('sudah ada');
    const filter = JSON.parse(dataR).filter(el => el._id == args.id);
    return filter[0];
  } else {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `http://localhost:3002/tvSeries/${args.id}`,
      })
      console.log('belum ada');
      return data;
    } catch(err) {
      return err;
    }
  }
};