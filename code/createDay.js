const global = require("./globals.js");
const transports = global.transports;
const screens = global.screens;
const devices = global.devices;
const checkHistory = global.checkHistory;
const checkDay = global.checkDay;

// Starts a new day for the user
async function startNew() {
    // Creates a new JSON element that will store the day's data
    var newDay = {
        index: 0,
        date: "",
        // in hours
        transportation: {},
        // in terms of percentages
        food: {
            meat: 0,
            // this is a percentage of only the meat
            beef: 0,
            local: 0
        },
        // in hours
        screen: {},
        // in hours
        lights: 0,
        // in boolean values (whether or not the device was used)
        otherDevices: {},
        purchases: {},
    }
    // Sets the default values of transportation, screen, and otherDevices
    for(let i=0; i<transports.length; i++){
        newDay.transportation[transports[i]] = 0;
    }
    for(let i=0; i<screens.length; i++){
        newDay.screen[screens[i]] = 0;
    }
    for(let i=0; i<devices.length; i++){
        newDay.otherDevices[devices[i]] = false;
    }
    newDay.date = new Date().toString();

    // Reads what was previously the current day, stored in today.json
    var oldDay;
    var todayData;
    try {
        todayData = readFileSync("data/today.json", "utf8");
    } 
    catch (err) {
        console.error(err);
    }
    // Checks if the json is correctly formatted, if not it redirects to an error. Another possibility is that it is blank, in which case it will not cause an error
    if(todayData!="" && !checkDay()) {  
        window.location.href = "pages/error/dayError.html";
        return;
    }  
    
    // Checks if the history file is correctly formatted, if not it redirects to an error.
    if(!checkHistory()) {  
        window.location.href = "pages/error/historyError.html";
        return;
    }
    // Reads the data from the history file
    var historyData;
    try {
        historyData = readFileSync("data/history.txt", "utf8");
    } 
    catch (err) {
        console.error(err);
    }
    // The days are separated by line breaks
    var days = historyData.split("\n");

    // If today.json was blank, it can be immediately overwritten
    if(todayData == "") {
        // If there is nothing in history, the created day is the FIRST day, so its index is 0
        if(historyData==""){
            newDay.index = 0;
        }
        // Otherwise, it should be 1 + the last day's index
        else {
            newDay.index = days.length;
        }
        // Writes the new day data to today.json and redirects to the main page
        writeFile("data/today.json", JSON.stringify(newDay), function (err) {
            if (err) console.error(err);
        });
        window.location.href = "pages/main.html";
        return;
    }
    // If today.json was not blank, the info has to be transferred to history.txt
    // today.json is parsed
    oldDay = JSON.parse(todayData);
    // Sets the index of the new day to 1 + the previous day's index
    newDay.index = days.length+1;
    // If history.txt is blank, it can be immediately overwritten
    if(historyData==""){
        // Writes the old day to history.txt
        writeFile("data/history.txt", JSON.stringify(oldDay), function (err) {
            if (err) console.error(err);
        });
        // The index of the new day is set to 1 because it is the second day
        newDay.index = 1;
        // Writes the new day to today.json
        writeFile("data/today.json", JSON.stringify(newDay), function (err) {
            if (err) console.error(err);
        });
        // Redirects to the main page
        window.location.href = "pages/main.html";
        return;
    }
    
    // If history.txt is not blank, it has to be modified
    // oldDay is added to the collection of previous days
    days.push(JSON.stringify(oldDay));
    let newFile = "";
    // Every day is written to newFile
    for(let i=0; i<days.length; i++){
        JSON.parse(days[i]);  
        newFile += days[i];
        // A line break is added every time except for the last one
        if(i<days.length-1){
            newFile += "\n";
        }
    }
    // Writes newFile to history.txt
    writeFile("data/history.txt", newFile, function (err) {
        if (err) console.error(err);
    });
    // Writes the new day to today.json
    writeFile("data/today.json", JSON.stringify(newDay), function (err) {
        if (err) console.error(err);
    });
    // Redirects to the main page
    window.location.href = "pages/main.html";
}

// Called when "Continue Day" is pressed
function contin(){
    // Reads today.json
    var todayData;
    try {
        todayData = readFileSync("data/today.json", "utf8");
    } 
    catch (err) {
        console.error(err);
    }
    // If it is blank, a new day is started, otherwise nothing changes
    if(todayData==""){
        startNew();
    }
    // Redirects to the main page
    window.location.href = "pages/main.html";
}