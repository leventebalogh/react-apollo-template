import React from "react";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import { Foo } from "./Foo";

const GET_LIPSUM = gql`
  query getLipsum {
    lipsum
  }
`;

export const FooContainer = () => {
  const { loading, error, data } = useQuery(GET_LIPSUM);

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return `ERROR: ${error}`;
  }

  return <Foo lipsum={data.lipsum} />;
};
