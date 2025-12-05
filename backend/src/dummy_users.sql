USE bruin_plan;
-- Temporarily disable foreign key constraints and unique checks to allow clean insertion
-- into tables that might reference each other.
SET FOREIGN_KEY_CHECKS = 0;
SET UNIQUE_CHECKS = 0;

TRUNCATE TABLE Users;
TRUNCATE TABLE User_Plans;
TRUNCATE TABLE Plan_Items;

-- --------------------------------------------------------
-- 1. INSERT DATA INTO Users TABLE (AUTO_INCREMENT for user_id)
-- --------------------------------------------------------

-- Inserting 5 user records. The user_id is automatically generated.
INSERT INTO Users (first_name, last_name, email, password_hash, major_id) VALUES
('Joe', 'Bruin', 'joebruin@gmail.com', '$2b$10$fAc8uSqQ.mVaG7hxrmCr6uR/QPg/ugFip6pI36/1PEpHKCaoRMuXW', 3);
SET @user_joe = LAST_INSERT_ID(); -- Capture the new ID for Joe Bruin (Original ID 22)

INSERT INTO Users (first_name, last_name, email, password_hash, major_id) VALUES
('Hello', 'Hello', 'test@email.com', '$2b$10$68MqzTZWOdagoqB/FmZ31u.Q3KJCvMkCxWlQiRgBqeYoYlmsXNPr2', 1);
SET @user_hello_1 = LAST_INSERT_ID(); -- Capture the new ID for first Hello Hello (Original ID 23)

INSERT INTO Users (first_name, last_name, email, password_hash, major_id) VALUES
('Anon', 'hello', 'test@example.com', '$2b$10$rytkdybobB1c8ZcRN8fgWe7Wk6qsUgU5xKQxVgfmJEBoqvAYqlq/S', 4);
SET @user_anon = LAST_INSERT_ID(); -- Capture the new ID for Anon hello (Original ID 24)

INSERT INTO Users (first_name, last_name, email, password_hash, major_id) VALUES
('Hello', 'Hello', 'test@examplee.com', '$2b$10$7okZ.twLkp44v2lojGKVtOAycTHfAUp0AEycNGVQVQCk7EoEBLRRm', 2);
SET @user_hello_2 = LAST_INSERT_ID(); -- Capture the new ID for second Hello Hello (Original ID 25)

INSERT INTO Users (first_name, last_name, email, password_hash, major_id) VALUES
('Cucumber', 'Test', 'testuser@ucla.edu', '$2b$10$MqvEM.v8Dnbk3kpKEcGjqOcO4CS4Pn/NvvWsMT.XoIkEogd6nqIrG', 3);
SET @user_cucumber = LAST_INSERT_ID(); -- Capture the new ID for Cucumber Test (Original ID 26)
-- --------------------------------------------------------
-- 2. INSERT DATA INTO User_Plans TABLE (AUTO_INCREMENT for plan_id)
-- --------------------------------------------------------

-- Inserting 5 plan records, referencing the newly generated user_id values.
INSERT INTO User_Plans (user_id, major_id, is_shared) VALUES
(@user_joe, 3, 1); -- Joe Bruin's plan
SET @plan_joe = LAST_INSERT_ID(); -- Capture the new ID for Plan (Original ID 5)

INSERT INTO User_Plans (user_id, major_id, is_shared) VALUES
(@user_hello_1, 1, 1); -- First Hello Hello's plan
SET @plan_hello_1 = LAST_INSERT_ID(); -- Capture the new ID for Plan (Original ID 6)

INSERT INTO User_Plans (user_id, major_id, is_shared) VALUES
(@user_anon, 4, 1); -- Anon hello's plan
SET @plan_anon = LAST_INSERT_ID(); -- Capture the new ID for Plan (Original ID 7)

INSERT INTO User_Plans (user_id, major_id, is_shared) VALUES
(@user_hello_2, 2, 1); -- Second Hello Hello's plan
SET @plan_hello_2 = LAST_INSERT_ID(); -- Capture the new ID for Plan (Original ID 8)

INSERT INTO User_Plans (user_id, major_id, is_shared) VALUES
(@user_cucumber, 3, 0); -- Cucumber Test's plan
SET @plan_cucumber = LAST_INSERT_ID(); -- Capture the new ID for Plan (Original ID 9)

-- --------------------------------------------------------
-- 3. INSERT DATA INTO Plan_Items TABLE (AUTO_INCREMENT for plan_item_id)
-- --------------------------------------------------------

-- Inserting 63 plan item records, referencing the newly generated plan_id values.
INSERT INTO Plan_Items (plan_id, course_id, year, quarter, status) VALUES
-- Plan for Joe Bruin (Original Plan ID 5, now @plan_joe) - 9 Items
(@plan_joe, 216, 1, 'Spring', 'Planned'),
(@plan_joe, 218, 1, 'Spring', 'Planned'),
(@plan_joe, 215, 1, 'Summer', 'Planned'),
(@plan_joe, 39, 1, 'Winter', 'Completed'),
(@plan_joe, 42, 1, 'Winter', 'Completed'),
(@plan_joe, 102, 3, 'Winter', 'Planned'),
(@plan_joe, 99, 1, 'Fall', 'Planned'),
(@plan_joe, 103, 1, 'Winter', 'Completed'),
(@plan_joe, 96, 1, 'Winter', 'Completed'),

-- Plan for First Hello Hello (Original Plan ID 6, now @plan_hello_1) - 11 Items
(@plan_hello_1, 128, 1, 'Summer', 'Planned'),
(@plan_hello_1, 131, 1, 'Spring', 'Planned'),
(@plan_hello_1, 137, 1, 'Winter', 'Planned'),
(@plan_hello_1, 138, 1, 'Spring', 'Planned'),
(@plan_hello_1, 136, 2, 'Summer', 'Planned'),
(@plan_hello_1, 140, 2, 'Spring', 'Planned'),
(@plan_hello_1, 130, 3, 'Summer', 'Planned'),
(@plan_hello_1, 129, 3, 'Spring', 'Planned'),
(@plan_hello_1, 134, 3, 'Winter', 'Planned'),
(@plan_hello_1, 142, 3, 'Spring', 'Planned'),
(@plan_hello_1, 146, 3, 'Summer', 'Planned'),

-- Plan for Anon hello (Original Plan ID 7, now @plan_anon) - 16 Items
(@plan_anon, 86, 1, 'Summer', 'Planned'),
(@plan_anon, 88, 1, 'Spring', 'Planned'),
(@plan_anon, 90, 1, 'Winter', 'Planned'),
(@plan_anon, 89, 1, 'Winter', 'Planned'),
(@plan_anon, 93, 2, 'Winter', 'Planned'),
(@plan_anon, 92, 2, 'Spring', 'Planned'),
(@plan_anon, 87, 2, 'Winter', 'Planned'),
(@plan_anon, 94, 2, 'Fall', 'Planned'),
(@plan_anon, 95, 3, 'Fall', 'Planned'),
(@plan_anon, 97, 3, 'Winter', 'Planned'),
(@plan_anon, 103, 3, 'Winter', 'Planned'),
(@plan_anon, 102, 3, 'Spring', 'Planned'),
(@plan_anon, 104, 4, 'Winter', 'Planned'),
(@plan_anon, 101, 4, 'Spring', 'Planned'),
(@plan_anon, 109, 4, 'Winter', 'Planned'),
(@plan_anon, 111, 4, 'Fall', 'Planned'),

-- Plan for Second Hello Hello (Original Plan ID 8, now @plan_hello_2) - 17 Items
(@plan_hello_2, 2, 1, 'Winter', 'Planned'),
(@plan_hello_2, 1, 1, 'Spring', 'Planned'),
(@plan_hello_2, 5, 1, 'Winter', 'Planned'),
(@plan_hello_2, 7, 1, 'Fall', 'Planned'),
(@plan_hello_2, 4, 2, 'Spring', 'Planned'),
(@plan_hello_2, 3, 2, 'Spring', 'Planned'),
(@plan_hello_2, 8, 2, 'Winter', 'Planned'),
(@plan_hello_2, 10, 2, 'Winter', 'Planned'),
(@plan_hello_2, 9, 2, 'Fall', 'Planned'),
(@plan_hello_2, 20, 3, 'Summer', 'Planned'),
(@plan_hello_2, 19, 3, 'Winter', 'Planned'),
(@plan_hello_2, 21, 3, 'Spring', 'Planned'),
(@plan_hello_2, 18, 3, 'Fall', 'Planned'),
(@plan_hello_2, 23, 3, 'Winter', 'Planned'),
(@plan_hello_2, 31, 4, 'Winter', 'Planned'),
(@plan_hello_2, 32, 4, 'Spring', 'Planned'),
(@plan_hello_2, 33, 4, 'Winter', 'Planned'),
(@plan_hello_2, 30, 4, 'Spring', 'Planned'),
(@plan_hello_2, 34, 4, 'Fall', 'Planned'),

-- Plan for Cucumber Test (Original Plan ID 9, now @plan_cucumber) - 7 Items
(@plan_cucumber, 86, 1, 'Spring', 'Planned'),
(@plan_cucumber, 89, 1, 'Winter', 'Planned'),
(@plan_cucumber, 90, 2, 'Spring', 'Planned'),
(@plan_cucumber, 92, 2, 'Winter', 'Planned'),
(@plan_cucumber, 91, 2, 'Fall', 'Planned'),
(@plan_cucumber, 93, 3, 'Winter', 'Planned'),
(@plan_cucumber, 94, 4, 'Fall', 'Planned');

-- --------------------------------------------------------
-- 4. Re-enable Checks
-- --------------------------------------------------------

-- Re-enable constraints and checks (important for data integrity after initialization)
SET UNIQUE_CHECKS = 1;
SET FOREIGN_KEY_CHECKS = 1;