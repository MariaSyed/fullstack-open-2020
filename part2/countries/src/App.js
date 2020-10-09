import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountryInfo from './CountryInfo';

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCountry, setSelectedCountry] = useState();

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => setAllCountries(response.data));
  }, []);

  const handleChange = (setValue) => (event) => {
    setValue(event.target.value);
    setSelectedCountry();
  };

  const selectCountry = (country) => () => setSelectedCountry(country);

  const countries = allCountries.filter((country) =>
    filter ? country.name.toLowerCase().includes(filter.toLowerCase()) : true
  );

  return (
    <div>
      find countries:
      <input value={filter} onChange={handleChange(setFilter)} />
      <div>
        {selectedCountry || countries.length === 1 ? (
          <CountryInfo country={selectedCountry || countries[0]} />
        ) : countries.length > 10 ? (
          'Too many matches, specify another filter'
        ) : (
          countries.map((country) => (
            <p key={country.numericCode}>
              {country.name}
              <button onClick={selectCountry(country)}>show</button>
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
