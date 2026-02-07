import db from "./database.mjs";
import { ObjectId } from "mongodb";

const deleteNote = async (noteId, userId) => {
  await db.collection("notes").deleteOne({ _id: new ObjectId(noteId), userId });
};

export default deleteNote;
