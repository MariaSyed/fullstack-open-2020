import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import personService from './services/persons';

const App = () => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService.getAll().then((fetchedPersons) => setPersons(fetchedPersons));
  }, []);

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = await personService.create({
        name: newName,
        number: newNumber,
      });
      setPersons([...persons, newPerson]);
      setNewName('');
      setNewNumber('');
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={nameFilter} setFilter={setNameFilter} />

      <h3>Add a new</h3>

      <PersonForm
        name={newName}
        number={newNumber}
        submit={handleSubmitForm}
        setName={setNewName}
        setNumber={setNewNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} filter={nameFilter} />
    </div>
  );
};

export default App;
