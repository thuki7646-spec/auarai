const apiKey = 'ӨЗ_API_KEY_ОСЫ_ЖЕРГЕ';

function getWeather() {
  const city = document.getElementById('cityInput').value;
  const result = document.getElementById('result');

  if (!city) {
    result.innerHTML = 'Қала атауын енгізіңіз';
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kk`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Қала табылмады');
      }
      return response.json();
    })
    .then(data => {
      result.innerHTML = `
        <h3>${data.name}</h3>
        <p>🌡 Температура: ${data.main.temp} °C</p>
        <p>☁ Ауа райы: ${data.weather[0].description}</p>
        <p>💧 Ылғалдылық: ${data.main.humidity}%</p>
      `;
    })
    .catch(error => {
      result.innerHTML = error.message;
    });
}
