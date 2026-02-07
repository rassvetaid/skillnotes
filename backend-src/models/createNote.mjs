import db from "./database.mjs";
import extendNote from "../utils/extendNote.mjs";
import getNoteById from "./getNoteById.mjs";

const createNote = async (userId, title, text) => {
  const { insertedId } = await db.collection("notes").insertOne({
    userId,
    title,
    text,
    created: new Date(),
    isArchived: false,
  });

  const note = await getNoteById(insertedId, userId);

  return extendNote(note);
};

export default createNote;
