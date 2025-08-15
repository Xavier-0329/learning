import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "01234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const valueChange = (e) => {
    setNewName(e.target.value);
  };

  const numberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    if (
      persons.find((person) => {
        return person.name === newName;
      })
    ) {
      alert(newName + " already exists");
    } else if (
      persons.find((person) => {
        return person.number === newNumber;
      })
    ) {
      alert(newNumber + " already exists");
    } else {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  const filteredPersons = persons.filter((person) => {
    return (
      person.name.toLowerCase().includes(search.toLowerCase()) ||
      person.number.includes(search)
    );
  });
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} searchChange={(e) => setSearch(e.target.value)} />
      <h2>add a new</h2>
      <PersonForm
        handleAdd={handleAdd}
        newName={newName}
        valueChange={valueChange}
        newNumber={newNumber}
        numberChange={numberChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
