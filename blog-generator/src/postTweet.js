import 'dotenv/config';
const {TwitterApi} = require('twitter-api-v2');

const postTweet = async (content) => {
    const client = new TwitterApi({
        appKey: process.env.REACT_APP_TWITTER_API_KEY,
        appSecret: process.env.REACT_APP_TWITTER_API_SECRET,
        accessToken: process.env.REACT_APP_TWITTER_ACCESSS_TOKEN,
        accessSecret: process.env.REACT_APP_TWITTER_ACCESS_SECRET,
    });

    try {
        const postTweet = await client.tweets.createTweet({
            text: content, 
        });
        console.dir(postTweet, {
            depth: null,
        });
    } catch (error) {
        console.log(error);
    }
};

export default postTweet;