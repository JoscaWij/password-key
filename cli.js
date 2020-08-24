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

inquirer.prompt(questions).then((answers) => {
  if (answers.password === "123") {
    console.log("Answer is correct!");
    console.log(`The password of ${answers.key}:`);
  } else {
    console.log("Answer is incorrect!");
  }

  fs.readFile("./password.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let passwords = JSON.parse(data);
    console.log(passwords[answers.key]);
  });
});
