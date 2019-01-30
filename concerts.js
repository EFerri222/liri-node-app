var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

// Create the Concert constructor
var Concert = function() {
    // this divider will be used as a spacer between the concert data we print in log.txt
    var logDivider = "\n------------------------------------------------------------\n\n";
    // this divider will be used as a spacer between the concert data we print in the console
    var consoleDivider = "------------------------------------------------------------";

    // findConcert takes in the name of an artist and searches the Bands in Town API
    this.findConcert = function(artist) {
    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(URL).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            // Place the response.data into a variable, jsonData.
            var jsonData = response.data[i];

            // showData ends up being the string containing the show data we will print to the console
            var concertData = [
                "Venue: " + jsonData.venue.name,
                "Location: " + jsonData.venue.city + ", " + jsonData.venue.region + ", " + jsonData.venue.country,
                "Date: " + moment(jsonData.datetime.substring(0,10)).format("MM/DD/YYYY")
            ].join("\n");

            console.log(concertData);
            console.log(consoleDivider);

            // Append showData and the divider to log.txt, print showData to the console
            fs.appendFile("log.txt", concertData + logDivider, function(err) {
                if (err) throw err;
            });
        }
    });
  };
};

module.exports = Concert;
