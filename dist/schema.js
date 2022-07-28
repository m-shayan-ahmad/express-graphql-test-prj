"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const movie_1 = __importDefault(require("./models/movie"));
exports.typeDefs = (0, apollo_server_express_1.gql) `
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
`;
exports.resolvers = {
    Query: {
        getMovies: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield movie_1.default.find({});
        }),
        getMovie: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield movie_1.default.findById(args.id);
        })
    },
    Mutation: {
        addMovie: (parent, args) => {
            let movie = new movie_1.default({
                name: args.name,
                producer: args.producer,
                rating: args.rating,
            });
            return movie.save();
        },
        updateMovie: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            if (!args.id)
                return;
            return yield movie_1.default.findOneAndUpdate({
                _id: args.id
            }, {
                $set: {
                    name: args.name,
                    producer: args.producer,
                    rating: args.rating,
                }
            }, { new: true }, (err, Movie) => {
                if (err) {
                    console.log('Something went wrong when updating the movie');
                }
                else {
                }
            }).clone();
        }),
        deleteMovie: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            if (!args.id)
                return;
            return yield movie_1.default.findByIdAndDelete({ _id: args.id });
        })
    }
};
//# sourceMappingURL=schema.js.map