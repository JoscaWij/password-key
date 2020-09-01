const fs = require("fs").promises;

async function readPasswords() {
  const passwordsJSON = await fs.readFile("./password.json", "utf-8");
  const passwords = JSON.parse(passwordsJSON);
  return passwords;
}

async function writePasswords(passwords) {
  const passwordsJSON = JSON.stringify(passwords, null, 2);
  await fs.writeFile("./password.json", passwordsJSON);
}

async function readPassword(key, database) {
  const collection = database.collection("passwords");
  const password = await collection.findOne({ name: key });
  if (!password) {
    return null;
  }
  return password.value;
}

async function readAllPasswords(database) {
  const collection = database.collection("passwords");
  const passwords = await collection.find().toArray();
  return passwords;
}

async function writePassword(key, value, database) {
  const collection = database.collection("passwords");
  await collection.insertOne({
    name: key,
    value: value,
  });
}

async function updatePassword(key, value, database) {
  const collection = database.collection("passwords");
  await collection.updateOne({ key }, { $set: { name: key, value: value } });
}

async function readMasterPassword() {
  try {
    const masterPassword = await fs.readFile("./masterPassword", "utf-8");
    return masterPassword;
  } catch (error) {
    return null;
  }
}

async function writeMasterPassword(masterPassword) {
  await fs.writeFile("./masterPassword", masterPassword);
}

exports.readPassword = readPassword;
exports.writePassword = writePassword;
exports.readAllPasswords = readAllPasswords;
exports.updatePassword = updatePassword;
exports.readMasterPassword = readMasterPassword;
exports.writeMasterPassword = writeMasterPassword;
