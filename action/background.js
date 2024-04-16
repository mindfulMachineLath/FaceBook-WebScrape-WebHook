chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // const webhookUrl = 'https://hook.us1.make.com/gi7ituiw6cd03tase2892q9v1ui2vxwo';
    const webhookUrl = '	https://webhook.site/63af08cf-ab6a-465b-88ad-827c7606037a';
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
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message.data)
    })
        .then(response => {
            // Check if the response is okay
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Handle both JSON and plain text responses
            const contentType = response.headers.get('content-type');
            if (contentType?.includes('application/json')) {
                return response.json();
            } else if (contentType?.includes('text/plain')) {
                return response.text().then(text => ({ plainTextResponse: text }));
            } else {
                throw new Error('Unsupported content type: ' + contentType);
            }
        })
        .then(data => {
            // Handle the data (which could be JSON or plain text wrapped in an object)
            console.log('Success:', data);
        })
        .catch(error => {
            // Log any errors that occur during the fetch operation
            console.error('Error:', error);
        });

    // Respond to the sender that the data has been sent to the webhook
    sendResponse({ status: 'Data sent to webhook' });
    // Return true to keep the messaging channel open for asynchronous response
    return true;
});
