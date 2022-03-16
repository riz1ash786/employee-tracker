const mysql = require("mysql2");
const inquirer = require("inquirer");

// creates connection to sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3000,
  user: "root",
  password: "password123",
  database: "employees_db",
});

// connects to sql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  options();
});

// prompts user with list of options to choose from
function options() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Welcome to our employee database! What would you like to do?",
      choices: [
        "View all departments",
        "View all employees",
        "View all roles",
        "Add a department",
        "Add an employee role",
        "Add a role",
        "Update employee role",
        "Delete an employee",
        "EXIT",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Add a role":
          addRole();
          break;
        case "Update employee role":
          updateRole();
          break;
        case "Delete an employee":
          deleteEmployee();
          break;
        case "EXIT":
          exitApp();
          break;
        default:
          break;
      }
    });
}
