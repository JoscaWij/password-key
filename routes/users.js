const express = require("express");

const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

function createUserRouter(database) {
  router.use(function (request, response, next) {
    console.log("User Router active");
    next();
  });

  router.use(bodyParser.json());

  const collection = database.collection("users");

  router.get("/log-in/:username", async (request, response) => {
    try {
      const { username } = request.params;
      const user = await collection.findOne({
        username: username,
      });
      if (!user) {
        response.send(`No user with name ${username}`);
      }
      if (user) {
        response.send(`User ${username} found`), console.log(user);
      }
    } catch (error) {
      response.status(500).send("Error. Please try again later");
      console.error(error);
    }
  });

  router.post("/log-in", async (request, response) => {
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
