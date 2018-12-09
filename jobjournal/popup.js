const displayStatus = function() { //function to handle the display of time and buttons
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        const startButton = document.getElementById('start');
        const finishButton = document.getElementById('stop');
        const cancelButton = document.getElementById('change');

        chrome.runtime.sendMessage({
            currentTab: tabs[0].id,
            name: 'state'
        }, updateViewFromResponse);

    });
}

const updateViewFromResponse = function(response) {
    console.log(response);
    const startButton = document.getElementById('start');
    const finishButton = document.getElementById('stop');

    if (response.state === "running") {
        startButton.style.display = "none";
        finishButton.style.display = "block";
    } else {
        startButton.style.display = "block";
        finishButton.style.display = "none";
    }
}


//manipulation of the displayed buttons upon message from background
chrome.runtime.onMessage.addListener((request, sender) => {

    //    console.log(request);
    //    console.log(sender);

});


//initial display for popup menu when opened
document.addEventListener('DOMContentLoaded', function() {
    displayStatus();
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const changeButton = document.getElementById('change');
    const project = $("#project");
    startButton.onclick = () => {
        chrome.runtime.sendMessage({
            name: 'start'
        }, updateViewFromResponse)
    };
    stopButton.onclick = () => {
        chrome.runtime.sendMessage({
            name: 'stop'
        }, updateViewFromResponse)
    };
    changeButton.onclick = () => {
        chrome.runtime.sendMessage({
            name: 'change',
            project: project.val()
        }, updateViewFromResponse)
    };

    const options = document.getElementById("options");
    options.onclick = () => {
        chrome.runtime.openOptionsPage()
    };
    //const git = document.getElementById("GitHub");
    //git.onclick = () => {chrome.tabs.create({url: "https://github.com/fbarresi/jobjournal.js"})};

    $("#project").typeahead({
        source: ["test", "test2"]
    });

});