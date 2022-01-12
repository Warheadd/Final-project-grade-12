const {readFileSync, writeFile} = require("fs");
const global = require("../../../globals.js");

// Reads the data for the current day
var todayData;
try {
    todayData = readFileSync("pages/history/editingDay.json", "utf8");
} 
catch (err) {
    console.error(err);
}

// Checks if the json is correctly formatted, if not it redirects to an error
if(!check(todayData)) {  
    window.location.href = "../error/historyError.html";
}
// If it is correctly formatted, it parses the json file
todayData = JSON.parse(todayData);  
