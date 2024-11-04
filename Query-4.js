import { MongoClient } from 'mongodb';

async function main() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const collection = client.db('ieeevisTweets').collection('tweet');

        // Get top 10 users with the most average retweets (with more than 3 tweets)
        const topUsers = await collection.aggregate([
            {
                $group: {
                    _id: "$user.screen_name",
                    avgRetweets: { $avg: "$retweet_count" },
                    tweetCount: { $sum: 1 }
                }
            },
            {
                $match: { tweetCount: { $gt: 3 } }
            },
            {
                $sort: { avgRetweets: -1 }
            },
            {
                $limit: 10
            }
        ]).toArray();

        console.log("Top 10 users with the most average retweets (more than 3 tweets):", topUsers);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
