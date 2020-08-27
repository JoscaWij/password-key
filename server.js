const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const express = require("express");
const { readPassword } = require("./lib/passwords");
const { decrypt } = require("./lib/crypto");
const port = 3000;
const app = express();

const client = new MongoClient(process.env.MONGO_URI);

const masterPassword = "123";

async function server() {
  await client.connect();
  console.log("Connected to Database");
  const database = client.db(process.env.MONGO_DB_NAME);

  app.get("/api/passwords/:name", async (request, response) => {
    const key = request.params.name;
    const encryptedPassword = await readPassword(key, database);
    const password = decrypt(encryptedPassword, masterPassword);
    response.send(password);
  });
}

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

server();
