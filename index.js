//Packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");

// ${answerValidation(installation)}
// Markdwown for readme
const readmeFile = ({
  title,
  description,
  tableOfContent,
  installation,
  usage,
  license,
  contribute,
  test,
  email,
  github,
}) =>
  `# ${title}    ${licenseBadge(license)}  
# Description \n
${description}
# ${tableContent(tableOfContent)}
# Installation \n
#### ${answerValidation(installation)}
# Usage \n
${userImage(usage)}
# License \n
This application is covered under ${license}, to find more information about it click on ${licenseLinkCheck(
    license
  )}. 
# Contributing \n
#### ${answerValidation(contribute)}
# Tests \n
The following is needed to run the rest:\n
#### ${answerValidation(test)}
# Questions \n
If you have any additional questions you can reach me at ${answerValidation(
    email
  )}. \n
Link to my Github profile: https://github.com/${github}
`;
// function to create table of content
function tableContent(tableOfContent) {
  let content = "";

  if (tableOfContent) {
    content =
      "Table of content \n" +
      "* [Installation](#installation)\n" +
      "* [Usage](#usage) \n" +
      "* [Contribute](#contributing) \n" +
      "* [Tests](#tests) \n" +
      "* [Questions](#questions) \n";
  }
  return content;
}

//array of questions for user input
const questions = [
  "What is the title of your project?",
  "Please enter a description of your project?",
  "Would you like to add table of content?",
  "Please enter installation instructions.",
  "Would you like to add image for usage instructions, if so enter name of the image stored in you Asset/Images folder.",
  "Please select a license",
  "Please enter contributing guidelines",
  "What commands are needed to test this app?",
  "Please enter your email address",
  "Please enter your Github username",
];

//user story image
function userImage(imageCheck) {
  let image = "!";
  if (imageCheck) {
    image = "![User-Story](./Assets/Images/" + imageCheck + ".png)";
  } else {
    image = "N/A";
  }
  return image;
}

//create badge for selected license
function licenseBadge(licenseCheck) {
  let badge = "";
  if (licenseCheck === "MIT") {
    badge =
      "![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)";
  } else if (licenseCheck === "Apache license 2.0") {
    badge =
      "![License: Apache 2.0 License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)";
  } else if (licenseCheck === "The Unlicense") {
    badge =
      "![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)";
  } else if (licenseCheck === "Mozilla Public License 2.0") {
    badge =
      "![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)";
  }
  return badge;
}
//create notice for selected license
function licenseLinkCheck(licenseCheck) {
  let licenseLink = "";
  if (licenseCheck === "MIT") {
    licenseLink = "https://choosealicense.com/licenses/mit/";
  } else if (licenseCheck === "Apache license 2.0") {
    licenseLink = "https://opensource.org/licenses/Apache-2.0/";
  } else if (licenseCheck === "The Unlicense") {
    licenseLink = "http://unlicense.org/";
  } else if (licenseCheck === "Mozilla Public License 2.0") {
    licenseLink = "https://opensource.org/licenses/MPL-2.0/";
  }
  return licenseLink;
}

function answerValidation(answerValidation) {
  let noAnswer = "";
  if (!answerValidation) {
    noAnswer = "N/A";
    return noAnswer;
  } else {
    return answerValidation;
  }
}

// TODO: Create a function to initialize app
function init() {
  let [
    titlePrompt,
    descriptionPrompt,
    tableOfContentPrompt,
    installationPrompt,
    usagePrompt,
    licensePrompt,
    contributePrompt,
    testPrompt,
    emailPrompt,
    githubPrompt,
  ] = questions;
  inquirer
    .prompt([
      {
        type: "input",
        message: titlePrompt,
        name: "title",
        validate: (answer) => {
          if (answer.length < 1) {
            return console.log("You have to enter title for the README.");
          }
          return true;
        },
      },
      {
        type: "input",
        message: descriptionPrompt,
        name: "description",
        //validate is user entered description and if not return below warning
        validate: (answer) => {
          if (answer.length < 1) {
            return console.log(
              "You have to enter brief description of your project."
            );
          }
          return true;
        },
      },
      {
        //TO DO: add if for response Y vs no
        type: "confirm",
        message: tableOfContentPrompt,
        name: "tableOfContent",
        validate: (answer) => {
          if (answer === "Yes") {
            return true;
          }
        },
      },
      {
        type: "input",
        message: installationPrompt,
        name: "installation",
      },
      {
        type: "input",
        message: usagePrompt,
        name: "usage",
      },
      {
        type: "rawlist",
        message: licensePrompt,
        name: "license",
        choices: [
          "Apache license 2.0",
          "The Unlicense",
          "MIT",
          "Mozilla Public License 2.0",
        ],
        validate: (answer) => {
          if (answer === "Yes") {
            return true;
          }
        },
      },
      {
        type: "input",
        message: contributePrompt,
        name: "contribute",
      },
      {
        type: "input",
        message: testPrompt,
        name: "test",
      },
      {
        type: "input",
        message: emailPrompt,
        name: "email",
      },
      {
        type: "input",
        message: githubPrompt,
        name: "github",
      },
    ])

    .then((answers) => {
      const readmeContent = readmeFile(answers);

      // //function writeToFile README FILE
      fs.writeFile("README.md", readmeContent, (err) =>
        err
          ? console.error(err)
          : console.log("You have successfully created a README file!")
      );
    });
}

// Function call to initialize app
init();
