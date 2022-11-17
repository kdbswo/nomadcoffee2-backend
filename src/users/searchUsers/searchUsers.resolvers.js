import client from "../../client";

export default {
  Query: {
    searchUsers: async (_, { keyword, page }) => {
      const users = await client.user.findMany({
        where: {
          username: {
            startsWith: keyword,
          },
        },
        take: 5,
        skip: (page - 1) * 5,
      });
      const totalResult = await client.user.count({
        where: {
          username: {
            startsWith: keyword,
          },
        },
      });
      return {
        users,
        totalPages: Math.ceil(totalResult / 5),
      };
    },
  },
};
