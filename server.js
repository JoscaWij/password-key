const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const cookieParser = require("cookie-parser");

const express = require("express");
const bodyParser = require("body-parser");
const {
  readPassword,
  writePassword,
  readAllPasswords,
} = require("./lib/passwords");
const { decrypt, encrypt } = require("./lib/crypto");

const { createPasswordsRouter } = require("./routes/passwords");
const { createUserRouter } = require("./routes/users");

const port = 3333;
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
  app.use(cookieParser());

  app.use((request, response, next) => {
    console.log(`Request ${request.method} on ${request.url}`);
    next();
  });

  app.use("/api/passwords", createPasswordsRouter(database, masterPassword));
  app.use("/api/users", createUserRouter(database));
}

app.listen(port, () => {
  console.log(`listening on ${port}`);
}),
  server();
