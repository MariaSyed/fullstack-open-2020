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
    refreshPersons();
  }, []);

  const refreshPersons = async () => {
    const fetchedPersons = await personService.getAll();
    setPersons(fetchedPersons);
  };

  const resetForm = () => {
    setNewName('');
    setNewNumber('');
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);
    const isDuplicate = existingPerson && existingPerson.number === newNumber;

    if (isDuplicate) {
      window.alert(
        `${newName} with number ${newNumber} is already added to phonebook`
      );
    } else if (existingPerson && !isDuplicate) {
      handleUpdatePerson({ ...existingPerson, number: newNumber });
    } else {
      handleCreatePerson();
    }

    resetForm();
  };

  const handleCreatePerson = async () => {
    await personService.create({ name: newName, number: newNumber });
    refreshPersons();
  };

  const handleDeletePerson = async (personToDelete) => {
    const confirmed = window.confirm(`Delete ${personToDelete.name}?`);
    if (confirmed) {
      await personService.delete(personToDelete);
      refreshPersons();
    }
  };

  const handleUpdatePerson = async (personToUpdate) => {
    const confirmed = window.confirm(
      `${personToUpdate.name} is already added to phonebook, replace old number with new one?`
    );
    if (confirmed) {
      await personService.update(personToUpdate);
      refreshPersons();
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

      <Persons
        persons={persons}
        filter={nameFilter}
        deletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
