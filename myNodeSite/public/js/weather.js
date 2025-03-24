// public/js/weather.js

document.addEventListener("DOMContentLoaded", () => {
    const weatherContainer = document.getElementById("weather");
  
    if (!weatherContainer) return;
  
    const apiKey = "f052528532bdef5f3cf43f247beb9e91";
    const location = "41.42745194130984,-71.4972919923618";
    const url = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${location}&units=f`;
  
    weatherContainer.innerHTML = "<p>Loading weather data...</p>";
  
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (!data || !data.current) {
          throw new Error("Invalid weather data");
        }
  
        const { temperature, weather_descriptions, wind_speed, weather_icons } = data.current;
  
        weatherContainer.innerHTML = `
          <h3>Current Weather at the Sailing Center</h3>
          <p>Temperature: ${temperature}°F</p>
          <p>Conditions: ${weather_descriptions.join(", ")}</p>
          <p>Wind Speed: ${wind_speed} mph</p>
          ${
            weather_icons && weather_icons.length
              ? `<img src="${weather_icons[0]}" alt="Weather icon" />`
              : ""
          }
        `;
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        weatherContainer.innerHTML = "<p>Could not load weather data.</p>";
      });
  });
  