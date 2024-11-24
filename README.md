# **Basic_Mongo_And_Redis_Queries**

This project uses **Node.js** to query a **MongoDB** database containing tweets from the 2020 IEEE VIS Conference. Additionally, it integrates **Redis** for efficient data retrieval and storage. The project includes various queries, each focusing on different aspects of the tweet data, and leverages both MongoDB and Redis for data storage and management.

## **Prerequisites**

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v14 or later)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or in a Docker container)
- MongoDB Node.js Driver (`mongodb` package)
- Redis (running locally or in a Docker container)

### **MongoDB Setup**

1. **Download the Dataset**: The dataset of tweets is provided in a `.dump` file. Import it to MongoDB using the following command:
   ```sh
   mongoimport -h localhost:27017 -d ieeevisTweets -c tweet --file ieeevis2020Tweets.dump
   ```

2. **Start MongoDB**: Make sure your MongoDB server is running locally. You can start it by running:
   ```sh
   mongod
   ```

### **Redis Setup**

1. **Start Redis**: Make sure your Redis server is running locally or in a Docker container. You can start Redis with the following command:
   ```sh
   redis-server
   ```

## **Project Structure**

- `Query-1.js`: How many tweets are there? 
- `Query-2.js`: Compute and print the total number of favorites in the dataset.
- `Query-3.js`: Compute how many distinct users are there in the dataset.
- `Query-4.js`: Create a leaderboard with the top 10 users with more tweets. 
- `Query-5.js`: Separates user information into a different collection and creates a tweets-only collection that references users by their user ID.

## **Setup and Installation**

1. Clone the repository:
   ```sh
   git clone https://github.com/Prem203/Basic_Mongo_And_Redis_Queries.git
   cd Basic_Mongo_And_Redis_Queries
   ```

2. Install the necessary Node.js dependencies:
   ```sh
   npm install
   ```

3. Ensure MongoDB and Redis are running locally and the dataset is imported as described in the prerequisites.

## **Running the Queries**

Each query is a separate script that you can run with Node.js.

### **Query 1: Count Tweets That Are Not Retweets or Replies**

To run `Query-1.js`, execute:
```sh
node Query-1.js
```
This will output the number of tweets.

### **Query 2: Top 10 Users by Number of Followers**

To run `Query-2.js`, execute:
```sh
node Query-2.js
```
This will return the total number of favorites in the dataset.

### **Query 3: Find the User with the Most Tweets**

To run `Query-3.js`, execute:
```sh
node Query-3.js
```
This will display how many distinct users are there in the dataset.

### **Query 4: Find Top 10 Users with Most Average Retweets**

To run `Query-4.js`, execute:
```sh
node Query-4.js
```
This will return the leaderboard with the top 10 users with more tweets.

### **Query 5: Separate User Information into Different Collection**

To run `Query-5.js`, execute:
```sh
node Query-5.js
```
This script will create a structure that lets you get all the tweets for an specific user.

### **Redis Example**:

1. **List of Tweet IDs for a User**:
   - Key: `tweets:sgeoviz`
   - Value (List of tweet IDs): `[1320454693668212736, 1320454693668212737, 1320454693668212738, ...]`

2. **Tweet Details in Hash**:
   - Key: `tweet:1320454693668212736`
   - Hash fields:
     ```json
     {
       "text": "That BELIV workshop, Provocations session really kicked me into being awake for VIS 2020! Thought provoking chat...",
       "created_at": "Sun Oct 25 19:58:26 +0000 2020",
       "user_name": "Sarah Goodwin",
       "screen_name": "sgeoviz",
       "tweet_id": "1320454693668212736",
       "favorite_count": 4,
       "retweet_count": 0,
       "source": "Twitter Web App"
     }
     ```

## **Notes**

- Make sure MongoDB and Redis are up and running before executing any of the queries.
- If there are any connection issues, verify that the MongoDB URI is correct and MongoDB is accessible at `localhost:27017`.
- Similarly, ensure Redis is running locally or in the correct Docker container.

## **License**

This project is licensed under the MIT License.
