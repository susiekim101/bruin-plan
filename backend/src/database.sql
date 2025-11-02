CREATE DATABASE IF NOT EXISTS bruin_plan
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE bruin_plan;

CREATE TABLE Majors (
    major_id INT PRIMARY KEY AUTO_INCREMENT,
    major_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    major_id INT,
    FOREIGN KEY (major_id) REFERENCES Majors(major_id)
);

CREATE TABLE Courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_number VARCHAR(20) UNIQUE NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    course_units INT NOT NULL,
    category VARCHAR(50) NOT NULL,
    major_id INT,
    FOREIGN KEY (major_id) REFERENCES Majors(major_id)
);

CREATE TABLE User_Plans (
    plan_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    major_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (major_id) REFERENCES Majors(major_id)
);

CREATE TABLE Plan_Items (
    plan_item_id INT PRIMARY KEY AUTO_INCREMENT,
    plan_id INT,
    course_id INT,
    year INT NOT NULL,
    quarter ENUM('Fall', 'Winter', 'Spring', 'Summer') NOT NULL,
    status ENUM('Planned', 'Completed', 'In Progress'),
    FOREIGN KEY (plan_id) REFERENCES User_Plans(plan_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);