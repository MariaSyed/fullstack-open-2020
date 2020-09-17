import React from 'react';

const Person = ({ person }) => (
  <p>
    {person.name} {person.number}
  </p>
);

const Persons = ({ persons, filter }) => {
  return (
    <div>
      {persons
        .filter((p) =>
          filter !== ''
            ? p.name.toLowerCase().includes(filter.toLowerCase())
            : true
        )
        .map((person) => (
          <Person key={person.name} person={person} />
        ))}
    </div>
  );
};

export default Persons;
