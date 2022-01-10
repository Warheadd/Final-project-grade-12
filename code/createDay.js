const global = require("./globals.js");
const transports = global.transports;
const screens = global.screens;
const devices = global.devices;
const checkHistory = global.checkHistory;
const checkDay = global.checkDay;

const start = document.getElementById("startnew");
start.onclick = startNew;

async function startNew() {
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

    var oldDay;
    var todayData;
    try {
        todayData = readFileSync("data/today.json", "utf8");
    } 
    catch (err) {
        console.error(err);
    }
    if(todayData == "") {
        writeFile("data/today.json", JSON.stringify(newDay), function (err) {
            if (err) console.error(err);
        });
        return;
    }
    if(!checkDay()) {  
        window.location.href = "../../error/dayError.html";
        return;
    }
    oldDay = JSON.parse(todayData);  
    
    var days;
    if(!checkHistory()) {  
        window.location.href = "../../error/historyError.html";
        return;
    }
    var historyData;
    try {
        historyData = readFileSync("data/history.txt", "utf8");
    } 
    catch (err) {
        console.error(err);
    }
    if(historyData==""){
        writeFile("data/history.txt", JSON.stringify(oldDay), function (err) {
            if (err) console.error(err);
        });
        newDay.index = 1;
        writeFile("data/today.json", JSON.stringify(newDay), function (err) {
            if (err) console.error(err);
        });
        return;
    }

    days = historyData.split("\n");
    newDay.index = days.length+1;
    days.push(JSON.stringify(oldDay));

    let newFile = "";
    for(let i=0; i<days.length; i++){
        JSON.parse(days[i]);  
        newFile += days[i];
        if(i<days.length-1){
            newFile += "\n";
        }
    }
    writeFile("data/history.txt", newFile, function (err) {
        if (err) console.error(err);
    });
    writeFile("data/today.json", JSON.stringify(newDay), function (err) {
        if (err) console.error(err);
    });
}

const contin = document.getElementById("continue");
contin.onclick = function(){
    var todayData;
    try {
        todayData = readFileSync("data/today.json", "utf8");
    } 
    catch (err) {
        console.error(err);
    }
    if(todayData==""){
        startNew();
    }
}