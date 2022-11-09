import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    username: String!
    name: String!
    email: String!
    location: String
    avatarUrl: String
    githubUsername: String
    createdAt: String!
    updatedAt: String!
  }
`;
