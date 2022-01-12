

// compare the user's statistics with averages
// Reads the data regarding the amount of grams of carbon that the user preoduces on a certain day
var carbonData;

// tries to read the file
try {
    carbonData = readFileSync("pages/endDay/stats.json", "utf8");
    
} 
// catches the errors if they are any
catch (err) {
    console.error(err);
}
// Parses the json file
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
recommended.advice.transportation = carbonData.transportation >2485.5;

// compares user's carbon emission from food with the average
recommended.advice.food = carbonData.food > 5620;

// compares user's carbon emission from lights with the average
recommended.advice.led = carbonData.lights >195;

// compares user's carbon emission from screens with the average
recommended.advice.screens = carbonData.screen >2.6;

// compares user's carbon emission from purchases with the average
recommended.advice.purchase = carbonData.purchases >42140;

// compares user's carbon emission from heating with the average
recommended.advice.heating = carbonData.heating >7787;

// creates a variable and sets it to 1
var earthsRequired = 1;

// compares the user's total carbon produced (grams) in a single day and divides it by how much Earth can absorb per day
// this is to find out how many Earths would be required to sustain a world where everybody created as much carbon as you did 
earthsRequired = carbonData.total / 9942;

// takes the number of Earths required to sustain your world and rounds it to two decimal places
recommended.earths = earthsRequired;

// Checks if the history file is correctly formatted, if not it redirects to an error.
if(!checkHistory()) {  
    window.location.href = "pages/error/historyError.html";
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
var average = 0;
if(historyData!=""){
    var days = historyData.split("\n");
    for(let i=0; i<days.length; i++){
        var day = JSON.parse(days[i]);
        average += day.total;
    }
    average /= days.length;
}
recommended.average = average;
       
// Writes the new data back to a file
writeFileSync("pages/endDay/conclusions.json", JSON.stringify(recommended), function (err) {
   if (err) console.error(err);
});
