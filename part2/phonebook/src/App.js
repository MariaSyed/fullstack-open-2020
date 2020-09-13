import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState(persons);

  const onSubmit = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, { name: newName, number: newNumber }]);
      setNewName('');
      setNewNumber('');
    }
  };

  const filterPhonebook = ({ target: { value } }) => {
    setKeyword(value);

    setSearchResults(
      persons.filter((person) =>
        person.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const phonebook = keyword ? searchResults : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with a:
        <input value={keyword} onChange={filterPhonebook} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={onSubmit}>
        <div>
          name:{' '}
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          number:{' '}
          <input
            value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {phonebook.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
