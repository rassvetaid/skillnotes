import auth from "../middleware/auth.mjs";
import { Router, json } from "express";
import {
  archiveNoteController,
  createNoteController,
  deleteArchivedController,
  deleteNoteController,
  downloadNoteController,
  getNoteController,
  getNotesController,
  unarchiveNoteController,
  updateNoteController,
} from "../controllers/notes.mjs";

const router = Router();

router.use(auth());
router.use(json());

router.route("/").get(getNotesController).post(createNoteController).delete(deleteArchivedController);
router.route("/:id").get(getNoteController).patch(updateNoteController).delete(deleteNoteController);

router.patch("/:id/archive", archiveNoteController);
router.patch("/:id/unarchive", unarchiveNoteController);

router.get("/:id/download", downloadNoteController);

export default router;
