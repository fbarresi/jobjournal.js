var state = "stopped";
var project = "";
var task = "";
var startTime = 0;
var endTime = 0;
var daylyOffset = 0

//sends reponses to and from the popup menu
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.name === "state") {

    } else if (request.name === "start") {
        state = "running";
        startTime = Date.now();
        if(endTime != 0)
          daylyOffset += Math.abs(endTime - startTime);
        endTime = 0;
    } else if (request.name === "stop") {
        state = "stopped";
        endTime = Date.now();
    } else if (request.name === "change") {
        if (state === "stopped") {
            state = "running";
            startTime = Date.now();
            if(endTime != 0)
              daylyOffset += Math.abs(endTime - startTime);
            endTime = 0;
        }
        project = request.project;
    }
    console.log("request: ");
    console.log(request);
    let response = {
        name: request.name,
        state: state,
        project: project,
        startTime: startTime,
        endTime: endTime,
        daylyOffset: daylyOffset
    };
    console.log("response: ");
    console.log(response);
    sendResponse(response);

});







chrome.commands.onCommand.addListener((command) => {
    if (command === "start") {
        console.log("start");
    } else if (command === "stop") {
        console.log("stop");
    }
});