import axios from 'axios';
const { ApolloServer } = require('apollo-server');

import { movies, movie } from './queries/movie';
import { tvSeries, tvSeriesDetail } from './queries/tvSeries';
import { addMovie, editMovie, deleteMovie } from './mutations/movie';
import { addTvSeries, editTvSeries, deleteTvSeries } from './mutations/tvSeries';
import typeDefs from './types/';

const resolvers = {
  Query: {
    movies,
    movie,
    tvSeries,
    tvSeriesDetail,
  },
  Mutation: {
    addMovie,
    editMovie,
    deleteMovie,
    addTvSeries,
    editTvSeries,
    deleteTvSeries,
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});