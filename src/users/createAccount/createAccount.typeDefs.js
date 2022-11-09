import { gql } from "apollo-server";

export default gql`
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      username: String!
      name: String!
      email: String!
      location: String
      avatarUrl: String
      githubUsername: String
      password: String!
    ): CreateAccountResult!
  }
`;
