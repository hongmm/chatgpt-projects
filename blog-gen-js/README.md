# ChatGPT content generator 

## How to use
1. Clone the repo
2. Run `npm install`
3. Create a `.env` file in the root directory and add the following:
```OPENAI_API_KEY
EMAIL_ADDRESS
PASSWORD
```
Replace the emails and passwords with your own credentials 
For gmail accounts, depending on your security you may need to generated an app password and use that instead of your actual password.
4. In the sendEmails.js file, replace the emails to ones you want to use and send to
5. Run `node app.js` to start the program and go to `localhost:3000` to enter the topic you want information about
6. The email will be sent with the information from the topic you entered as well as a url to an ai generated image about the topic
