function getLocationWeather() {

    const error = document.getElementById("error");

    if (!navigator.geolocation) {
        error.innerText = "Geolocation is not supported by your browser.";
        return;
    }

    error.innerText = "Detecting your location...";

    navigator.geolocation.getCurrentPosition(
        successLocation,
        errorLocation
    );
}

function successLocation(position) {

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    fetchWeatherByCoords(url);
}

function errorLocation() {
    document.getElementById("error").innerText =
        "Unable to access your location. Please allow permission.";
}

function fetchWeatherByCoords(url) {

    fetch(url)
        .then(res => res.json())
        .then(data => {

            document.getElementById("cityName").innerText = data.name;

            document.getElementById("temp").innerText =
                `Temperature: ${data.main.temp} °C`;

            document.getElementById("condition").innerText =
                `Condition: ${data.weather[0].description}`;

            document.getElementById("humidity").innerText =
                `Humidity: ${data.main.humidity}%`;

            document.getElementById("wind").innerText =
                `Wind Speed: ${data.wind.speed} m/s`;

            document.getElementById("error").innerText = "";

            document.getElementById("weatherCard").style.display = "block";
        })
        .catch(() => {
            document.getElementById("error").innerText =
                "Failed to fetch location weather.";
        });
}
window.onload = () => {
    getLocationWeather();
};
