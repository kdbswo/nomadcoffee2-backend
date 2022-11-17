import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";

const resolverFn = async (
  _,
  {
    username,
    name,
    email,
    location,
    githubUsername,
    password: newPassword,
    avatarUrl,
  },
  { loggedInUser }
) => {
  let setAvatarUrl = null;
  if (avatarUrl) {
    const { filename, createReadStream } = await avatarUrl;
    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const writeStream = createWriteStream(
      process.cwd() + "/uploads/" + newFilename
    );
    readStream.pipe(writeStream);
    setAvatarUrl = `http://localhost:4000/static/${newFilename}`;
  }
  let hashedPassword = null;
  if (newPassword) {
    hashedPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: { id: loggedInUser.id },
    data: {
      username,
      name,
      email,
      location,
      githubUsername,
      ...(hashedPassword && { password: hashedPassword }),
      ...(setAvatarUrl && { avatarUrl: setAvatarUrl }),
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Cant update profile.",
    };
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};
