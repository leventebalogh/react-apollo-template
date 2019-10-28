import React from "react";
import { ApolloProvider } from "react-apollo";
import { client } from "./client";

export const GraphQLProvider = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
