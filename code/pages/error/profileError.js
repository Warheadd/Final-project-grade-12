const { readFileSync, writeFile } = require("fs");

// If there is an error with the profile, it completely clears the profile information, to be safe
writeFile("data/profile.json", "", function (err) {
    if (err) console.error(err);
});

// Redirects to the main page when submitted (this will then redirect to profile creation because profile.json is blank)
var submit = document.getElementById("submitProfileError");
submit.onclick = function() {
    window.location.href = "../../index.html";
}