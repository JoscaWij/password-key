const inquirer = require("inquirer");

const CHOICE_GET = "Get a passwort for saved service";
const CHOICE_SET = "Set a passwort for new service";

const questionsStart = [
  {
    type: "password",
    name: "masterPassword",
    message: "Please log-in with your master-password",
  },
  {
    type: "list",
    name: "task",
    message: "What would you like to do?",
    choices: [CHOICE_GET, CHOICE_SET],
  },
];
const questionsGet = [
  {
    type: "input",
    name: "key",
    message: "Which password do you want?",
  },
];

const questionsSet = [
  {
    type: "input",
    name: "service",
    message: "For which service do you want to set a password?",
  },
  {
    type: "password",
    name: "newpassword",
    message: "What's the password?",
  },
];

const questionsNewMasterPassword = [
  {
    type: "password",
    name: "newMasterPassword",
    message: "Please set a master password",
  },
];

function askStartQuestions() {
  return inquirer.prompt(questionsStart);
}

function askGetQuestions() {
  return inquirer.prompt(questionsGet);
}

function askSetQuestions() {
  return inquirer.prompt(questionsSet);
}

function askForNewMasterPassword() {
  return inquirer.prompt(questionsNewMasterPassword);
}

module.exports = {
  askStartQuestions,
  askGetQuestions,
  askSetQuestions,
  askForNewMasterPassword,
  CHOICE_GET,
  CHOICE_SET,
};
