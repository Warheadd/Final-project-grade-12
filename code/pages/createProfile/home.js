const {readFileSync, writeFile} = require("fs");
const global = require("../../globals.js");
const checkProfile = global.checkProfile;

// Parsing the data when it gets submitted
var submit = document.getElementById("submitHome");
submit.onclick = function() {
    // Getting the input box element values
    var square = document.getElementById("squareFoot").value;
    var heating = document.getElementById("heating").value;
    var lights = document.getElementById("lights").value;
    // Checks if square is a number, if not it shows an error message
    if(square=="" || isNaN(square)){
        document.getElementById("homeError").hidden = false;
        return;
    }

    // Reads the data for the user's profile
    var profile;
    try {
        profile = readFileSync("data/profile.json", "utf8");
    } 
    catch (err) {
        console.error(err);
    }
    // Checks if the data is a JSON file. It does not run a FULL check because at this point the user has not inputted everything so the file won't be fully formatted
    try {
        profile = JSON.parse(profile);
    } 
    // If it is not a JSON file it redirects to an error
    catch (err) {
        window.location.href = "../error/profileError.html";
        return;
    }

    // Stores the input data in the JSON
    profile.sqft = Number(square);
    profile.heating = heating;
    // led will just be a boolean, true if they do have LEDs
    if(lights=="led"){
        profile.led = true;
    }
    else {
        profile.led = false;
    }

    // Writes the new data back into the file
    writeFile("data/profile.json",JSON.stringify(profile), function(err) {
        if (err) console.error(err);
    });

    // Redirects to the next page
    window.location.href = "otherProfile.html";
}