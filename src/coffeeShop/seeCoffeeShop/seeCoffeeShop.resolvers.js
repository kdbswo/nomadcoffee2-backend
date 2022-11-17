import client from "../../client";

export default {
  Query: {
    seeCoffeeShop: (_, { id }) =>
      client.coffeeShop.findFirst({
        where: { id },
      }),
  },
};
