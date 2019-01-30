var axios = require("axios");
var fs = require("fs");

// Create the Movie constructor
var Movie = function() {
    // divider will be used as a spacer between the movie data we print in log.txt
    var divider = "\n------------------------------------------------------------\n\n";

    // findMovie takes in the name of a movie and searches the OMDB API
    this.findMovie = function(movie) {
    var URL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie;

    axios.get(URL).then(function(response) {
            // Place the response.data into a variable, jsonData.
            var jsonData = response.data;

            // showData ends up being the string containing the show data we will print to the console
            var movieData = [
                "Title: " + jsonData.Title,
                "Year: " + jsonData.Year,
                "IMDB Rating: " + jsonData.imdbRating,
                "Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value,
                "Produced in: " + jsonData.Country,
                "Language: " + jsonData.Language,
                "Plot: " + jsonData.Plot,
                "Actors: " + jsonData.Actors
            ].join("\n");

            console.log(movieData);

            // Append showData and the divider to log.txt, print showData to the console
            fs.appendFile("log.txt", movieData + divider, function(err) {
                if (err) throw err;
            });
    });
  };
};

module.exports = Movie;
