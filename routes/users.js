const express = require("express");

const app = express();
const router = express.Router();

function createUserRouter(database) {
  router.use(function (request, response, next) {
    console.log("User Router active");
    next();
  });

  router.get("/log-in/:username", async (request, response) => {
    try {
      const { username } = request.params;
      const collection = database.collection("users");
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

  return router;
}

module.exports = {
  createUserRouter,
};
