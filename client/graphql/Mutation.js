import { gql } from 'apollo-boost';

export const ADD_MOVIE = gql`
  mutation addMovie(
    $title: String!,
    $popularity: Float!,
    $overview: String!,
    $tag: [String],
    $status: String,
    $poster_path: String!) {

      addMovie(
        title: $title,
        popularity: $popularity,
        overview: $overview,
        tag: $tag,
        status: $status,
        poster_path: $poster_path) {
          
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

export const ADD_TVSERIES = gql`
  mutation addTvSeries(
    $title: String!,
    $popularity: Float!,
    $overview: String!,
    $tag: [String],
    $status: String,
    $poster_path: String!) {

      addTvSeries(
        title: $title,
        popularity: $popularity,
        overview: $overview,
        tag: $tag,
        status: $status,
        poster_path: $poster_path) {
          
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