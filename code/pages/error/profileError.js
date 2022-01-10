const { readFileSync, writeFile } = require("fs");

writeFile("data/profile.json", "", function (err) {
    if (err) console.error(err);
});

var submit = document.getElementById("submitProfileError");
submit.onclick = function() {
    window.location.href = "../../index.html";
}