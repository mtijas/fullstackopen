require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const Note = require("./models/note");

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

let notes = [];

app.get("/", (request, response) => {
  response.send("<h1>Hello world!</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id).then((note) => {
    response.json(note);
  });
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

app.post("/api/notes", (request, response) => {
  if (!request.body.content) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: request.body.content,
    important: request.body.important || false,
    date: new Date(),
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

function unknownEndpoint(request, response) {
  response.status(404).send({ error: "unknown endpoint" });
}

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server is running on port ${PORT}`);
