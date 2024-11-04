import { MongoClient } from 'mongodb';

async function main() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const collection = client.db('ieeevisTweets').collection('tweet');

        // Get top 10 screen names by follower count
        const topUsers = await collection.aggregate([
            {
                $group: {
                    _id: "$user.screen_name",
                    followers: { $max: "$user.followers_count" }
                }
            },
            {
                $sort: { followers: -1 }
            },
            {
                $limit: 10
            }
        ]).toArray();

        console.log("Top 10 screen names by their number of followers:", topUsers);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
