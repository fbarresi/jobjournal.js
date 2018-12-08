let interval;
let timeLeft;

const displayStatus = function() { //function to handle the display of time and buttons
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const startButton = document.getElementById('start');
    const finishButton = document.getElementById('stop');
    const cancelButton = document.getElementById('change');
    
      chrome.runtime.sendMessage({currentTab: tabs[0].id}, (response) => {
        
      });
    
  });
}



//manipulation of the displayed buttons upon message from background
chrome.runtime.onMessage.addListener((request, sender) => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    
  });
});


//initial display for popup menu when opened
document.addEventListener('DOMContentLoaded', function() {
  displayStatus();
  const startButton = document.getElementById('start');
  const stopButton = document.getElementById('stop');
  const changeButton = document.getElementById('change');
  startButton.onclick = () => {chrome.runtime.sendMessage("start")};
  stopButton.onclick = () => {chrome.runtime.sendMessage("stop")};
  changeButton.onclick = () => {chrome.runtime.sendMessage("change")};
  
  const options = document.getElementById("options");
  options.onclick = () => {chrome.runtime.openOptionsPage()};
  const git = document.getElementById("GitHub");
  git.onclick = () => {chrome.tabs.create({url: "https://github.com/fbarresi/jobjournal.js"})};

});
