const API_KEY = "7854bd9a5d531a2ed0e328921b07d7fc";


// ===== City Search =====

function getWeatherByCity() {

  const city = document.getElementById("cityInput").value;

  if (city === "") {
    document.getElementById("error").innerText =
      "Please enter city name";
    return;
  }

  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  fetchWeather(url);
}


// ===== Location =====

function getWeatherByLocation() {

  if (!navigator.geolocation) {
    document.getElementById("error").innerText =
      "Location not supported";
    return;
  }

  navigator.geolocation.getCurrentPosition((pos) => {

    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    const url =
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    fetchWeather(url);

  }, () => {

    document.getElementById("error").innerText =
      "Location permission denied";

  });

}


// ===== Fetch Data =====

function fetchWeather(url) {

  fetch(url)
    .then(res => res.json())
    .then(data => showWeather(data))
    .catch(() => {

      document.getElementById("error").innerText =
        "Error fetching weather";

    });
}


// ===== Show Result =====

function showWeather(data) {

  if (data.cod == "404") {

    document.getElementById("error").innerText =
      "City not found";

    return;
  }

  document.getElementById("cityName").innerText =
    data.name;

  document.getElementById("temp").innerText =
    "🌡 Temperature: " + data.main.temp + " °C";

  document.getElementById("condition").innerText =
    "🌥 Condition: " + data.weather[0].description;

  document.getElementById("humidity").innerText =
    "💧 Humidity: " + data.main.humidity + "%";

  document.getElementById("wind").innerText =
    "💨 Wind Speed: " + data.wind.speed + " m/s";

  document.getElementById("weatherResult").style.display =
    "block";

  document.getElementById("error").innerText = "";
}
