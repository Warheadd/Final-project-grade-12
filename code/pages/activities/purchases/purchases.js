const { readFileSync, writeFile } = require("fs");
const PURCHASE_HTML = '<div class="verticalContainer"><input type="checkbox" style="margin-top:20px;"><label style="margin-bottom:30px"> Did you do any research about the environmental impact of the product beforehand?</label><br><h2 class="largeText" style="margin-top:40px">Please input the approximate grams of carbon used in the making of the product(s) (research is encouraged)</h2><input type="text" class="inputBox"><br><h2 class="largeText">OR</h2><br><h2 class="largeText">Please input the total price of the products(s) (Warning: VERY innacurate, only a crude approximation. Research is encouraged)</h2><input type="text" class="inputBox"><hr class="line" style="margin-bottom:20px"/></div>';

var add = document.getElementById("add");
add.onclick = function() {
    var container = document.getElementById("purchases");
    var purchase = document.createElement("div");
    container.appendChild(purchase);
    purchase.outerHTML = PURCHASE_HTML;
}

var submit = document.getElementById("submitPurchases");
submit.onclick = function() {
    var todayData;
    try {
        todayData = readFileSync("data/today.json", "utf8");
    } 
    catch (err) {
        console.error(err);
    }
    todayData = JSON.parse(todayData);

    var purchases = document.getElementsByClassName("verticalContainer");
    for(let i=0; i<purchases.length; i++){
        todayData.purchases[i] = {};
        var purchase = purchases[i].childNodes;
        todayData.purchases[i].research = purchase[0].checked;
        var carbon = purchase[4].value;
        var price = purchase[9].value;
        if(price.charAt(0)=="$"){
            price = price.slice(1);
        }
        if(price!=""){
            if(isNaN(price) || price<0){
                document.getElementById("purchaseError").hidden = false;
                return;
            }
            else {
                todayData.purchases[i].price = Number(price);
            }
        }
        else {
            todayData.purchases[i].price = undefined;
        }
        if(carbon!=""){
            if(isNaN(carbon) || carbon<0){
                document.getElementById("purchaseError").hidden = false;
                return;
            }
            else {
                todayData.purchases[i].carbon = Number(carbon);
            }
        }
        else {
            todayData.purchases[i].carbon = undefined;
        }
    }

    writeFile("data/today.json", JSON.stringify(todayData), function (err) {
        if (err) console.error(err);
    });

    window.location.href = "../../main.html";
}