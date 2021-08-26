import { ApolloServer } from "apollo-server-express";
import express from 'express';
import cors from 'cors';
import http from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';

import "./database"

async function startApolloServer({ typeDefs, resolvers }) {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  }

  app.use(cors(corsOptions));

  const server = new ApolloServer({
    schema,
    plugins: [{
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          }
        };
      }
    }],
  });

  await server.start();

  server.applyMiddleware({ app });

  const subscriptionServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe,
  }, {
    server: httpServer,
    path: server.graphqlPath,
  });

  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🔥 Server ready at http://localhost:4000${server.graphqlPath}`)
}

export default startApolloServer;
