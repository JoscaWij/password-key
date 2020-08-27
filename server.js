const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const express = require("express");
const port = 3000;
const { db } = require("mongodb");
const app = express();

/* MongoClient.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
})
.then((client) => {
    console.log("Connected to Database");
    const db = client.db(process.env.MONGO_DB_NAME);
    
    app.get("/", (request, response) => {
      db.collection("passwords")
        .find()
        .toArray()
        .then((results) => {
            console.log(results);
        });
    });
  })
  .catch((error) => console.error(error)); */

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
