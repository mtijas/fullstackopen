require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");

const app = express();
app.use(cors());
app.use(express.static("build"));
app.use(express.json());

morgan.token("postdata", (request, response) => {
  if (request.method === "POST") {
    return JSON.stringify(request.body);
  }
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :postdata"
  )
);
//app.use(morgan("tiny"));

let persons = [];

app.get("/info", (request, response) => {
  const timestamp = new Date();
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${timestamp}</p>`
  );
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (!person) {
    response.status(404).end();
    return;
  }

  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  if (!request.body.name) {
    return response.status(400).json({ error: "name missing" });
  }
  if (!request.body.number) {
    return response.status(400).json({ error: "number missing" });
  }
  // if (
  //   persons.find(
  //     (person) => person.name.toLowerCase() === request.body.name.toLowerCase()
  //   )
  // ) {
  //   return response.status(409).json({ error: "name must be unique" });
  // }

  const person = new Person({
    name: request.body.name,
    number: request.body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server is running on port ${PORT}`);
