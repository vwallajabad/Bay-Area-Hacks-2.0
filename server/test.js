const API_KEY = "AIzaSyDY3VfXQLIHMmGGDeapnN8ovmBRUXSTbbk";

/*
    *   @11-13: Imports fs, https, and dotenv.
    *   @15-23: Sets variables for location.
    *   @21-25: Constructs URLs for Google Civic Information API.
    *   @27: Defines filenames for data storage.
    *   @29-50: Defines `jsonFromUrlToFile` function to fetch data, handle errors, and save to files.
    *   @52-56: Calls `jsonFromUrlToFile` for each URL, saving data to `../src/data/` directory.
*/

const fs = require("fs");
const https = require("https");

var country = 'us';
var state = 'mo';
var congressional_district = '3';
var county = 'st_charles';
var precinct = '208-twin_chimneys';

country_url = "https://civicinfo.googleapis.com/civicinfo/v2/representatives/" + encodeURIComponent('ocd-division/country:' + country) + "?key=" + API_KEY;
state_url = "https://civicinfo.googleapis.com/civicinfo/v2/representatives/" + encodeURIComponent('ocd-division/country:' + country + '/state:' + state) + "?key=" + API_KEY;
congressional_district_url = "https://civicinfo.googleapis.com/civicinfo/v2/representatives/" + encodeURIComponent('ocd-division/country:' + country + '/state:' + state + "/cd:" + congressional_district) + "?key=" + API_KEY;
county_url = "https://civicinfo.googleapis.com/civicinfo/v2/representatives/" + encodeURIComponent('ocd-division/country:' + country + '/state:' + state + "/county:" + county) + "?key=" + API_KEY;
precinct_url = "https://civicinfo.googleapis.com/civicinfo/v2/representatives/" + encodeURIComponent('ocd-division/country:' + country + '/state:' + state + "/county:" + county + "/precinct:" + precinct) + "?key=" + API_KEY;

files = ["country.json", "state.json", "congressional_district.json", "county.json", "precinct.json"];

function jsonFromUrlToFile(url, filename) {
    https.get(url, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            fs.writeFile(filename, data, (err) => {
                if (err) {
                    console.error(`Error writing file ${filename}:`, err);
                } else {
                    console.log(`File ${filename} saved successfully.`);
                }
            });
        });

    }).on("error", (err) => {
        console.error("Error: " + err.message);
    });
}

jsonFromUrlToFile(country_url, "../src/data/country.json");
jsonFromUrlToFile(state_url, "../src/data/state.json");
jsonFromUrlToFile(congressional_district_url, "../src/data/congressional_district.json");
jsonFromUrlToFile(county_url, "../src/data/county.json");
jsonFromUrlToFile(precinct_url, "../src/data/precinct.json");
