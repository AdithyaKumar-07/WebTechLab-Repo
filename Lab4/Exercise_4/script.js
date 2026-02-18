let lastSearchedCityData = null;

document.getElementById('searchBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) return;

   const apiKey = 'e12aeca178d5f08d4ba902dcb9704779';
   const url = `https://api.openweathermap.org{city}&units=metric&appid=${apiKey}`;


    const display = document.getElementById('weatherDisplay');
    const loader = document.getElementById('loader');
    const errorDiv = document.getElementById('errorMessage');

    display.innerHTML = '';
    errorDiv.innerText = '';
    loader.style.display = 'block';

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
        loader.style.display = 'none';
        console.log("Status Code:", xhr.status);
        console.log("Response:", xhr.responseText);
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            lastSearchedCityData = data;

            display.innerHTML = `
                <h3>${data.name}</h3>
                <p><strong>Temp:</strong> ${Math.round(data.main.temp)}°C</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Condition:</strong> ${data.weather[0].description}</p>
            `;
        } else {
            errorDiv.innerText = (xhr.status === 404) ? "City not found." : "Service unavailable.";
        }
    };

    xhr.onerror = function() {
        loader.style.display = 'none';
        errorDiv.innerText = "Network error occurred.";
    };

    xhr.send();
});
