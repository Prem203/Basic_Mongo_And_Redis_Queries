import { createClient } from "redis";
import { getAllUsersTweets } from "./db/myMongodb.js"; // Assuming the MongoDB function is in this path

const client = createClient();

client.on("error", (err) => {
  console.error("Redis Error: " + err);
});

async function addTweetsToRedis() {
  try {
    await client.connect();

    // Get all user tweets from MongoDB
    const allUserTweets = await getAllUsersTweets();

    for (let screenName in allUserTweets) {
      const tweets = allUserTweets[screenName];

      // Add each tweet ID to the Redis list for this user
      for (let tweet of tweets) {
        const tweetId = tweet.id_str;

        // Add the tweet ID to the user's list of tweet IDs
        await client.rPush(`tweets:${screenName}`, tweetId);

        // Store the tweet's details in a Redis hash
        await client.hSet(`tweet:${tweetId}`, {
          text: tweet.text,
          created_at: tweet.created_at,
          user_name: tweet.user.name,
          screen_name: tweet.user.screen_name,
          tweet_id: tweet.id_str,
          favorite_count: tweet.favorite_count,
          retweet_count: tweet.retweet_count,
          source: tweet.source
        });
      }
    }

    console.log("Successfully added all tweets to Redis.");
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await client.quit();
  }
}