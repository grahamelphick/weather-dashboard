$(document).ready(function () {


    $("#searchbtn").on("click", function (event) {
        event.preventDefault();
        var APIKey = "7f58c39f33e58e0c917622c5b2dedcc6";
        var citySelection = $("#cityname").val()
        var currentQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySelection + "&units=imperial" + "&appid=" + APIKey;
        var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySelection + "&units=imperial" + "&appid=" + APIKey;
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
                $("#temp").text("Temperature: " + response.main.temp).appendTo($("#maininfo"));
                $("#humid").text("Humidity: " + response.main.humidity).appendTo($("#maininfo"));
                $("#wind").text("Wind Speed: " + response.wind.speed).appendTo($("#maininfo"));

                // UV index
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
                            } else if (uvIndex > 5 && uvIndex <=7) {
                                $("#uv").css("background-color", "orange")
                                // $("#uv").addClass("uvhigh");
                            } else if (uvIndex > 7 && uvIndex <=10) {
                                $("#uv").css("background-color", "red")
                                // $("#uv").addClass("uvveryhigh");
                            } else {
                                $("#uv").css("background-color", "violet")
                                // $("#uv").addClass("uvextreme");
                            };
                        }
                        
                        indexColor()
                        
                    });
            });
        // Forecast
        $.ajax({
            url: forecastQueryURL,
            method: "GET"
        })
            .then(function (response) {

                console.log(currentQueryURL);
                console.log(Math.max(response.list[0].main.temp, response.list[1].main.temp));
                var dayOneDate = moment().add(1, 'days').format("L");
                var dayTwoDate = moment().add(2, 'days').format("L");
                var dayThreeDate = moment().add(3, 'days').format("L");
                var dayFourDate = moment().add(4, 'days').format("L");
                var dayFiveDate = moment().add(5, 'days').format("L");

                var dayOneMaxTemp = Math.max(response.list[0].main.temp, response.list[1].main.temp, response.list[2].main.temp, response.list[3].main.temp, response.list[4].main.temp, response.list[5].main.temp)

                console.log(response);
                $("#fiveday").text("5-Day Forecast:").appendTo("#fivedaytitle");

                $(".alldays").css("background-color", "#007BFF");

                $("#dayone-date").text(dayOneDate).appendTo("#dayone");
                $("#dayonetemp").text("Temp: " + response.list[10].main.temp).appendTo("#dayone");
                $("#dayonehumid").text("Humidity: " + response.list[10].main.humidity).appendTo("#dayone");

                $("#daytwo-date").text(dayTwoDate).appendTo("#daytwo");
                $("#daytwotemp").text("Temp: " + response.list[18].main.temp).appendTo("#daytwo");
                $("#daytwohumid").text("Humidity: " + response.list[18].main.humidity).appendTo("#daytwo");

                $("#daythree-date").text(dayThreeDate).appendTo("#daythree");
                $("#daythreetemp").text("Temp: " + response.list[26].main.temp).appendTo("#daythree");
                $("#daythreehumid").text("Humidity: " + response.list[26].main.humidity).appendTo("#daythree");

                $("#dayfour-date").text(dayFourDate).appendTo("#dayfour");
                $("#dayfourtemp").text("Temp: " + response.list[34].main.temp).appendTo("#dayfour");
                $("#dayfourhumid").text("Humidity: " + response.list[34].main.humidity).appendTo("#dayfour");

                $("#dayfive-date").text(dayFiveDate).appendTo("#dayfive");
                $("#dayfivetemp").text("Temp: " + response.list[34].main.temp).appendTo("#dayfive");
                $("#dayfivehumid").text("Humidity: " + response.list[34].main.humidity).appendTo("#dayfive");
            });        
    });
});