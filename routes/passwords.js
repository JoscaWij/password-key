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
      response.status(401).send("Access denied");
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

      const password = await readPassword(name, database);
      if (!password) {
        return response.status(404).send("Password doesn't exist");
      }
      const { name: newName, value: newValue } = request.body;
      await updatePassword(
        newName || name,
        newValue ? encrypt(newValue, masterPassword) : password
      );
      response.status(201).send("Updated");
    } catch (error) {
      response.status(500).send(error.message);
    }
  });

  router.post("/", async (request, response) => {
    try {
      const { name, value } = request.body;

      const password = await readPassword(name, database);
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
