const { readFileSync, writeFile } = require("fs");
const global = require("../../../globals.js");
const devices = global.devices;

var submit = document.getElementById("submitDevices");
submit.onclick = function() {
    var checkboxes = [];
    for(let i=0; i<devices.length; i++){
        var box = document.getElementById(devices[i]);
        checkboxes[i] = box.checked;
    }

    var todayData;
    try {
        todayData = readFileSync("data/today.json", "utf8");
    } 
    catch (err) {
        console.error(err);
    }

    todayData = JSON.parse(todayData);
    for(let i=0; i<devices.length; i++){
        todayData.otherDevices[devices[i]] = checkboxes[i];
    }

    writeFile("data/today.json", JSON.stringify(todayData), function (err) {
        if (err) console.error(err);
    });

    window.location.href = "../../main.html";
}