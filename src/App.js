import React, { useState } from 'react';
import './App.css';

const WeatherApp = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '8ed498a801555dea016dc087f2a58d2f';

  const getWeather = async (event) => {
    event.preventDefault();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
        setError('');
      } else {
        setError('Location not found!');
        setWeatherData(null);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data');
      setWeatherData(null);
    }
  };

  const displayWeather = () => {
    if (!weatherData) return null;
    const { name, main, weather, wind } = weatherData;
    const iconCode = weather[0].icon;
    const iconurl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    return (
      <div className="weather-output">
        <h2>Weather in {name}</h2>
        <img src={iconurl} alt={weather[0].description} className="weather-icon" />
        <h3>{main.temp}°C</h3>
        <p>{weather[0].description}</p>
        <p>Humidity: {main.humidity}%</p>
        <p>Wind speed: {wind.speed} km/h</p>
      </div>
    );
  };

  return (
    <div className="container">
      <form className="search-bar" onSubmit={getWeather}>
        <input
          type="text"
          id="location"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {displayWeather()}
    </div>
  );
};

export default WeatherApp;