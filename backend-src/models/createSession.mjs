import db from "./database.mjs";
import { nanoid } from "nanoid";

const createSession = async (userId) => {
  const sessionId = nanoid();

  await db.collection("sessions").insertOne({
    userId,
    sessionId,
  });

  return sessionId;
};

export default createSession;
