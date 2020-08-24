const inquirer = require("inquirer");
const fs = require("fs");

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
    console.log(`You like to know the password of ${answers.key}?`);
  } else {
    console.log("Answer is incorrect!");
  }

  try {
    const data = fs.readFileSync("./password.json", "utf8");
    let passwords = JSON.parse(data);
    console.log(passwords[answers.key]);
  } catch (err) {
    console.error(err);
  }
});

/* const readline = require("readline");

const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


interface.question(`What's your name?`, (name) => {
  console.log(`Hi ${name}!`);
  interface.question(`What's your password?`, password => {
    console.log(`Thanks for logging in! Password: ${password}`);
    interface.close();
  })
});
 */
