import {gql} from 'apollo-server-express';
import Movie from './models/movie';

export const typeDefs = gql`
  type Movie {
    id: ID!
    name: String!
    producer: String!
    rating: Float!
  }

  type Query {
    getMovies: [Movie]
    getMovie(id: ID!): Movie
  }

  type Mutation {
    addMovie(name: String!, producer: String!, rating: Float!): Movie
    updateMovie(id: ID!, name: String!, producer: String!, rating: Float): Movie
    deleteMovie(id: ID!): Movie
  }
`

export const resolvers = {
  Query: {
    getMovies: async (parent, args) => {
      return await Movie.find({});
    },
    getMovie: async (parent, args) => {
      return await Movie.findById(args.id);
    }
  },
  Mutation: {
    addMovie: (parent, args) => {
      let movie = new Movie({
        name: args.name,
        producer: args.producer,
        rating: args.rating,
      });
      return movie.save();
    },
    updateMovie: async (parent, args) => {
      if (!args.id) return;
      return await Movie.findOneAndUpdate(
        {
          _id: args.id
        },
        {
          $set: {
            name: args.name,
            producer: args.producer,
            rating: args.rating,
          }
        }, {new: true}, (err, Movie) => {
          if (err) {
            console.log('Something went wrong when updating the movie');
          } else {
          }
        }
      ).clone();
    },
    deleteMovie: async (parent, args) => {
      if (!args.id) return;
      return await Movie.findByIdAndDelete({_id: args.id});
    }
  }
}