const inquirer = require("inquirer");
const fs = require("fs").promises;

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
        const passwordJSON = await fs.readFile("./password.json", "utf-8");
        const passwords = JSON.parse(passwordJSON);
        console.log(`Your ${key} password is ${passwords[key]}`);
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
