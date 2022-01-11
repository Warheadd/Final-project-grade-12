const { readFileSync, writeFile } = require("fs");
const global = require("../../../globals.js");
const checkDay = global.checkDay;
// Stores the html for one purchase
const PURCHASE_HTML = '<div class="verticalContainer"><input type="checkbox" style="margin-top:20px;"><label style="margin-bottom:30px"> Did you do any research about the environmental impact of the product beforehand?</label><br><h2 class="largeText" style="margin-top:40px">Please input the approximate grams of carbon used in the making of the product(s) (research is encouraged)</h2><input type="text" class="inputBox"><br><h2 class="largeText">OR</h2><br><h2 class="largeText">Please input the total price of the products(s) (Warning: VERY innacurate, only a crude approximation. Research is encouraged)</h2><input type="text" class="inputBox"><hr class="line" style="margin-bottom:20px"/></div>';

// Adding fields for a new purchase whenever the user clicks "Add another purchase"
var add = document.getElementById("add");
add.onclick = function() {
    // Appends a new div element to the container element
    var container = document.getElementById("purchases");
    var purchase = document.createElement("div");
    container.appendChild(purchase);
    // Adds the correct html for the div element
    purchase.outerHTML = PURCHASE_HTML;
}

// Parsing the data when it gets submitted
var submit = document.getElementById("submitPurchases");
submit.onclick = function() {
    // Reads the data for the current day
    var todayData;
    try {
        todayData = readFileSync("data/today.json", "utf8");
    } 
    catch (err) {
        console.error(err);
    }
    // Checks if the json is correctly formatted, if not it redirects to an error
    if(!checkDay()) {  
        window.location.href = "../../error/dayError.html";
        return;
    }
    // If it is correctly formatted, it parses the json file
    todayData = JSON.parse(todayData);  

    // Every purchase contains an element with class name "verticalContainer", so getting all those elements gets every purchase
    var purchases = document.getElementsByClassName("verticalContainer");
    for(let i=0; i<purchases.length; i++){
        // For every purchase, it creates a new object in the JSON with a new index
        todayData.purchases[i] = {};
        // Stores the child nodes of the verticalContainer element
        var purchase = purchases[i].childNodes;
        // Sets the research property of the JSON to the checkbox status
        todayData.purchases[i].research = purchase[0].checked;
        //  Gets what the user inputted for carbon and price (the input boxes are the 4th and 9th elements respectively)
        var carbon = purchase[4].value;
        var price = purchase[9].value;
        // If the user inputted a $, we remove it to parse it as a number. Entering without the dollar sign is fine as well 
        if(price.charAt(0)=="$"){
            price = price.slice(1);
        }
        // If the user did not input anything for price AND carbon, there is an error
        if(price=="" && carbon==""){
            document.getElementById("purchaseError").hidden = false;
            return;
        }
        // If the user did input something for price, it gets parsed
        if(price!=""){
            // Checks if it is a positive number, if not it displays an error
            if(isNaN(price) || price<0){
                document.getElementById("purchaseError").hidden = false;
                return;
            }
            // Updates the JSON with price information
            else {
                todayData.purchases[i].price = Number(price);
            }
        }
        // If the user did not input anything, it is left as undefined
        else {
            todayData.purchases[i].price = undefined;
        }
        // If the user did input something for carbon, it gets parsed
        if(carbon!=""){
            // Checks if it is a positive number, if not it displays an error
            if(isNaN(carbon) || carbon<0){
                document.getElementById("purchaseError").hidden = false;
                return;
            }
            // Updates the JSON with carbon information
            else {
                todayData.purchases[i].carbon = Number(carbon);
            }
        }
        // If the user did not input anything, it is left as undefined
        else {
            todayData.purchases[i].carbon = undefined;
        }
    }

    // Writes the new data back into the file
    writeFile("data/today.json", JSON.stringify(todayData), function (err) {
        if (err) console.error(err);
    });

    // Redirects to the main page
    window.location.href = "../../main.html";
}