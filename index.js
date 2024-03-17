const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();
console.log(process.env.PASSWORD)

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: process.env.PASSWORD,
      database: 'EMPLOYEE_DB'
    },
    console.log(`Connected to the employee_db database.`)
  );

  function menu (){
    inquirer.prompt ({
        type:"list",
        name:"action",
        message: "What would you like to do?",
        choices: ["view departments","view roles","view employees", "add department", "add role","add employee","update employee role"]
    })
    .then(res =>{
        if (res.action === "view departments"){
            viewDepartments ()
        };

        if (res.action === "view roles"){
          viewRoles ()
        };

        if (res.action === "view employees"){
          viewEmployees ()
        };

        if (res.action === "add department") {
          addDepartment ()
        };

        if (res.action === "add role") {
          addRole ()
        };

        if (res.action === "update employee role"){
          updateRole ()
        };
    })
  }

  function viewDepartments(){
    db.query("SELECT * FROM department", (err,data)=>{
        console.table(data)
        menu()
    })
  };

  function viewRoles () {
    db.query ("SELECT * FROM role" , (err, data)=> {
      console.table(data)
      menu()
    })
  };

  function viewEmployees () {
    db.query ("SELECT * FROM employee", (err, data) =>{
      console.table(data)
      menu ()
    })
  };

  // add new department
  



  menu()