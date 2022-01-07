const {readFileSync, writeFile} = require("fs");

var submit = document.getElementById("submitProvince");
submit.onclick = function() {
    var drop = document.getElementById("province").value;
    profile = {
        province: "",
        sqft: 0,
        heating: "",
        led: false,
        fridge: 1500,
        router: true
    };
    profile.province = drop;
    writeFile("data/profile.json",JSON.stringify(profile), function(err) {
        if (err) console.error(err);
    });

    window.location.href = "home.html";
}