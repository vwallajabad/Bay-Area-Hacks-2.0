require('dotenv').config();

//ICDID codes: https://github.com/opencivicdata/ocd-division-ids/blob/master/identifiers/country-us/

//enter country
var country = 'us';
//enter state
var state = 'mo';
//enter congressional district
var congressional_district = '3';
//enter county district
var county = 'st_charles';

console.log("https://civicinfo.googleapis.com/civicinfo/v2/representatives/" + encodeURIComponent('ocd-division/country:' + country + '') + "?key=" + process.env.GOOGLE_CIVIC_API_KEY);

console.log("https://civicinfo.googleapis.com/civicinfo/v2/representatives/" + encodeURIComponent('ocd-division/country:' + country + '/state:' + state) + "?key=" + process.env.GOOGLE_CIVIC_API_KEY);

console.log("https://civicinfo.googleapis.com/civicinfo/v2/representatives/" + encodeURIComponent('ocd-division/country:' + country + '/state:' + state + "/cd:" + congressional_district) + "?key=" + process.env.GOOGLE_CIVIC_API_KEY);

console.log("https://civicinfo.googleapis.com/civicinfo/v2/representatives/" + encodeURIComponent('ocd-division/country:' + country + '/state:' + state + "/county:" + county) + "?key=" + process.env.GOOGLE_CIVIC_API_KEY);
