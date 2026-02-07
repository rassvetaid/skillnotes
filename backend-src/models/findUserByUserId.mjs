import db from "./database.mjs";
import { ObjectId } from "mongodb";

const findUserBySessionId = async (sessionId) => {
  const session = await db.collection("sessions").findOne({ sessionId });

  if (!session) {
    return;
  }

  const user = await db.collection("users").findOne({ _id: new ObjectId(session.userId) });

  return user;
};

export default findUserBySessionId;
