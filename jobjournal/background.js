var state = "idle";
var project = "";
var startTime = null;

//sends reponses to and from the popup menu
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.name === "state") {

    } else if (request.name === "start") {
        state = "running";
    } else if (request.name === "stop") {
        state = "stopped";
    } else if (request.name === "change") {
        state = "running";
        project = request.project;
    }
    console.log("request: ");
    console.log(request);
    let response = {
        name: request.name,
        state: state,
        project: project
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