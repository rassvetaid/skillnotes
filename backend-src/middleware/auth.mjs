import findUserBySessionId from "../models/findUserByUserId.mjs";

const auth = () => async (req, res, next) => {
  try {
    const sessionId = req.cookies["sessionId"];

    if (!sessionId) {
      return res.status(401).send("Unauthorized");
    }

    const { _id, username } = await findUserBySessionId(sessionId);
    const id = _id.toString();

    req.user = { id, username };
    req.sessionId = sessionId;

    next();
  } catch (err) {
    next(err);
  }
};

export default auth;
