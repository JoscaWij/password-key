const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const { readPassword, writePassword } = require("./lib/passwords");
const { decrypt, encrypt } = require("./lib/crypto");
const port = 3000;
const app = express();

const client = new MongoClient(process.env.MONGO_URI);

const masterPassword = process.env.MASTER_PASSWORD;

async function server() {
  await client.connect();
  console.log("Connected to Database");
  const database = client.db(process.env.MONGO_DB_NAME);

  app.use(bodyParser.json());

  app.post("/api/passwords", async (request, response) => {
    const { name, value } = request.body;
    const encryptedPassword = encrypt(value, masterPassword);
    await writePassword(name, encryptedPassword, database);
    response.send(`New password for ${name} set`);
  });

  app.get("/api/passwords/:name", async (request, response) => {
    const { name } = request.params.name;
    const encryptedPassword = await readPassword(name, database);
    const password = decrypt(encryptedPassword, masterPassword);
    response.send(password);
  });
}

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

server();
