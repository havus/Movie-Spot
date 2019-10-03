'use strict';

// don't install package graphql although unmeet peer dependencies :)
// don't forget to npm dedupe
const { serveHTTP } = require('google-graphql-functions');
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

// <======= Queries =======>
const { movies, movie } = require('./queries/movie');
const { tvSeries, tvSeriesDetail } = require('./queries/tvSeries');

// <======= Mutations =======>
const { addMovie, editMovie, deleteMovie } = require('./mutations/movie');
const { addTvSeries, editTvSeries, deleteTvSeries } = require('./mutations/tvSeries')

const typeDefs = require('./grapqlType');

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
  },
};

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const graphqlOptions = {
  schema: executableSchema,
  graphiql: true,
  endpointURL: "/graphiql"
};

exports.entertainMe = serveHTTP(graphqlOptions);