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
connection.connect((err) => {
  if (err) throw err;
  postConnection();
});

postConnection = () => {
  console.log("***********************************");
  console.log("*       |                         *");
  console.log("*       | EMPLOYEE TRACKER |         *");
  console.log("*       |__________________|                         *");
  console.log("***********************************");
  optionsList();
};

// prompts user with list of options to choose from
const optionsList = () => {
  inquirer
    .prompt([
      {
        name: "action",
        type: "list",
        message: "Welcome to our employee database! What would you like to do?",
        options: [
          "View all departments",
          "View all employees",
          "View all roles",
          "Add a department",
          "Add an employee",
          "Add a role",
          "Update an employee",
          "Delete an employee",
          "EXIT",
        ],
      },
    ])
    .then((answers) => {
      const { options } = answers;
      if (options === "View all departments") {
        viewDepartments();
      }

      if (options === "View all employees") {
        viewEmployees();
      }

      if (options === "View all roles") {
        viewRoles();
      }

      if (options === "Add a department") {
        addDepartment();
      }

      if (options === "Add an employee") {
        addEmployee();
      }

      if (options === "Add a role") {
        addRole();
      }

      if (options === "Update an employee") {
        updateEmployee();
      }

      if (options === "Delete an employee") {
        deleteEmployee();
      }

      if (options === "Exit") {
        connection.exitApp();
      }
    });
};

// view all departments in the database
viewDepartments = () => {
  var query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table("All Departments:", res);
    options();
  });
};

// view all employees in the database
viewEmployees = () => {
  var query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res.length + " employees found!");
    console.table("All Employees:", res);
    options();
  });
};

// view all roles in the database
viewRoles = () => {
  var query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table("All Roles:", res);
    options();
  });
};
