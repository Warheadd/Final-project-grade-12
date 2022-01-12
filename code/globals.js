// The different types of transportation
const transports = ["gascar","electric","bus","walk","plane","train","boat"];
exports.transports = transports;
// The different screen time activities
const screens = ["phone","laptop","pc","tv","internet"];
exports.screens = screens;
// The other devices that can be used
const devices = ["oven","stove","microwave","blender","coffee machine","kettle","dishwasher","small fan","ceiling fan","washing machine","dryer","vacuum cleaner","printer","lamp","console","hair dryer","fire","bbq"];
exports.devices = devices;
// The provinces of Canada
const provinces = ["ontario","alberta","british columbia","manitoba","new brunswick","newfoundland and labrador","northwest territories","nova scotia","nunavut","prince edward island","quebec","saskatchewan","yukon"];
exports.provinces = provinces;
// The different heating/cooling methods
const heating = ["electric furnace","natural gas furnace","fuel oil furnace","boiler","heat pump"];
exports.heating = heating;

const { readFileSync } = require("fs");

/**
 * Checks if a given variable is an object
 * @param {Object} o    The variable to check
 * @returns {Boolean}   Whether the given variable is an object
 */
function isObject(o){
    // typeof will return true if o is an object, array, or null. The array and null cases are eliminated to only check for objects
    return typeof o === 'object' && !Array.isArray(o) && o !== null;
}

/**
 * Checks if a given day is correctly formatted
 * @param {String} day  The day to check
 * @returns {Boolean}   Whether the day is correctly formatted
 */
function check(day){
    // The day must be a valid JSON object, if not, it is not correctly formatted
    try {  
        day = JSON.parse(day);  
    } catch (e) {  
        return false;
    }
    // The index must be a number
    if(typeof day.index != "number") return false;
    // The date must be a valid date
    if(new Date(day.date) == "Invalid Date" || isNaN(new Date(day.date))) return false;
    // The transportation property must be an object
    if(!isObject(day.transportation)) return false;
    // The transportation property must have every element of transports as a property and the values must be numbers
    for(var i=0; i<transports.length; i++){
        if(typeof day.transportation[transports[i]] != "number") return false;
    }
    // The food property must be an object
    if(!isObject(day.food)) return false;
    // The food property must have "meat", "beef", and "local" as properties and they must all be numbers
    if(typeof day.food.meat != "number" || typeof day.food.beef != "number" || typeof day.food.local != "number") return false;
    // The screen property must be an object
    if(!isObject(day.screen)) return false;
    // The screen property must have every element of screens as a property and the values must be numbers
    for(var i=0; i<screens.length; i++){
        if(typeof day.screen[screens[i]] != "number") return false;
    }
    // lights must be a number
    if(typeof day.lights != "number") return false;
    // The otherDevices property must be an object
    if(!isObject(day.otherDevices)) return false;
    // The otherDevices property must have every element of devices as a property and the values must be booleans
    for(var i=0; i<devices.length; i++){
        if(typeof day.otherDevices[devices[i]] != "boolean") return false;
    }
    // The purchases property must be an object
    if(!isObject(day.purchases)) return false;
    // Every element of purchases must be correctly formatted
    for(let i=0; i<Object.keys(day.purchases).length; i++){
        // The index start at 0 and increase by 1
        var p = day.purchases[i];
        // The purchase must be an object
        if(!isObject(p)) return false;
        // The research property must be a boolean
        if(typeof p.research != "boolean") return false;
        // The carbon and price property cannot simultaneously be undefined
        if(p.carbon==undefined && p.price==undefined) return false;
        // Both carbon and price should be numbers (or undefined)
        if(typeof p.carbon != "number" && p.carbon!=undefined || typeof p.price != "number" && p.price!=undefined) return false;
    }
    // The total carbon must be a number
    if(typeof day.total != "number") return false;
    // If EVERY condition is met, it is a valid day
    return true;
}

exports.check = check;

/**
 * Checks if the current day is correctly formatted
 */
exports.checkDay = function(){
    // Reads today.json
    var day;
    try {
        day = readFileSync("data/today.json", "utf8");
    } 
    catch (err) {
        console.error(err);
    }
    // Checks if the contents of today.json are correctly formatted
    return check(day);
}

/**
 * Checks if the history file is correctly formatted
 */
exports.checkHistory = function(){
    // Reads history.txt
    var historyData;
    try {
        historyData = readFileSync("data/history.txt", "utf8");
    } 
    catch (err) {
        console.error(err);
    }
    // The history file being blank is a valid state
    if(historyData==""){
        return true;
    }
    else {
        // The days are separated by line breaks
        var his = historyData.split("\n");
        // Loops through every day
        for(let i=his.length-1; i>=0; i--){
            // The day must be correctly formatted
            if(!check(his[i])){
                return false;
            }
            // The indexes must start at 0 and increase by 1
            if(JSON.parse(his[i]).index!=i){
                return false;
            }
        }
    }
    // If EVERY condition is met, it is correctly formatted
    return true;
}

/**
 * Checks if the user's profile data is correctly formatted
 */
exports.checkProfile = function(){
    // Reads profile.json
    var profile;
    try {
        profile = readFileSync("data/profile.json", "utf8");
    } 
    catch (err) {
        console.error(err);
    }
    // It must be a valid JSON object, if not it is not correctly formatted
    try {  
        profile = JSON.parse(profile);  
    } catch (e) {  
        return false;
    }
    // The province property must be an element of provinces
    if(!provinces.includes(profile.province)) return false;
    // The square footage must be a number
    if(typeof profile.sqft != "number") return false;
    // The heating property must be an element of heating
    if(!heating.includes(profile.heating)) return false;
    // The led property must be a boolean
    if(typeof profile.led != "boolean") return false;
    // The fridge efficiency myst be a number
    if(typeof profile.fridge != "number") return false;
    // The router property must be a boolean
    if(typeof profile.router != "boolean") return false;
    // If EVERY condition is met, it is correctly formatted
    return true;
}

exports.calculateCarbon = function(today,profile){
    //province carbon per wh
    var povwh; 
    switch(profile.province){
        case "alberta": povwh = 0.790; break;
        case "british bolumbia": povwh = 0.013; break;
        case "manitoba": povwh = 0.0034; break;
        case "new brunswick": povwh = 0.280; break;
        case "newfoundland and labrador": povwh = 0.032; break;
        case "northwest territories": povwh = 0.390; break;
        case "nova scotia": povwh = 0.600; break;
        case "nunavut": povwh = 0.750; break;
        case "ontario": povwh = 0.040; break;
        case "prince edward island": povwh = 0.020; break;
        case "quebec": povwh = 0.0012; break;
        case "saskatchewan": povwh = 0.660; break;
        case "yukon": povwh = 0.41; break;
   }
    //transportation
    var gascar = 171*50*today.transportation.gascar;
    var electric = 0.3*30*povwh*1000*today.transportation.electric;
    var bus = 105*50*today.transportation.bus;
    var walk = 0;
    var train = 41*40*today.transportation.train;
    var plane = 255*740*today.transportation.plane;
    var boat = 19*40*today.transportation.boat;

    //lights
    var light;
    if (profile.led == true){
        light = ((profile.sqft*40)/60)*today.lights*povwh;
    }
    else{
        light = ((profile.sqft*40)/15)*today.lights*povwh;
    }

    //appliances
    var otherDevices = 0
    if (today.otherDevices.oven == true){otherDevices = otherDevices + 1.2*povwh;}
    if (today.otherDevices.stove == true){otherDevices = otherDevices + 3*povwh;}
    if (today.otherDevices.microwave == true){otherDevices = otherDevices + 1*povwh;}
    if (today.otherDevices.blender == true){otherDevices = otherDevices + 0.5*povwh;}
    if (today.otherDevices["coffee machine"] == true){otherDevices = otherDevices + 1*povwh;}
    if (today.otherDevices.kettle == true){otherDevices = otherDevices + 1.2*povwh;}
    if (today.otherDevices.dishwasher == true){otherDevices = otherDevices + 1.35*povwh;}
    if (today.otherDevices["small fan"] == true){otherDevices = otherDevices + 0.07*povwh;}
    if (today.otherDevices["ceiling fan"] == true){otherDevices = otherDevices + 0.12*povwh;}
    if (today.otherDevices["washing machine"] == true){otherDevices = otherDevices + 0.8*povwh;}
    if (today.otherDevices.dryer == true){otherDevices = otherDevices + 3*povwh;}
    if (today.otherDevices.vacuum == true){otherDevices = otherDevices + 1*povwh;}
    if (today.otherDevices.printer == true){otherDevices = otherDevices + 0.1*povwh;}
    if (today.otherDevices.lamp == true){otherDevices = otherDevices + 0.03*povwh;}
    if (today.otherDevices.router == true){otherDevices = otherDevices + 0.007*povwh;}
    if (today.otherDevices.console == true){otherDevices = otherDevices + 0.15*povwh;}
    if (today.otherDevices["hair dryer"] == true){otherDevices = otherDevices + 1.5*povwh}
    if (today.otherDevices.fire == true){otherDevices = otherDevices + 1000}
    if (today.otherDevices.bbq == true){otherDevices = otherDevices + 1000}

    //ambient
    var heating;
    switch(profile.heating){
        case "electric furnace": heating = 0.0075*profile.sqft*4*povwh; break;
        case "natural gas furnace": heating = ((20*profile.sqft*24)/1000000)*53000; break;
        case "fuel oil furnace": heating = ((20*profile.sqft*24)/1000000)*53000; break;
        case "boiler": heating = 4*povwh*3; break;
        case "heat pump": heating = 50/30*1000*povwh; break;
    }
    //fridge
    otherDevices = otherDevices+ profile.fridge/365*povwh*1000;

    //screens
    var screenwh;
    var phone = today.screen.phone*0.003*povwh;
    var laptop = today.screen.laptop*0.06*povwh;
    var pc = today.screen.pc*0.1*povwh;
    var tv = today.screen.tv*0.15*povwh;

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
    
    var meatPercent = (today.food.meat/100);
    var beef = meatPercent*(today.food.beef/100)*2.5*55000;
    var meat = meatPercent*(1-(today.food.meat/100))*2.5*3000;
    var notMeat = (1-meatPercent)*2.5*1000;
    var local = (1-(today.food.local/100))*2.5*300;

    //ouput sorting
    var totalc = gascar+electric+bus+walk+plane+train+boat+light+otherDevices+heating+phone+laptop+pc+tv+purchcarbon+beef+meat+local;

    const totalcarbon = {
            "food":beef+meat+notMeat+local,
            "lights":light, 
            "transportation":gascar+electric+bus+walk+plane+train+boat, 
            "purchases":purchcarbon,
            "screen":phone+laptop+pc+tv,
            "heating":heating,
            "other":otherDevices,
            "total":totalc
    };

    return totalcarbon;

}