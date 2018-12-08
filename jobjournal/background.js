

//sends reponses to and from the popup menu
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.currentTab && sessionStorage.getItem(request.currentTab)) {
    sendResponse(sessionStorage.getItem(request.currentTab));
  } else if (request.currentTab){
    sendResponse(false);
  } else if (request === "start") {
    console.log("start");
  } else if (request === "stop") {
    console.log("stop");
  } else if (request === "change") {
    console.log("change");
  }
});







chrome.commands.onCommand.addListener((command) => {
  if (command === "start") {
    console.log("start");
  }
});
