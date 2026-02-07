const highlightNotesTitle = (notes, search) => {
  const searchLower = search.toLowerCase();

  const highlightedNotes = notes.map((note) => {
    const titleLower = note.title.toLowerCase();

    if (titleLower.includes(searchLower)) {
      const regex = new RegExp(searchLower, "i");

      note.highlights = note.title.replace(regex, `<mark>$&</mark>`);
    }

    return note;
  });

  return highlightedNotes;
};

export default highlightNotesTitle;
