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
        console.log(`Your ${key} password is ${password}`);
      } catch (error) {
        console.error("Something went wrong");
      }
    } else if (task === CHOICE_SET) {
      const { service, newpassword } = await askSetQuestions();
      await writePassword(service, newpassword);
      console.log(`New Password for ${service} set`);
    } else {
      console.log("Master Password is incorrect!");
    }
  }
}

main();
