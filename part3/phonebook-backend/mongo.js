const mongoose = require("mongoose");

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log(
    "USAGE: List all persons: node mongo.js <password> OR Add a new person: node mongo.js <password> <name> <number>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fso-phonebook:${password}@cluster0.xoduvd5.mongodb.net/phonebook?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 5) {
  mongoose
    .connect(url)
    .then((result) => {
      const person = new Person({
        id: generateId(),
        name: process.argv[3],
        number: process.argv[4],
      });

      person.save().then((result) => {
        console.log(
          `added ${person.name} number ${person.number} to phonebook`
        );
        mongoose.connection.close();
      });
    })
    .catch((err) => console.log(err));
} else if (process.argv.length === 3) {
  mongoose
    .connect(url)
    .then((result) => {
      console.log("phonebook:");
      Person.find({}).then((result) => {
        result.forEach((person) => {
          console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
      });
    })
    .catch((err) => console.log(err));
}

function generateId() {
  return Math.floor(Math.random() * 999999999) + 1;
}
