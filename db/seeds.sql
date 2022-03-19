USE employee_db;

INSERT INTO department (name)
VALUES 
('Information Technology'),
('Finance'),
('Legal'),
('Sales'),
('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES
('Web Developer', 90000, 1),
('Financial Controller', 110000, 2),
('Paralegal', 60000, 3),
('Sales Manager', 70000, 4),
('HR Manager', 50000, 5),
('Software Engineer', 120000, 1),
('Finance Controller', 70000, 2),
('Compliance Manager', 100000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Rizwan', 'Ashraf', 1, 86),
('Lewis', 'Hamilton', 2, 44),
('Cristiano', 'Ronaldo', 3, 07),
('Imran', 'Khan', 4, 17),
('Mike', 'Tyson', 5, 50),
('Michael', 'Jordan', 6, 23),
('Khabib', 'Nurmagomedov', 7, 29),
('Tiger', 'Woods', 8, 82);