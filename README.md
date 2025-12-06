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

## Design Diagrams
### Sequence Diagrams
This sequence diagram models the interaction of a user creating an account for the first time. The user's data is inserted into the database and if the query is successful, the server will return a token for the user. Otherwise, if the query fails because the user's account already exists or the server failed to connect to the database, then a token is not issued.
<img width="1320" height="1362" alt="CS35L Design Diagram - Sign Up (1)" src="https://github.com/user-attachments/assets/bff26c69-a3a5-48e9-9c04-3aea5e8ea8a7" />

This sequence diagram models the interaction of a user logging in. The user will first enter their credentials, which will make a query into the database to find the user. Once the user is found, the user's password will be validated with the hashed password stored in the database. If the credentials match, the server will return a successful status code and return a new token for the user. If the credentials don't match, then a token will not be generated and return an unsuccessful status code.
<img width="1320" height="1362" alt="CS35L Design Diagram - Log In (1)" src="https://github.com/user-attachments/assets/011f211b-64fd-48bc-9da6-235bfa86c97a" />

The following 2 sequence diagrams model the interaction of a logged-in user landing on the dashboard. 

Display user's major
After authentication, the user's major ID will be retrieved from the JWT payload and used to query the database for the corresponding major name. If the query succeeds, then the server returns a successful status code, and the name of the user's major will be displayed on the sidebar. If the query fails, either because no such major exists for the given major ID or because the server failed to connect to the database, then the server returns an unsuccessful status code, and the user will not see their major displayed on the sidebar.
<img width="1540" height="1579" alt="CS35L Design Diagram - UserMajorDisplay" src="https://github.com/user-attachments/assets/2c7769af-916e-4014-8b00-342da40f00fc" />

Display courses in sidebar
The user's ID is used to map to their plan ID in order to query the database for their plan items. If the query succeeds, then the server sends a successful status code along with the user's courses; otherwise, the server sends an unsuccessful status code and an empty array. The user's major ID is used to query the database for all courses with given major ID. If the query succeeds, then the server sends a successful status code and the major courses; otherwise, the server sends an unsuccessful status code and an empty array. Then, if the user has selected a major different from their major, then the corresponding courses for that major will be displayed; otherwise, the courses corresponding to the user's major will be displayed. Furthermore, the user's courses will not be displayed.
<img width="1760" height="2518" alt="CS35L Design Diagram - CoursesDisplay" src="https://github.com/user-attachments/assets/71880ef6-0f51-4dfd-8e6c-8596643e7162" />

### Entity Relationship Diagram
The entity relationship diagram models how data is stored in our MySQL database. The database stored user data and their plans. Each course in a user's plan is identified as a plan item.
<img width="1820" height="940" alt="CS35L Design Diagram - ER" src="https://github.com/user-attachments/assets/3e4cc66e-14fe-40a6-8044-43e1c9e02e06" />

### Component Diagram
The component diagram shows how the frontend, backend, and database interact. The public contract for the backend is in the form of API endpoints as illustrated by the connectors. The interface that the backend uses to interact with the database is the SQL queries.
<img width="1220" height="447" alt="CS35L Design Diagram - Component (1)" src="https://github.com/user-attachments/assets/3f3ed7f9-d68b-433b-9ff2-dea419843acc" />


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
Since our application runs on the local server, you must first initialize the database with a script. The scripts will 1) initialize all tables 2) initialize the Courses table with relevant course data and 3) initialize Users, User_Plans, and Plan_Items with dummy user data to see posts on the public page.
```
cd backend/src
mysql -u root -p < database.sql
mysql -u root -p < course_scraper.sql
mysql -u root -p < dummy_users.sql
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
