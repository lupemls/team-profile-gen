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
        // console.log(response);
        let employee;
        switch (response.role){
            case 'Manager':
                askInfo('Manager');
                break;
            case 'Engineer':
                askInfo('Engineer');
                break;
            case 'Intern':
                askInfo('Intern');
                break;
            default :
                writeRenderedHTML();
                // console.log(`List of employees: \n\n ${JSON.stringify(employees, null, 2)}`);
                break;
        };
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
        // console.log(responses);

        //creates a new employee based on the given role, then adds it to the array of employees
        if(role === 'Manager'){
            employee = new Manager(responses.name, responses.id, responses.email, responses.moreInfo);
        }else if(role === 'Engineer'){
            employee = new Engineer(responses.name, responses.id, responses.email, responses.moreInfo);
        }else{
            employee = new Intern(responses.name, responses.id, responses.email, responses.moreInfo);
        };
        employees.push(employee);
        memberPrompt();
    });
};

//renders the html from the array of employees, and writes it to a new html file
const writeRenderedHTML = () => {
    //renders html using templates of the employees input by the user
    const employeesHTML = render(employees);

    //checks to see if the output folder exists, if not, it creates it
    if(!fs.existsSync('./output')){
        fs.mkdirSync('./output');
    };

    //writes the html file using the rendered html
    fs.writeFile(outputPath, employeesHTML, (err) => {
        if(err){
            throw err;
        };
        console.log('Generating html to ./output/team.html');
    });
};
