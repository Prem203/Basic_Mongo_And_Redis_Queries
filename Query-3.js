import { MongoClient } from 'mongodb';

async function main() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const collection = client.db('ieeevisTweets').collection('tweet');

        // Find the user with the most tweets
        const mostTweetsUser = await collection.aggregate([
            {
                $group: {
                    _id: "$user.screen_name",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 1
            }
        ]).toArray();

        console.log("User with the most tweets:", mostTweetsUser[0]);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
