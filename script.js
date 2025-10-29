// script.js - Weather API Dashboard
const apiKey = "3e06dd695151f4e77326250b36354fad"; // <-- Replace with your own OpenWeather API key
const apiBase = "https://api.openweathermap.org/data/2.5/";

const cityNameElem = document.getElementById("city-name");
const currentTempElem = document.getElementById("current-temp");
const weatherDescElem = document.getElementById("weather-desc");
const mainIconElem = document.getElementById("main-icon");
const realFeelElem = document.getElementById("real-feel");
const rainChanceElem = document.getElementById("rain-chance");
const windElem = document.getElementById("wind");
const uvIndexElem = document.getElementById("uv-index");
const hourlyForecastElem = document.getElementById("hourly-forecast");
const weeklyForecastElem = document.getElementById("weekly-forecast");
const searchBtn = document.getElementById("search-btn");
const citySearchInput = document.getElementById("city-search");

searchBtn.onclick = () => {
  const city = citySearchInput.value.trim();
  if (city.length > 0) {
    getWeather(city);
  } else {
    alert("Please enter a city name.");
  }
};

citySearchInput.addEventListener('keypress', function(e) {
  if(e.key === 'Enter') {
    searchBtn.click();
  }
});

// Fetch current weather + forecast
async function getWeather(city) {
  // Current weather
  const currentUrl = `${apiBase}weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
  // 5-day/3-hour forecast
  const forecastUrl = `${apiBase}forecast?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl)
    ]);
    if (!currentRes.ok) throw new Error('City not found');
    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();
    renderCurrentWeather(currentData);
    renderForecast(forecastData);
  } catch (err) {
    alert("Unable to fetch weather for this city. Try again.");
  }
}

function renderCurrentWeather(data) {
  cityNameElem.textContent = `${data.name}`;
  currentTempElem.textContent = `${Math.round(data.main.temp)}°`;
  weatherDescElem.textContent = data.weather[0].description;
  mainIconElem.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">`;
  realFeelElem.textContent = `${Math.round(data.main.feels_like)}°`;
  rainChanceElem.textContent = (data.rain && data.rain["1h"] ? `${data.rain["1h"]}%` : "0%");
  windElem.textContent = `${data.wind.speed} km/h`;
  uvIndexElem.textContent = "--"; // UV Index needs 'onecall' API; use -- for now
}

function renderForecast(data) {
  // Hourly forecast for next 6 timeslots
  let hourlyHtml = "<h2>Hourly Weather</h2>";
  data.list.slice(0, 6).forEach(item => {
    const time = new Date(item.dt * 1000);
    hourlyHtml += `<div class="hourly-block">
      <div class="hourly-time">${time.getHours()}:00</div>
      <div class="hourly-icon"><img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt=""></div>
      <div class="hourly-temp">${Math.round(item.main.temp)}°</div>
    </div>`;
  });
  hourlyForecastElem.innerHTML = hourlyHtml;

  // Daily forecast (group by day)
  const days = {};
  data.list.forEach(item => {
    const dateStr = new Date(item.dt * 1000).toLocaleDateString();
    if (!days[dateStr]) days[dateStr] = [];
    days[dateStr].push(item);
  });
  let weeklyHtml = "<h2>Weekly Weather</h2>";
  Object.entries(days).slice(0,7).forEach(([date, entries]) => {
    // Use noon as daily temp/icon average
    const noon = entries[Math.floor(entries.length/2)];
    weeklyHtml += `<div class="daily-block">
      <div class="daily-date">${date}</div>
      <div class="daily-icon"><img src="https://openweathermap.org/img/wn/${noon.weather[0].icon}.png"></div>
      <div class="daily-temp">${Math.round(noon.main.temp)}°</div>
      <div class="daily-desc">${noon.weather[0].main}</div>
    </div>`;
  });
  weeklyForecastElem.innerHTML = weeklyHtml;
}

// Initial load - default city
getWeather("Delhi");
