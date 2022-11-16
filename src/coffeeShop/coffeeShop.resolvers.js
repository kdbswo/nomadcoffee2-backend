import client from "../../client";

export default {
  Category: {
    shops: (_, { lastId }) =>
      client.coffeeShop.findMany({
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
    totalShops: ({ id }) =>
      client.coffeeShop.count({
        where: { categories: { some: { id } } },
      }),
  },
};
