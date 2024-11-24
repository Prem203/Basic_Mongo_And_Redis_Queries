import { createClient } from "redis";
import { getTweets } from "./db/myMongodb.js";

const client = createClient();

client.on("error", (err) => {
  console.log("Error " + err);
});

await client.connect();

const tweets = await getTweets();
await client.set("tweetCount", "0");
for (let t of tweets) {
  await client.incr("tweetCount");
}

const count = await client.get("tweetCount");

console.log(`There were ${count} tweets`);

await client.quit();
