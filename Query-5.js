import { MongoClient } from 'mongodb';

async function main() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('ieeevisTweets');
        const tweetsCollection = db.collection('tweet');

        // Step 1: Create a unique users collection
        const users = await tweetsCollection.aggregate([
            {
                $group: {
                    _id: "$user.id_str",
                    screen_name: { $first: "$user.screen_name" },
                    name: { $first: "$user.name" },
                    followers_count: { $first: "$user.followers_count" }
                    // Add any other fields you need
                }
            }
        ]).toArray();

        const usersCollection = db.collection('user');
        await usersCollection.insertMany(users);

        // Step 2: Create a new Tweets_Only collection without embedded user information
        const tweetsOnlyCollection = db.collection('Tweets_Only');
        const tweets = await tweetsCollection.find().toArray();

        const tweetsWithoutUsers = tweets.map(tweet => {
            const { user, ...rest } = tweet;
            return {
                ...rest,
                user_id: user.id_str // Reference to the user collection
            };
        });

        await tweetsOnlyCollection.insertMany(tweetsWithoutUsers);

        console.log("Users separated into a new collection, and Tweets_Only collection created.");
    } finally {
        await client.close();
    }
}

main().catch(console.error);
