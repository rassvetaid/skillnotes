import generateHash from "../utils/generateHash.mjs";
import createNote from "../models/createNote.mjs";
import createUser from "../models/createUser.mjs";
import deleteSession from "../models/deleteSession.mjs";
import findUserByUsername from "../models/findUserByUsername.mjs";
import createSession from "../models/createSession.mjs";

const signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.redirect("/?errorStatus=400");
    }

    const user = await findUserByUsername(username);

    if (user) {
      return res.redirect("/?errorStatus=409");
    }

    const { _id } = await createUser(username, password);
    const userId = _id.toString();

    const sessionId = await createSession(userId);

    const noteText =
      "# Header 1\n\n## Header 2\n\n**Bold text**\n\n*Italic text*\n\n### Numered List\n\n1. Item 1\n2. Item 2\n3. Item 3\n\n### Generic List\n\n* Item 1\n* Item 2\n* Item 3\n\n[Link to nowhere](/)";

    await createNote(userId, "Demo note", noteText);

    res.cookie("sessionId", sessionId, { httpOnly: true }).redirect("/dashboard");
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.redirect("/?errorStatus=400");
    }

    const user = await findUserByUsername(username);

    if (!user || user.password !== generateHash(password)) {
      return res.redirect("/?errorStatus=404");
    }

    const sessionId = await createSession(user._id.toString());

    res.cookie("sessionId", sessionId, { httpOnly: true }).redirect("/dashboard");
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const sessionId = req.cookies["sessionId"];

    if (!sessionId) {
      return res.redirect("/");
    }

    await deleteSession(sessionId);

    res.clearCookie("sessionId", { httpOnly: true }).redirect("/");
  } catch (err) {
    next(err);
  }
};

export { signup, login, logout };
