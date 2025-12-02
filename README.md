# Bruin Plan

Our project is an interactive 4-year planner that enables UCLA engineering students to plan out their degree. While the school provides a standard 4-year planning template for each major, we wanted to create a dynamic, online platform with an interactive GUI for students to easily manipulate their schedules.  Our application will have a drag-and-drop interface with interactive course cards to allow students to visually lay out their 4-year class plan.  Users will be required to create an account and log in so their information is saved across each session. 

Our website will also have a public bulletin board where students can anonymously share their 4-year plans for other students to view. The sample 4-year schedules provided by UCLA are outdated and generic, making them unhelpful for many students who are interested in looking for more diverse sample schedules. With our public bulletin board, students will be able to filter through posted schedules by major and observe a variety of sample 4-year plans.

## Technologies

Frontend: React, TypeScript, Tailwind CSS, Axios

Backend: Node.js, MySQL

Tests: Cucumber, Playwright, Jest

## Run the app
### Frontend
Clone the repository and install all dependencies.
```
git clone LINK
npm install
```

To run the frontend, run
```
npm run dev
```
The application should be hosted on http://localhost:5173/

### Backend
To run the backend, run
```
npm start
```
The server should be hosted on http://localhost:3001.

You must have MySQL installed and databases initialized correctly to run the application. Please refer to the MySQL section on directions for installation and initialization.

After setting up the local database, create a .env file with the following information:
```
# Database Credentials
DB_HOST=local_host
DB_USER=local_user
DB_PASSWORD=local_password
DB_NAME="bruin_plan"

# Playwright
BASE_URL=http://localhost:5173
AXIOS_URL=http://localhost:3001

# JWT
JWT_SECRET=local_jwt_secret
```

## MySQL

### Installation

#### macOS
You must have MySQL downloaded to run the database locally. To run MySQL locally on macOS, run the following commands

```
brew install mysql # Install MySQL
brew services start mysql # Start MySQL
mysql_secure_installation # Only needed on first run; secure the installation
```

Follow the instructions to securely configure MySQL on your local machine. To run MySQL, run 
```
mysql -u root -p
```

#### Linux
To run MySQL locally on Linux, run the following commands
```
sudo apt update # Update package list
sudo apt install mysql-server # Install MySQL
sudo mysql_secure_installation # Run MySQL secure installation script, only required on first run
mysql -u root -p # Log into MySQL
```

If password is not set through secure installation script, do the following:

```
mysql -u root # Sign into MySQL through built-in authentication
```

Through the MySQL server, run the following commands.
Make sure to update 'username' and 'password' to something secure.
```
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'new_username'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EXIT;

```

Log into MySQL as new user.
```
mysql -u new_username -p
```

### Datbase Initialization
Since our application runs on the local server, you must first initialize the database with a script. First create all of the tables.
```
mysql -u rot -p < database.sql
```

Then, add all of our scraped course data into the corresponding table.
```
mysql -u root -p < course_scraper.sql
```

### Setting up MySQL Connection
Create a .env file with the following information
```
DB_HOST=YOUR_LOCAL_HOST
DB_USER=YOUR_USER
DB_PASSWORD=YOUR_PASSWORD
DB_NAME="bruin_plan
```
Ensure DB_HOST, DB_USER, ad DB_PASSWORD are updated for your configuration.

Add .env to .gitignore
```
*.env
```

## Jest testing
To run and verify the Jest tests, run
```
npm test
```

## Cucumber testing
To run and verify the Cucumber tests, run
```
npx cucumber-js test
```

## Design Diagrams


## Use of GenAI
Most SQL queries in `backend/src/course_scraper.sql` was generated using GenAI. Real data on required courses for each major was fetched from seasoasa.ucla.edu (https://www.seasoasa.ucla.edu/curric-24-25/44-compsci-ugstd-24.html). The prompt used to generate the queries for scraping the courses were as follows:


Given this databse schema, how can I write a SQL script that scrapes the course name and number from this link: https://www.seasoasa.ucla.edu/curric-24-25/23-bioeng-ugstd-24.html

A similar prompt was used for all of the majors scraped in the `course_scraper.sql` script.
