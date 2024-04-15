# FaceBook-WebScrape-WebHook
## Installation

1. **Download the Extension**: Download the whole project from this repository.

2. **Install in Chrome**:
    - Open Google Chrome and navigate to `chrome://extensions/`.
    - Enable 'Developer mode' at the top-right corner.
    - Import the downloaded folder. This will prompt you to add the extension.

3. **Configuration**:
    - Once installed, click on the extension icon in the Chrome toolbar.
    - Enter the webhook URL where the data should be sent. This URL will handle the incoming JSON file.

## Usage

1. Navigate to your Facebook group’s member request page.
2. The extension will automatically start scraping the answers and user data of those who have requested to join.
3. After collecting the data, the extension sends it as a JSON file to the configured webhook.

## Webhook Setup

- You will need to set up a server-side listener at the webhook URL to receive the JSON data.
- Example Node.js setup using Express:

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    console.log('Received data: ', req.body);
    // Add your processing logic here
    res.status(200).send('Data received');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
