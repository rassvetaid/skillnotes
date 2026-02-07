import getNotes from "../models/getNotes.mjs";
import getNoteById from "../models/getNoteById.mjs";
import createNote from "../models/createNote.mjs";
import updateNote from "../models/updateNote.mjs";
import MarkdownPDF from "markdown-pdf";
import archiveNote from "../models/archiveNote.mjs";
import unarchiveNote from "../models/unarchiveNote.mjs";
import deleteNote from "../models/deleteNote.mjs";
import deleteAllArchived from "../models/deleteAllArchived.mjs";
import highlightNotesTitle from "../utils/highlightNotesTitle.mjs";

const getNotesController = async (req, res, next) => {
  try {
    const { age, search, page } = req.query;
    const searchValue = search.replace(/\s+/g, " ").trim();

    const data = await getNotes(req.user.id, age, searchValue, page);

    if (search) {
      data.data = highlightNotesTitle(data.data, searchValue);
    }

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const getNoteController = async (req, res, next) => {
  try {
    const note = await getNoteById(req.params.id, req.user.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (err) {
    next(err);
  }
};

const createNoteController = async (req, res, next) => {
  try {
    const { title, text } = req.body;

    const note = await createNote(req.user.id, title, text);

    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

const updateNoteController = async (req, res, next) => {
  try {
    const { title, text } = req.body;

    const matchedCount = await updateNote(req.params.id, req.user.id, title, text);

    if (!matchedCount) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const archiveNoteController = async (req, res, next) => {
  try {
    const matchedCount = await archiveNote(req.params.id, req.user.id);

    if (!matchedCount) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const unarchiveNoteController = async (req, res, next) => {
  try {
    const matchedCount = await unarchiveNote(req.params.id, req.user.id);

    if (!matchedCount) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const deleteNoteController = async (req, res, next) => {
  try {
    await deleteNote(req.params.id, req.user.id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const deleteArchivedController = async (req, res, next) => {
  try {
    await deleteAllArchived(req.user.id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const downloadNoteController = async (req, res, next) => {
  try {
    const note = await getNoteById(req.params.id, req.user.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const fileName = encodeURIComponent(`${note.title}.pdf`);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName}"; filename*=UTF-8''${fileName}"`,
    });

    MarkdownPDF()
      .from.string(note.text)
      .to.buffer((err, buf) => {
        if (err) {
          console.error(err);
          return res.status(422).send("Unprocessable Entity");
        }

        res.end(buf, "utf-8");
      });
  } catch (err) {
    next(err);
  }
};

export {
  getNotesController,
  getNoteController,
  createNoteController,
  updateNoteController,
  archiveNoteController,
  unarchiveNoteController,
  deleteArchivedController,
  deleteNoteController,
  downloadNoteController,
};
