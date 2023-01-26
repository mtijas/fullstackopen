const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.get("/:id", async (request, response, next) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

notesRouter.delete("/:id", async (request, response) => {
  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end();
});

notesRouter.post("/", async (request, response, next) => {
  const note = new Note({
    content: request.body.content,
    important: request.body.important || false,
  });

  const savedNote = await note.save();
  response.status(201).json(savedNote);
});

notesRouter.put("/:id", (request, response, next) => {
  const note = {
    content: request.body.content,
    important: request.body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
