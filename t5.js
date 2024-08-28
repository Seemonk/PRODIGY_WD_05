const apiKey = '647545957adb10fc8eb5d27c74b7ab00';

function displayWeather(data) {
    document.getElementById('weatherInfo').style.display = 'block';

    document.getElementById('location').textContent = `Location: ${data.name}, ${data.sys.country}`;
    document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

function getWeatherByCity() {
    const city = document.getElementById('cityInput').value;

    if (city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => alert('Error fetching weather data for city: ' + error.message));
    } else {
        alert('Please enter a city name');
    }
}

function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => displayWeather(data))
                .catch(error => alert('Error fetching weather data by location: ' + error.message));
        }, (error) => {
            alert('Unable to retrieve your location: ' + error.message);
        });
    } else {
        alert('Geolocation is not supported by your browser');
    }
}