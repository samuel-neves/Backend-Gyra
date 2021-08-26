import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';

import "./database"

async function startApolloServer({ typeDefs, resolvers }) {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({ app, path: '/' });

  await new Promise(resolve => httpServer.listen({ port: 3333 }, resolve));
  console.log(`🔥 Server ready at http://localhost:3333${server.graphqlPath}`)
}

export default startApolloServer;
