import { createWriteStream } from "fs";
import client from "../../../client";
import { protectedResolver } from "../../users/users.utils";
import { processCategories } from "../coffeeShop.utils";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, photos, categories },
        { loggedInUser }
      ) => {
        try {
          let setPhotos = null;
          let categoriesObj = [];
          if (photos) {
            const { filename, createReadStream } = await photos;
            const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
            const readStream = createReadStream();
            const writeStream = createWriteStream(
              process.cwd() + "/uploads/" + newFilename
            );
            readStream.pipe(writeStream);
            setPhotos = `http://localhost:4000/static/${newFilename}`;
          }
          if (categories) {
            categoriesObj = processCategories(categories);
          }
          const createShop = await client.coffeeShop.create({
            data: {
              name,
              latitude,
              longitude,
              user: { connect: { id: loggedInUser.id } },
              ...(categoriesObj.length > 0 && {
                categories: { connectOrCreate: categoriesObj },
              }),
            },
          });
          if (photos) {
            await client.coffeeShopPhoto.create({
              data: {
                url: setPhotos,
                shops: { connect: { id: createShop.id } },
              },
            });
          }
          if (createShop.id) {
            return {
              ok: true,
            };
          }
        } catch (e) {
          return {
            ok: false,
            error: e.message,
          };
        }
      }
    ),
  },
};
