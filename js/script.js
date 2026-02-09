function getWeather() {

    const city = document.getElementById("cityInput").value;
    const error = document.getElementById("error");
    const card = document.getElementById("weatherCard");

    if (city === "") {
        error.innerText = "Please enter a city name";
        card.style.display = "none";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            if (data.cod === "404") {
                error.innerText = "City not found!";
                card.style.display = "none";
                return;
            }

            document.getElementById("cityName").innerText = data.name;
            document.getElementById("temp").innerText =
                `Temperature: ${data.main.temp} °C`;

            document.getElementById("condition").innerText =
                `Condition: ${data.weather[0].description}`;

            document.getElementById("humidity").innerText =
                `Humidity: ${data.main.humidity}%`;

            document.getElementById("wind").innerText =
                `Wind Speed: ${data.wind.speed} m/s`;

            error.innerText = "";
            card.style.display = "block";

        })
        .catch(() => {
            error.innerText = "Something went wrong!";
            card.style.display = "none";
        });

}
