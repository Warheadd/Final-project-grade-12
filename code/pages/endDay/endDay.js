const AVERAGE_GRAMS = 50904;

// Reads the data for the current day
var conclusions;
try {
    conclusions = readFileSync("pages/endDay/conclusions.json", "utf8");
} 
catch (err) {
    console.error(err);
}
conclusions = JSON.parse(conclusions);

// Reads the data for the current day
var stats;
try {
    stats = readFileSync("pages/endDay/stats.json", "utf8");
} 
catch (err) {
    console.error(err);
}
// Checks if the json is correctly formatted, if not it redirects to an error
/*if(!checkDayStats()) {  
    window.location.href = "../error/dayError.html";
    return;
}*/
// If it is correctly formatted, it parses the json file
stats = JSON.parse(stats);

if(stats.total>AVERAGE_GRAMS){
    var title = document.getElementById("negative");
    title.hidden = false;
}
else {
    var title = document.getElementById("positive");
    title.hidden = false;
}

var total = document.getElementById("total");
total.innerHTML = "Today you emitted a total of " + stats.total.toFixed(2) + " grams of carbon.";

var earths = document.getElementById("earths");
earths.innerHTML = "If everyone emitted as much as you do it would take " + conclusions.earths.toFixed(2) + " earths to sustain you."

var averageCompare = document.getElementById("averageCompare");
if(stats.total<conclusions.average){
    averageCompare.innerHTML = "This is BELOW the average of your past days. Great work!";
}
else{
    averageCompare.innerHTML = "This is ABOVE the average of your past days. Try improve next time!"
}

var container = document.getElementById("tips");
var advice = conclusions.advice;

var ad = false;
for(let i in advice){
    ad = ad || advice[i];
}
if(!ad){
    document.getElementById("tipTitle").hidden = true;
}

if(advice.transportation){
    var transport = document.createElement("p");
    transport.className = "paragraphText";
    container.appendChild(transport);
    transport.innerHTML = "Try to reduce your emissions from transportation. This could include emissions from gas cars or flying. Try to reduce the amount of travelling you do, and if it's necessary, consider carpooling, bussing, walking, or biking. Also, consider electric forms of transport if possible.";
    container.appendChild(document.createElement("br"));
}
if(advice.food){
    var food = document.createElement("p");
    food.className = "paragraphText";
    container.appendChild(food);
    food.innerHTML = "Food creates a lot of emissions. Meat, particularly beef, takes a lot of carbon to produce compared to plants. Additionally, food from the store creates more emissions than food that is bought locally. Buying local and cutting down on meat is a great way to reduce your emissions. Consider altering your diet habits with the environment in mind!";
    container.appendChild(document.createElement("br"));
}
if(advice.led){
    var led = document.createElement("p");
    led.className = "paragraphText";
    container.appendChild(led);
    led.innerHTML = "Consider getting LED light bulbs for your house. They are less energy intensive and more efficient than incandescent light bulbs.";
    container.appendChild(document.createElement("br"));
}
if(advice.screens){
    var screens = document.createElement("p");
    screens.className = "paragraphText";
    container.appendChild(screens);
    screens.innerHTML = "You've spent a lot of time on screens. Charging phones, using desktops, and browsing the internet takes lots of electricity which creates emissions. Consider cutting back on your usage.";
    container.appendChild(document.createElement("br"));
}
if(advice.purchase){
    var purchase = document.createElement("p");
    purchase.className = "paragraphText";
    container.appendChild(purchase);
    purchase.innerHTML = "The creation and transportation of products is a big emitter of CO2. Reducing consumption is the best way to prevent this, but if you have to make a purchase, try to do some research about the amount of carbon you're emitting. This can help you choose the most eco-friendly brands and make you more environmentally-aware in general.";
    container.appendChild(document.createElement("br"));
}
if(advice.heating){
    var heating = document.createElement("p");
    heating.className = "paragraphText";
    container.appendChild(heating);
    heating.innerHTML = "Heating and cooling homes takes a lot of energy. It's a big ask, but consider switching to an environmentally friendly heating method such as a heat pump, which uses less electricity. If that's not possible, reducing extreme changes in heat and wearing weather-appropriate clothes is another way you can reduce consumption and your emissions.";
    container.appendChild(document.createElement("br"));
}

var submit = document.getElementById("submitEnd");
submit.onclick = function() {
    // Reads what is stored in today.json
    var todayData;
    try {
        todayData = readFileSync("data/today.json", "utf8");
    } 
    catch (err) {
        console.error(err);
    }
    // Checks if the json is correctly formatted, if not it redirects to an error
    if(!checkDay()) {  
        window.location.href = "pages/error/dayError.html";
        return;
    }
    // If it is not an error, it parses the JSON
    todayData = JSON.parse(todayData);

    todayData.total = stats.total;

    // Checks if the history file is correctly formatted, if not it redirects to an error.
    if(!checkHistory()) {  
        window.location.href = "pages/error/historyError.html";
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
    var days = historyData.split("\n");

    // If history.txt is blank, it can be immediately overwritten
    if(historyData==""){
        // Writes the old day to history.txt
        writeFile("data/history.txt", JSON.stringify(todayData), function (err) {
            if (err) console.error(err);
        });
        // Clears today.json
        writeFile("data/today.json", "", function (err) {
            if (err) console.error(err);
        });
        // Redirects to the main page
        window.location.href = "../../index.html";
        return;
    }

    // If history.txt is not blank, it has to be modified
    // The day is added to the collection of previous days
    days.push(JSON.stringify(todayData));
    let newFile = "";
    // Every day is written to newFile
    for(let i=0; i<days.length; i++){
        JSON.parse(days[i]);  
        newFile += days[i];
        // A line break is added every time except for the last one
        if(i<days.length-1){
            newFile += "\n";
        }
    }
    // Writes newFile to history.txt
    writeFile("data/history.txt", newFile, function (err) {
        if (err) console.error(err);
    });
    // Clears today.json
    writeFile("data/today.json", "", function (err) {
        if (err) console.error(err);
    });
    window.location.href = "../../index.html";
}