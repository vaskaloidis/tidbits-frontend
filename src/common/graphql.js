import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const graphql = new ApolloClient({
  uri: "http://localhost:3500/graphql"
});

export { gql, graphql };
