const { readFileSync, writeFile } = require("fs");

var profile;
try {
    profile = readFileSync("data/profile.json", "utf8");
} 
catch (err) {
    console.error(err);
}
if(profile==""){
    window.location.href = "pages/createProfile/province.html";
}