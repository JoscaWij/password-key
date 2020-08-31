const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const {
  readPassword,
  writePassword,
  readAllPasswords,
} = require("./lib/passwords");
const { decrypt, encrypt } = require("./lib/crypto");
const port = 3000;
const app = express();

const client = new MongoClient(process.env.MONGO_URI, {
  useUnifiedTopology: true,
});

const masterPassword = process.env.MASTER_PASSWORD;

async function server() {
  try {
    await client.connect();
    console.log("Connected to Database");
  } catch (error) {
    console.log("MongoDB is a Mongo today");
    console.error(error);
  }
  const database = client.db(process.env.MONGO_DB_NAME);

  app.use(bodyParser.json());

  app.use((request, response, next) => {
    console.log(`Request ${request.method} on ${request.url}`);
    next();
  });

  app.use('/api/passwords', createPasswordsRouter(database, masterPassword))

/*   app.get("/api/passwords/:name", async (request, response) => {
    try {
      const { name } = request.params;
      const encryptedPassword = await readPassword(name, database);
      const password = decrypt(encryptedPassword, masterPassword);
      response.send(password);
    } catch (error) {
      console.log("Couldn't get data from MongoDB"), console.error(error);
    }
  });

  app.post("/api/passwords", async (request, response) => {
    try {
      const { name, value } = request.body;
      const encryptedPassword = encrypt(value, masterPassword);
      await writePassword(name, encryptedPassword, database);
      response.send(`New password for ${name} set`);
    } catch (error) {
      console.log("Couldn't post data to MongoDB-database"),
        console.error(error);
    }
  });

  app.get("/api/passwords/all", async (request, response) => {
    try {
      const encryptedPasswords = await readAllPasswords(database);
      const passwords = decrypt(encryptedPasswords, masterPassword);
      response.send(passwords);
    } catch (error) {
      console.log("Couldn't get data from MongoDB. To much data"),
        console.error(error);
    }
  });
} */

app.listen(port, () => {
  console.log(`listening on ${port}`);
}),
  server();
