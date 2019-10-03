import axios from 'axios';
import client from '../config/redis.config';

export const movies = async _ => {
  const dataR = await client.getAsync('movies');
  if (dataR) {
    console.log('sudah ada');
    return JSON.parse(dataR);
  } else {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `http://localhost:3001/movie`,
      })
      console.log('belum ada');
      client.set('movies', JSON.stringify(data), 'EX', 60);
      return data;
    } catch({response}) {
      return response.data;
    }
  }
};

export const movie = async (parent, args, context, info) => {
  const dataR = await client.getAsync('movies');
  if (dataR) {
    console.log('sudah ada');
    const filter = JSON.parse(dataR).filter(el => el._id == args.id);
    return filter[0];
  } else {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `http://localhost:3001/movie/${args.id}`,
      })
      console.log('belum ada');
      return data;
    } catch({response}) {
      return response.data;
    }
  }
};