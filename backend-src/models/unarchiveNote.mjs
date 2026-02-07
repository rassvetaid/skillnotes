import db from "./database.mjs";
import { ObjectId } from "mongodb";

const unarchiveNote = async (noteId, userId) => {
  const { matchedCount } = await db
    .collection("notes")
    .updateOne({ _id: new ObjectId(noteId), userId }, { $set: { isArchived: false } });

  return matchedCount;
};

export default unarchiveNote;
