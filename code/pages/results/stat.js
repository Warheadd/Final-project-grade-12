const {readFileSync, writeFile} = require("fs");
const global = require("../../globals.js");
const checkHistory = global.checkHistory;
const checkDay = global.checkDay;

// creates a function to compare the user's statistics with averages
function compare() {

    // Reads the data for the current day
    var carbonData;
    try {
        carbonData = readFileSync("data/today.json", "utf8");
    } 
    catch (err) {
        console.error(err);
    }

    // Checks if the json is correctly formatted, if not it redirects to an error
    if(!check(carbonData)) {  
        window.location.href = "../error/historyError.html";
    }
    // If it is correctly formatted, it parses the json file
    carbonData = JSON.parse(carbonData);  
}
