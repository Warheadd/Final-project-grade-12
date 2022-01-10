const { readFileSync, writeFile } = require("fs");

writeFile("data/today.json", "", function (err) {
    if (err) console.error(err);
});

var submit = document.getElementById("submitDayError");
submit.onclick = function() {
    window.location.href = "../../index.html";
}