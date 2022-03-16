chrome.alarms.create({
    periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
    chrome.storage.local.get(["timer", "notificationTime", "isRunning"], (res) => {
        const time = res.timer ?? 0;
        const isRunning = res.isRunning ?? true;

        if(!isRunning){
            return;
        }
        chrome.storage.local.set({
            timer: time + 1, 
        });

        chrome.action.setBadgeText({
            text: `${time + 1}`
        });

        const notificationTime = res.notificationTime ?? 5000;
        console.log(notificationTime);
        if(time % notificationTime == 0 && time != 0){
            this.registration.showNotification("Chrome Timer Extension", {
                body: `${notificationTime} seconds has passed!`,
                icon: "icon.png"
            });
        }
    });
});

console.log(this);