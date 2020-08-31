const express = require("express");

const app = express();
const router = express.Router();

function createUserRouter(database) {
  router.use(function (request, response, next) {
    console.log("User Router active");
    next();
  });

  router.get;

  return router;
}

module.exports = {
  createUserRouter,
};
