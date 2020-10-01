import React from 'react';

const CountryInfo = ({ country }) => (
  <div>
    <h1>{country.name}</h1>

    <p>capital: {country.capital}</p>
    <p>population: {country.population}</p>

    <h2>Languages</h2>

    <ul>
      {country.languages.map((language) => (
        <li key={language.iso639_1}>{language.name}</li>
      ))}
    </ul>

    <div>
      <img src={country.flag} alt={`flag for ${country.name}`} width='200' />
    </div>
  </div>
);
export default CountryInfo;
