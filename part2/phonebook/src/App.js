import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((fetchedPersons) => setPersons(fetchedPersons.data));
  }, []);

  const handleSubmitForm = (event) => {
    event.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, { name: newName, number: newNumber }]);
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
