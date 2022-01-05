const {readFileSync, writeFile} = require("fs");

var submit = document.getElementById("submitLight");
submit.onclick = function() {
    var time = document.getElementById("lightLength").value;
    if(time=="" || isNaN(time) || time<0 || time>24){
        document.getElementById("lightError").hidden = false;
        return;
    }
    var day;
    try {
        day = readFileSync("data/today.json", "utf8");
    } 
    catch (err) {
        console.error(err);
    }
    day = JSON.parse(day);
    day.lights = Number(time);
    writeFile("data/today.json",JSON.stringify(day), function(err) {
        if (err) console.error(err);
    });

    window.location.href = "../../main.html";
}