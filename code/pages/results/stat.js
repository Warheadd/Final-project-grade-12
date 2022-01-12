const {readFileSync, writeFile} = require("fs");
const global = require("../../globals.js");
const checkHistory = global.checkHistory;
const checkDay = global.checkDay;

// compare the user's statistics with averages
// Reads the data regarding the amount of grams of carbon that the user preoduces on a certain day
var carbonData;

// tries to read the file
try {
    carbonData = readFileSync("faris.json", "utf8");
} 
// catches the errors if they are any
catch (err) {
    console.error(err);
}

// Checks if the json is correctly formatted, if not it redirects to an error
if(!check(carbonData)) {  
    window.location.href = "../error/historyError.html";
}
// If it is correctly formatted, it parses the json file
carbonData = JSON.parse(carbonData);  
    
// creates an object named recommended with properties
var recommended = {
"advice":{
    "transportation":true,
    "food":true,
    "led":true,
    "screens":true,
    "purchase":true,
    "heating":true,
    },
"earths":1,
"average":1000
}
    
// all numbers are in grams
// compares user's carbon emission from transportation with the average
if(carbonData.transportation >2485.5) {
  recommended.advice[transportation] = true;
}
// compares user's carbon emission from food with the average
if(carbonData.food > 5620) {
   recommended.advice[food] = true;
}
// compares user's carbon emission from lights with the average
if(carbonData.lights >195) {
   recommended.advice[led] = true;
}
// compares user's carbon emission from screens with the average
if(carbonData.screen >2.6) {
   recommended.advice[screens] = true;
}
// compares user's carbon emission from purchases with the average
if(carbonData.purchases >42140) {
   recommended.advice[purchase] = true;
} 
// compares user's carbon emission from heating with the average
if(carbonData.heating >7787) {
   recommended.advice[heating] = true;
}

// creates a variable and sets it to 1
var earthsRequired = 1;

// compares the user's total carbon produced (grams) in a single day and divides it by how much Earth can absorb per day
// this is to find out how many Earths would be required to sustain a world where everybody created as much carbon as you did 
earthsRequired = carbonData.total / 9942;

// takes the number of Earths required to sustain your world and rounds it to two decimal places
recommended.earths = earthsRequired.toFixed(2);
       
    

