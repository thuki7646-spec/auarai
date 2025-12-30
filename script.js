const apiKey = 'a624721f5ac51fbe51589472fac68765';

function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const result = document.getElementById('result');

  if (!city) {
    result.innerHTML = '❗ Қала атауын енгізіңіз';
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric&lang=kk`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('❌ Қала табылмады');
      }
      return response.json();
    })
    .then(data => {
      result.innerHTML = `
        <h3>📍 ${data.name}</h3>
        <p>🌡 Температура: ${data.main.temp} °C</p>
        <p>☁ Ауа райы: ${data.weather[0].description}</p>
        <p>💧 Ылғалдылық: ${data.main.humidity}%</p>
