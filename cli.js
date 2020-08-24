const inquirer = require("inquirer");
const fs = require("fs").promises;

const questions = [
  {
    type: "password",
    name: "password",
    message: "Please log in with master-password",
  },
  {
    type: "list",
    name: "task",
    message: "What would you like to do with the passwords?",
    choices: ["set", "get"],
  },
  {
    type: "input",
    name: "key",
    message: "Which password do you need?",
  },
  {
    type: "input",
    name: "service",
    message: "For with service do you want to set a password?",
  },
  {
    type: "input",
    name: "newpassword",
    message: "What's the password?",
  },
];

inquirer.prompt(questions).then(async (answers) => {
  if (answers.password === "123") {
    console.log("Master password is correct!");
    if (answers.task === "get") {
      try {
        const passwordJSON = await fs.readFile("./password.json", "utf-8");
        const passwords = JSON.parse(passwordJSON);
        console.log(
          `Your ${answers.key} password is ${passwords[answers.key]}`
        );
      } catch (error) {
        console.error("Something went wrong");
      }
    } else if (answers.task === "set") {
      console.log("Set password");
    }
  } else {
    console.log("Master password is incorrect!");
  }
});
