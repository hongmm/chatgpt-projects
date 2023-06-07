import 'dotenv/config'
import XMLHttpRequest from 'xhr2';

const postTweet = async (text) => {
    // Declare variables
    const twitterApiUrl = "https://api.twitter.com/2/tweets";
    const twitterAuthorizationHeader = "BEARER " + process.env.TWITTER_BEARER_TOKEN;
  
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
  
    // Set the request method to POST
    xhr.open("POST", twitterApiUrl);
  
    // Set the request headers
    xhr.setRequestHeader("Authorization", twitterAuthorizationHeader);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(xhr)
    // Serialize the tweet text to JSON
    const tweetData = JSON.stringify({
      text,
    });

    console.log(tweetData);

    // Send the request
    try {
      await xhr.send(tweetData);
  
      // Handle the response
      if (xhr.status === 201) {
        // Tweet posted successfully
        console.log("Tweet posted successfully!");
      } else {
        // An error occurred
        console.log("Error posting tweet:", xhr.status);
      }
    } catch (error) {
      console.log(error);
    }
  }
  export default postTweet;