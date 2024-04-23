// popup.js
let scrapeUserDetails = document.getElementById('scrapeData');

scrapeUserDetails.addEventListener("click", () => {
    // Get the current active tab
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        // Ensure there is at least one tab
        if (tabs.length === 0) {
            return;
        }

        // Show the loading indicator
        showLoading(true);
        //delay action
        setTimeout(() => {
            console.log("calculated");
        }, 1500);

        // Send a message to the content script
        chrome.tabs.sendMessage(tabs[0].id, {action: "scrapeData"}, (response) => {
            if (chrome.runtime.lastError || !response) {
                // Handle error or no response
                showLoading(false);
                //console.error('Error or no response:', chrome.runtime.lastError?.message);
                return;
            }
            // Now send this data to the background script
            chrome.runtime.sendMessage({data: response.data}, (response) => {
                // Hide the loading indicator irrespective of the response
                showLoading(false);
                if (response && response.status === 'success') {
                    updateStatus('SUCCESS', 'success');
                } else if(response.status === 'failed') {
                    updateStatus('FAILD', 'failed');
                } else if (response.status === 'Can not find the requested data') {
                    updateStatus('Can not find the requested data', 'failed');
                }
            });
        });
    });
});

function updateStatus (message, style) {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = message;
    statusDiv.className = style;
}

function showLoading(isVisible) {
    const loadingDiv = document.getElementById('loading');
    loadingDiv.style.display = isVisible ? 'block' : 'none';
}