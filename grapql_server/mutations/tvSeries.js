import axios from 'axios';
import client from '../config/redis.config';

export const addTvSeries = async (parent, args, context, info) => {
  const { title, overview, popularity, tag, status, poster_path } = args;
  
  const dataR = await client.getAsync('tvSeries');
  try {
    const { data } = await axios({
      method: 'POST',
      url: `http://localhost:3002/tvSeries`,
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
      console.log("sudah ada");
      const temp = JSON.parse(dataR);
      temp.push(data);
      client.set('tvSeries', JSON.stringify(temp), 'EX', 60);
    }

    return data;
  } catch({ response }) {
    console.log(response.data);
    return response.data;
  }
}

export const editTvSeries = async (parent, args, context, info) => {
  const { id, title, overview, popularity, tag, status } = args;
  try {
    const { data } = await axios({
      method: 'PUT',
      url: `http://localhost:3002/tvSeries/${id}`,
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
      console.log('sudah ada');

      const temp = JSON.parse(dataR);  
      const idx = temp.findIndex(el => {
        return el._id == args.id
      });

      temp[idx] = data;
      client.set('tvSeries', JSON.stringify(temp), 'EX', 60);
    }
    console.log(data);
    return data;
  } catch({ response }) {
    console.log(response.data);
    return response.data;
  }
}

export const deleteTvSeries = async (parent, args, context, info) => {
  const dataR = await client.getAsync('tvSeries');
  try {
    const { data } = await axios({
      method: 'DELETE',
      url: `http://localhost:3002/tvSeries/${args.id}`,
    })

    if (dataR) {
      console.log('sudah ada');
      const temp = JSON.parse(dataR).filter(el => el._id !== args.id);
      client.set('tvSeries', JSON.stringify(temp), 'EX', 60);
    }
    return data;
  } catch({ response }) {
    console.log(response.data);
    return response.data;
  }
}