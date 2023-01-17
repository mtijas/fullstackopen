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

app.get("/info", (request, response, next) => {
  Person.count({})
    .then((count) => {
      const timestamp = new Date();
      response.send(
        `<p>Phonebook has info for ${count} people</p>
      <p>${timestamp}</p>`
      );
    })
    .catch((error) => next(error));
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", async (request, response, next) => {
  if (!request.body.name) {
    return response.status(400).json({ error: "name missing" });
  }
  if (!request.body.number) {
    return response.status(400).json({ error: "number missing" });
  }

  let exists = await Person.exists({ name: request.body.name });
  if (exists) {
    return response.status(409).json({ error: "name must be unique" });
  }

  const person = new Person({
    name: request.body.name,
    number: request.body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const person = {
    name: request.body.name,
    number: request.body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

function unknownEndpoint(request, response) {
  response.status(404).send({ error: "unknown endpoint" });
}

app.use(unknownEndpoint);

function errorHandler(error, request, response, next) {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformed id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }
  next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server is running on port ${PORT}`);
