# Audio Chatbot

## How to use
1. Clone the repo
2. Run `npm install`
3. Create a `.env` file in the root directory and add the following:
```OPENAI_API_KEY
GOOGLE_APPLICATION_CREDENTIALS
```
You will need to set up google application credentials and add the json file to this directory
4. Currently the audio recording times out after 5 seconds so you will need to change this in `recordAudio.js` and `convertTextToSpeech.js` if you want to record for longer or if you want to listen to longer responses from the chatbot
