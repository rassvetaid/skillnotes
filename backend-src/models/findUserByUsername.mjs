import db from "./database.mjs";

const findUserByUsername = async (username) => {
  const user = await db.collection("users").findOne({ username });

  return user;
};

export default findUserByUsername;
