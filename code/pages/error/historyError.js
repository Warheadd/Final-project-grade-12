const { readFileSync, writeFile } = require("fs");

writeFile("data/history.txt", "", function (err) {
    if (err) console.error(err);
});

writeFile("data/today.json", "", function (err) {
    if (err) console.error(err);
});

var submit = document.getElementById("submitHistoryError");
submit.onclick = function() {
    window.location.href = "../../index.html";
}