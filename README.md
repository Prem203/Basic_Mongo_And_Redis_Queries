# Basic_Mongo_Queries

This project uses Node.js to query a MongoDB database containing tweets from the 2020 IEEE VIS Conference. The project includes five different queries, each provided in separate JavaScript files. These queries answer specific questions about the tweet data.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v14 or later)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or in a Docker container)
- MongoDB Node.js Driver (`mongodb` package)

### MongoDB Setup

1. **Download the Dataset**: The dataset of tweets is provided in a `.dump` file. Import it to MongoDB using the following command:
   ```sh
   mongoimport -h localhost:27017 -d ieeevisTweets -c tweet --file ieeevis2020Tweets.dump
   ```

2. **Start MongoDB**: Make sure your MongoDB server is running locally. You can start it by running:
   ```sh
   mongod
   ```

## Project Structure

- `Query-1.js`: Counts tweets that are not retweets or replies.
- `Query-2.js`: Finds the top 10 users by their number of followers.
- `Query-3.js`: Finds the user with the most tweets.
- `Query-4.js`: Finds the top 10 users with the highest average retweets, if they have tweeted more than three times.
- `Query-5.js`: Separates user information into a different collection and creates a tweets-only collection that references users by their user ID.

## Setup and Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Prem203/Basic_Mongo_Queries.git
   cd Basic_Mongo_Queries
   ```

2. Install the necessary Node.js dependencies:
   ```sh
   npm install
   ```

3. Make sure MongoDB is running locally and the dataset is imported as described in the prerequisites.

## Running the Queries

Each query is a separate script that you can run with Node.js.

### Query 1: Count Tweets That Are Not Retweets or Replies

To run Query1.js, execute:
```sh
node Query-1.js
```
This will output the number of tweets that are neither retweets nor replies.

### Query 2: Top 10 Users by Number of Followers

To run Query2.js, execute:
```sh
node Query-2.js
```
This will return the top 10 users by their number of followers.

### Query 3: Find the User with the Most Tweets

To run Query3.js, execute:
```sh
node Query-3.js
```
This will display the user with the most tweets.

### Query 4: Find Top 10 Users with Most Average Retweets

To run Query4.js, execute:
```sh
node Query-4.js
```
This will return the top 10 users with the most average retweets, who have tweeted more than three times.

### Query 5: Separate User Information into Different Collection

To run Query5.js, execute:
```sh
node Query-5.js
```
This script will separate the user information into a new collection named `user` and create a `Tweets_Only` collection that references users by ID.

## Notes

- Make sure MongoDB is up and running before executing any of the queries.
- If there are any connection issues, verify that the MongoDB URI is correct and MongoDB is accessible at `localhost:27017`.

## License

This project is licensed under the MIT License.

