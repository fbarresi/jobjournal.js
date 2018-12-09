const parseTime = function(time) { //function to display time remaining or time elapsed
    let minutes = Math.floor(((time / 1000) / 60) % 60);
    let seconds = Math.floor((time / 1000) % 60);
    let hours = Math.floor((time / 1000) / 60 / 60)
    if (minutes < 10 && minutes >= 0) {
        minutes = '0' + minutes;
    } else if (minutes < 0) {
        minutes = '00';
    }
    if (seconds < 10 && seconds >= 0) {
        seconds = '0' + seconds;
    } else if (seconds < 0) {
        seconds = '00';
    }
    return `${hours}:${minutes}:${seconds}`
}

const displayStatus = function() { //function to handle the display of time and buttons
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {


        chrome.runtime.sendMessage({
            name: 'state'
        }, updateViewFromResponse);

    });
}

const updateViewFromResponse = function(response) {
    console.log(response);
    const runningBlock = document.getElementById('runningBlock');
    const stoppedBlock = document.getElementById('stoppedBlock');
    const time = $('#time');

    if (response.state === "running") {
        stoppedBlock.style.display = "none";
        runningBlock.style.display = "block";
        time.html(parseTime((Date.now() - response.startTime) + response.daylyOffset));
        interval = setInterval(() => {
            time.html(parseTime((Date.now() - response.startTime) + response.daylyOffset))
        }, 1000);

    } else {
        stoppedBlock.style.display = "block";
        runningBlock.style.display = "none";
        clearInterval(interval);
        time.html(parseTime((response.endTime - response.startTime) + response.daylyOffset));
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