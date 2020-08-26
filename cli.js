const inquirer = require("inquirer");

const { readPassword, writePassword } = require("./lib/passwords");

const {
  askStartQuestions,
  askGetQuestions,
  askSetQuestions,
  CHOICE_GET,
  CHOICE_SET,
} = require("./lib/questions");

const { encrypt, decrypt, createHash, verifyHash } = require("./lib/crypto");

async function main() {
  const { masterPassword, task } = await askStartQuestions();
  if (masterPassword === "123") {
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
    } else {
      console.log("Master Password is incorrect!");
    }
  }
}

main();
