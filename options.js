const nameInput = document.getElementById("name-input");
const timeInput = document.getElementById("time-input");
const saveBtn = document.getElementById("save-btn");

saveBtn.addEventListener("click", () => {
    const name = nameInput.value;
    const notificationTime = timeInput.value;
    chrome.storage.sync.set({
        name,
    }, () => {
        console.log(`Name is set to ${name}`);
    });
    chrome.storage.local.set({
        notificationTime,
    }, () => {
        console.log(`Notification time is set to ${notificationTime}`);
    });
});

chrome.storage.sync.get(["name", "notificationTime"], (res) => {
    console.log(res);
    nameInput.value = res.name ?? "Guest";
});
chrome.storage.local.get(["notificationTime"], (res) => {
    console.log(res);
    timeInput.value = res.notificationTime ?? 10000;
});