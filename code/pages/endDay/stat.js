const {readFileSync, writeFile} = require("fs");
const global = require("../../globals.js");
const checkHistory = global.checkHistory;
const checkDay = global.checkDay;

// compare the user's statistics with averages
// Reads the data regarding the amount of grams of carbon that the user preoduces on a certain day
var carbonData;

// tries to read the file
try {
    carbonData = readFileSync("data/emmission.json", "utf8");
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
recommended.advice[transportation] = carbonData.transportation >2485.5;

// compares user's carbon emission from food with the average
recommended.advice[food] = carbonData.food > 5620;

// compares user's carbon emission from lights with the average
recommended.advice[led] = carbonData.lights >195;

// compares user's carbon emission from screens with the average
recommended.advice[screens] = carbonData.screen >2.6;

// compares user's carbon emission from purchases with the average
recommended.advice[purchase] = carbonData.purchases >42140;

// compares user's carbon emission from heating with the average
recommended.advice[heating] = carbonData.heating >7787;

// creates a variable and sets it to 1
var earthsRequired = 1;

// compares the user's total carbon produced (grams) in a single day and divides it by how much Earth can absorb per day
// this is to find out how many Earths would be required to sustain a world where everybody created as much carbon as you did 
earthsRequired = carbonData.total / 9942;

// takes the number of Earths required to sustain your world and rounds it to two decimal places
recommended.earths = earthsRequired.toFixed(2);
       
// Writes the new data back to a file
writeFile("pages/endDay/conclusions.json", JSON.stringify(recommended), function (err) {
   if (err) console.error(err);
});
