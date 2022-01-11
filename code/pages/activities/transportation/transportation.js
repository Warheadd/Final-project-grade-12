const {writeFile} = require("fs");
const global = require("../../../globals.js");
const transports = global.transports;

for(let i=0; i<transports.length; i++){
    // transports stores a list of all methods of transportation. The buttons on the html page have IDs based on this data, so we can get elements by using transports as an index
    var a = document.getElementById(transports[i]);
    // For each element, we define what happens when it is clicked
    a.onclick = function() {
        // The buttons store which type of transport the user chose in a file and link to the next page (transportation2.html)
        var transport = transports[i];
        writeFile("pages/activities/transportation/typeOfTransport.txt", transport, function (err) {
            if (err) console.error(err);   
        });
    }
}