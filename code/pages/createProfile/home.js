const {readFileSync, writeFile} = require("fs");
const global = require("../../globals.js");
const checkProfile = global.checkProfile;

var submit = document.getElementById("submitHome");
submit.onclick = function() {
    var square = document.getElementById("squareFoot").value;
    var heating = document.getElementById("heating").value;
    var lights = document.getElementById("lights").value;
    if(square=="" || isNaN(square)){
        document.getElementById("homeError").hidden = false;
        return;
    }

    var profile;
    try {
        profile = readFileSync("data/profile.json", "utf8");
    } 
    catch (err) {
        console.error(err);
    }
    if(!checkProfile()) {  
        window.location.href = "../../error/profileError.html";
        return;
    }
    profile = JSON.parse(profile);  

    profile.sqft = Number(square);
    profile.heating = heating;
    if(lights=="led"){
        profile.led = true;
    }
    else {
        profile.led = false;
    }

    writeFile("data/profile.json",JSON.stringify(profile), function(err) {
        if (err) console.error(err);
    });

    window.location.href = "otherProfile.html";
}