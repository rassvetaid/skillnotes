import db from "./database.mjs";
import { ObjectId } from "mongodb";

const archiveNote = async (noteId, userId) => {
  const { matchedCount } = await db
    .collection("notes")
    .updateOne({ _id: new ObjectId(noteId), userId }, { $set: { isArchived: true } });

  return matchedCount;
};

export default archiveNote;
