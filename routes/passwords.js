const express = require("express");

const app = express();

/* app.get("/api/passwords/:name", async (request, response) => {
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
