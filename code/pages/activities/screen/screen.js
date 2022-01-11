const {readFileSync, writeFile} = require("fs");
const global = require("../../../globals.js");
const screens = global.screens;
const checkDay = global.checkDay;

// Parsing the data when it gets submitted
var submit = document.getElementById("submitScreen");
submit.onclick = function() {
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

    for(let i=0; i<screens.length; i++){
        // screens stores a list of all screen activities. The input boxes on the html page have IDs based on this data, so we can get elements by using screens as an index
        var screen = document.getElementById(screens[i]).value;
        // Checks if the user inputted a number between 0 and 24. If not, it displays an error message
        if(isNaN(screen) || screen<0 || screen>24){
            document.getElementById("screenError").hidden = false;
            return;
        }
        // If the user did not input anything, we assume is is 0
        if(screen==""){
            day.screen[screens[i]] = 0;
        }
        else {
            // Updates the JSON with screen time information
            day.screen[screens[i]] = Number(screen);
        }
    }
    
    // Writes the new data back into the file
    writeFile("data/today.json",JSON.stringify(day), function(err) {
        if (err) console.error(err);
    });

    // Redirects to the main page
    window.location.href = "../../main.html";
}