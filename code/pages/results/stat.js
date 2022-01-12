const {readFileSync, writeFile} = require("fs");
const global = require("../../globals.js");
const checkHistory = global.checkHistory;
const checkDay = global.checkDay;

// creates a function to compare the user's statistics with averages

   
// Reads the data for the current day
var carbonData;
try {
    
    carbonData = readFileSync("faris.json", "utf8");
} 
catch (err) {
    console.error(err);
}

// Checks if the json is correctly formatted, if not it redirects to an error
if(!check(carbonData)) {  
    window.location.href = "../error/historyError.html";
}
// If it is correctly formatted, it parses the json file
carbonData = JSON.parse(carbonData);  
    
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
    
//all numbers are in grams
    
if(carbonData.transportation >2485.5) {
  recommended.advice[transportation] = true;
}
if(carbonData.food > 5620) {
   recommended.advice[food] = true;
}
if(carbonData.lights >195) {
   recommended.advice[led] = true;
}
if(carbonData.screen >2.6) {
   recommended.advice[screens] = true;
}
if(carbonData.purchases >42140) {
   recommended.advice[purchase] = true;
} 
if(carbonData.heating >7787) {
   recommended.advice[heating] = true;
}

var earthsRequired = 1;

earthsRequired = carbonData.total / 9942;

earths = earthsRequired.toFixed(2);
       
    

