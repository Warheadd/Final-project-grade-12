const {readFileSync, writeFile} = require("fs");
const global = require("../../globals.js");
const checkProfile = global.checkProfile;

var submit = document.getElementById("submitOtherProfile");
submit.onclick = function() {
    var fridge = document.getElementById("fridge").value;
    var router = document.getElementById("router").checked;

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

    if(fridge!=""){
        if(isNaN(fridge)){
            document.getElementById("otherProfileError").hidden = false;
            return;
        }
        else {
            profile.fridge = Number(fridge);
        }
    }
    else {
        profile.fridge = 1500;
    }
    profile.router = router;

    writeFile("data/profile.json",JSON.stringify(profile), function(err) {
        if (err) console.error(err);
    });

    window.location.href = "success.html";
}