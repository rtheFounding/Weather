let cities = [
  {
    name: "Benbrook, TX",
    latitude: 32.6732,
    longitude: -97.4606,
  },
  {
    name: "Sandy Springs, GA",
    latitude: 33.928878,
    longitude: -84.361438,
  },
  {
    name: "Little Tokyo, CA",
    latitude: 34.047539,
    longitude: -118.240544,
  },
];

const categories = document.getElementById("categories");
const results = document.getElementById("results");

function loadSelect() {
    const categories = document.getElementById("categories");
    for (let i = 0; i < cities.length; i++) {
      let newOption = new Option(
        cities[i].name,
        cities[i].latitude + "," + cities[i].longitude
      );
      categories.appendChild(newOption);
    }
  }
  
function latLngURL(values) {
    return `https://api.weather.gov/points/${values}`;
}

function addRow(period) {
    const row = document.createElement("tr");

    const td = document.createElement("td");
    td.innerHTML = period.name;
    row.appendChild(td);

    const td2 = document.createElement("td");
    td2.innerHTML = "Temperature " + period.temperature + " " + period.temperatureUnit;
    row.appendChild(td2);

    const td3 = document.createElement("td");
    td3.innerHTML = "Winds " + period.windDirection + " " + period.windSpeed; ;
    row.appendChild(td3);

    const td4 = document.createElement("td");
    td4.innerHTML = period.shortForecast;
    row.appendChild(td4);

    results.appendChild(row);
}

function showResult(data) {
    results.innerHTML = "";
    data.properties.periods.forEach(p => addRow(p))
}
function secondFetch(url2) {
    fetch(url2)
        .then(response => response.json())
        .then(data => showResult(data))
}

function getWeather(latLngPair) {
    fetch(latLngURL(latLngPair))
    .then(response => response.json())
    .then(data => {
        let forecastArray = data.properties.forecast; // this is a URL, which is why we're doing another URL
        secondFetch(forecastArray); 
    })

}

window.onload = () => {
  loadSelect();
  categories.addEventListener("change", () => {
    const latLngPair = categories.selectedOptions[0].value;
    getWeather(latLngPair);
  })
};
