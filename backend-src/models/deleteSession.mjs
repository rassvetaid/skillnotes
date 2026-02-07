import db from "./database.mjs";

const deleteSession = async (sessionId) => {
  await db.collection("sessions").deleteOne({ sessionId });
};

export default deleteSession;
