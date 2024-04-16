function scrapeUserDatasFromPage() {
    const classNames = 'x1y1aw1k x4uap5 xwib8y2 xkhd6sd';
    const selector = classNames.split(' ').map(cls => `div.${cls}`).join('');
    elements = document.querySelectorAll('div.x1y1aw1k.x4uap5.xwib8y2.xkhd6sd')
    function getInnerData(element) {
        return Array.from(element.querySelectorAll('.x1y1aw1k.x4uap5.xwib8y2.xkhd6sd')).map(e => e.innerHTML);
    }
    // Map each element's innerHTML to an object with a "data" key
    const data = Array.from(elements).map(element => {
        const QA = getInnerData(element);
        return {
            "nestedData": QA
        };
    });
    console.log(selector);
    console.log(data);
    return data;
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "scrapeData") {
        const data = scrapeUserDatasFromPage(); // Ensure this function exists and is called correctly
        sendResponse({ data: data });
        return true; // indicates that you will asynchronously send a response
    }
});