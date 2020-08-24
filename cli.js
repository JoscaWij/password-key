const inquirer = require("inquirer");
const fs = require("fs").promises;

const questions = [
  {
    type: "password",
    name: "password",
    message: "Please log in with master-password",
  },
  {
    type: "input",
    name: "key",
    message: "Which password do you need",
  },
];

inquirer.prompt(questions).then(async (answers) => {
  if (answers.password === "123") {
    console.log("Master password is correct!");
    try {
      const passwordJSON = await fs.readFile("./password.json", "utf-8");
      const passwords = JSON.parse(passwordJSON);
      console.log(`Your ${answers.key} password is ${passwords[answers.key]}`);
    } catch (error) {
      console.error("Something went wrong");
    }
  } else {
    console.log("Master password is incorrect!");
  }
});
