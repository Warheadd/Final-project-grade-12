const { readFileSync, writeFile, writeFileSync } = require("fs");
const global = require("../../globals.js");
const checkDay = global.checkDay;
const checkProfile = global.checkProfile;
const checkHistory = global.checkHistory;
const calculateCarbon = global.calculateCarbon;

var today;
try {
    today= readFileSync("data/today.json", "utf8");
} 
catch (err) {
    console.error(err);
}
// Checks if the json is correctly formatted, if not it redirects to an error
if(!checkDay()) {  
    window.location.href = "../error/dayError.html";
}
var profile;
try {
    profile= readFileSync("data/profile.json", "utf8");
} 
catch (err) {
    console.error(err);
} 
if(!checkProfile()) {  
    window.location.href = "../error/profileError.html";
}
profile = JSON.parse(profile);
today = JSON.parse(today);

var calculation = calculateCarbon(today,profile);

writeFileSync("pages/endDay/stats.json",JSON.stringify(calculation), function(err) {
    if (err) console.error(err);
});