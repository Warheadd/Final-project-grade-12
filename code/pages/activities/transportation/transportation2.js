const {readFileSync, writeFile} = require("fs");

var submit = document.getElementById("submitTransport");
submit.onclick = function() {
    var time = document.getElementById("transportLength").value;
    if(time=="" || isNaN(time) || time<0 || time>24){
        document.getElementById("transportError").hidden = false;
        return;
    }
    var transportType;
    try {
        transportType = readFileSync("pages/activities/transportation/typeOfTransport.txt", "utf8");
    } 
    catch (err) {
        console.error(err);
    }
    var day;
    try {
        day = readFileSync("data/today.json", "utf8");
    } 
    catch (err) {
        console.error(err);
    }
    day = JSON.parse(day);
    day.transportation[transportType] = Number(time);
    writeFile("data/today.json",JSON.stringify(day), function(err) {
        if (err) console.error(err);
    });

    window.location.href = "../../main.html";
}