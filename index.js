//Packages needed for this application 
const inquirer = require('inquirer');
const fs = require('fs');

// Markdwown for readme
const readmeFile = ({title, badge, licenseLink, description, installation, usage, license, contribute, tests, email, github})=>
   
`# ${title}     

# License : ${license} ${licenseBadge(license)}
 
# 
---
# Description \n
${description}
---
# Table of content \n
* [Installation](#installation)\ns
* [Usage](#usage) \n
* [Contribute](#contributing) \n
* [Tests](#tests) \n
* [Questions](#questions) \n
---
# Installation \n

${installation}
---

# Usage \n
${usage}
---
# License \n
${licenseLinkCheck(license)} 

TO DO : notice is added to the section of the README entitled License that explains which license the application is covered under
---
# Contributing \n
${contribute}
---
# Tests \n
The following is needed to run the rest:\n
${tests}
---
# Questions \n
If you have any additional questions you can reach me at ${email}. \n
Link to my Github profile: https://github.com/${github}

`

//array of questions for user input
const questions = ['What is the title of your project?', 'Please enter a description of your project?',
'Please enter installation instructions.' , 'Please enter usage instructions.'
,'Please select a license','Please enter contributing guidelines', 'What commands are needed to test this app?',
'Please enter your email address','Please enter your Github username',];

function licenseBadge (licenseCheck) {
  let badge = '';
  if (licenseCheck === 'MIT'){
    badge= 'https://img.shields.io/badge/License-MIT-yellow.svg';
    return badge;
  }
};    

function licenseLinkCheck (licenseCheck) {
  let licenseLink = '';
  if (licenseCheck === 'MIT'){
    licenseLink = 'https://choosealicense.com/licenses/mit/';
    return licenseLink;
  }
};   



// TODO: Create a function to initialize app
function init() {
let [titlePrompt, descriptionPrompt, installationPrompt, usagePrompt, licensePrompt, contributePrompt, testPrompt, emailPrompt, githubPrompt] = questions;
inquirer 
  .prompt([
    {
      type: 'input',
      message: titlePrompt,
      name: 'title',
      validate: (answer)=>{
        if(answer.length<1){
            return console.log('You have to enter title for the README.')
        }
        return true;
      }
    },
    {
      type: 'input',
      message: descriptionPrompt,
      name: 'description',
      //validate is user entered description and if not return below warning 
      validate: (answer)=>{
        if(answer.length<1){
            return console.log('You have to enter brief description of your project.')
        }
        return true;
      }
    },
    // {
    //     //TO DO: add if for response Y vs no
    //   type: 'confirm',
    //   message: tableOfContentPrompt,
    //   name: 'tableOfContent',
    //   validate: (answer)=>{
    //     if(answer === Yes){
    //         return console.log('There will be no table of content')
    //     }
    //     return true;
    //   }
    // },
    {
        type: 'input',
        message: installationPrompt,
        name: 'installation',
      },
      {
        type: 'input',
        message: usagePrompt,
        name: 'usage',
      },
      {
        type: 'rawlist',
        message: licensePrompt,
        name: 'license',
        choices: [ "Apache license 2.0", "GNU General Public License v3.0", "MIT","BSD 2-clause Simplified license", "Boost Software License 1.0", "Mozilla Public License 2.0","Eclipse Public License 2.0","The Unlicense"],
        validate: (answer)=>{
          if(answer === 'Yes'){
              return true;
          }
        }
      },
      {
        type: 'input',
        message: contributePrompt,
        name: 'contribute',
      },
      {
        type: 'input',
        message: testPrompt,
        name: 'test',
      },
      {
        type: 'input',
        message: emailPrompt,
        name: 'email',
      },
      {
        type: 'input',
        message: githubPrompt,
        name: 'github',
      },
  ])
// for (const questionnaire of questions) {


//     console.log(questionnaire);
//   }
.then((answers) =>{

 const readmeContent = readmeFile(answers);
//  console.log(readmeFile);
// // TODO: Create a function to write README file
// //function writeToFile(fileName, data) {
   
    fs.writeFile('README.md', readmeContent, (err) =>
    err ? console.error(err) : console.log('You have successfully created a README file!')


    );
    
  }
  );
}


// Function call to initialize app
init();
