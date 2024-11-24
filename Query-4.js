import { createClient } from "redis";
import { getUserLeaderboard } from "./db/myMongodb.js"; // Using getUserLeaderboard

const client = createClient();

client.on("error", (err) => {
  console.error("Redis Error: " + err);
});

try {
  await client.connect();

  // Fetch the top 10 users from MongoDB
  const tweetCounts = await getUserLeaderboard();

  // Add users to the Redis leaderboard
  for (let user of tweetCounts) {
    if (user._id) {
      await client.zAdd("leaderboard", {
        score: user.tweetCount,
        value: user._id
      });
    }
  }

  // Retrieve the top 10 users from the leaderboard (sorted set)
  const topUsers = await client.zRangeWithScores("leaderboard", 0, 9, { REV: true });

  console.log("Top 10 Users with Most Tweets:");
  topUsers.forEach((user, index) => {
    console.log(`#${index + 1}: ${user.value} with ${user.score} tweets`);
  });
} catch (error) {
  console.error("An error occurred:", error);
} finally {
  await client.quit();
}
