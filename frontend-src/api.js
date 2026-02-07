const PREFIX = "/notes";

const req = async (url, options = {}) => {
  const { body } = options;

  const res = await fetch((PREFIX + url).replace(/\/\/$/, ""), {
    ...options,
    body: body ? JSON.stringify(body) : null,
    headers: {
      ...options.headers,
      ...(body
        ? {
            "Content-Type": "application/json",
          }
        : null),
    },
  });

  return await (res.ok
    ? res.status !== 204 && res.json()
    : res.text().then((message) => {
        throw new Error(message);
      }));
};

const debounce = (func, delay) => {
  let timeout;

  return async (...args) => {
    clearTimeout(timeout);

    return new Promise((resolve) => {
      timeout = setTimeout(async () => {
        try {
          const result = await func.apply(null, args);
          resolve(result);
        } catch (err) {
          resolve(err);
        }
      }, delay);
    });
  };
};

const getNotes = async ({ age, search, page } = {}) => {
  const searchParams = new URLSearchParams({ age, search, page });
  const url = `?${searchParams}`;

  const notes = await req(url);

  return notes;
};

const getNotesDebounce = debounce(getNotes, 250);

const createNote = async (title, text) => {
  const url = "/";
  const options = {
    method: "POST",
    body: { title, text },
    headers: {
      "Content-Type": "application/json",
    },
  };

  const note = await req(url, options);

  return note;
};

const getNote = async (id) => {
  const url = `/${id}`;
  const note = await req(url);

  return note;
};

const archiveNote = async (id) => {
  const url = `/${id}/archive`;
  const options = {
    method: "PATCH",
  };

  await req(url, options);
};

const unarchiveNote = async (id) => {
  const url = `/${id}/unarchive`;
  const options = {
    method: "PATCH",
  };

  await req(url, options);
};

const editNote = async (id, title, text) => {
  const url = `/${id}`;
  const options = {
    method: "PATCH",
    body: { title, text },
    headers: {
      "Content-Type": "application/json",
    },
  };

  await req(url, options);
};

const deleteNote = async (id) => {
  const url = `/${id}`;
  const options = {
    method: "DELETE",
  };

  await req(url, options);
};

const deleteAllArchived = async () => {
  const url = "/";
  const options = {
    method: "DELETE",
  };

  await req(url, options);
};

const notePdfUrl = (id) => {
  const pdfUrl = `${PREFIX}/${id}/download`;
  return pdfUrl;
};

export {
  getNote,
  getNotes,
  getNotesDebounce,
  createNote,
  archiveNote,
  unarchiveNote,
  deleteAllArchived,
  deleteNote,
  editNote,
  notePdfUrl,
};
