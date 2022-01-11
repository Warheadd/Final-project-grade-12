const { readFileSync, writeFile } = require("fs");

// If there is an error with the day, it completely clears the information, to be safe
writeFile("data/today.json", "", function (err) {
    if (err) console.error(err);
});

// Redirects to the main page when submitted
var submit = document.getElementById("submitDayError");
submit.onclick = function() {
    window.location.href = "../../index.html";
}