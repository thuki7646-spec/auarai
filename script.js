const apiKey = "a624721f5ac51fbe51589472fac68765";

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const result = document.getElementById("result");

    if (!city) {
        result.innerHTML = "Қала атауын енгізіңіз!";
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kk`
        );

        if (!response.ok) throw new Error("Қала табылмады");

        const data = await response.json();

        result.innerHTML = `
            <p><b>Қала:</b> ${data.name}</p>
            <p><b>Температура:</b> ${data.main.temp} °C</p>
            <p><b>Сипаттама:</b> ${data.weather[0].description}</p>
            <p><b>Ылғалдылық:</b> ${data.main.humidity}%</p>
        `;

        saveHistory(city);

    } catch (error) {
        result.innerHTML = error.message;
    }
}

function saveHistory(city) {
    let history = JSON.parse(localStorage.getItem("cities")) || [];
    history.unshift(city);
    history = [...new Set(history)].slice(0, 3);
    localStorage.setItem("cities", JSON.stringify(history));
}
