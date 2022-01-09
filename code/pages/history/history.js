const {readFileSync, writeFile} = require("fs");
const HISTORY_ELEMENT_FIRST = '<a href="editDay.html" class="historyElement" id=';
const HISTORY_ELEMENT_SECOND = '><div><h1>';
const HISTORY_ELEMENT_THIRD = '</h1><p></p></div></a>';

var historyData;
try {
    var historyData = readFileSync("data/history.txt", "utf8");
} 
catch (err) {
    console.error(err);
}
if(historyData==""){
    document.getElementById("leaveHistory").hidden = false;
}

var his = historyData.split("\n");
for(let i=his.length-1; i>=0; i--){
    var day = JSON.parse(his[i]);
    var date = day.date.slice(0,15);
    var container = document.getElementById("elements");
    var element = document.createElement("div");
    container.appendChild(element);
    element.outerHTML = HISTORY_ELEMENT_FIRST+i+HISTORY_ELEMENT_SECOND+date+HISTORY_ELEMENT_THIRD;
}
for(let i=0; i<his.length; i++){
    var element = document.getElementById(i);
    element.onclick = function() {
        writeFile("pages/history/editingDay.json",his[i], function(err) {
            if (err) console.error(err);
        });
    }
}

var submit = document.getElementById("leaveHistory");
submit.onclick = function() {
    window.location.href = "../../index.html";
}