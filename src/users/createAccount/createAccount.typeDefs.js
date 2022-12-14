import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createAccount(
      username: String!
      name: String
      email: String!
      location: String
      githubUsername: String
      password: String!
    ): MutationResponse!
  }
`;
