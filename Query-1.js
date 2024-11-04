import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

async function main() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const collection = client.db('ieeevisTweets').collection('tweet');

    // Find all tweets that are not retweets and not replies
    const filter = {
      'retweeted_status': {
        '$exists': false
      },
      'in_reply_to_status_id': null
    };

    const result = await collection.find(filter).toArray();
    console.log("Number of tweets which are not retweets or replies are:", result.length);
  } finally {
    await client.close();
  }
}

main().catch(console.error);