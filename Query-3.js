import { createClient } from "redis";
import { getUser } from "./db/myMongodb.js";

const client = createClient();

client.on("error", (err) => {
  console.log("Error " + err);
});

await client.connect();

const users = await getUser();
for (let u of users) {
  await client.sAdd("users", u);
}

const userCount = await client.sCard("users");

  console.log(`There are ${userCount} unique users in Redis.`);

await client.quit();
