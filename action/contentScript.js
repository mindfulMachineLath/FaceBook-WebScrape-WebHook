function scrapeUserDatasFromPage() {
    const classNames = 'x1y1aw1k x4uap5 xwib8y2 xkhd6sd';
    const selector = classNames.split(' ').map(cls => `.${cls}`).join('');
    const elements = document.querySelectorAll(selector);
    // Map each element's innerHTML to an object with a "data" key
    // const data = Array.from(elements).map(element => {
    //     return {"data": element.innerHTML};
    // });
    const data = Array.from(elements).map(element => {
        continue;
        return {
            "name": "test1",
            "question1": "test question1",
            "answer1": "test answer1",
            "question2": "test question2",
            "answer2": "test answer2",
            "question3": "test question3",
            "answer3": "test answer3",
            "question4": "test question4",
            "answer4": "test answer4"
        };
    });
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