import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import phonebookService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    phonebookService.getAll().then((initialPerson) => {
      setPersons(initialPerson);
    });
  });

  const valueChange = (e) => {
    setNewName(e.target.value);
  };

  const numberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: (persons.length + 1).toString(),
    };
    if (
      persons.find((person) => {
        return person.name === newName;
      })
    ) {
      if(confirm(newName + " is already added to phoneboo, replace the old nuber with a new one?")){
        const personToUpdate = persons.find(p => p.name === newName)
        const updatePerson = {...personToUpdate, number: newNumber}
        phonebookService.update((personToUpdate.id), updatePerson).then((updateContact) => {
          setPersons(persons.map(person => person.id === personToUpdate.id? updateContact : person))
        })
      }else{
        return;
      };
    } else if (
      persons.find((person) => {
        return person.number === newNumber;
      })
    ) {
      alert(newNumber + " already exists");
    } else {
      phonebookService.create(newPerson).then((newContact) => {
        setPersons(persons.concat(newContact));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const filteredPersons = persons.filter((person) => {
    return (
      person.name.toLowerCase().includes(search.toLowerCase()) ||
      person.number.includes(search)
    );
  });

  const remove = (id) => {
    if (confirm(`Delete ${persons.find((p) => p.id === id).name} ?`)) {
      phonebookService.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }else{
      return;
    }
  };

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
      {filteredPersons.map((person) => {
        return <Persons key = {person.id} person={person} remove={() => remove(person.id)} />;
      })}
    </div>
  );
};

export default App;
