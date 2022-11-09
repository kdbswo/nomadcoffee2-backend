import bcrypt from "bcrypt";
import client from "../../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, name, email, location, githubUsername, password }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("This username/email is already taken");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            username,
            name,
            email,
            location,
            githubUsername,
            password: hashedPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: "Cant not create account",
        };
      }
    },
  },
};
