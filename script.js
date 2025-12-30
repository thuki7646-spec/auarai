const apiKey = 'YOUR_API_KEY_HERE';

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
      saveHistory(city);
      showHistory();
    })
    .catch(error => {
      result.innerHTML = error.message;
    });
}

function saveHistory(city) {
  let cities = JSON.parse(localStorage.getItem('cities')) || [];
  cities.unshift(city);
  cities = [...new Set(cities)].slice(0, 3);
  localStorage.setItem('cities', JSON.stringify(cities));
}

function showHistory() {
  const history = JSON.parse(localStorage.getItem('cities')) || [];
  const list = document.getElementById('history');
  list.innerHTML = '';

  history.forEach(city => {
    const li = document.createElement('li');
    li.textContent = city;
    list.appendChild(li);
  });
}

showHistory();
