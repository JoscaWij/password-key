const express = require("express");

const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

function createUserRouter(database) {
  const collection = database.collection("users");

  router.get("/:username", async (request, response) => {
    try {
      const { username } = request.params;
      const user = await collection.findOne({
        username: username,
      });
      if (!user) {
        response.status(404).send(`No user with name ${username}`);
      } else {
        response.send(`User ${username} found`);
        console.log(user);
      }
    } catch (error) {
      response.status(500).send("Error. Please try again later");
      console.error(error);
    }
  });

  router.post("/login", async (request, response) => {
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

  return router;
}

module.exports = {
  createUserRouter,
};
