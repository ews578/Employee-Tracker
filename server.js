const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();
console.log(process.env.PASSWORD)

// Connect to database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: process.env.PASSWORD,
    database: 'EMPLOYEE_DB'
  },
  console.log(`Connected to the employee_db database.`)
);

function menu() {
  inquirer.prompt({
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: ["view departments", "view roles", "view employees", "add department", "add role", "add employee", "update employee role"]
  })
    .then(res => {
      if (res.action === "view departments") {
        viewDepartments()
      };

      if (res.action === "view roles") {
        viewRoles()
      };

      if (res.action === "view employees") {
        viewEmployees()
      };

      if (res.action === "add department") {
        addDepartment()
      };

      if (res.action === "add role") {
        addRole()
      };
      if (res.action === "add employee"){
        addEmployee()
      };

      if (res.action === "update employee role") {
        updateRole()
      };
    })
}

function viewDepartments() {
  db.query(`SELECT id, department_name AS Departments FROM department`, (err, rows) => {
    if (err) {
      console.log(err)
      return;
    }

    console.table(rows)
    menu();
  })
};

function viewRoles() {
  const sql = `SELECT id, title AS Title, salary AS Salary, department_id AS Department FROM role`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err)
      return;
    }
    console.table(rows)
    menu();

  });
}
function viewEmployees() {
  const sql = `SELECT e.id, e.first_name AS First, e.last_name AS Last, r.title AS Title, d.department_name AS Department, r.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS Manager
    FROM employee e
    JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }

    console.table(rows);
    menu();
  });

}

// add new department
async function addDepartment() {
  const res = await inquirer.prompt([
    {
      type: 'input',
      message: 'What is the name of the new department?',
      name: 'departmentName'
    }
  ])

  let sql = `INSERT INTO department (department_name) VALUES (?)`;
  let params = [res.departmentName];

  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    };
    console.log('Great Success! Department added.')
    menu();
  });
}
// add new role
async function addRole() {
  const res = await inquirer.prompt([
    {
      type: 'input',
      message: "Enter the name of the new role",
      name: 'title'
    },

    {
      type: 'input',
      message: "Enter the salary for the new role",
      name: 'salary'
    },

    {
      type: 'input',
      message: 'Enter department ID',
      name: 'department_id'
    }
  ]);

  let sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
  let params = [res.title, res.salary, res.department_id];

  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    };
    console.log('Great Success! New role added')
    menu();
  });
}


//add employee
async function addEmployee() {
  const res = await inquirer.prompt([
    {
      type: 'input',
      message: 'What is the new employee first name',
      name: 'first_name'
    },

    {
      type: 'input',
      message: 'What is the new employee last name?',
      name: 'last_name'
    },
    {
      type: 'input',
      message: 'What is the new employee role ID?',
      name: 'role_id'
    },
    // {
    //   type: 'input',
    //   message: 'What department is employee asigned to?',
    //   name: "department_id"
    // },

    {
      type: 'input',
      message: "Who is the new employee's manager?",
      name: 'manager_id'
    }
  ]);

  let sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
  let params = Object.values(res)
  console.log(params)

  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    };
    console.log('Great Success! New employee added')
    menu();
  });
}

// update employee
async function updateRole() {
  db.query('SELECT * FROM employee', async (err, employee) => {
    if (err) {
      console.log(err);
      return;
    }

    const updateER = await inquirer.prompt ([
      {
        type: 'list',
        message: 'Please select an employee to update',
        choices: employee.map((e) => ({name: `${e.first_name} ${e.last_name}`, value: e.id })),
        name: 'employee_id'
      }
    ]);

    db.query('SELECT * FROM role', async (err, role) => {
      if (err) {
        console.log(err);
          return;
      }
      const updateRole = await inquirer.prompt([
        {
          type: 'list',
          message: 'Select the employee new role',
          choices: role.map((r) => ({ name: r.title, value: r.id})),
          name: 'role_id'
        }
      ]);
      db.query(
        'UPDATE employee SET role_id =? WHERE id =?',
        [updateRole.role_id, updateER.employee_id],
        (err,result) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log('Great Success! Employee role updated.')
          menu();
        }
      );
    });
  });
}





menu();