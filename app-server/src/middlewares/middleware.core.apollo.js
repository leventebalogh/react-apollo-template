import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "../typeDefs";
import { resolvers } from "../resolvers";
import { logging, config } from "../services";

export function getApolloMiddleware() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const url = `http://localhost:${config.port}${server.graphqlPath}`;

  logging.info(`[ Apollo ] server is available on ${url}`);

  return server.getMiddleware({ path: "/graphql" });
}
