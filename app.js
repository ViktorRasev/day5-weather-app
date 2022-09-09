const adress = document.querySelector(".adress");
const resolvedAddress = document.querySelector(".resolved-address");
const description = document.querySelector(".description");
const temperature = document.querySelector(".temperature");
const fellsLike = document.querySelector(".fells-like");
const humidity = document.querySelector(".humidity");
const pressure = document.querySelector(".pressure");
const uvIndex = document.querySelector(".uv-index");
const refreshBtn = document.querySelector(".refresh-btn");
const counter = document.querySelector(".counter");

const apiKey = "LB2RHRDMDVFNMMB9D6YPNMFAV";


window.addEventListener("load", currentTime)

let onResettime
function currentTime(){
  onResettime = new Date().getTime() / 60_000 
  counter.textContent = `Updated 0 minutes ago`
}

let timeAgo
let result
setInterval(() => { 
  timeAgo = new Date().getTime() / 60_000
  result = Math.floor((timeAgo - onResettime))
  counter.textContent = `Updated ${Math.floor((result))} minutes ago`
}, 1000)


async function getWeatherData() {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Praha?unitGroup=metric&key=${apiKey}&contentType=json`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();

  adress.textContent = data.address;
  resolvedAddress.textContent = data.resolvedAddress;
  description.textContent = data.description;
  temperature.textContent = `Temperature: ${data.currentConditions.temp}°C`;
  fellsLike.textContent = `Feels like: ${data.currentConditions.feelslike}°C`;
  humidity.textContent = `Humidity: ${data.currentConditions.humidity}%`;
  pressure.textContent = `Pressure: ${data.currentConditions.pressure}hPa`;
  uvIndex.textContent = `UV Index: ${data.currentConditions.uvindex}`;

  currentTime()
}

getWeatherData();

setInterval(() => {
  getWeatherData();
}, 300_000);


refreshBtn.addEventListener("click", () => {
  getWeatherData();
  currentTime()
});
