import React, { useEffect, useState } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [persons, setPersons] = useState([]);

  const [notificationMessage, setNotificationMessage] = useState();
  const [notificationVariant, setNotificationVariant] = useState();

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

  const handleSuccessMessage = (successMessage) => {
    setNotificationVariant('success');
    setNotificationMessage(successMessage);

    setTimeout(() => setNotificationMessage(), 3000);
  };

  const handleErrorMessage = (errorMessage) => {
    setNotificationVariant('error');
    setNotificationMessage(errorMessage);

    setTimeout(() => setNotificationMessage(), 3000);
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
    handleSuccessMessage(`Added ${newName}`);
    refreshPersons();
  };

  const handleDeletePerson = async (personToDelete) => {
    const confirmed = window.confirm(`Delete ${personToDelete.name}?`);
    if (!confirmed) return;

    await personService.delete(personToDelete);
    refreshPersons();
  };

  const handleUpdatePerson = async (personToUpdate) => {
    const { name } = personToUpdate;

    const confirmed = window.confirm(
      `${name} is already added to phonebook, replace old number with new one?`
    );
    if (!confirmed) return;

    try {
      await personService.update(personToUpdate);
      handleSuccessMessage(`Updated ${name}`);
    } catch (error) {
      if (error.response?.status === 404) {
        // Not found
        handleErrorMessage(
          `Information of ${name} has already been removed from the server`
        );
      }
    } finally {
      refreshPersons();
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={nameFilter} setFilter={setNameFilter} />

      <Notification
        variant={notificationVariant}
        message={notificationMessage}
      />

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
