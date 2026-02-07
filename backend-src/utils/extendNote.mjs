import { marked } from "marked";

const extendNote = (note) => {
  const extendedNote = { ...note, html: marked.parse(note.text) };
  return extendedNote;
};

export default extendNote;
