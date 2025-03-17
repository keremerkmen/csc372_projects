/**
 * Weather.js
 * This component fetches current weather data from the Weatherstack API
 * and displays it on the page. You can find this file in the src/components folder.
 * 
 * API Integration Overview:
 *  - We use a GET request to the Weatherstack API endpoint (http://api.weatherstack.com).
 *  - We pass our API key, coordinates, and desired units in the query string.
 *  - The response includes temperature, weather conditions, and other relevant info.
 *  - We then parse and display these details in the UI.
 */

import React, { useState, useEffect } from 'react';

function Weather() {
  // ---------------------------------------------
  // State Variables
  // ---------------------------------------------
  // weatherData will hold the JSON response from the Weatherstack API.
  // loading tracks whether we are currently fetching data.
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---------------------------------------------
  // API Key and Location Setup
  // ---------------------------------------------
  // 1) Use your Weatherstack API key (DO NOT share publicly in production).
  // 2) Provide the latitude and longitude of the URI Sailing Center.
  // 3) The 'units=f' parameter indicates we want the temperature in Fahrenheit.
  const apiKey = 'f052528532bdef5f3cf43f247beb9e91';
  const location = '41.42745194130984,-71.4972919923618'; // "lat,lon" format for Weatherstack
  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${location}&units=f`;

  // ---------------------------------------------
  // Fetch Weather Data
  // ---------------------------------------------
  // We use the useEffect hook to call the API when the component mounts.
  // The fetch function returns a promise. If successful, we parse the JSON
  // and store it in weatherData. If there's an error, we log it and stop loading.
  useEffect(() => {
    fetch(url)
      .then(response => {
        // If the response is not OK, we throw an error to be caught below.
        if (!response.ok) {
          throw new Error(`Error fetching weather data. Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Store the API response in state and indicate loading is finished.
        setWeatherData(data);
        setLoading(false);
      })
      .catch(error => {
        // If there's an error (e.g., invalid key, network issue),
        // we log it and indicate that loading is done to avoid an endless spinner.
        console.error('Error fetching weather data:', error);
        setLoading(false);
      });
  }, [url]);

  // ---------------------------------------------
  // Loading and Error Handling
  // ---------------------------------------------
  // 1) If we're still loading, display a loading message.
  // 2) If weatherData is null (meaning we couldn't fetch anything),
  //    display an error message.
  if (loading) {
    return <div>Loading weather data...</div>;
  }

  if (!weatherData || !weatherData.current) {
    return <div>Could not load weather data.</div>;
  }

  // ---------------------------------------------
  // Destructuring the Data
  // ---------------------------------------------
  // Weatherstack returns an object with 'current' weather info.
  // We extract what we need for display: temperature, descriptions, wind speed, and icons.
  const { temperature, weather_descriptions, wind_speed, weather_icons } = weatherData.current;

  // ---------------------------------------------
  // Render the Weather Information
  // ---------------------------------------------
  // We display a header, the temperature, conditions, wind speed, and an icon.
  return (
    <div>
      <h2>Current Weather at the Sailing Center</h2>
      <p>Temperature: {temperature}°F</p>
      <p>Conditions: {weather_descriptions.join(', ')}</p>
      <p>Wind Speed: {wind_speed} mph</p>
      {weather_icons && weather_icons.length > 0 && (
        <img src={weather_icons[0]} alt="Weather icon" />
      )}
    </div>
  );
}

export default Weather;
