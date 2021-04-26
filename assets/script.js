var apiKey = "cd31bc6b1e53de1c51d27aa473eb7737";

var searchBtn = $(".searchBtn");
var searchInput = $(".searchInput");
var searchHistoryEl = $(".historyItems");
var cityNameEl = $(".cityName");

function getCurrentWeather(city) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      apiKey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      getForcast(data.coord.lat, data.coord.lon);
    });
}

function getForcast(lat, lon) {
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=imperial&appid=" +
      apiKey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

getCurrentWeather("kansas city");

/*function buildForecast(data){
  days = []
  foreach day in data {
    days << buildDay(day)
  }

}/*

function buildDay(dayData){

}