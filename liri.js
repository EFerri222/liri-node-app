require("dotenv").config();
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

var Concert = require("./concerts");

// Create a new Concert object
var concert = new Concert();

var search = process.argv[2];
var term = process.argv.slice(3).join(" ");

if (search === "concert-this") {
    console.log(term.charAt(0).toUpperCase() + term.slice(1) + " Concerts:");
    concert.findConcert(term);
}