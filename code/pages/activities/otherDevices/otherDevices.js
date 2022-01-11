const { readFileSync, writeFile } = require("fs");
const global = require("../../../globals.js");
const devices = global.devices;
const checkDay = global.checkDay;

// Parsing the data when it gets submitted
var submit = document.getElementById("submitDevices");
submit.onclick = function() {
    // Creates an array of booleans that store the status of the checkboxes on the page (checked or unchecked)
    var checkboxes = [];
    for(let i=0; i<devices.length; i++){
        // devices stores a list of all devices. The checkboxes on the html page have IDs based on this data, so we can get elements by using devices as an index
        var box = document.getElementById(devices[i]);
        checkboxes[i] = box.checked;
    }

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

    // Updating the values inside the JSON based on the checkboxes
    for(let i=0; i<devices.length; i++){
        // The indexes inside the JSON are based on devices so we can use devices as an index
        todayData.otherDevices[devices[i]] = checkboxes[i];
    }

    // Writes the new data back into the file
    writeFile("data/today.json", JSON.stringify(todayData), function (err) {
        if (err) console.error(err);
    });

    // Redirects to the main page
    window.location.href = "../../main.html";
}