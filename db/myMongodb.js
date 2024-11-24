import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";

export async function getTweets() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const collection = client.db("ieeevisTweets").collection("tweet");

    const tweetCount = await collection.find({}).toArray();
    // console.log("Found tweet count: ", tweetCount.length);
    return tweetCount;
  } finally {
    await client.close();
  }
}


export async function getFavoritedCount() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const collection = client.db("ieeevisTweets").collection("tweet");

    const favoritedCount = await collection.find({}, {projection: { "favorite_count": 1, "_id":0}}).toArray();
    // console.log("Found favorited count: ", favoritedCount.length);
    return favoritedCount;
  } finally {
    await client.close();
  }
}

export async function getUser() {
  const client = new MongoClient(uri);
  try{
    await client.connect();
    const collection = client.db("ieeevisTweets").collection("tweet");

    const users = await collection.distinct("user.screen_name");
    // console.log("Distict users: ", userCount.length);
    return users;
  } finally {
    await client.close();
  }
}

export async function getUserLeaderboard() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const collection = client.db("ieeevisTweets").collection("tweet");
  
    const tweetCounts = await collection
      .aggregate([
        { $group: { _id: "$user.screen_name", tweetCount: { $sum: 1 } } }, 
        { $sort: { tweetCount: -1 } }, 
        { $limit: 10 } 
      ])
      .toArray();
      
    // console.log(tweetCounts);
    return tweetCounts; 
  } finally {
    await client.close();
  }
}

async function getAllUsers() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const collection = client.db("ieeevisTweets").collection("tweet");

    // Get distinct users
    const users = await collection.distinct("user.screen_name");
    return users;
  } finally {
    await client.close();
  }
}

export async function getAllUsersTweets() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const collection = client.db("ieeevisTweets").collection("tweet");

    // Aggregate to get all tweets for each user
    const result = await collection.aggregate([
      { $group: { _id: "$user.screen_name", tweets: { $push: "$$ROOT" } } } // Group by screen_name, push all tweets into an array
    ]).toArray();

    // Transform result into an object with screen_name as keys and array of tweets as values
    const allUserTweets = {};
    result.forEach((userData) => {
      allUserTweets[userData._id] = userData.tweets;
    });

    // console.log("All users' tweets:", result.length);
    return allUserTweets; // Return the formatted result
  } finally {
    await client.close();
  }
}

getAllUsersTweets();