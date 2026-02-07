import db from "./database.mjs";
import generateHash from "../utils/generateHash.mjs";
import findUserByUsername from "./findUserByUsername.mjs";

const createUser = async (username, password) => {
  await db.collection("users").insertOne({
    username,
    password: generateHash(password),
  });

  const user = await findUserByUsername(username);

  return user;
};

export default createUser;
