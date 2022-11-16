import client from "../../../client";
import { protectedResolver } from "../../users/users.utils";
import { processCategories } from "../coffeeShop.utils";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, longitude, categories },
        { loggedInUser }
      ) => {
        const oldShop = await client.coffeeShop.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: { categories: { select: { name: true } } },
        });
        if (!oldShop) {
          return {
            ok: false,
            error: "shop not found.",
          };
        }
        const updateShop = await client.coffeeShop.update({
          where: { id },
          data: {
            name,
            latitude,
            longitude,
            categories: {
              disconnect: oldShop.categories,
              connectOrCreate: processCategories(categories),
            },
          },
        });
        if (updateShop) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Cant edit coffee shop",
          };
        }
      }
    ),
  },
};
