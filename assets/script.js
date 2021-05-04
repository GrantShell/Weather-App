var apiKey = "cd31bc6b1e53de1c51d27aa473eb7737";

function generateWeatherReport(cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`
  ).then(function (response) {
    response.json().then(function (data) {
      buildWeatherReport(data.name, data.coord);
    });
  });
}

function buildWeatherReport(cityName, coordinates) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${apiKey}`
  ).then(function (response) {
    response.json().then(function (data) {
      // render current weather
      buildCurrentWeather(cityName, data);

      // render forecast
      buildForecast(data);
    });
  });
}

function buildCurrentWeather(cityName, responseData) {
  template = $("#current-weather-template").html();
  if (responseData.current.uvi < 2) {
    uvColor = "success";
  } else if (responseData.current.uvi < 5) {
    uvColor = "warning";
  } else {
    uvColor = "danger";
  }

  data = {
    city: cityName,
    temperature: responseData.current.temp,
    wind: responseData.current.wind_speed,
    humidity: responseData.current.humidity,
    uvIndex: responseData.current.uvi,
    uvColor: uvColor,
  };
  currentWeather = Mustache.render(template, data);
  $("#current-weather").empty().append(currentWeather);
  // renderTemplate("#current-weather-template", "#current-weather", data);
}

function buildForecast(responseData) {
  template = $("#five-day-forecast-template").html();

  data = { days: [] };

  for (i = 0; i < 5; i++) {
    day = responseData.daily[i];
    date = new Date(day.dt * 1000);
    formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;

    data.days.push({
      date: formattedDate,
      temperature: day.temp.day,
      wind: day.wind_speed,
      humidity: day.humidity,
    });
  }

  forecast = Mustache.render(template, data);
  $("#five-day-forecast").empty().append(forecast);
  // renderTemplate('#five-day-forecast-template', '#five-day-forecast', data);
}

// function renderTemplate(templateId, containerId, data) {
//   template = $(templateId).html();
//   renderedTemplate = Mustache.render(template, data);
//   $(containerId).empty().append(renderedTemplate);
// }

$("#weather-search-form").submit(function (e) {
  e.preventDefault();
  document.getElementById("searchhistory").innerHTML = "";
  city = $("#weather-search-field").val();
  // get the array from localStorage
  var citylist = JSON.parse(localStorage.getItem("cityName")) || [];
  if (citylist.includes(city)) {
  } else {
    citylist.push(city);
  }

  // save city into localStorage in an array

  localStorage.setItem("cityName", JSON.stringify(citylist));

  // loop through the array and append it to the html

  for (var i = 0; i < 5; i++) {
    // create  h3 with the val of cityList[i]
    var oldSearch = document.createElement("button");
    oldSearch.innerText = citylist[i];

    // append the h3 to searchhistory
    document.getElementById("searchhistory").append(oldSearch);

    console.log(citylist[i]);
  }
  /*
  $(document).on('click', '.search-history-btn', function(e){
  e.preventDefault();
  city = $(this).data('city');
  })
  */
  generateWeatherReport(city);
});
