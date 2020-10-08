import React, { useEffect, useState } from 'react';
import axios from 'axios';

const weatherApiKey = process.env.REACT_APP_API_KEY;
const weatherApiUrl = 'http://api.weatherstack.com';
const weatherPlaceholderIconUrl =
  'https://via.placeholder.com/50?text=weather-icon';

const fetchWeather = (city) =>
  axios.get(
    `${weatherApiUrl}/current?access_key=${weatherApiKey}&query=${city}`
  );

const WeatherInfo = ({ capital, weatherInfo }) => (
  <div>
    <h2>Weather in {capital}</h2>

    <p>
      <strong>temperature: </strong>
      {weatherInfo?.temperature} Celcius
    </p>
    <img
      src={(weatherInfo?.weather_icons || [])[0] || weatherPlaceholderIconUrl}
    />
    <p>
      <strong>wind: </strong>
      {weatherInfo?.wind_speed} mph direction {weatherInfo?.wind_dir}
    </p>
  </div>
);

const CountryInfo = ({ country }) => {
  const [weatherInfo, setWeatherInfo] = useState();

  useEffect(() => {
    fetchWeather(country.capital).then((response) => {
      if (response.status === 200) {
        setWeatherInfo(response.data.current);
      }
    });
  }, [country]);

  return (
    <div>
      <h1>{country.name}</h1>

      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>

      <h2>Spoken languages</h2>

      <ul>
        {country.languages.map((language) => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>

      <div>
        <img src={country.flag} alt={`flag for ${country.name}`} width='200' />
      </div>

      {weatherInfo ? (
        <WeatherInfo capital={country.capital} weatherInfo={weatherInfo} />
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};
export default CountryInfo;
