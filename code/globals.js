const transports = ["gascar","electric","bus","walk","plane","train","boat"];
exports.transports = transports;
const screens = ["phone","laptop","pc","tv","internet"];
exports.screens = screens;
const devices = ["oven","stove","microwave","blender","coffee machine","kettle","dishwasher","small fan","ceiling fan","washing machine","dryer","vacuum cleaner","printer","lamp","console","hair dryer","fire","bbq"];
exports.devices = devices;
const provinces = ["ontario","alberta","british columbia","manitoba","new brunswick","newfoundland and labrador","northwest territories","nova scotia","nunavut","prince edward island","quebec","saskatchewan","yukon"];
exports.provinces = provinces;
const heating = ["electric furnace","natural gas furnace","fuel oil furnace","boiler","heat pump"];
exports.heating = heating;

const { readFileSync } = require("fs");

function isObject(o){
    return typeof o === 'object' && !Array.isArray(o) && o !== null;
}

function check(day){
    try {  
        day = JSON.parse(day);  
    } catch (e) {  
        return false;
    }
    if(Number.isNaN(day.index)) return false;
    if(!(new Date(day.date) !== "Invalid Date") && !isNaN(new Date(day.date))) return false;
    if(!isObject(day.transportation)) return false;
    for(var i=0; i<transports.length; i++){
        if(Number.isNaN(day.transportation[transports[i]])) return false;
    }
    if(!isObject(day.food)) return false;
    if(Number.isNaN(day.food.meat) || Number.isNaN(day.food.beef) || Number.isNaN(day.food.local)) return false;
    if(!isObject(day.screen)) return false;
    for(var i=0; i<screens.length; i++){
        if(Number.isNaN(day.screen[screens[i]])) return false;
    }
    if(Number.isNaN(day.lights)) return false;
    if(!isObject(day.otherDevices)) return false;
    for(var i=0; i<devices.length; i++){
        if(typeof day.otherDevices[devices[i]] != "boolean") return false;
    }
    if(!isObject(day.purchases)) return false;
    for(let i=0; i<Object.keys(day.purchases).length; i++){
        var p = day.purchases[i];
        if(!isObject(p)) return false;
        if(typeof p.research != "boolean") return false;
        if(p.carbon==undefined && p.price==undefined) return false;
        if(Number.isNaN(p.carbon) || Number.isNaN(p.price)) return false;
    }
    return true;
}

exports.check = check;

exports.checkDay = function(){
    var day;
    try {
        day = readFileSync("data/today.json", "utf8");
    } 
    catch (err) {
        console.error(err);
    }
    return check(day);
}

exports.checkHistory = function(){
    var historyData;
    try {
        historyData = readFileSync("data/history.txt", "utf8");
    } 
    catch (err) {
        console.error(err);
    }
    if(historyData==""){
        return true;
    }
    else {
        var his = historyData.split("\n");
        for(let i=his.length-1; i>=0; i--){
            if(!check(his[i])){
                return false;
            }
            if(JSON.parse(his[i]).index!=i){
                return false;
            }
        }
    }
    return true;
}

exports.checkProfile = function(){
    var profile;
    try {
        profile = readFileSync("data/profile.json", "utf8");
    } 
    catch (err) {
        console.error(err);
    }
    if(!provinces.includes(profile.province)) return false;
    if(Number.isNaN(profile.sqft)) return false;
    if(!heating.includes(profile.heating)) return false;
    if(typeof profile.led == "boolean") return false;
    if(Number.isNaN(profile.fridge)) return false;
    if(typeof profile.router == "boolean") return false;
    return true;
}