function scrapeUserDatasFromPage() {
    // Get the current URL and split by slashes
    const urlSegments = window.location.href.split('/');
    // Get the segment after three slashes (fourth segment)
    const groupname = urlSegments.length > 4 ? urlSegments[4] : null;
    const classNames = 'x1y1aw1k x4uap5 xwib8y2 xkhd6sd';
    const selector = classNames.split(' ').map(cls => `div.${cls}`).join('');
    elements = document.querySelectorAll('div.x1y1aw1k.x4uap5.xwib8y2.xkhd6sd');

    function getInnerData(element) {
        // Get the user name from the <a> tag within the element
        const usernameElement = element.querySelector('a.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x1heor9g.xt0b8zv.x1s688f');
        const username = usernameElement ? usernameElement.textContent.trim() : "Unknown";

        // Collect all question spans
        const questions = Array.from(element.querySelectorAll('span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.xlh3980.xvmahel.x1n0sxbx.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.x4zkp8e.x3x7a5m.x6prxxf.xvq8zen.x1s688f.x12scifz'));
        // Collect all answer spans
        const answers = Array.from(element.querySelectorAll('span')).filter(span => span.className === 'x193iq5w xeuugli x13faqbe x1vvkbs xlh3980 xvmahel x1n0sxbx x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x4zkp8e x3x7a5m x6prxxf xvq8zen xo1l8bm xzsf02u');
        let dataObject = { groupname, username };
        questions.forEach((question, index) => {
            const answer = answers[index] ? answers[index].innerHTML.trim() : null;
            dataObject[`question${index + 1}`] = question.innerHTML.trim();
            dataObject[`answer${index + 1}`] = answer;
        });
        return dataObject;
    }
    // Map each element's innerHTML to an object with a "data" key
    const data = Array.from(elements).map(element => getInnerData(element));

    // Prepend the group name to the data array
    // data.unshift({ groupName });

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
