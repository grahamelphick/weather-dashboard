$(document).ready(function () {


    $("#searchbtn").on("click", function (event) {
        event.preventDefault();
        var APIKey = "7f58c39f33e58e0c917622c5b2dedcc6";
        var citySelection = $("#cityname").val()
        var currentQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySelection + "&units=imperial" + "&appid=" + APIKey;
        var currentDate = moment().format("L");

        // var searchedCities = []
        // var cityHistory = $("#cityname").val()
        // searchedCities.push(cityHistory)
        // cityHistory.appendTo($("#history"))
        // ($("#history")).append($("<button>").text(citySelection.val()))
        // current day stats
        $.ajax({
            url: currentQueryURL,
            method: "GET"
        })
            .then(function (response) {

                console.log(currentQueryURL);

                console.log(response);

                var iconID = response.weather[0].icon
                var weatherIcon = "http://openweathermap.org/img/wn/" + iconID + "@2x.png"


                $("#citytitle").text(response.name + " " + "(" + currentDate + ")").appendTo($("#maininfo"));
                $("<img>").attr("src", weatherIcon).appendTo("#citytitle");
                $("#temp").text("Temperature: " + response.main.temp + " ℉").appendTo($("#maininfo"));
                $("#humid").text("Humidity: " + response.main.humidity + "%").appendTo($("#maininfo"));
                $("#wind").text("Wind Speed: " + response.wind.speed + " MPH").appendTo($("#maininfo"));

                // UV index
                var forecastQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&exclude=current,minutely,hourly,alerts" + "&units=imperial" + "&appid=" + APIKey;
                var uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + APIKey
                $.ajax({
                    url: uvQueryURL,
                    method: "GET"
                })
                    .then(function (response) {
                        console.log(response);
                        var uvIndex = response.value;
                        console.log(uvIndex);
                        $("#uv").text("UV Index: " + uvIndex).appendTo($("#maininfo"));

                        function indexColor() {
                            if (uvIndex <= 2) {
                                $("#uv").css("background-color", "green")
                                // $("#uv").addClass("uvlow");
                            } else if (uvIndex > 2 && uvIndex <= 5) {
                                $("#uv").css("background-color", "yellow")
                                // $("#uv").addClass("uvmoderate");
                            } else if (uvIndex > 5 && uvIndex <= 7) {
                                $("#uv").css("background-color", "orange")
                                // $("#uv").addClass("uvhigh");
                            } else if (uvIndex > 7 && uvIndex <= 10) {
                                $("#uv").css("background-color", "red")
                                // $("#uv").addClass("uvveryhigh");
                            } else {
                                $("#uv").css("background-color", "violet")
                                // $("#uv").addClass("uvextreme");
                            };
                        }

                        indexColor()

                    });

                // Forecast
                $.ajax({
                    url: forecastQueryURL,
                    method: "GET"
                })
                    .then(function (response) {

                        console.log(forecastQueryURL);
                        var dayOneDate = moment().add(1, 'days').format("L");
                        var dayTwoDate = moment().add(2, 'days').format("L");
                        var dayThreeDate = moment().add(3, 'days').format("L");
                        var dayFourDate = moment().add(4, 'days').format("L");
                        var dayFiveDate = moment().add(5, 'days').format("L");

                        console.log(response);
                        $("#fiveday").text("5-Day Forecast:").appendTo("#fivedaytitle");

                        $(".alldays").css("background-color", "#007BFF");

                        $("#dayone-date").text(dayOneDate).appendTo("#dayone");
                        $("#dayonetemp").text("Temp: " + response.daily[1].temp.max + " ℉").appendTo("#dayone");
                        $("#dayonehumid").text("Humidity: " + response.daily[1].humidity + "%").appendTo("#dayone");

                        $("#daytwo-date").text(dayTwoDate).appendTo("#daytwo");
                        $("#daytwotemp").text("Temp: " + response.daily[2].temp.max + " ℉").appendTo("#daytwo");
                        $("#daytwohumid").text("Humidity: " + response.daily[2].humidity + "%").appendTo("#daytwo");

                        $("#daythree-date").text(dayThreeDate).appendTo("#daythree");
                        $("#daythreetemp").text("Temp: " + response.daily[3].temp.max + " ℉").appendTo("#daythree");
                        $("#daythreehumid").text("Humidity: " + response.daily[3].humidity + "%").appendTo("#daythree");

                        $("#dayfour-date").text(dayFourDate).appendTo("#dayfour");
                        $("#dayfourtemp").text("Temp: " + response.daily[4].temp.max + " ℉").appendTo("#dayfour");
                        $("#dayfourhumid").text("Humidity: " + response.daily[4].humidity + "%").appendTo("#dayfour");

                        $("#dayfive-date").text(dayFiveDate).appendTo("#dayfive");
                        $("#dayfivetemp").text("Temp: " + response.daily[5].temp.max + " ℉").appendTo("#dayfive");
                        $("#dayfivehumid").text("Humidity: " + response.daily[5].humidity + "%").appendTo("#dayfive");
                    });
            });
    });
});