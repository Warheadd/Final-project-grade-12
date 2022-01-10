const { readFileSync, writeFile } = require("fs");
const global = require("../../globals.js");
const transports = global.transports;
const screens = global.screens;
const devices = global.devices;
const checkHistory = global.checkHistory;
const check = global.check;
const PURCHASE_HTML = '<input type="checkbox" style="margin-top:20px;"><label style="margin-bottom:30px"> Whether research was done</label><br><h2 class="largeText" style="margin-top:40px">Grams of carbon emitted</h2><input type="text" class="inputBox"><br><h2 class="largeText">OR</h2><br><h2 class="largeText">Price</h2><input type="text" class="inputBox"><hr class="line" style="margin-bottom:20px"/>';
const GRAMS_PER_DOLLAR = 490;

var todayData;
try {
    todayData = readFileSync("pages/history/editingDay.json", "utf8");
} 
catch (err) {
    console.error(err);
}
if(!check(todayData)) {  
    window.location.href = "../../error/historyError.html";
}
todayData = JSON.parse(todayData);  

for(let i=0; i<transports.length; i++){
    var transport = document.getElementById(transports[i]);
    transport.value = todayData.transportation[transports[i]];
}

var sMeat = document.getElementById("sMeat");
sMeat.value = todayData.food.meat;
var pMeat = document.getElementById("pMeat");
pMeat.innerHTML = todayData.food.meat+"%";
sMeat.oninput = function() {
    pMeat.innerHTML = this.value+"%";
}

var sBeef = document.getElementById("sBeef");
sBeef.value = todayData.food.beef;
var pBeef = document.getElementById("pBeef");
pBeef.innerHTML = todayData.food.beef+"%";
sBeef.oninput = function() {
    pBeef.innerHTML = this.value+"%";
}

var sLocal = document.getElementById("sLocal");
sLocal.value = todayData.food.local;
var pLocal = document.getElementById("pLocal");
pLocal.innerHTML = todayData.food.local+"%";
sLocal.oninput = function() {
    pLocal.innerHTML = this.value+"%";
}

for(let i=0; i<screens.length; i++){
    var screen = document.getElementById(screens[i]);
    screen.value = todayData.screen[screens[i]];
}

var light = document.getElementById("lightLength");
light.value = todayData.lights;

for(let i=0; i<devices.length; i++){
    var box = document.getElementById(devices[i]);
    box.checked = todayData.otherDevices[devices[i]];
}

var container = document.getElementById("purchases");
var pastPurchases = todayData.purchases;
for(let i=0; i<Object.keys(pastPurchases).length; i++){
    var research = pastPurchases[i].research;
    var carbon = pastPurchases[i].carbon;
    var price = pastPurchases[i].price;
    var container = document.getElementById("purchases");
    var purchase = document.createElement("div");
    container.appendChild(purchase);
    purchase.innerHTML = PURCHASE_HTML;
    purchase.className = "verticalContainer";
    var fields = purchase.childNodes;
    if(carbon!=undefined){
        fields[4].value = carbon;
    }
    if(price!=undefined){
        fields[9].value = price;
    }
    fields[0].checked = research;
}

var add = document.getElementById("add");
add.onclick = function() {
    var container = document.getElementById("purchases");
    var purchase = document.createElement("div");
    container.appendChild(purchase);
    purchase.innerHTML = PURCHASE_HTML;
    purchase.className = "verticalContainer";
}

var submit = document.getElementById("submitDay");
submit.onclick = function() {
    for(let i=0; i<transports.length; i++){
        var transpor = document.getElementById(transports[i]).value;
        if(transpor!=""){
            if(isNaN(transpor) || transpor<0 || transpor>24){
                document.getElementById("dayError").hidden = false;
                return;
            }
        }
        else {
            transpor = 0;
        }
        todayData.transportation[transports[i]] = transpor;
    }

    for(let i=0; i<screens.length; i++){
        var screen = document.getElementById(screens[i]).value;
        if(isNaN(screen) || screen<0 || screen>24){
            document.getElementById("dayError").hidden = false;
            return;
        }
        if(screen==""){
            todayData.screen[screens[i]] = 0;
        }
        else {
            todayData.screen[screens[i]] = Number(screen);
        }
    }

    var time = document.getElementById("lightLength").value;
    if(time=="" || isNaN(time) || time<0 || time>24){
        document.getElementById("dayError").hidden = false;
        return;
    }
    todayData.lights = Number(time);

    var checkboxes = [];
    for(let i=0; i<devices.length; i++){
        var box = document.getElementById(devices[i]);
        checkboxes[i] = box.checked;
    }
    for(let i=0; i<devices.length; i++){
        todayData.otherDevices[devices[i]] = checkboxes[i];
    }

    todayData.food.meat = Number(sMeat.value);
    todayData.food.beef = Number(sBeef.value);
    todayData.food.local = Number(sLocal.value);

    var purchases = document.getElementsByClassName("verticalContainer");
    for(let i=1; i<purchases.length; i++){
        todayData.purchases[i] = {};
        var purchase = purchases[i].childNodes;
        todayData.purchases[i].research = purchase[0].checked;
        var carbon = purchase[4].value;
        var price = purchase[9].value;
        if(price.charAt(0)=="$"){
            price = price.slice(1);
        }
        if(price!="" && (isNaN(price) || price<0)){
            document.getElementById("dayError").hidden = false;
            return;
        }
        if(carbon!=""){
            if(isNaN(carbon) || carbon<0){
                document.getElementById("dayError").hidden = false;
                return;
            }
            todayData.purchases[i].carbon = Number(carbon);
        }
        else if(price!=""){
            todayData.purchases[i].carbon = Number(price) * GRAMS_PER_DOLLAR;
        }
        else {
            document.getElementById("dayError").hidden = false;
            return;
        }
    }

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
    days = historyData.split("\n");
    let newFile = "";
    for(let i=0; i<days.length; i++){
        if(i==todayData.index){
            newFile += JSON.stringify(todayData);
        }
        else {
            newFile += days[i];
        }
        if(i<days.length-1){
            newFile += "\n";
        }
    }
    writeFile("data/history.txt", newFile, function (err) {
        if (err) console.error(err);
    });

    window.location.href = "../../index.html";
}