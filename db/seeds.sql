USE employees_db;

INSERT INTO department (name)
VALUES 
('Information Technology'),
('Finance'),
('Legal'),
('Sales'),
('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES
('Web Developer', 90000, 1),
('Senior Accountant', 110000, 2),
('Paralegal', 60000, 3),
('Sales Manager', 70000, 4),
('HR Manager', 50000, 5),
('Software Engineer', 120000, 1),
('Finance Controller', 70000, 2);
