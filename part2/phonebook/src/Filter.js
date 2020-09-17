import React from 'react';

const Filter = ({ filter, setFilter }) => (
  <div>
    filter shown with a:
    <input value={filter} onChange={(event) => setFilter(event.target.value)} />
  </div>
);

export default Filter;
