import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    lipsum: String
  }
`;
