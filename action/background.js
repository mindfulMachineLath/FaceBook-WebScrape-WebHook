chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // const webhookUrl = 'https://hook.us1.make.com/gi7ituiw6cd03tase2892q9v1ui2vxwo';
    const webhookUrl = 'https://webhook.site/63af08cf-ab6a-465b-88ad-827c7606037a';
    // const webhookUrl = 'https://webhook.site/63af08ab6a-465b-88ad-827c7606037a';
    const raw = JSON.stringify([
        {
            "name": "test1",
            "question1": "test question1",
            "answer1": "test answer1",
            "question2": "test question2",
            "answer2": "test answer2",
            "question3": "test question3",
            "answer3": "test answer3",
            "question4": "test question4",
            "answer4": "test answer4"
        },
        {
            "name": "test2",
            "question1": "test question1",
            "answer1": "test answer1",
            "question2": "test question2",
            "answer2": "test answer2",
            "question3": "test question3",
            "answer3": "test answer3",
            "question4": "test question4",
            "answer4": "test answer4"
        }
    ]);
    // JSON.stringify(message.data)
    if(JSON.stringify(message.data) == "[]"){
        sendResponse({ status: 'Can not find the requested data' });
        return false;
    }
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message.data)
    })
        .then(response => {
            // Check if the response is okay
            // Respond to the sender that the data has been sent to the webhook
            if (response == null || !response.ok) {
                sendResponse({ status: 'failed' });
                return true;
            }
            else sendResponse({ status: 'success' });
            return false;
        })
    // Return true to keep the messaging channel open for asynchronous response
    return true;
});
