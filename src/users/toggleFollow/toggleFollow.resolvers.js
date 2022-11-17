import client from "../../client";

export default {
  Mutation: {
    toggleFollow: async (_, { username }, { loggedInUser }) => {
      const exist = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!exist) {
        return {
          ok: false,
          error: "user not found",
        };
      }
      const confirmFollowing = await client.user.findFirst({
        where: {
          id: loggedInUser.id,
          following: { some: { username } },
        },
        select: { id: true },
      });
      if (!confirmFollowing) {
        await client.user.update({
          where: { id: loggedInUser.id },
          data: { following: { connect: { username } } },
        });
      } else {
        await client.user.update({
          where: { id: loggedInUser.id },
          data: { following: { disconnect: { username } } },
        });
      }
      return {
        ok: true,
      };
    },
  },
};
