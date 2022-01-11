const { readFileSync, writeFile } = require("fs");
const global = require("../../globals.js");
const transports = global.transports;
const screens = global.screens;
const devices = global.devices;
const checkHistory = global.checkHistory;
const check = global.check;
// Stores the html for one purchase
const PURCHASE_HTML = '<input type="checkbox" style="margin-top:20px;"><label style="margin-bottom:30px"> Whether research was done</label><br><h2 class="largeText" style="margin-top:40px">Grams of carbon emitted</h2><input type="text" class="inputBox"><br><h2 class="largeText">OR</h2><br><h2 class="largeText">Price</h2><input type="text" class="inputBox"><hr class="line" style="margin-bottom:20px"/>';

// Reads the data for the current day
var todayData;
try {
    todayData = readFileSync("pages/history/editingDay.json", "utf8");
} 
catch (err) {
    console.error(err);
}
// Checks if the json is correctly formatted, if not it redirects to an error
if(!check(todayData)) {  
    window.location.href = "../error/historyError.html";
}
// If it is correctly formatted, it parses the json file
todayData = JSON.parse(todayData);  

// For every transport input box, the value that was previously inputted by the user is entered
// Both the ID of elements and the index of the JSON use transports as a basis, so it can be used to index both
for(let i=0; i<transports.length; i++){
    var transport = document.getElementById(transports[i]);
    transport.value = todayData.transportation[transports[i]];
}

// Sets the slider values and the labels for the sliders to the values the user already inputted
var sMeat = document.getElementById("sMeat");
sMeat.value = todayData.food.meat;
var pMeat = document.getElementById("pMeat");
pMeat.innerHTML = todayData.food.meat+"%";
// Updates the slider label whenever the user modifies a slider
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

// For every screen input box, the value that was previously inputted by the user is entered
for(let i=0; i<screens.length; i++){
    var screen = document.getElementById(screens[i]);
    screen.value = todayData.screen[screens[i]];
}

// The light hours the user inputted is entered into the input box
var light = document.getElementById("lightLength");
light.value = todayData.lights;

// For every device checkbox, the value that was previously inputted by the user is entered
for(let i=0; i<devices.length; i++){
    var box = document.getElementById(devices[i]);
    box.checked = todayData.otherDevices[devices[i]];
}

// Gets the container element that stores the purchases
var container = document.getElementById("purchases");
// Gets the purchases the user has already entered
var pastPurchases = todayData.purchases;
// Loops through every past purchase
for(let i=0; i<Object.keys(pastPurchases).length; i++){
    // Copies the values of the user's past purchase
    var research = pastPurchases[i].research;
    var carbon = pastPurchases[i].carbon;
    var price = pastPurchases[i].price;
    // Creates a new div and appends it to the purchase container
    var purchase = document.createElement("div");
    container.appendChild(purchase);
    // Sets the html of the div to the correct purchase html
    purchase.innerHTML = PURCHASE_HTML;
    purchase.className = "verticalContainer";
    // Gets the child nodes of the div
    var fields = purchase.childNodes;
    // Sets the input nodes to the values the user inputted previously (the input nodes are at positions 0, 4, and 9)
    if(carbon!=undefined){
        fields[4].value = carbon;
    }
    if(price!=undefined){
        fields[9].value = price;
    }
    fields[0].checked = research;
}

// Adding fields for a new purchase whenever the user clicks "Add another purchase"
var add = document.getElementById("add");
add.onclick = function() {
    // Appends a new div element to the container element
    var container = document.getElementById("purchases");
    var purchase = document.createElement("div");
    container.appendChild(purchase);
    // Adds the correct html for the div element
    purchase.innerHTML = PURCHASE_HTML;
    purchase.className = "verticalContainer";
}

// Parsing the data when it gets submitted
var submit = document.getElementById("submitDay");
submit.onclick = function() {
    // For every method of transportation, it stores what was entered in the input box
    for(let i=0; i<transports.length; i++){
        var transpor = document.getElementById(transports[i]).value;
        // Checks if the value is a number between 0 and 24. If not, it displays an error.
        if(transpor!=""){
            if(isNaN(transpor) || transpor<0 || transpor>24){
                document.getElementById("dayError").hidden = false;
                return;
            }
        }
        // If the user did not enter anything, a default value of 0 is assumed
        else {
            transpor = 0;
        }
        todayData.transportation[transports[i]] = transpor;
    }

    // For every screen activity, it stores what was entered in the input box
    for(let i=0; i<screens.length; i++){
        var screen = document.getElementById(screens[i]).value;
        // Checks if the value is a number between 0 and 24. If not, it displays an error.
        if(isNaN(screen) || screen<0 || screen>24){
            document.getElementById("dayError").hidden = false;
            return;
        }
        // If the user did not enter anything, a default value of 0 is assumed
        if(screen==""){
            todayData.screen[screens[i]] = 0;
        }
        else {
            todayData.screen[screens[i]] = Number(screen);
        }
    }

    // Checks if the value for lights a number between 0 and 24. If not, it displays an error.
    var time = document.getElementById("lightLength").value;
    if(time=="" || isNaN(time) || time<0 || time>24){
        document.getElementById("dayError").hidden = false;
        return;
    }
    todayData.lights = Number(time);

    // Creates an array of booleans that store the status of the checkboxes on the page (checked or unchecked)
    var checkboxes = [];
    for(let i=0; i<devices.length; i++){
        // devices stores a list of all devices. The checkboxes on the html page have IDs based on this data, so we can get elements by using devices as an index
        var box = document.getElementById(devices[i]);
        checkboxes[i] = box.checked;
    }
    // The booleans stored in checkboxes are transferred to the JSON
    for(let i=0; i<devices.length; i++){
        todayData.otherDevices[devices[i]] = checkboxes[i];
    }

    // Updates the values for the food inside the json based on the values of the sliders
    todayData.food.meat = Number(sMeat.value);
    todayData.food.beef = Number(sBeef.value);
    todayData.food.local = Number(sLocal.value);

    // Every purchase contains an element with class name "verticalContainer", so getting all those elements gets every purchase. The first one is skipped since there is an extra element with class "verticalContainer"
    var purchases = document.getElementsByClassName("verticalContainer");
    for(let i=1; i<purchases.length; i++){
        // For every purchase, it creates a new object in the JSON with a new index
        todayData.purchases[i] = {};
        // Stores the child nodes of the verticalContainer element
        var purchase = purchases[i].childNodes;
        // Sets the research property of the JSON to the checkbox status
        todayData.purchases[i].research = purchase[0].checked;
        //  Gets what the user inputted for carbon and price (the input boxes are the 4th and 9th elements respectively)
        var carbon = purchase[4].value;
        var price = purchase[9].value;
        // If the user inputted a $, we remove it to parse it as a number. Entering without the dollar sign is fine as well 
        if(price.charAt(0)=="$"){
            price = price.slice(1);
        }
        // If the user did not input anything for price AND carbon, there is an error
        if(price=="" && carbon==""){
            document.getElementById("purchaseError").hidden = false;
            return;
        }
        // If the user did input something for price, it gets parsed
        if(price!=""){
            // Checks if it is a positive number, if not it displays an error
            if(isNaN(price) || price<0){
                document.getElementById("purchaseError").hidden = false;
                return;
            }
            // Updates the JSON with price information
            else {
                todayData.purchases[i].price = Number(price);
            }
        }
        // If the user did not input anything, it is left as undefined
        else {
            todayData.purchases[i].price = undefined;
        }
        // If the user did input something for carbon, it gets parsed
        if(carbon!=""){
            // Checks if it is a positive number, if not it displays an error
            if(isNaN(carbon) || carbon<0){
                document.getElementById("purchaseError").hidden = false;
                return;
            }
            // Updates the JSON with carbon information
            else {
                todayData.purchases[i].carbon = Number(carbon);
            }
        }
        // If the user did not input anything, it is left as undefined
        else {
            todayData.purchases[i].carbon = undefined;
        }
    }

    // Checks if the history file is correctly formatted. If not, it redirects to an error
    var days;
    if(!checkHistory()) {  
        window.location.href = "../error/historyError.html";
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
    days = historyData.split("\n");

    // Recreates the file from scratch with some modifications
    let newFile = "";
    // Loops through every day in the history
    for(let i=0; i<days.length; i++){
        // If the index matches the day currently being edited, the new data is added instead of the old data
        if(i==todayData.index){
            newFile += JSON.stringify(todayData);
        }
        // Otherwise, the old data is added back in
        else {
            newFile += days[i];
        }
        // A line break is added every time except for the last one
        if(i<days.length-1){
            newFile += "\n";
        }
    }
    // Writes the new data back into the file
    writeFile("data/history.txt", newFile, function (err) {
        if (err) console.error(err);
    });

    // Redirects to the main page
    window.location.href = "../../index.html";
}