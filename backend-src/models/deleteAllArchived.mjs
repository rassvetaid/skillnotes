import db from "./database.mjs";

const deleteAllArchived = async (userId) => {
  await db.collection("notes").deleteMany({
    userId,
    isArchived: true,
  });
};

export default deleteAllArchived;
