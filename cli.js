const inquirer = require("inquirer");

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

async function main() {
  const originalMasterPassword = await readMasterPassword();
  if (!originalMasterPassword) {
    const { newMasterPassword } = await askForNewMasterPassword();
    await writeMasterPassword(newMasterPassword);
    console.log("Master Password set!");
    return;
  }

  const { masterPassword, task } = await askStartQuestions();

  if (masterPassword !== originalMasterPassword) {
    console.log("Master Password is incorrect!");
    return;
  }

  console.log("Master password is correct!");
  if (task === CHOICE_GET) {
    const { key } = await askGetQuestions();
    try {
      const password = await readPassword(key);
      const dycriptedPassword = decrypt(password, masterPassword);
      console.log(`Your ${key} password is ${dycriptedPassword}`);
    } catch (error) {
      console.error("Something went wrong");
    }
  } else if (task === CHOICE_SET) {
    const { service, newpassword } = await askSetQuestions();
    const encryptedPassword = encrypt(newpassword, masterPassword);
    await writePassword(service, encryptedPassword);
    console.log(`New Password for ${service} set`);
  }
}

main();
