const timeElement = document.getElementById("time");
const nameElement = document.getElementById("name");
const timerElement = document.getElementById("timer");

updateTimeElements();
setInterval(updateTimeElements, 1000);

chrome.storage.sync.get(["name"], (res) => {
    const name = res.name ?? "Guest"; //Set default value if name does not exists
    nameElement.textContent = `Hi ${name}!`;
});

function updateTimeElements(){
    //Timer
    chrome.storage.local.get(["timer"], (res) => {
        const timer = res.timer ?? 0;
        timerElement.textContent = `The timer is at ${timer} seconds`;
    });

    //Time
    const currentTime = new Date().toLocaleTimeString();
    timeElement.textContent = `The time is: ${currentTime}`; 
}

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

startBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        isRunning: true,
    });
});
stopBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        isRunning: false,
    });
});
resetBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        timer: 0,
        isRunning: false,
    });
});