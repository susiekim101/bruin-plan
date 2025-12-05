# Bruin Plan

Our project is an interactive 4-year planner that enables UCLA engineering students to plan out their degree. While the school provides a standard 4-year planning template for each major, we wanted to create a dynamic, online platform with an interactive GUI for students to easily manipulate their schedules.  Our application will have a drag-and-drop interface with interactive course cards to allow students to visually lay out their 4-year class plan.  Users will be required to create an account and log in so their information is saved across each session. 

Our website will also have a public bulletin board where students can anonymously share their 4-year plans for other students to view. The sample 4-year schedules provided by UCLA are outdated and generic, making them unhelpful for many students who are interested in looking for more diverse sample schedules. With our public bulletin board, students will be able to filter through posted schedules by major and observe a variety of sample 4-year plans.

With Bruin Plan, you will be able to

📝 Create your 4-year plan containing of all major-required courses <br>
✅ Mark a course as "Planned", "In Progress", or "Completed" <br>
⏰ Track the number of units completed for each quarter and for all 4-years <br>
👤 Share your plan anonymously for other users to browse <br>
💡 View other anonymously shared plans for inspiration <br>
👁️ Browse public plans even if you don't have an account! <br>

❗️ The minimum unit threshold to post your plan has been set to 30 for testing purposes. Ideally, this would be set to 180 so plans that do not meet the graduation requirement are not shared.

## Technologies

Frontend: React, Vite, TypeScript, Tailwind CSS, Axios

Backend: Node.js, Express, MySQL

Tests: Cucumber, Playwright, Jest

## Run the app
### Frontend
Clone the repository and install all dependencies.
```
git clone https://github.com/susiekim101/bruin-plan.git
cd bruin-plan
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
Since our application runs on the local server, you must first initialize the database with a script. The scripts will 1) Initialize all tables 2) Initialize the Courses table with relevant course data and 3) Initialize Users, User_Plans, and Plan_Items with dummy user data to see posts on the public page.
```
cd backend/src
mysql -u root -p < database.sql
mysql -u root -p < course_scraper.sql
mysql -u root -p < dummy_users.sql
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
### Course Data
The SQL queries in `backend/src/course_scraper.sql` was generated using GenAI. Real data on required courses for each major was fetched from seasoasa.ucla.edu. The prompt used to generate the queries for scraping the courses were as follows:
```
  I want to initialize my MySQL database with course data fetched from the UCLA course catalog. I will give you the table and its fields for which you will generate SQL queries to insert each course into the table. Please add the following courses to the table, where the major_id is referenced using @bioe_major_id, the category is either "Major" or "Elective" and the course_units is extracted from the UCLA course catalog. Assume the category is "Major" unless otherwise specified.

  Courses table:
  +---------------+--------------+------+-----+---------+----------------+
  | Field         | Type         | Null | Key | Default | Extra          |
  +---------------+--------------+------+-----+---------+----------------+
  | course_id     | int          | NO   | PRI | NULL    | auto_increment |
  | course_number | varchar(20)  | NO   |     | NULL    |                |
  | course_name   | varchar(255) | NO   |     | NULL    |                |
  | course_units  | int          | YES  |     | NULL    |                |
  | category      | varchar(50)  | YES  |     | NULL    |                |
  | major_id      | int          | YES  | MUL | NULL    |                |
  +---------------+--------------+------+-----+---------+----------------+  

  Courses data: 
  Complete the following course: 
  BIOENGR 10 - Introduction to Bioengineering 
  Chemistry 
  Complete the following six courses: 
  
  CHEM 20A - Chemical Structure 
  CHEM 20B - Chemical Energetics and Change 
  CHEM 20L - General Chemistry Laboratory 
  ... 
```
The same prompt was used for all of the majors scraped in the `course_scraper.sql` script.

### Dummy Users
For the purposes of testing, we initialize our tables with user data so there are plans to view on the Public Page.
