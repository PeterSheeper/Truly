chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action === "updateIcon") {
        if (msg.value) {
            chrome.browserAction.setIcon({path: "/MainPopup/assets/alert-icon.png"});
        } else {
            chrome.browserAction.setIcon({path: "/icons/logo-96.png"});
        }
    }
});