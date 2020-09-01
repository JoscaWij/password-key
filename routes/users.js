const express = require("express");

const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function createUserRouter(database) {
  const collection = database.collection("users");

  router.get("/:username", async (request, response) => {
    try {
      const { username } = request.params;
      const user = await collection.findOne({
        username,
      });
      if (!user) {
        response
          .status(401)
          .send(`No user with name ${username} found. Wrong name or password`);
      } else {
        response.send(`User ${username} found`);
      }
    } catch (error) {
      response.status(500).send("Error. Please try again later");
      console.error(error);
    }
  });

  router.post("/new", async (request, response) => {
    try {
      const { username, password } = request.body;
      collection.insertOne({
        username,
        password,
      });

      response.status(201).send(`User ${username} created`);
    } catch (error) {
      response.status(500).send("Error");
    }
  });

  router.post("/login", async (request, response) => {
    try {
      const { username, password } = request.body;
      const user = await collection.findOne({
        username,
        password,
      });
      if (!user) {
        response.status(401).send("Wrong email oder password");
        return;
      }
      const token = jwt.sign({ username }, process.env.TOKEN_SECRET, {
        expiresIn: "360s",
      });
      response.setHeader(
        "Set-Cookie",
        `authToken=${token}; path=/;Max-Age:360`
      );
      response.send("Logged in");
    } catch (error) {
      console.error(error);
      response.status(500).send(error.message);
    }
  });

  return router;
}

module.exports = {
  createUserRouter,
};
