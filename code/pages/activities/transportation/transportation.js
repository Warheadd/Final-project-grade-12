const {writeFile} = require("fs");
const global = require("../../../globals.js");
const transports = global.transports;

var transport;
for(let i=0; i<transports.length; i++){
    var a = document.getElementById(transports[i]);
    a.onclick = function() {
        transport = transports[i];
        writeFile("pages/activities/transportation/typeOfTransport.txt", transport, function (err) {
            if (err) console.error(err);   
        });
    }
}