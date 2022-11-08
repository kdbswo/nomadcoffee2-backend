import "dotenv/config";

import { ApolloServer } from "apollo-server";
import { resolvers, typeDefs } from "./src/schema";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() => console.log(`server is running on http://localhost:${PORT}/`));
