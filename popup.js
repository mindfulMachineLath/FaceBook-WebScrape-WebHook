let scrapeEmails = document.getElementById('scrapeEmails');

scrapeEmails.addEventListener("click", async () => {
    //Get current active tab
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Execute script to parse emails on page
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: scrapeUserDatasFromPage,
    })
})

//Function to scrape emails

function scrapeUserDatasFromPage() {
    const classNames = 'Box d-flex p-3 width-full public source';
    const selector = classNames.split(' ').map(cls => `.${cls}`).join('');
    const elements = document.querySelectorAll(selector);
    const htmlArray = Array.from(elements).map(element => element.innerHTML);
    console.log(htmlArray);
    // return htmlArray;
}