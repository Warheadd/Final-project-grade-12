const {readFileSync, writeFile} = require("fs");
const global = require("../../globals.js");
const checkProfile = global.checkProfile;

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

var province = document.getElementById(profile.province);
province.selected = "selected";

var sqft = document.getElementById("squareFoot");
sqft.value = profile.sqft;

var heating = document.getElementById(profile.heating);
heating.selected = "selected";

if(profile.led){
    var light = document.getElementById("led");
    light.selected = "selected";
}
else {
    var light = document.getElementById("incandescent");
    light.selected = "selected";
}

var fridge = document.getElementById("fridge");
fridge.value = profile.fridge;

var router = document.getElementById("router");
router.checked = profile.router;

var submit = document.getElementById("submitEditProfile");
submit.onclick = function() {
    profile = {
        province: "",
        sqft: 0,
        heating: "",
        led: false,
        fridge: 1500,
        router: true
    };

    var drop = document.getElementById("province").value;
    profile.province = drop;

    var square = document.getElementById("squareFoot").value;
    var heating = document.getElementById("heating").value;
    var lights = document.getElementById("lights").value;
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

    var fridge = document.getElementById("fridge").value;
    var router = document.getElementById("router").checked;
    if(fridge!=""){
        if(isNaN(fridge)){
            document.getElementById("editProfileError").hidden = false;
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

    window.location.href = "../main.html";
}