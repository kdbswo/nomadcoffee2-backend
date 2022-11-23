import { gql } from "apollo-server-express";

export default gql`
  type CoffeeShop {
    id: Int!
    name: String!
    latitude: String
    longitude: String
    categories: [Category]
    photos: [CoffeeShopPhoto]
    createdAt: String!
    updatedAt: String!
    isMine: Boolean!
  }
  type Category {
    id: Int!
    name: String!
    slug: String
    shops(lastId: Int): [CoffeeShop]
    createdAt: String!
    updatedAt: String!
    totalShops: Int!
  }
  type CoffeeShopPhoto {
    id: Int!
    url: String!
    shops: CoffeeShop
    createdAt: String!
    updatedAt: String!
  }
`;
