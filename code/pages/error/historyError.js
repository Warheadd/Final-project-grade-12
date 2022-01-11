const { readFileSync, writeFile } = require("fs");

// If there is an error with the history, it completely clears the history and day information, to be safe
writeFile("data/history.txt", "", function (err) {
    if (err) console.error(err);
});

writeFile("data/today.json", "", function (err) {
    if (err) console.error(err);
});

// Redirects to the main page when submitted
var submit = document.getElementById("submitHistoryError");
submit.onclick = function() {
    window.location.href = "../../index.html";
}