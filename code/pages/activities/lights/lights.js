const {readFileSync, writeFile} = require("fs");
const global = require("../../../globals.js");
const checkDay = global.checkDay;

// Parsing the data when it gets submitted
var submit = document.getElementById("submitLight");
submit.onclick = function() {
    // Gets the amount of time lights were on from the input box
    var time = document.getElementById("lightLength").value;
    // Checks if the user inputted a number between 0 and 24. If not, it displays an error message
    if(time=="" || isNaN(time) || time<0 || time>24){
        document.getElementById("lightError").hidden = false;
        return;
    }

    // Reads the data for the current day
    var day;
    try {
        day = readFileSync("data/today.json", "utf8");
    } 
    catch (err) {
        console.error(err);
    }
    // Checks if the json is correctly formatted, if not it redirects to an error
    if(!checkDay()) {  
        window.location.href = "../../error/dayError.html";
        return;
    }
    // If it is correctly formatted, it parses the json file
    day = JSON.parse(day);  
    // Updates the value for lights inside the json based on user input
    day.lights = Number(time);
    // Writes the new data back into the file
    writeFile("data/today.json",JSON.stringify(day), function(err) {
        if (err) console.error(err);
    });

    // Redirects to the main page
    window.location.href = "../../main.html";
}