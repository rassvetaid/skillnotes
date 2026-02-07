import db from "./database.mjs";
import { DateTime } from "luxon";

const Age = {
  ONE_MONTH: "1month",
  THREE_MONTHS: "3months",
  ALL_TIME: "alltime",
  ARCHIVE: "archive",
};

const getNotes = async (userId, age, search, page) => {
  const limitNotes = 20;
  const offset = limitNotes * (page - 1);

  const queryOptions = {
    userId,
    isArchived: false,
  };

  const setNoteAge = (queryOptions, daysAgo) => {
    queryOptions.created = { $gte: DateTime.now().minus({ days: daysAgo }).toUTC() };
  };

  switch (age) {
    case Age.ONE_MONTH:
      setNoteAge(queryOptions, 30);
      break;
    case Age.THREE_MONTHS:
      setNoteAge(queryOptions, 90);
      break;
    case Age.ARCHIVE:
      queryOptions.isArchived = true;
      break;
  }

  if (search) {
    const regex = new RegExp(search, "gi");

    queryOptions.title = regex;
  }

  const notes = await db
    .collection("notes")
    .find(queryOptions)
    .skip(offset)
    .limit(limitNotes)
    .sort({ _id: 1 })
    .toArray();

  const numberOtherNotes = await db.collection("notes").countDocuments(queryOptions);

  const hasMore = numberOtherNotes - (limitNotes + offset) > 0 ? true : false;

  return {
    data: notes,
    hasMore,
  };
};

export default getNotes;
