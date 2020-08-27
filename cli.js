require("dotenv").config();

const {
  readPassword,
  writePassword,
  readMasterPassword,
  writeMasterPassword,
} = require("./lib/passwords");

const {
  askStartQuestions,
  askGetQuestions,
  askSetQuestions,
  CHOICE_GET,
  CHOICE_SET,
  askForNewMasterPassword,
} = require("./lib/questions");

const { encrypt, decrypt, createHash, verifyHash } = require("./lib/crypto");

const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

async function main() {
  try {
    await client.connect();
    const database = client.db(process.env.MONGO_DB_NAME);

    const originalMasterPassword = await readMasterPassword();
    if (!originalMasterPassword) {
      const { newMasterPassword } = await askForNewMasterPassword();
      const encrypedMasterPassword = createHash(newMasterPassword);
      await writeMasterPassword(encrypedMasterPassword);
      console.log("Master Password set!");
      return;
    }

    const { masterPassword, task } = await askStartQuestions();

    if (!verifyHash(masterPassword, originalMasterPassword)) {
      console.log("Master Password is incorrect!");
      return;
    }

    console.log("Master password is correct!");
    if (task === CHOICE_GET) {
      const { key } = await askGetQuestions();
      try {
        const password = await readPassword(key, database);
        const dycriptedPassword = decrypt(password, masterPassword);
        console.log(`Your ${key} password is ${dycriptedPassword}`);
      } catch (error) {
        console.error("Something went wrong");
      }
    } else if (task === CHOICE_SET) {
      const { service, newpassword } = await askSetQuestions();
      const encryptedPassword = encrypt(newpassword, masterPassword);
      await writePassword(service, encryptedPassword, database);
      console.log(`New Password for ${service} set`);
    }
  } finally {
    await client.close();
  }
}

main();
