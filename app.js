const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//list of employees that is added through user input via command lines
const employees = [];

//prompts the user for an employee's role, and loops through until the user finishes adding employees
const memberPrompt = (position) => {
    inquirer.prompt(
        {
            type : 'list',
            message : 'Who would you like to add?',
            name : 'role',
            choices : ['Manager', 'Engineer', 'Intern', 'No More Employees To Add']
        } 
    ).then(function(response) {
        console.log(response);
        let employee;
        switch (response.role){
            case 'Manager':
                askInfo('Manager');
                // employee = new Manager(responses.name, responses.id, responses.email, responses.moreInfo);
                break;
            case 'Engineer':
                askInfo('Engineer');
                // employee = new Engineer(responses.name, responses.id, responses.email, responses.moreInfo);
                break;
            case 'Intern':
                askInfo('Intern');
                // employee = new Intern(responses.name, responses.id, responses.email, responses.moreInfo); 
                break;
            default :
                console.log(`List of employees: \n\n ${JSON.stringify(employees, null, 2)}`);

                break;
        };
        // employees.push(employee);
    });
};
memberPrompt();

// Asks questions given the role inputted by the user, and creates a new Employee from the responses, and then calls memberPrompt() to add more employees
const askInfo = (role) => {
    const employeeInfo = {
        'Manager' : 'Room Number',
        'Engineer' : 'GitHub Account',
        'Intern' : 'School'
    };
    inquirer.prompt([
        {
            type : 'input',
            message : 'Enter their name',
            name : 'name'
        },
        {
            type : 'input',
            message : 'Enter their id',
            name : 'id'
        },
        {
            type : 'input',
            message : 'Enter their email',
            name : 'email'
        },
        {
            type : 'input',
            message : `Enter ${employeeInfo[role]}`,
            name : 'moreInfo'
        }
    ]).then(function(responses){
        console.log(responses);
        if(role === 'Manager'){
            employee = new Manager(responses.name, responses.id, responses.email, responses.moreInfo);
        }else if(role === 'Engineer'){
            employee = new Engineer(responses.name, responses.id, responses.email, responses.moreInfo);
        }else{
            employee = new Intern(responses.name, responses.id, responses.email, responses.moreInfo);
        }
        employees.push(employee);
        memberPrompt();
    })
};
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
