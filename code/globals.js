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