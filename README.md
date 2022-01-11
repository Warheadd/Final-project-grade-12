# Final-project-grade-12

Carbon Tracker is an app to help a user track their carbon footprint. Every day, they can enter information about what they did and at the end of the day, it will display their carbon footprint as well as personalized advice on how to improve. Users can figure out how much carbon they are emitting, compare themselves to averages, and track their progress over time.

Built using HTML/JS/CSS with Electron.

INSTALLATION
Node.js and Electron are required to run the app.

Node.js can be downloaded here: https://nodejs.org/en/download/
To install electron globally, type this in the command line: npm install electron -g

To run the project afterwards, type this in the command line with the "code" folder open: npm start

FILE INFORMATION:

today.json formatting:
{
    // The index of the day, only used by the computer
    "index":0,
    // the date the day was created
    "date":"Wed Jan 05 2022 21:33:38 GMT-0500 (Eastern Standard Time)",
    // the number of hours different methods of transportation were used
    "transportation":{
        "gascar":5,"electric":0,"bus":0,"walk":12,"plane":8,"train":0,"boat":0
        },
    // the properties of the food the user ate, in percentages
    "food":{
        // "meat" represents the percentage of food that was meat. "beef" represents the percentage of meat that was beef. "local" represents the percentage of food that was bought locally
        "meat":75,"beef":42,"local":64
        },
    "screen":{
        // the number of hours different screens were used for
        "phone":1,"laptop":2,"pc":3,"tv":4,"internet":5
        },
    // the number of hours lights were on
    "lights":7,
    // whether or not different devices were used today. true means it was used, false means it wasn't
    "otherDevices":{
        "oven":false,"stove":false,"microwave":false,"blender":true,"coffee machine":false,"kettle":true,"dishwasher":true,"small fan":true,"ceiling fan":false,"washing machine":true,"dryer":true,"vacuum cleaner":false,"printer":false,"lamp":true,"router":false,"console":true,"hair dryer":false,"fire":true,"bbq":false
        },
    // the different purchases the user made
    "purchases":{
        // the "0", "1", "2", etc. is just the index for the computer to use since the user can have multiple purchases. "research" is whether or not the user did research. This is not used in the calculation, but it CAN be used at the end of the day as advice on what the user could do better. "carbon" is the grams of carbon the purchase emitted. "price" is the price of the product. If carbon is undefined, use the price to approximate carbon emissions. If carbon is defined, price can be ignored.
        "0":{"research":true,"price":50,"carbon":351},
        "1":{"research":false,"price":undefined,"carbon":1960},
        "2":{"research":true,"price":1000,"carbon":undefined}
        }
}


profile.json formatting:
{
    // Used to find how much carbon is emitted by electricity usage
    "province":"ontario",
    // The square footage of the house. Used to find how much electricity keeping the lights on uses
    "sqft":9000,
    // Different heating methods use different amounts of carbon/electricity
    "heating":"boiler",
    // Whether or not the user has LED lights
    "led":true,
    // The kWh usage per year of the fridge (divide by 365 to get daily usage)
    "fridge":1000,
    // Whether or not the user uses a router
    "router":true
}

By Rick, Jordan, Faris