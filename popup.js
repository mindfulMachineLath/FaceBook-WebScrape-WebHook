let scrapeEmails = document.getElementById('scrapeEmails');

scrapeEmails.addEventListener("click", async () => {
    //Get current active tab
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Execute script to parse emails on page
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: scrapeEmailsFromPage,
    })
})

//Function to scrape emails

function scrapeEmailsFromPage() {
    alert("HI");
}