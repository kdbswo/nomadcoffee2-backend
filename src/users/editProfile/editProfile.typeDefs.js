import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editProfile(
      username: String
      name: String
      email: String
      location: String
      githubUsername: String
      password: String
      avatarUrl: Upload
    ): MutationResponse!
  }
`;
