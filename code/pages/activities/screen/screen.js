const {readFileSync, writeFile} = require("fs");
const global = require("../../../globals.js");
const screens = global.screens;

var submit = document.getElementById("submitScreen");
submit.onclick = function() {
    var day;
    try {
        day = readFileSync("data/today.json", "utf8");
    } 
    catch (err) {
        console.error(err);
    }
    day = JSON.parse(day);

    for(let i=0; i<screens.length; i++){
        var screen = document.getElementById(screens[i]).value;
        if(isNaN(screen) || screen<0 || screen>24){
            document.getElementById("screenError").hidden = false;
            return;
        }
        if(screen==""){
            day.screen[screens[i]] = 0;
        }
        else {
            day.screen[screens[i]] = Number(screen);
        }
    }
    
    writeFile("data/today.json",JSON.stringify(day), function(err) {
        if (err) console.error(err);
    });

    window.location.href = "../../main.html";
}