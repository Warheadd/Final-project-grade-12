const { readFileSync, writeFile } = require("fs");
const global = require("../../../globals.js");
const checkDay = global.checkDay;

// Getting the slider element and the label for the slider elements
var sMeat = document.getElementById("sMeat");
var pMeat = document.getElementById("pMeat");
// Updating the label whenever the slider element is updated
sMeat.oninput = function() {
    pMeat.innerHTML = this.value+"%";
}

var sBeef = document.getElementById("sBeef");
var pBeef = document.getElementById("pBeef");
sBeef.oninput = function() {
    pBeef.innerHTML = this.value+"%";
}

var sLocal = document.getElementById("sLocal");
var pLocal = document.getElementById("pLocal");
sLocal.oninput = function() {
    pLocal.innerHTML = this.value+"%";
}

// Parsing the data when it gets submitted
var submit = document.getElementById("submitFood");
submit.onclick = function() {
    // Reads the data for the current day
    var todayData;
    try {
        todayData = readFileSync("data/today.json", "utf8");
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
    todayData = JSON.parse(todayData);  

    // Updates the values for the food inside the json based on the values of the sliders
    todayData.food.meat = Number(sMeat.value);
    todayData.food.beef = Number(sBeef.value);
    todayData.food.local = Number(sLocal.value);

    // Writes the new data back into the file
    writeFile("data/today.json", JSON.stringify(todayData), function (err) {
        if (err) console.error(err);
    });

    // Redirects to the main page
    window.location.href = "../../main.html";
}