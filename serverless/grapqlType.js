module.exports = `
  type Query {
    tvSeries: [TvSeries]
    tvSeriesDetail(id: ID): TvSeries
    movies: [Movie]
    movie(id: ID): Movie
  }

  type TvSeries {
    _id: ID
    title: String
    overview: String
    popularity: String
    tag: [String]
    status: String
    poster_path: Poster_path
  }

  type Movie {
    _id: ID
    title: String
    overview: String
    popularity: String
    tag: [String]
    status: String
    poster_path: Poster_path
  }

  type Poster_path {
    image_url: String
    delete_url: String
  }

  type Message {
    message: String
  }

  type Mutation {
    addMovie (
      title: String,
      overview: String,
      popularity: Float, 
      tag: [String],
      status: String,
      poster_path: String
    ): Movie,
    editMovie (
      id: ID,
      title: String,
      overview: String,
      popularity: Float, 
      tag: [String],
      status: String,
    ): Movie,
    deleteMovie (id: ID): Message

    addTvSeries (
      title: String,
      overview: String,
      popularity: Float, 
      tag: [String],
      status: String,
      poster_path: String
    ): TvSeries,
    editTvSeries (
      id: ID,
      title: String,
      overview: String,
      popularity: Float, 
      tag: [String],
      status: String,
    ): TvSeries,
    deleteTvSeries (id: ID): Message
  }
`;