const {readFileSync, writeFile} = require("fs");
const global = require("../../globals.js");
const checkProfile = global.checkProfile;

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
}
// If it is correctly formatted, it parses the json file
profile = JSON.parse(profile);  

// The selected province is set to the user's previously selected province
var province = document.getElementById(profile.province);
province.selected = "selected";

// The square feet of the user's house is entered into the input box
var sqft = document.getElementById("squareFoot");
sqft.value = profile.sqft;

// The selected heating method is set to what the user previously selected
var heating = document.getElementById(profile.heating);
heating.selected = "selected";

// The selected lightbulb type is set to what the user previously selected
if(profile.led){
    var light = document.getElementById("led");
    light.selected = "selected";
}
else {
    var light = document.getElementById("incandescent");
    light.selected = "selected";
}

// The kWh of the user's fridge is entered into the input box
var fridge = document.getElementById("fridge");
fridge.value = profile.fridge;

// The router checkbox is checked/unchecked based on what the user previously inputted
var router = document.getElementById("router");
router.checked = profile.router;

// Parsing the data when it gets submitted
var submit = document.getElementById("submitEditProfile");
submit.onclick = function() {
    // Creates a new JSON element that will store the user's profile data
    profile = {
        province: "",
        sqft: 0,
        heating: "",
        led: false,
        fridge: 1500,
        router: true
    };

    // Gets the value of the province dropdown and stores it in the JSON
    var drop = document.getElementById("province").value;
    profile.province = drop;

    // Gets the value for the square feet, heating, and lights, and stores it in the JSON
    var square = document.getElementById("squareFoot").value;
    var heating = document.getElementById("heating").value;
    var lights = document.getElementById("lights").value;
    // square must be a number, if not it displays an error
    if(square=="" || isNaN(square)){
        document.getElementById("editProfileError").hidden = false;
        return;
    }
    profile.sqft = Number(square);
    profile.heating = heating;
    if(lights=="led"){
        profile.led = true;
    }
    else {
        profile.led = false;
    }

    // Gets the values for the fridge and router, and stores it in the JSON
    var fridge = document.getElementById("fridge").value;
    var router = document.getElementById("router").checked;
    if(fridge!=""){
        // fridge must be a number, if not it displays an error
        if(isNaN(fridge)){
            document.getElementById("editProfileError").hidden = false;
            return;
        }
        else {
            profile.fridge = Number(fridge);
        }
    }
    // If fridge is blank, it assumes 1500kWh
    else {
        profile.fridge = 1500;
    }
    profile.router = router;

    // Writes the new data back into the file
    writeFile("data/profile.json",JSON.stringify(profile), function(err) {
        if (err) console.error(err);
    });

    // Redirects to the main page
    window.location.href = "../main.html";
}