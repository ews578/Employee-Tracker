DROP DATABASE EMPLOYEE_DB;
CREATE DATABASE EMPLOYEE_DB;
USE EMPLOYEE_DB;

CREATE TABLE department (
    id      INT             NOT NULL    PRIMARY KEY     AUTO_INCREMENT,
    department_name    VARCHAR (30)    NOT NULL
);

CREATE TABLE role (
    id              INT             NOT NULL     PRIMARY KEY     AUTO_INCREMENT,
    title           VARCHAR(30)     NOT NULL,
    salary          DECIMAL         NOT NULL,
    department_id   INT,
    FOREIGN KEY (department_id) references department(id)
);

CREATE TABLE employee (
    id              INT                 PRIMARY KEY     AUTO_INCREMENT,
    first_name      VARCHAR(30)     NOT NULL,   
    last_name       VARCHAR(30)     NOT NULL,
    role_id         INT,   
    manager_id      INT,          
    FOREIGN KEY (role_id) 
    references role(id),

    
    FOREIGN KEY (manager_id) 
    references employee(id) 
);