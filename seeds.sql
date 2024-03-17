USE EMPLOYEE_DB;

INSERT INTO department (name) 
VALUES ("sales"),
("install"),
("service");

INSERT INTO role (title,salary,department_id) 
VALUES ("manager",75000,1),
("Lead Install",60000,2),
("Lead Service",60000,3);

INSERT INTO employee (first_name,last_name,role_id)
VALUES ("Tommy","Chong",1),
("Cheech","Marion",1);
INSERT INTO employee (first_name,last_name,role_id,manager_id) 
VALUES ("John","Sanders",1,1),
("Leroy","Jenkins",2, 2),
("John B", "Goode",3,2);
