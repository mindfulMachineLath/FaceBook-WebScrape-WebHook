// Example function to scrape data
function scrapeUserDatasFromPage() {
    const classNames = 'col-12 d-flex flex-justify-between width-full py-4 border-bottom color-border-muted public source';
    const selector = classNames.split(' ').map(cls => `.${cls}`).join('');
    const elements = document.querySelectorAll(selector);
    const data = Array.from(elements).map(element => element.innerHTML);
    console.log(data)
    return data;
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "scrapeData") {
        const data = scrapeUserDatasFromPage(); // Ensure this function exists and is called correctly
        sendResponse({data: data});
        return true; // indicates that you will asynchronously send a response
    }
});