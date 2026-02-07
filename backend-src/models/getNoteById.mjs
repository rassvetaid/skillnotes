import db from "./database.mjs";
import extendNote from "../utils/extendNote.mjs";
import { ObjectId } from "mongodb";

const getNoteById = async (noteId, userId) => {
  const note = await db.collection("notes").findOne({ _id: new ObjectId(noteId), userId });

  return extendNote(note);
};

export default getNoteById;
