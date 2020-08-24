const inquirer = require("inquirer");

const { readPassword } = require("./lib/passwords");

const {
  askStartQuestions,
  askGetQuestions,
  askSetQuestions,
  CHOICE_GET,
  CHOICE_SET,
} = require("./lib/questions");

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
      console.log(`New Password for ${service} = ${newpassword}`);
    } else {
      console.log("Master Password is incorrect!");
    }
  }
}

main();
