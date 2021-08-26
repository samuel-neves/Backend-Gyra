import { ApolloServer } from "apollo-server";

import "./database"

function server({ typeDefs, resolvers }) {
  const server = new ApolloServer({ typeDefs, resolvers });

  server.listen(3333).then(({ url }) => console.log(`Server started at ${ url }`));
}

export default server;
