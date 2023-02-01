const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Note = require("../models/note");

beforeEach(async () => {
  await Note.deleteMany({});
  await Note.insertMany(helper.initialNotes);
  // const noteObjects = helper.initialNotes.map((note) => new Note(note));
  // const promiseArray = noteObjects.map((note) => note.save());
  // await Promise.all(promiseArray);
});

describe("common api behaviour", () => {
  test("notes are returned as json", async () => {
    await api
      .get("/api/notes")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are two notes", async () => {
    const response = await api.get("/api/notes");

    expect(response.body).toHaveLength(helper.initialNotes.length);
  });

  test("the first note is about HTTP methods", async () => {
    const response = await api.get("/api/notes");

    const contents = response.body.map((r) => r.content);

    expect(contents).toContain("HTML is easy");
  });
});

describe("adding a new blog", () => {
  test("a valid note can be added", async () => {
    const newNote = {
      content: "async/await simplifies making async calls",
      important: true,
    };

    await api
      .post("/api/notes")
      .send(newNote)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/notes");

    const contents = response.body.map((r) => r.content);

    expect(response.body).toHaveLength(helper.initialNotes.length + 1);
    expect(contents).toContain("async/await simplifies making async calls");
  });

  test("note without content is not added", async () => {
    const newNote = {
      important: true,
    };

    await api.post("/api/notes").send(newNote).expect(400);

    const response = await api.get("/api/notes");

    expect(response.body).toHaveLength(helper.initialNotes.length);
  });
});

describe("viewing a specific note", () => {
  test("a specific note can be viewed", async () => {
    const notesAtStart = await helper.notesInDb();

    const noteToView = notesAtStart[0];

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(resultNote.body).toEqual(noteToView);
  });

  test("fails with 404 if note does not exist", async () => {
    const validNonExistingNoteId = await helper.nonExistingId();

    await api.get(`/api/notes/${validNonExistingNoteId}`).expect(404);
  });

  test("fails with 400 if id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await api.get(`/api/notes/${invalidId}`).expect(400);
  });
});

describe("deleting a note", () => {
  test("a note can be deleted", async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToDelete = notesAtStart[0];

    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);
    const notesAtEnd = await helper.notesInDb();

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);

    const contents = notesAtEnd.map((r) => r.content);

    expect(contents).not.toContain(noteToDelete.content);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
