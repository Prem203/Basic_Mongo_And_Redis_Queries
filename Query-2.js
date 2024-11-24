import { createClient } from "redis";
import { getFavoritedCount } from "./db/myMongodb.js";

const client = createClient();

client.on("error", (err) => {
  console.log("Error " + err);
});

await client.connect();

const favorites = await getFavoritedCount();
await client.set("favoritesSum", "0");
for (let f of favorites) {
  await client.incrBy("favoritesSum" , f.favorite_count);
}

const count = await client.get("favoritesSum");

console.log(`There were ${count} favorites`);

await client.quit();
