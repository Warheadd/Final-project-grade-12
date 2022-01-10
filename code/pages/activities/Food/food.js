const { readFileSync, writeFile } = require("fs");
const global = require("../../../globals.js");
const checkDay = global.checkDay;

var sMeat = document.getElementById("sMeat");
var pMeat = document.getElementById("pMeat");
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

var submit = document.getElementById("submitFood");
submit.onclick = function() {
    var todayData;
    try {
        todayData = readFileSync("data/today.json", "utf8");
    } 
    catch (err) {
        console.error(err);
    }
    if(!checkDay()) {  
        window.location.href = "../../error/dayError.html";
        return;
    }
    todayData = JSON.parse(todayData);  

    todayData.food.meat = Number(sMeat.value);
    todayData.food.beef = Number(sBeef.value);
    todayData.food.local = Number(sLocal.value);

    writeFile("data/today.json", JSON.stringify(todayData), function (err) {
        if (err) console.error(err);
    });

    window.location.href = "../../main.html";
}