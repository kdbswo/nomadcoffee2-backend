// import { createWriteStream } from "fs";

// export const uploadFn = async (avatarUrl) => {
//   const { filename, createReadStream } = await avatarUrl;
//   const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
//   const readStream = createReadStream();
//   const writeStream = createWriteStream(
//     process.cwd() + "/uploads/" + newFilename
//   );
//   readStream.pipe(writeStream);
//   setAvatarUrl = `http://localhost:4000/static/${newFilename}`;
// };
