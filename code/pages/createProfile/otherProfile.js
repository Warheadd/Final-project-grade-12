const {readFileSync, writeFile} = require("fs");
const global = require("../../globals.js");
const checkProfile = global.checkProfile;

// Parsing the data when it gets submitted
var submit = document.getElementById("submitOtherProfile");
submit.onclick = function() {
    // Getting the input box element values
    var fridge = document.getElementById("fridge").value;
    var router = document.getElementById("router").checked;

    // Reads the data for the user's profile
    var profile;
    try {
        profile = readFileSync("data/profile.json", "utf8");
    } 
    catch (err) {
        console.error(err);
    }
    // Checks if the json is correctly formatted, if not it redirects to an error
    if(!checkProfile()) {  
        window.location.href = "../error/profileError.html";
        return;
    }
    // If it is correctly formatted, it parses the json file
    profile = JSON.parse(profile);  

    if(fridge!=""){
        // Checks if the user inputted a number. If not, it displays an error message
        if(isNaN(fridge)){
            document.getElementById("otherProfileError").hidden = false;
            return;
        }
        else {
            profile.fridge = Number(fridge);
        }
    }
    // If the user left the field blank, it assumes 1500kWh
    else {
        profile.fridge = 1500;
    }
    profile.router = router;

    // Writes the new data back into the file
    writeFile("data/profile.json",JSON.stringify(profile), function(err) {
        if (err) console.error(err);
    });

    // Redirects to the next page
    window.location.href = "success.html";
}