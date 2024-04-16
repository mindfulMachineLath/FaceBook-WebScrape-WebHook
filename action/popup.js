// popup.js
let scrapeUserDetails = document.getElementById('scrapeData');

scrapeUserDetails.addEventListener("click", () => {
    // Get the current active tab
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        // Ensure there is at least one tab
        if (tabs.length === 0) return;
        // Send a message to the content script
        chrome.tabs.sendMessage(tabs[0].id, {action: "scrapeData"}, (response) => {
            if (chrome.runtime.lastError || !response) {
                // Handle error or no response
                console.error('Error or no response:', chrome.runtime.lastError?.message);
                return;
            }
            // Now send this data to the background script
            chrome.runtime.sendMessage({data: response.data}, (response) => {
                if (response) {
                    console.log(response.status);
                }
            });
        });
    });
});