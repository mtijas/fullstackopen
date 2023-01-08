import { useState, useEffect } from "react";
import PersonsTable from "./components/PersonsTable";
import AddForm from "./components/AddForm";
import Filter from "./components/Filter";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const updateNumber = (id, number) => {
    const person = persons.find((person) => person.id === id);
    const changedPerson = { ...person, number: number };

    personsService.update(id, changedPerson).then((returnedPerson) => {
      setPersons(
        persons.map((person) => (person.id !== id ? person : returnedPerson))
      );
    });
  };

  const addPerson = (event) => {
    event.preventDefault();
    const foundPerson = persons.find((person) => person.name === newName);

    if (foundPerson !== undefined) {
      if (window.confirm(`${newName} is already added to the phonebook. Update number instead?`)) {
        updateNumber(foundPerson.id, newNumber)
      }
      setNewName("");
      setNewNumber("");
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personsService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (id) => {
    personsService.deleteObject(id).then((returnedData) => {
      setPersons(persons.filter((person) => person.id !== id));
    });
  };

  const shownPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Add a new record</h2>
      <AddForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={(event) => setNewName(event.target.value)}
        handleNumberChange={(event) => setNewNumber(event.target.value)}
      />
      <h2>Numbers</h2>
      <Filter handleFilterChange={(event) => setFilter(event.target.value)} />
      <PersonsTable persons={shownPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
