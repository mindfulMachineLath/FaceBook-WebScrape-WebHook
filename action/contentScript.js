function scrapeUserDatasFromPage() {
    const classNames = 'x1y1aw1k x4uap5 xwib8y2 xkhd6sd';
    const selector = classNames.split(' ').map(cls => `div.${cls}`).join('');
    elements = document.querySelectorAll('div.x1y1aw1k.x4uap5.xwib8y2.xkhd6sd')
    function getInnerData(element) {
        // Collect all question spans
        const questions = Array.from(element.querySelectorAll('span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.xlh3980.xvmahel.x1n0sxbx.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.x4zkp8e.x3x7a5m.x6prxxf.xvq8zen.x1s688f.x12scifz'));
        // Collect all answer spans
        const answers = Array.from(element.querySelectorAll('span')).filter(span => span.className === 'x193iq5w xeuugli x13faqbe x1vvkbs xlh3980 xvmahel x1n0sxbx x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x4zkp8e x3x7a5m x6prxxf xvq8zen xo1l8bm xzsf02u');
        const dataObject = {};
        questions.forEach((question, index) => {
            const answer = answers[index] ? answers[index].innerHTML.trim() : null;
            dataObject[`question${index + 1}`] = question.innerHTML.trim();
            dataObject[`answer${index + 1}`] = answer;
        });
        return dataObject;
    }
    // Map each element's innerHTML to an object with a "data" key
    const data = Array.from(elements).map(element => getInnerData(element));
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