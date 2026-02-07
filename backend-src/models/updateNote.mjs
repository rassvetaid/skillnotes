import db from "./database.mjs";
import { ObjectId } from "mongodb";

const updateNote = async (noteId, userId, title, text) => {
  const { matchedCount } = await db
    .collection("notes")
    .updateOne({ _id: new ObjectId(noteId), userId }, { $set: { title, text } });

  return matchedCount;
};

export default updateNote;
