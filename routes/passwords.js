const express = require("express");
const {
  readPassword,
  writePassword,
  updatePassword,
} = require("../lib/passwords");
const { decrypt, encrypt } = require("../lib/crypto");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

function createPasswordsRouter(database, masterPassword) {
  router.use((request, response, next) => {
    try {
      const { authToken } = request.cookies;
      const { username } = jwt.verify(authToken, process.env.TOKEN_SECRET);
      console.log(`Authorization ${username}: success`);
      next();
    } catch (error) {
      console.log("Authorization failed");
      return;
    }
  });

  router.get("/:name", async (request, response) => {
    try {
      const { name } = request.params;
      const encryptedPassword = await readPassword(name, database);
      const password = decrypt(encryptedPassword, masterPassword);
      response.send(password);
    } catch (error) {
      console.log("Couldn't get data from MongoDB"), console.error(error);
    }
  });

  router.patch("/:name", async (request, response) => {
    try {
      const { name } = request.params;
      const { newName, value } = request.body;
      const encryptedPassword = encrypt(value, masterPassword);
      await updatePassword(name, newName, encryptedPassword, database);
      response.status(201).send("Password updated");
    } catch (error) {
      response.status(400).send("Couldn't update password");
    }
  });

  router.post("/", async (request, response) => {
    try {
      const { name, value } = request.body;

      const password = await readPassword(name, database);
      console.log(password);
      if (password) {
        return response.status(403).send("Password is already set");
      }

      const encryptedPassword = encrypt(value, masterPassword);
      await writePassword(name, encryptedPassword, database);
      response.send(`New password for ${name} set`);
    } catch (error) {
      console.log("Couldn't post data to MongoDB-database"),
        console.error(error);
    }
  });

  return router;
}

module.exports = {
  createPasswordsRouter,
};
