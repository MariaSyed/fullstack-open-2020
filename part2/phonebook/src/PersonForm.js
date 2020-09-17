import React from 'react';

const PersonForm = ({ name, number, setName, setNumber, submit }) => (
  <form onSubmit={submit}>
    <div>
      name:{' '}
      <input value={name} onChange={(event) => setName(event.target.value)} />
    </div>
    <div>
      number:{' '}
      <input
        value={number}
        onChange={(event) => setNumber(event.target.value)}
      />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
);

export default PersonForm;
