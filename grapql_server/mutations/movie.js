import axios from 'axios';
import client from '../config/redis.config';

export const addMovie = async (parent, args, context, info) => {
  const { title, overview, popularity, tag, status, poster_path } = args;
  console.log(poster_path.substring(0, 15));
  const dataR = await client.getAsync('movies');
  try {
    const { data } = await axios({
      method: 'POST',
      url: `http://localhost:3001/movie`,
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
      client.set('movies', JSON.stringify(temp), 'EX', 60);
    }

    return data;
  } catch({response}) {
    console.log(response.data);
    return response.data;
  }
}

export const editMovie = async (parent, args, context, info) => {
  const { id, title, overview, popularity, tag, status } = args;
  try {
    const { data } = await axios({
      method: 'PUT',
      url: `http://localhost:3001/movie/${id}`,
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
      console.log('sudah ada');

      const temp = JSON.parse(dataR);  
      const idx = temp.findIndex(el => {
        return el._id == args.id
      });

      temp[idx] = data;
      client.set('movies', JSON.stringify(temp), 'EX', 60);
    }
    console.log(data);
    return data;
  } catch({response}) {
    console.log(response.data);
    return response.data;
  }
}

export const deleteMovie = async (parent, args, context, info) => {
  const dataR = await client.getAsync('movies');
  try {
    const { data } = await axios({
      method: 'DELETE',
      url: `http://localhost:3001/movie/${args.id}`,
    })

    if (dataR) {
      console.log('sudah ada');
      const temp = JSON.parse(dataR).filter(el => el._id !== args.id);
      client.set('movies', JSON.stringify(temp), 'EX', 60);
    }
    return data;
  } catch({response}) {
    console.log(response.data);
    return response.data;
  }
}