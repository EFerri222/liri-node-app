require("dotenv").config();
var keys = require("./keys.js");

var Concert = require("./concerts");
var Spotify = require('node-spotify-api');
var Movie = require("./movies")

// Create a new Concert object
var concert = new Concert();

// Create a new Spotify object
var spotify = new Spotify(keys.spotify);

// Create a new Movie object
var movie = new Movie();

var search = process.argv[2];
var term = process.argv.slice(3).join(" ");

if (search === "concert-this") {
    console.log(term.charAt(0).toUpperCase() + term.slice(1) + " Concerts:");
    concert.findConcert(term);
} else if (search === "spotify-this-song") {

    if (!term) {
        term = "the sign ace of base";
    }

    spotify.search({type:'track', query:term}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

        var jsonData = data.tracks.items[0];
        var artists = [];

        for (var i=0; i < jsonData.artists.length; i++) {
            artists.push(jsonData.artists[i].name);
        }

        var songData = [
            "Artist(s): " + artists.join(", "),
            "Song Name: " + jsonData.name,
            "Preview URL: " + jsonData.external_urls.spotify,
            "Album: " + jsonData.album.name
        ].join("\n");

        console.log(songData);
    });
} else if (search === "movie-this") {

    if (!term) {
        term = "Mr. Nobody";
    }
    movie.findMovie(term);
}