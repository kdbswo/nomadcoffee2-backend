import client from "../client";

export default {
  CoffeeShop: {
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
    photos: ({ id }) =>
      client.coffeeShopPhoto.findMany({
        where: { coffeeShopId: id },
      }),
    categories: ({ id }) =>
      client.category.findMany({
        where: { shops: { some: { id } } },
      }),
  },
  Category: {
    shops: ({ id }, { lastId }) =>
      client.category
        .findUnique({
          where: { id },
        })
        .shops({
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
