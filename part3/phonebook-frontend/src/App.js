import { useState, useEffect } from "react";
import PersonsTable from "./components/PersonsTable";
import AddForm from "./components/AddForm";
import Filter from "./components/Filter";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const updateNumber = (id, number) => {
    const person = persons.find((person) => person.id === id);
    const changedPerson = { ...person, number: number };

    personsService
      .update(id, changedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) => (person.id !== id ? person : returnedPerson))
        );
        setNotification({
          message: `Updated '${person.name}'`,
          type: "success",
        });
        setTimeout(() => setNotification(null), 5000);
      })
      .catch((error) => {
        setNotification({ message: error.response.data.error, type: "error" });
        setTimeout(() => setNotification(null), 5000);
      });
  };

  const addPerson = (event) => {
    event.preventDefault();
    const foundPerson = persons.find((person) => person.name === newName);

    if (foundPerson !== undefined) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook. Update number instead?`
        )
      ) {
        updateNumber(foundPerson.id, newNumber);
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
      setNotification({
        message: `Added '${newName}'`,
        type: "success",
      });
      setTimeout(() => setNotification(null), 5000);
      setNewName("");
      setNewNumber("");
    })
    .catch((error) => {
      setNotification({ message: error.response.data.error, type: "error" });
      setTimeout(() => setNotification(null), 5000);
    });
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    personsService
      .deleteObject(id)
      .then((returnedData) => {
        setPersons(persons.filter((person) => person.id !== id));
        setNotification({
          message: `Deleted '${person.name}'`,
          type: "success",
        });
        setTimeout(() => setNotification(null), 5000);
      })
      .catch((error) => {
        setNotification({
          message: `The person '${person.name}' was already deleted from the server`,
          type: "error",
        });
        setTimeout(() => setNotification(null), 5000);
        setPersons(persons.filter((person) => person.id !== id));
      });
  };

  const shownPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
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
