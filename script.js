const apikey = "87ead67978eb8becf022b0cf79db0e68";
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&";
const city = document.getElementById("inputcity");

const weather = document.querySelector(".weather");
const message = document.querySelector(".message");

let messageTimeout;

async function checkWeather(name) {
  if (name.trim() === "") {
    weather.style.display = "none";
    showMessage("Please Enter City name...");
    return;
  }

  hideMessage();
  try {
    const response = await fetch(url + `&appid=${apikey}&q=${name}`);
    const data = await response.json();

    if (!response.ok) {
      weather.style.display = "none";
      showMessage("Please Enter Valid city Name");

      return;
    } else {
      // console.log(data);
      document.querySelector(".city").innerHTML =
        `${data.name},${data.sys.country}`;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp);
      document.querySelector(".humidity").innerHTML = data.main.humidity;
      document.querySelector(".wind").innerHTML = data.wind.speed;

      const weatherMain = data.weather[0].main;
      const iconCode = data.weather[0].icon;
      document.body.className = "";

      // switch (weatherMain) {
      //   case "Rain":
      //   case "Drizzle":
      //   case "Thunderstorm":
      //     document.body.classList.add("rain-bg");
      //     break;
      //   case "Clear":
      //     if (iconCode.includes("n")) {
      //       document.body.classList.add("night-bg");
      //     } else {
      //       document.body.classList.add("sunny-bg");
      //     }
      //     break;

      //   case "Clouds":
      //     document.body.classList.add("cloud-bg");
      //     break;

      //   case "Snow":
      //     document.body.classList.add("snow-bg");
      //     break;
      //   case "Mist":
      //   case "Smoke":
      //   case "Haze":
      //   case "Fog":
      //   case "Dust":
      //   case "Sand":
      //   case "Ash":
      //   case "Squall":
      //   case "Tornado":
      //     document.body.classList.add("fog-bg");
      //     break;

      //   default:
      //     document.body.classList.add("default-bg");
      // }

      //background image change
      const weatherMap = {
        Rain: "rain-bg",
        Drizzle: "rain-bg",
        Thunderstorm: "rain-bg",
        Clouds: "cloud-bg",
        Snow: "snow-bg",
        Mist: "fog-bg",
        Haze: "fog-bg",
        Fog: "fog-bg",
        Smoke: "fog-bg",
      };

      if (weatherMain === "Clear") {
        document.body.classList.add(
          iconCode.includes("n") ? "night-bg" : "sunny-bg",
        );
      } else if (weatherMain === "Clouds") {
        document.body.classList.add(
          iconCode.includes("n") ? "night-bg" : "sunny-bg",
        );
      } else {
        document.body.classList.add(weatherMap[weatherMain] || "default-bg");
      }

      // Rain Effects

      const rainEffect = document.querySelector(".rain");
      const snowEffect = document.querySelector(".snow");

      /* reset effects */
      rainEffect.style.display = "none";
      snowEffect.style.display = "none";

      /* enable based on weather */

      if (["Rain", "Drizzle", "Thunderstorm"].includes(weatherMain)) {
        rainEffect.style.display = "block";
      }

      if (weatherMain === "Snow") {
        snowEffect.style.display = "block";
      }

      // Weather Animation

      const weatherIcon = document.querySelector(".weather-icon");

      /* remove old animations */

      weatherIcon.className = "weather-icon";

      /* icon source from OpenWeather */

      weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

      /* auto animation */

      if (weatherMain === "Clear") {
        weatherIcon.classList.add(
          iconCode.includes("n") ? "night-icon" : "sunny-icon",
        );
      } else if (weatherMain === "Clouds") {
        weatherIcon.classList.add("cloud-icon");
      } else if (["Rain", "Drizzle", "Thunderstorm"].includes(weatherMain)) {
        weatherIcon.classList.add("rain-icon");
      } else if (weatherMain === "Snow") {
        weatherIcon.classList.add("snow-icon");
      }

      weather.style.display = "flex";
    }
  } catch (error) {
    showMessage("Somehting went wrong");
  }
}

const btn = document.querySelector(".button");
btn.addEventListener("click", async () => {
  checkWeather(city.value);
});

function hideMessage() {
  message.classList.remove("show");
  messageTimeout = setTimeout(() => {
    message.classList.add("d-none");
  }, 400);
}

function showMessage(text) {
  clearTimeout(messageTimeout);
  message.textContent = text;
  message.classList.remove("d-none");
  setTimeout(() => {
    message.classList.add("show");
  }, 10);
}
