// js/weather.js

// Your Weatherstack API key & location
const apiKey  = 'f052528532bdef5f3cf43f247beb9e91';
const latLon  = '41.42745194130984,-71.4972919923618';
const endpoint = 
  `https://api.weatherstack.com/current?access_key=${apiKey}&query=${latLon}&units=f`;

document.addEventListener('DOMContentLoaded', () => {
  const widget = document.getElementById('weather-widget');

  fetch(endpoint)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      const curr = data.current;
      const html = `
        <p><strong>Temperature:</strong> ${curr.temperature}°F</p>
        <p><strong>Conditions:</strong> ${curr.weather_descriptions.join(', ')}</p>
        <p><strong>Wind Speed:</strong> ${curr.wind_speed} mph</p>
        ${curr.weather_icons?.[0] ? 
          `<img src="${curr.weather_icons[0]}" alt="Weather icon">` : ''}
      `;
      widget.innerHTML = html;
    })
    .catch(err => {
      console.error('Weather fetch error:', err);
      widget.innerHTML = '<p>Unable to load weather at this time.</p>';
    });
});