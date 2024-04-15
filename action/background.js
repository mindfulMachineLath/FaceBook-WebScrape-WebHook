chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // const webhookUrl = 'https://your.webhook.url';
    // fetch(webhookUrl, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(message.data)
    // })
    // .then(response => response.json())
    // .then(data => console.log('Success:', data))
    // .catch((error) => console.error('Error:', error));

    sendResponse({status: 'Data sent to webhook'});
    return true; // Keep the messaging channel open for asynchronous response
});