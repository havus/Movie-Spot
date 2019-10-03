import { gql } from 'apollo-boost';

export const GET_MOVIES = gql`
query {
  movies {
    _id
    title
    popularity
    poster_path {
      image_url
    }
  }
}`;

export const GET_TVSERIES = gql`
query {
  tvSeries {
    _id
    title
    popularity
    poster_path {
      image_url
    }
  }
}`;

export const getMovie = id => {
  return gql`
  query {
    movie (id: "${id}") {
      _id
      title
      popularity
      overview
      tag
      status
      poster_path {
        image_url
      }
    }
  }`;
};

export const getTvSeries = id => {
  return gql`
  query {
    tvSeriesDetail (id: "${id}") {
      _id
      title
      popularity
      overview
      tag
      status
      poster_path {
        image_url
      }
    }
  }`;
};