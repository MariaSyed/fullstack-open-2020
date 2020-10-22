import React from 'react';

const Person = ({ person }) => (
  <p>
    {person.name} {person.number}
  </p>
);

const Persons = ({ persons, filter, deletePerson }) => {
  return (
    <div>
      {persons
        .filter((p) =>
          filter !== ''
            ? p.name.toLowerCase().includes(filter.toLowerCase())
            : true
        )
        .map((person) => (
          <span key={person._id}>
            <Person key={person.name} person={person} />
            <button onClick={() => deletePerson(person)}>delete</button>
          </span>
        ))}
    </div>
  );
};

export default Persons;
