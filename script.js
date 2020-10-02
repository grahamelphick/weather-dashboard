$(document).ready(function () {


    $("#searchbtn").on("click", function (event) {
        event.preventDefault();
        var APIKey = "7f58c39f33e58e0c917622c5b2dedcc6";
        var citySelection = $("#cityname").val()
        var currentQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySelection + "&units=imperial" + "&appid=" + APIKey;
        var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySelection + "&units=imperial" + "&appid=" + APIKey;
        var currentDate = moment().format("L");

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
                $("<p>").text(dayOneDate).appendTo("#dayone");
                $("<p>").text("Temp: " + response.list[10].main.temp).appendTo("#dayone");
                $("<p>").text("Humidity: " + response.list[10].main.humidity).appendTo("#dayone");

                $("<p>").text(dayTwoDate).appendTo("#daytwo");
                $("<p>").text("Temp: " + response.list[18].main.temp).appendTo("#daytwo");
                $("<p>").text("Humidity: " + response.list[18].main.humidity).appendTo("#daytwo");

                $("<p>").text(dayThreeDate).appendTo("#daythree");
                $("<p>").text("Temp: " + response.list[26].main.temp).appendTo("#daythree");
                $("<p>").text("Humidity: " + response.list[26].main.humidity).appendTo("#daythree");

                $("<p>").text(dayFourDate).appendTo("#dayfour");
                $("<p>").text("Temp: " + response.list[34].main.temp).appendTo("#dayfour");
                $("<p>").text("Humidity: " + response.list[34].main.humidity).appendTo("#dayfour");

                $("<p>").text(dayFiveDate).appendTo("#dayfive");
                $("<p>").text("Temp: " + response.list[34].main.temp).appendTo("#dayfive");
                $("<p>").text("Humidity: " + response.list[34].main.humidity).appendTo("#dayfive");
            });
    });
});