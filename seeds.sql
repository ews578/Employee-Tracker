USE EMPLOYEE_DB;

INSERT INTO department (name) VALUES ("sales");

INSERT INTO role (title,salary,department_id) VALUES ("manager",60000,1);

INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ("John","Sanders",1,NULL);
