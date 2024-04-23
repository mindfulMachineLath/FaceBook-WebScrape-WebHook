chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // const webhookUrl = 'https://hook.us1.make.com/gi7ituiw6cd03tase2892q9v1ui2vxwo';
    // const webhookUrl = 'https://webhook.site/63af08cf-ab6a-465b-88ad-827c7606037a';
    const webhookUrl = 'http://localhost:3000/webhook';
    const raw = JSON.stringify([
        {
            "question1": "Have you listened to The Premed Years Podcast? It's free and like having an advisor in your pocket! Visit www.premedyears.com to subscribe!",
            "answer1": "Not yet, but I'll be sure to check it out at premedyears.com!",
            "question2": "Where do/did you go to undergrad? If you are a family member of a premed, answer with their school.",
            "answer2": "Arizona State University",
            "question3": "Where are you in the premed process? What do you need the most help with?",
            "answer3": "Pre reqs",
            "question4": "Do you agree to the group rules from the admin?",
            "answer4": "I agree"
        },
        {
            "question1": "Have you listened to The Premed Years Podcast? It's free and like having an advisor in your pocket! Visit www.premedyears.com to subscribe!",
            "answer1": "Not yet, but I'll be sure to check it out at premedyears.com!",
            "question2": "Where do/did you go to undergrad? If you are a family member of a premed, answer with their school.",
            "answer2": "Arizona State University",
            "question3": "Where are you in the premed process? What do you need the most help with?",
            "answer3": "Pre reqs",
            "question4": "Do you agree to the group rules from the admin?",
            "answer4": "I agree"
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
    }).then(response => {
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
