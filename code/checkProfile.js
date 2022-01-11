const { readFileSync, writeFile } = require("fs");

// Reads the data from the profile file
var profile;
try {
    profile = readFileSync("data/profile.json", "utf8");
} 
catch (err) {
    console.error(err);
}
// If it is blank, the user must create a profile before continuing
if(profile==""){
    window.location.href = "pages/createProfile/province.html";
}