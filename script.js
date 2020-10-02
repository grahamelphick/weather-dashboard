$(document).ready(function () {


    $("#searchbtn").on("click", function (event) {
        event.preventDefault();
        var APIKey = "7f58c39f33e58e0c917622c5b2dedcc6";
        var citySelection = $("#cityname").val()
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySelection + "&appid=" + APIKey;


        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                console.log(queryURL);

                console.log(response);

                var iconID = response.list[0].weather[0].icon
                var weatherIcon = "http://openweathermap.org/img/wn/" + iconID + "@2x.png"

                $("#citytitle").text(response.city.name + " " + "(" + response.list[0].dt_txt + ")").appendTo($("#maininfo"));
                // $("<img> {src: weatherIcon}")(weatherIcon).appendTo("#maininfo");
                $("#temp").text("Temperature: " + response.list[0].main.temp).appendTo($("#maininfo"));
                $("#humid").text("Humidity: " + response.list[0].main.humidity).appendTo($("#maininfo"));
                $("#wind").text("Wind Speed: " + response.list[0].wind.speed).appendTo($("#maininfo"));

                $("#fiveday").text("5-Day Forecast:").appendTo("#fivedaytitle");
                $("<p>").text(response.list[10].dt_txt).appendTo("#dayone");
                $("<p>").text("Temp: " + response.list[10].main.temp).appendTo("#dayone");
                $("<p>").text("Humidity: " + response.list[10].main.humidity).appendTo("#dayone");

                $("<p>").text(response.list[18].dt_txt).appendTo("#daytwo");
                $("<p>").text("Temp: " + response.list[18].main.temp).appendTo("#daytwo");
                $("<p>").text("Humidity: " + response.list[18].main.humidity).appendTo("#daytwo");

                $("<p>").text(response.list[26].dt_txt).appendTo("#daythree");
                $("<p>").text("Temp: " + response.list[26].main.temp).appendTo("#daythree");
                $("<p>").text("Humidity: " + response.list[26].main.humidity).appendTo("#daythree");

                $("<p>").text(response.list[34].dt_txt).appendTo("#dayfour");
                $("<p>").text("Temp: " + response.list[34].main.temp).appendTo("#dayfour");
                $("<p>").text("Humidity: " + response.list[34].main.humidity).appendTo("#dayfour");

                $("<p>").text(response.list[34].dt_txt).appendTo("#dayfive");
                $("<p>").text("Temp: " + response.list[34].main.temp).appendTo("#dayfive");
                $("<p>").text("Humidity: " + response.list[34].main.humidity).appendTo("#dayfive");


                var uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + response.city.coord.lat + "&lon=" + response.city.coord.lon + "&appid=" + APIKey
                $.ajax({
                    url: uvQueryURL,
                    method: "GET"
                })
                .then(function (response) {
                    console.log(response);
                    var uvIndex = response.value
                    console.log(uvIndex)
                    $("#uv").text("UV Index: " + uvIndex).appendTo($("#maininfo"));
                });

                // // Convert the temp to fahrenheit
                // var tempF = (response.main.temp - 273.15) * 1.80 + 32;

                // // add temp content to html
                // $(".temp").text("Temperature (K) " + response.main.temp);
                // $(".tempF").text("Temperature (F) " + tempF.toFixed(2));
            });
    });

});