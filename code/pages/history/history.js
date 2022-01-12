const {readFileSync, writeFile} = require("fs");
const global = require("../../globals.js");
const checkHistory = global.checkHistory;
const HISTORY_ELEMENT_FIRST = '<a href="editDay.html" class="historyElement" id=';
const HISTORY_ELEMENT_SECOND = '><div><h1>';
const HISTORY_ELEMENT_THIRD = '</h1><p>';
const HISTORY_ELEMENT_FOURTH = '</p></div></a>';

// If the user clicks the leave button, they are redirected back to the main page
var submit = document.getElementById("leaveHistory");
submit.onclick = function() {
    window.location.href = "../../index.html";
}

// Checks if the history file is correctly formatted. If not, it redirects to an error
if(!checkHistory()) {  
    window.location.href = "../error/historyError.html";
}
// Reads the data from the history file
var historyData;
try {
    historyData = readFileSync("data/history.txt", "utf8");
} 
catch (err) {
    console.error(err);
}
// If there is nothing in history, it displays an error saying there is nothing in the history
if(historyData==""){
    document.getElementById("noElements").hidden = false;
}
else {
    // The days are separated by line breaks
    var his = historyData.split("\n");
    // Gets the container for the history elements
    var container = document.getElementById("elements");
    // Loops through the days BACKWARDS to start from most recent
    for(let i=his.length-1; i>=0; i--){
        // Parses the day as a JSON element
        var day = JSON.parse(his[i]);
        // Gets the date (the first 15 characters store the date, the rest is for specific time)
        var date = day.date.slice(0,15);
        // Createss a new div for a new history element
        var element = document.createElement("div");
        // Appends the div to the container
        container.appendChild(element);
        // Sets the html of the div to the correct history html, with the id and date information inside
        element.outerHTML = HISTORY_ELEMENT_FIRST+i+HISTORY_ELEMENT_SECOND+date+HISTORY_ELEMENT_THIRD+"Total emissions: "+day.total.toFixed(2)+HISTORY_ELEMENT_FOURTH;
    }

    // Loops through every history element
    for(let i=0; i<his.length; i++){
        var element = document.getElementById(i);
        // Sets what happens when the element is clicked
        element.onclick = function() {
            // Writes the selected day's information to editingDay.json
            writeFile("pages/history/editingDay.json",his[i], function(err) {
                if (err) console.error(err);
            });
        }
    }
}