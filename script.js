$(document).ready(function(){

var APIKey = "7f58c39f33e58e0c917622c5b2dedcc6";
var queryURL = "api.openweathermap.org/data/2.5/forecast?id=524901&appid=" + APIKey;


$.ajax({
    url: queryURL,
    method: "GET"
})
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // // Transfer content to HTML
        // $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        // $(".wind").text("Wind Speed: " + response.wind.speed);
        // $(".humidity").text("Humidity: " + response.main.humidity);

        // // Convert the temp to fahrenheit
        // var tempF = (response.main.temp - 273.15) * 1.80 + 32;

        // // add temp content to html
        // $(".temp").text("Temperature (K) " + response.main.temp);
        // $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

        // // Log the data in the console as well
        // console.log("Wind Speed: " + response.wind.speed);
        // console.log("Humidity: " + response.main.humidity);
        // console.log("Temperature (F): " + tempF);
    });

})