const {readFileSync, writeFile} = require("fs");

// Parsing the data when it gets submitted
var submit = document.getElementById("submitProvince");
submit.onclick = function() {
    // Gets the value of the dropdown selection
    var drop = document.getElementById("province").value;
    // Creates a new JSON element that will store the user's profile data
    profile = {
        province: "",
        sqft: 0,
        heating: "",
        led: false,
        fridge: 1500,
        router: true
    };
    // Stores the selected province in the JSON element
    profile.province = drop;
    // Writes the new data back into the file
    writeFile("data/profile.json",JSON.stringify(profile), function(err) {
        if (err) console.error(err);
    });

    // Redirects to the next page
    window.location.href = "home.html";
}