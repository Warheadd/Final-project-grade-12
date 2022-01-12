const {readFileSync, writeFile} = require("fs");
const global = require("../../globals.js");
const checkHistory = global.checkHistory;
const checkDay = global.checkDay;


    var today;
    try {
        today= readFileSync("today.json", "utf8");
    } 
    catch (err) {
        console.error(err);
    } 
    
    var profile;
    try {
        profile= readFileSync("profile.json", "utf8");
    } 
    catch (err) {
        console.error(err);
    } 

    if(!check(today)) {  
            window.location.href = "../error/historyError.html";
        }

    today = JSON.parse(today);  

    if(!check(profile)) {  
                window.location.href = "../error/historyError.html";
            }

    profile = JSON.parse(profile);  

    //province carbon per kwh
    var povkwh; 
    switch(profile.province){
    case "Alberta": povkwh = 790; break;
    case "British Columbia": povkwh = 13; break;
    case "Manitoba": povkwh = 3.4; break;
    case "New Brunswick": povkwh = 280; break;
    case "Newfoundland and Labrador": povkwh = 32; break;
    case "Northwest Territories": povkwh = 390; break;
    case "Nova Scotia": povkwh = 600; break;
    case "Nunavut": povkwh = 750; break;
    case "Ontario": povkwh = 40; break;
    case "Prince Edward Island": povkwh = 20; break;
    case "Quebec": povkwh = 1.2; break;
    case "Saskatchewan": povkwh = 660; break;
    case "Yukon": povkwh = 41; break;
   }
    //transportation
    gascar = 171*50*today.transportation.gascar;
    electric = 0.3*30*povkwh*today.transportation.electric;
    bus = 105*50*today.transportation.bus;
    walk = 0;
    train = 41*40*today.transportation.train;
    plane = 255*740*today.transportation.plane;
    boat = 19*40*today.transportation.boat;

    //lights
    if (profile.led == true){
        light = ((profile.sqft*40)/60)*today.lights*povkwh;
    }
    else{
        light = ((profile.sqft*40)/15)*today.lights*povkwh;
    }

    //appliances
    var otherDevices = 0
    if (today.otherDevices.oven == true){otherDevices = otherDevices + 1.2*povkwh;}
    if (today.otherDevices.stove == true){otherDevices = otherDevices + 3*povkwh;}
    if (today.otherDevices.microwave == true){otherDevices = otherDevices + 1*povkwh;}
    if (today.otherDevices.blender == true){otherDevices = otherDevices + 0.5*povkwh;}
    if (today.otherDevices.coffeemachine == true){otherDevices = otherDevices + 1*povkwh;}
    if (today.otherDevices.kettle == true){otherDevices = otherDevices + 1.2*povkwh;}
    if (today.otherDevices.dishwasher == true){otherDevices = otherDevices + 1.35*povkwh;}
    if (today.otherDevices.smallfan == true){otherDevices = otherDevices + 0.07*povkwh;}
    if (today.otherDevices.ceilingfan == true){otherDevices = otherDevices + 0.12*povkwh;}
    if (today.otherDevices.washingmachine == true){otherDevices = otherDevices + 0.8*povkwh;}
    if (today.otherDevices.dryer == true){otherDevices = otherDevices + 3*povkwh;}
    if (today.otherDevices.vacuum == true){otherDevices = otherDevices + 1*povkwh;}
    if (today.otherDevices.printer == true){otherDevices = otherDevices + 0.1*povkwh;}
    if (today.otherDevices.lamp == true){otherDevices = otherDevices + 0.03*povkwh;}
    if (today.otherDevices.router == true){otherDevices = otherDevices + 0.007*povkwh;}
    if (today.otherDevices.console == true){otherDevices = otherDevices + 0.15*povkwh;}
    if (today.otherDevices.hairdryer == true){otherDevices = otherDevices + 1.5*povkwh}
    if (today.otherDevices.fire == true){otherDevices = otherDevices + 1000}
    if (today.otherDevices.bbq == true){otherDevices = otherDevices + 1000}

    //ambient
    var heating;
    switch(profile.heating){
        case "Electric": heating = 0.0075*profile.sqft*4*povkwh; break;
        case "Gas": heating = ((60*profile.sqft*24)/1000000)*53000; break;
        case "Oil": heating = ((60*profile.sqft*24)/1000000)*53000; break;
        case "Boiler": heating = 4*povkwh*3; break;
        case "Pump": heating = 50/30*povkwh; break;
    }
    //fridge
    otherDevices = otherDevices+ 1.5*povkwh;

    //screens
    var screenkwh;
    phone = today.screen.phone*0.003*povkwh;
    laptop = today.screen.laptop*0.06*povkwh;
    pc = today.screen.pc*0.1*povkwh;
    tv = today.screen.tv*0.15*povkwh;

    //products
    var totalprice=0;
    var purchcarbon=0;

    for(let i=0; i<Object.keys(today.purchases).length; i++){

        if (today.purchases[i].price != undefined){
            totalprice = today.purchases[i].price + totalprice;
        }
        else{
            purchcarbon = today.purchases[i].carbon +purchcarbon;
        }
        
    }
    purchcarbon = purchcarbon + totalprice*490;

    //food
    beef = (today.food.beef/100)*2.5*55;
    meat = (today.food.meat/100)*2.5*3;
    local = (today.food.local/100)*2.5;

//ouput sorting
totalc = gascar+electric+bus+walk+plane+train+boat+light+otherDevices+heating+phone+laptop+pc+tv+purchcarbon+beef+meat+local;

const totalcarbon = {
    
        "food":beef+meat+local,
        "lights":light, 
        "transportation":gascar+electric+bus+walk+plane+train+boat, 
        "purchases":purchcarbon,
        "screen":phone+laptop+pc+tv,
        "heating":heating,
        "other":otherDevices,
        "total":totalc
};

console.log(totalcarbon)
