const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

require("dotenv").config();

// creates connection to sql database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee_db",
});

// connects to sql server and sql database
connection.connect((err) => {
  if (err) throw err;
  postConnection();
});

postConnection = () => {
  console.log("***********************************");
  console.log("********|~~~~~~~~~~~~~~~~~~|*******");
  console.log("********| EMPLOYEE TRACKER |*******");
  console.log("********|~~~~~~~~~~~~~~~~~~|*******");
  console.log("***********************************");
  options();
};

// prompts user with list of options to choose from
const options = () => {
  inquirer
    .prompt([
      {
        name: "options",
        type: "list",
        message: "Welcome to our employee database! What would you like to do?",
        choices: [
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
        exitApp();
      }
    });
};

// view all departments in the database
viewDepartments = () => {
  var query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table("All Departments:", res);
    options();
  });
};

// view all employees in the database
viewEmployees = () => {
  var query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log(res.length + " employees found!");
    console.table("All Employees:", res);
    options();
  });
};

// view all roles in the database
viewRoles = () => {
  var query = "SELECT * FROM roles";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table("All Roles:", res);
    options();
  });
};
// add an employee to the database
addEmployee = () => {
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "Please enter the employee's fist name? ",
        },
        {
          name: "last_name",
          type: "input",
          message: "Please enter the employee's last name? ",
        },
        {
          name: "employee_id",
          type: "input",
          message: "Please enter the employee's ID? ",
        },
        {
          name: "role",
          type: "list",
          choices: () => {
            var roleArray = [];
            for (let i = 0; i < res.length; i++) {
              roleArray.push(res[i].title);
            }
            return roleArray;
          },
          message: "What is the employee's role? ",
        },
      ])
      .then((answer) => {
        let role_id;
        for (let i = 0; i < res.length; i++) {
          if (res[a].title == answer.role) {
            role_id = res[i].id;
            console.log(role_id);
          }
        }
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            employee_id: answer.employee_id,
            role_id: role_id,
          }.then((err) => {
            if (err) throw err;
            console.log("Employee successfully added!");
            options();
          })
        );
      });
  });
};

// add a department to the database
addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "Which department would you like to add?",
      },
    ])
    .then((answer) => {
      connection.query("INSERT INTO department SET ?", {
        name: answer.newDepartment,
      });
      var query = "SELECT * FROM department";
      connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("Department successfully added!");
        console.table("All Departments:", res);
        options();
      });
    });
};

// add a role to the database
(addRole = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "new_role",
          type: "input",
          message: "What new role would you like to add?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of this role? (Enter a number)",
        },
        {
          name: "Department",
          type: "list",
          choices: () => {
            var deptArray = [];
            for (let i = 0; i < res.length; i++) {
              deptArray.push(res[i].name);
            }
            return deptArray;
          },
        },
      ])
      .then((answer) => {
        let department_id;
        for (let i = 0; i < res.length; i++) {
          if (res[i].name == answer.Department) {
            department_id = res[i].id;
          }
        }

        connection.query(
          "INSERT INTO roles SET ?",
          {
            title: answer.new_role,
            salary: answer.salary,
            department_id: department_id,
          },
          (err, res) => {
            if (err) throw err;
            console.log("Role successfully added!");
            console.table("All Roles:", res);
            options();
          }
        );
      });
  });
}),
  // update a role in the database
  function updateRole() {};

//  delete an employee
function deleteEmployee() {}

// exit the app
function exitApp() {
  connection.end();
}
