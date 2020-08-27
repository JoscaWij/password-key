const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const express = require("express");
const port = 3000;
const { db } = require("mongodb");
const app = express();

const client = new MongoClient(process.env.MONGO_URI);

app.get("api/passwords/wifi", (request, response) => {
  response.send("123");
});

app.post("/api/passwords", (request, response) => {
  response.send("passwords");
});

async function server() {
  await client.connect({
    useUnifiedTopology: true,
  });

  app.get("/", async (request, response) => {
    const result = await db.collection("passwords").find().toArray();
    response.send(result);
  });

  console.log("Connected to Database");
  const db = client.db(process.env.MONGO_DB_NAME);
}

/*
.then((client) => {
    
  .catch((error) => console.error(error)); */

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
