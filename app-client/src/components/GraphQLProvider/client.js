import fetch from "node-fetch";
import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

export const client = new ApolloClient({
  link: createHttpLink({
    uri: "/graphql",
    fetch
  }),
  cache: new InMemoryCache()
});
