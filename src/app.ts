import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import { typeDefs, resolvers } from './schema';


const url = "mongodb://localhost:27017/moviesdb";

const connect = mongoose.connect(url);
connect.then((db)=>{
  console.log('Connected to server!');
}, (err)=>{
  console.error(err);
})

const app = express();

app.use(bodyParser.json());

app.use('*', cors());

let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
  });
  await apolloServer.start()
  apolloServer.applyMiddleware({app});  
}
startServer(); 

app.listen({port:4000}, ()=>{
  console.log(`Server ready at http://localhost:4000${apolloServer.graphqlPath}`);
});