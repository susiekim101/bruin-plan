USE bruin_plan

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE Courses;
TRUNCATE TABLE Majors;

INSERT INTO Majors (major_name) VALUES ('Bioengineering');
SET @bioe_major_id = LAST_INSERT_ID();

INSERT INTO Majors (major_name) VALUES ('Computer Engineering');
SET @ce_major_id = LAST_INSERT_ID();

INSERT INTO Majors (major_name) VALUES ('Computer Science');
SET @cs_major_id = LAST_INSERT_ID();

INSERT INTO Majors (major_name) VALUES ('Computer Science and Engineering');
SET @cse_major_id = LAST_INSERT_ID();

INSERT INTO Majors (major_name) VALUES ('Electrical Engineering');
SET @ee_major_id = LAST_INSERT_ID();

-- -----------------------------------------------------
-- 3. INSERT COURSES: COMPUTER ENGINEERING (CE)
-- -----------------------------------------------------
INSERT INTO Courses (course_number, course_name, course_units, category, major_id) VALUES
-- Preparation for the Major
('CHEM 20A', 'Chemical Structure', 4, 'Major', @ce_major_id),
('COM SCI 31', 'Introduction to Computer Science I', 4, 'Major', @ce_major_id),
('COM SCI 32', 'Introduction to Computer Science II', 4, 'Major', @ce_major_id),
('COM SCI 33', 'Introduction to Computer Organization', 5, 'Major', @ce_major_id),
('COM SCI 35L', 'Software Construction', 4, 'Major', @ce_major_id),
('COM SCI M51A', 'Logic Design of Digital Systems', 4, 'Major', @ce_major_id),
('EC ENGR M16', 'Logic Design of Digital Systems', 4, 'Major', @ce_major_id),
('EC ENGR 3', 'Introduction to Electrical Engineering', 4, 'Major', @ce_major_id),
('MATH 31A', 'Differential and Integral Calculus', 4, 'Major', @ce_major_id),
('MATH 31B', 'Integration and Infinite Series', 4, 'Major', @ce_major_id),
('MATH 32A', 'Calculus of Several Variables', 4, 'Major', @ce_major_id),
('MATH 32B', 'Calculus of Several Variables', 4, 'Major', @ce_major_id),
('MATH 33A', 'Linear Algebra and Applications', 4, 'Major', @ce_major_id),
('MATH 33B', 'Differential Equations', 4, 'Major', @ce_major_id),
('MATH 61', 'Introduction to Discrete Structures', 4, 'Major', @ce_major_id),
('PHYSICS 1A', 'Physics for Scientists and Engineers: Mechanics', 5, 'Major', @ce_major_id),
('PHYSICS 1B', 'Physics for Scientists and Engineers: Oscillations, Waves, Electric and Magnetic Fields', 5, 'Major', @ce_major_id),
('PHYSICS 1C', 'Physics for Scientists and Engineers: Electrodynamics, Optics, and Special Relativity', 5, 'Major', @ce_major_id),
('PHYSICS 4AL', 'Physics Laboratory for Scientists and Engineers: Mechanics', 2, 'Major', @ce_major_id),
('PHYSICS 4BL', 'Physics Laboratory for Scientists and Engineers: Electricity and Magnetism', 2, 'Major', @ce_major_id),
-- Major Field Courses
('COM SCI 111', 'Operating Systems Principles', 5, 'Major', @ce_major_id),
('COM SCI 180', 'Introduction to Algorithms and Complexity', 4, 'Major', @ce_major_id),
('COM SCI 118', 'Computer Network Fundamentals', 4, 'Major', @ce_major_id),
('EC ENGR 132B', 'Data Communications and Telecommunication Networks', 4, 'Major', @ce_major_id),
('COM SCI M151B', 'Computer Systems Architecture', 4, 'Major', @ce_major_id),
('EC ENGR M116C', 'Computer Systems Architecture', 4, 'Major', @ce_major_id),
('COM SCI M152A', 'Introductory Digital Design Laboratory', 2, 'Major', @ce_major_id),
('EC ENGR M116L', 'Introductory Digital Design Laboratory', 2, 'Major', @ce_major_id),
('EC ENGR 100', 'Electrical and Electronic Circuits', 4, 'Major', @ce_major_id),
('EC ENGR 102', 'Systems and Signals', 4, 'Major', @ce_major_id),
('EC ENGR 113', 'Digital Signal Processing', 4, 'Major', @ce_major_id),
('EC ENGR 115C', 'Digital Electronic Circuits', 4, 'Major', @ce_major_id),
('C&EE 110', 'Introduction to Probability and Statistics for Engineers', 4, 'Major', @ce_major_id),
('EC ENGR 131A', 'Probability and Statistics', 4, 'Major', @ce_major_id),
('MATH 170A', 'Probability Theory I', 4, 'Major', @ce_major_id),
('MATH 170E', 'Introduction to Probability and Statistics 1: Probability', 4, 'Major', @ce_major_id),
('STATS 100A', 'Introduction to Probability', 4, 'Major', @ce_major_id);

-- -----------------------------------------------------
-- 4. INSERT COURSES: COMPUTER SCIENCE (CS)
-- -----------------------------------------------------
INSERT INTO Courses (course_number, course_name, course_units, category, major_id) VALUES
-- Preparation for the Major
('COM SCI 1', 'Freshman Computer Science Seminar', 1, 'Major', @cs_major_id),
('COM SCI 31', 'Introduction to Computer Science I', 4, 'Major', @cs_major_id),
('COM SCI 32', 'Introduction to Computer Science II', 4, 'Major', @cs_major_id),
('COM SCI 33', 'Introduction to Computer Organization', 5, 'Major', @cs_major_id),
('COM SCI 35L', 'Software Construction', 4, 'Major', @cs_major_id),
('COM SCI M51A', 'Logic Design of Digital Systems', 4, 'Major', @cs_major_id),
('EC ENGR M16', 'Logic Design of Digital Systems', 4, 'Major', @cs_major_id),
('MATH 31A', 'Differential and Integral Calculus', 4, 'Major', @cs_major_id),
('MATH 31B', 'Integration and Infinite Series', 4, 'Major', @cs_major_id),
('MATH 32A', 'Calculus of Several Variables', 4, 'Major', @cs_major_id),
('MATH 32B', 'Calculus of Several Variables', 4, 'Major', @cs_major_id),
('MATH 33A', 'Linear Algebra and Applications', 4, 'Major', @cs_major_id),
('MATH 33B', 'Differential Equations', 4, 'Major', @cs_major_id),
('MATH 61', 'Introduction to Discrete Structures', 4, 'Major', @cs_major_id),
('PHYSICS 1A', 'Physics for Scientists and Engineers: Mechanics', 5, 'Major', @cs_major_id),
('PHYSICS 1B', 'Physics for Scientists and Engineers: Oscillations, Waves, Electric and Magnetic Fields', 5, 'Major', @cs_major_id),
('PHYSICS 1C', 'Physics for Scientists and Engineers: Electrodynamics, Optics, and Special Relativity', 5, 'Major', @cs_major_id),
('PHYSICS 4AL', 'Physics Laboratory for Scientists and Engineers: Mechanics', 2, 'Major', @cs_major_id),
('PHYSICS 4BL', 'Physics Laboratory for Scientists and Engineers: Electricity and Magnetism', 2, 'Major', @cs_major_id),
-- Major Field Courses
('COM SCI 111', 'Operating Systems Principles', 5, 'Major', @cs_major_id),
('COM SCI 118', 'Computer Network Fundamentals', 4, 'Major', @cs_major_id),
('COM SCI 131', 'Programming Languages', 4, 'Major', @cs_major_id),
('COM SCI 180', 'Introduction to Algorithms and Complexity', 4, 'Major', @cs_major_id),
('COM SCI 181', 'Theory of Computing', 4, 'Major', @cs_major_id),
('COM SCI M151B', 'Computer Systems Architecture', 4, 'Major', @cs_major_id),
('EC ENGR M116C', 'Computer Systems Architecture', 4, 'Major', @cs_major_id),
('COM SCI M152A', 'Introductory Digital Design Laboratory', 2, 'Major', @cs_major_id),
('EC ENGR M116L', 'Introductory Digital Design Laboratory', 2, 'Major', @cs_major_id),
('C&EE 110', 'Introduction to Probability and Statistics for Engineers', 4, 'Major', @cs_major_id),
('EC ENGR 131A', 'Probability and Statistics', 4, 'Major', @cs_major_id),
('MATH 170A', 'Probability Theory I', 4, 'Major', @cs_major_id),
('MATH 170E', 'Introduction to Probability and Statistics 1: Probability', 4, 'Major', @cs_major_id),
('STATS 100A', 'Introduction to Probability', 4, 'Major', @cs_major_id),
-- Capstone
('COM SCI 130', 'Software Engineering', 4, 'Major', @cs_major_id),
('COM SCI 152B', 'Digital Design Project Laboratory', 4, 'Major', @cs_major_id),
-- Electives (Partial list from catalog)
('COM SCI 132', 'Compiler Construction', 4, 'Major', @cs_major_id),
('COM SCI 117', 'Computer Network Security', 4, 'Major', @cs_major_id),
('COM SCI 133', 'Parallel and Distributed Computing', 4, 'Major', @cs_major_id),
('COM SCI 136', 'Introduction to Computer Security', 4, 'Major', @cs_major_id),
('COM SCI 143', 'Database Systems', 4, 'Major', @cs_major_id),
('COM SCI 144', 'Web Applications', 4, 'Major', @cs_major_id),
('COM SCI 145', 'Introduction to Data Mining', 4, 'Major', @cs_major_id),
('COM SCI M146', 'Introduction to Machine Learning', 4, 'Major', @cs_major_id),
('COM SCI 161', 'Fundamentals of Artificial Intelligence', 4, 'Major', @cs_major_id),
('COM SCI 188', 'Human-Computer Interaction', 4, 'Major', @cs_major_id),
-- Science & Technology
('CHEM 20B', 'Chemical Energetics and Change', 4, 'Major', @cs_major_id),
('CHEM 30A', 'Organic Chemistry I: Structure and Reactivity', 4, 'Major', @cs_major_id),
('LIFESCI 7A', 'Cell and Molecular Biology', 5, 'Major', @cs_major_id);


-- -----------------------------------------------------
-- 5. INSERT COURSES: COMPUTER SCIENCE & ENGINEERING (CSE)
-- -----------------------------------------------------
INSERT INTO Courses (course_number, course_name, course_units, category, major_id) VALUES
-- Preparation for the Major
('COM SCI 1', 'Freshman Computer Science Seminar', 1, 'Major', @cse_major_id),
('COM SCI 31', 'Introduction to Computer Science I', 4, 'Major', @cse_major_id),
('COM SCI 32', 'Introduction to Computer Science II', 4, 'Major', @cse_major_id),
('COM SCI 33', 'Introduction to Computer Organization', 5, 'Major', @cse_major_id),
('COM SCI 35L', 'Software Construction', 4, 'Major', @cse_major_id),
('EC ENGR 3', 'Introduction to Electrical Engineering', 4, 'Major', @cse_major_id),
('MATH 31A', 'Differential and Integral Calculus', 4, 'Major', @cse_major_id),
('MATH 31B', 'Integration and Infinite Series', 4, 'Major', @cse_major_id),
('MATH 32A', 'Calculus of Several Variables', 4, 'Major', @cse_major_id),
('MATH 32B', 'Calculus of Several Variables', 4, 'Major', @cse_major_id),
('MATH 33A', 'Linear Algebra and Applications', 4, 'Major', @cse_major_id),
('MATH 33B', 'Differential Equations', 4, 'Major', @cse_major_id),
('MATH 61', 'Introduction to Discrete Structures', 4, 'Major', @cse_major_id),
('PHYSICS 1A', 'Physics for Scientists and Engineers: Mechanics', 5, 'Major', @cse_major_id),
('PHYSICS 1B', 'Physics for Scientists and Engineers: Oscillations, Waves, Electric and Magnetic Fields', 5, 'Major', @cse_major_id),
('PHYSICS 1C', 'Physics for Scientists and Engineers: Electrodynamics, Optics, and Special Relativity', 5, 'Major', @cse_major_id),
('PHYSICS 4AL', 'Physics Laboratory for Scientists and Engineers: Mechanics', 2, 'Major', @cse_major_id),
('PHYSICS 4BL', 'Physics Laboratory for Scientists and Engineers: Electricity and Magnetism', 2, 'Major', @cse_major_id),
-- Major Field Courses
('COM SCI 111', 'Operating Systems Principles', 5, 'Major', @cse_major_id),
('COM SCI 118', 'Computer Network Fundamentals', 4, 'Major', @cse_major_id),
('COM SCI 131', 'Programming Languages', 4, 'Major', @cse_major_id),
('COM SCI 180', 'Introduction to Algorithms and Complexity', 4, 'Major', @cse_major_id),
('COM SCI 181', 'Theory of Computing', 4, 'Major', @cse_major_id),
('EC ENGR 100', 'Electrical and Electronic Circuits', 4, 'Major', @cse_major_id),
('EC ENGR 102', 'Systems and Signals', 4, 'Major', @cse_major_id),
('EC ENGR 115C', 'Digital Electronic Circuits', 4, 'Major', @cse_major_id),
('COM SCI M151B', 'Computer Systems Architecture', 4, 'Major', @cse_major_id),
('EC ENGR M116C', 'Computer Systems Architecture', 4, 'Major', @cse_major_id),
('COM SCI M152A', 'Introductory Digital Design Laboratory', 2, 'Major', @cse_major_id),
('EC ENGR M116L', 'Introductory Digital Design Laboratory', 2, 'Major', @cse_major_id),
('C&EE 110', 'Introduction to Probability and Statistics for Engineers', 4, 'Major', @cse_major_id),
('EC ENGR 131A', 'Probability and Statistics', 4, 'Major', @cse_major_id),
('MATH 170A', 'Probability Theory I', 4, 'Major', @cse_major_id),
('MATH 170E', 'Introduction to Probability and Statistics 1: Probability', 4, 'Major', @cse_major_id),
('STATS 100A', 'Introduction to Probability', 4, 'Major', @cse_major_id),
-- Capstone
('COM SCI 152B', 'Digital Design Project Laboratory', 4, 'Major', @cse_major_id),
-- Electives (Partial list from catalog)
('EC ENGR 101A', 'Introduction to Circuits, Devices, and Systems', 4, 'Major', @cse_major_id),
('EC ENGR 185', 'Introduction to Terascale Integration', 4, 'Major', @cse_major_id),
('COM SCI 117', 'Computer Network Security', 4, 'Major', @cse_major_id),
('COM SCI 133', 'Parallel and Distributed Computing', 4, 'Major', @cse_major_id),
('COM SCI 143', 'Database Systems', 4, 'Major', @cse_major_id),
('COM SCI 161', 'Fundamentals of Artificial Intelligence', 4, 'Major', @cse_major_id);

INSERT INTO Courses (course_number, course_name, course_units, category, major_id) VALUES
-- Prep for Major (labeled as 'Major')
('BIOENGR 10', 'Introduction to Bioengineering', 2, 'Major', @bioe_major_id),
('CHEM 20A', 'Chemical Structure', 4, 'Major', @bioe_major_id),
('CHEM 20B', 'Chemical Energetics and Change', 4, 'Major', @bioe_major_id),
('CHEM 20L', 'General Chemistry Laboratory', 3, 'Major', @bioe_major_id),
('CHEM 30A', 'Organic Chemistry I: Structure and Reactivity', 4, 'Major', @bioe_major_id),
('CHEM 30AL', 'General Chemistry Laboratory II', 4, 'Major', @bioe_major_id),
('CHEM 30B', 'Organic Chemistry II: Reactivity, Synthesis, and Spectroscopy', 4, 'Major', @bioe_major_id),
('C&EE M20', 'Introduction to Computer Programming with MATLAB', 4, 'Major', @bioe_major_id),
('COM SCI 31', 'Introduction to Computer Science I', 4, 'Major', @bioe_major_id),
('MECH&AE M20', 'Introduction to Computer Programming with MATLAB', 4, 'Major', @bioe_major_id),
('LIFESCI 7A', 'Cell and Molecular Biology', 5, 'Major', @bioe_major_id),
('LIFESCI 7C', 'Physiology and Human Biology', 5, 'Major', @bioe_major_id),
('MATH 31A', 'Differential and Integral Calculus', 4, 'Major', @bioe_major_id),
('MATH 31B', 'Integration and Infinite Series', 4, 'Major', @bioe_major_id),
('MATH 32A', 'Calculus of Several Variables', 4, 'Major', @bioe_major_id),
('MATH 32B', 'Calculus of Several Variables', 4, 'Major', @bioe_major_id),
('MATH 33A', 'Linear Algebra and Applications', 4, 'Major', @bioe_major_id),
('MATH 33B', 'Differential Equations', 4, 'Major', @bioe_major_id),
('PHYSICS 1A', 'Physics for Scientists and Engineers: Mechanics', 5, 'Major', @bioe_major_id),
('PHYSICS 1B', 'Physics for Scientists and Engineers: Oscillations, Waves, Electric and Magnetic Fields', 5, 'Major', @bioe_major_id),
('PHYSICS 1C', 'Physics for Scientists and Engineers: Electrodynamics, Optics, and Special Relativity', 5, 'Major', @bioe_major_id),
('PHYSICS 4AL', 'Physics Laboratory for Scientists and Engineers: Mechanics', 2, 'Major', @bioe_major_id),

-- Required Courses (labeled as 'Major')
('BIOENGR 100', 'Bioengineering Fundamentals', 4, 'Major', @bioe_major_id),
('BIOENGR 110', 'Biotransport and Bioreaction Processes', 4, 'Major', @bioe_major_id),
('BIOENGR 120', 'Biomedical Transducers', 4, 'Major', @bioe_major_id),
('BIOENGR 122', 'Introduction to Medical Imaging', 4, 'Major', @bioe_major_id),
('BIOENGR 167L', 'Bioengineering Laboratory', 4, 'Major', @bioe_major_id),
('BIOENGR 175', 'Machine Learning and Data-Driven Modeling in Bioengineering', 4, 'Major', @bioe_major_id),
('BIOENGR 176', 'Principles of Biocompatibility', 4, 'Major', @bioe_major_id),
('BIOENGR 180', 'System Integration in Biology, Engineering, and Medicine I', 4, 'Major', @bioe_major_id),

-- Capstone Design (labeled as 'Major')
('BIOENGR 177A', 'Bioengineering Capstone Design I', 4, 'Major', @bioe_major_id),
('BIOENGR 177B', 'Bioengineering Capstone Design II', 4, 'Major', @bioe_major_id),

-- Major Field Electives (labeled as 'Elective')
('BIOENGR C101', 'Engineering Principles for Drug Delivery', 4, 'Elective', @bioe_major_id),
('BIOENGR C102', 'Human Physiological Systems for Bioengineering I', 4, 'Elective', @bioe_major_id),
('BIOENGR C104', 'Physical Chemistry of Biomacromolecules', 4, 'Elective', @bioe_major_id),
('BIOENGR C105', 'Engineering of Bioconjugates', 4, 'Elective', @bioe_major_id),
('BIOENGR C106', 'Topics in Bioelectricity for Bioengineers', 4, 'Elective', @bioe_major_id),
('BIOENGR C107', 'Polymer Chemistry for Bioengineers', 4, 'Elective', @bioe_major_id),
('BIOENGR 121', 'Introduction to Microcontrollers', 4, 'Elective', @bioe_major_id),
('BIOENGR 122', 'Introduction to Medical Imaging', 4, 'Elective', @bioe_major_id),
('BIOENGR C131', 'Nanopore Sensing', 4, 'Elective', @bioe_major_id),
('BIOENGR 132', 'Nanogenerators for Bioengineering', 4, 'Elective', @bioe_major_id),
('BIOENGR C135', 'Orthopaedic Biomechanical Engineering', 4, 'Elective', @bioe_major_id),
('BIOENGR C139A', 'Biomolecular Materials Science I', 4, 'Elective', @bioe_major_id),
('BIOENGR C139B', 'Biomolecular Materials Science II', 4, 'Elective', @bioe_major_id),
('BIOENGR CM140', 'Introduction to Biomechanics', 4, 'Elective', @bioe_major_id),
('BIOENGR CM145', 'Molecular Biotechnology for Engineers', 4, 'Elective', @bioe_major_id),
('BIOENGR C147', 'Applied Tissue Engineering: Clinical and Industrial Perspective', 4, 'Elective', @bioe_major_id),
('BIOENGR M153', 'Introduction to Microscale and Nanoscale Manufacturing', 4, 'Elective', @bioe_major_id),
('BIOENGR C155', 'Fluid-Particle and Fluid-Structure Interactions in Microflows', 4, 'Elective', @bioe_major_id),
('BIOENGR 170', 'Cell Engineering and Laboratory', 4, 'Elective', @bioe_major_id),
('BIOENGR CM178', 'Introduction to Biomaterials', 4, 'Elective', @bioe_major_id),
('BIOENGR C179', 'Biomaterials-Tissue Interactions', 4, 'Elective', @bioe_major_id),
('BIOENGR 180L', 'System Integration in Biology, Engineering, and Medicine I Laboratory', 4, 'Elective', @bioe_major_id),
('BIOENGR M182', 'Dynamic Biosystem Modeling and Simulation Methodology', 4, 'Elective', @bioe_major_id),
('BIOENGR C183', 'Targeted Drug Delivery and Controlled Drug Release', 4, 'Elective', @bioe_major_id),
('BIOENGR C185', 'Introduction to Tissue Engineering', 4, 'Elective', @bioe_major_id),
('BIOENGR CM186', 'Computational Systems Biology: Modeling and Simulation of Biological Systems', 4, 'Elective', @bioe_major_id),
('BIOENGR CM187', 'Research Communication in Computational and Systems Biology', 4, 'Elective', @bioe_major_id),
('BIOENGR 199', 'Directed Research in Bioengineering', 4, 'Elective', @bioe_major_id);

-- -----------------------------------------------------
-- 5. INSERT COURSES: ELECTRICAL ENGINEERING (EE)
-- -----------------------------------------------------
INSERT INTO Courses (course_number, course_name, course_units, category, major_id) VALUES
-- Preparation for the Major (Required Courses)
('CHEM 20A', 'Chemical Structure', 4, 'Major', @ee_major_id),
('COM SCI 31', 'Introduction to Computer Science I', 4, 'Major', @ee_major_id),
('COM SCI 32', 'Introduction to Computer Science II', 4, 'Major', @ee_major_id),
('EC ENGR 2', 'Physics for Electrical Engineers', 4, 'Major', @ee_major_id),
('EC ENGR 3', 'Introduction to Electrical Engineering', 4, 'Major', @ee_major_id),
('EC ENGR 10', 'Circuit Theory I', 4, 'Major', @ee_major_id),
('EC ENGR 11L', 'Circuits Laboratory I', 1, 'Major', @ee_major_id),
('MATH 31A', 'Differential and Integral Calculus', 4, 'Major', @ee_major_id),
('MATH 31B', 'Integration and Infinite Series', 4, 'Major', @ee_major_id),
('MATH 32A', 'Calculus of Several Variables', 4, 'Major', @ee_major_id),
('MATH 32B', 'Calculus of Several Variables', 4, 'Major', @ee_major_id),
('MATH 33A', 'Linear Algebra and Applications', 4, 'Major', @ee_major_id),
('MATH 33B', 'Differential Equations', 4, 'Major', @ee_major_id),
('PHYSICS 1A', 'Physics for Scientists and Engineers: Mechanics', 5, 'Major', @ee_major_id),
('PHYSICS 1B', 'Physics for Scientists and Engineers: Oscillations, Waves, Electric and Magnetic Fields', 5, 'Major', @ee_major_id),
('PHYSICS 1C', 'Physics for Scientists and Engineers: Electrodynamics, Optics, and Special Relativity', 5, 'Major', @ee_major_id),
('PHYSICS 4AL', 'Physics Laboratory for Scientists and Engineers: Mechanics', 2, 'Major', @ee_major_id),
('PHYSICS 4BL', 'Physics Laboratory for Scientists and Engineers: Electricity and Magnetism', 2, 'Major', @ee_major_id),
-- Preparation for the Major (Option Courses)
('COM SCI M51A', 'Logic Design of Digital Systems', 4, 'Major', @ee_major_id), -- Option 1 for Logic Design
('EC ENGR M16', 'Logic Design of Digital Systems', 4, 'Major', @ee_major_id),   -- Option 2 for Logic Design

-- The Major (Required Core Courses)
('EC ENGR 101A', 'Engineering Electromagnetics', 4, 'Major', @ee_major_id),
('EC ENGR 102', 'Systems and Signals', 4, 'Major', @ee_major_id),
('EC ENGR 110', 'Circuit Theory II', 4, 'Major', @ee_major_id),
('EC ENGR 111L', 'Circuits Laboratory II', 1, 'Major', @ee_major_id),
('EC ENGR 113', 'Digital Signal Processing', 4, 'Major', @ee_major_id),
('EC ENGR 131A', 'Probability and Statistics', 4, 'Major', @ee_major_id),

-- The Major (Core Elective Options)
('COM SCI 33', 'Introduction to Computer Organization', 5, 'Major', @ee_major_id),
('EC ENGR 101B', 'Electromagnetic Waves', 4, 'Major', @ee_major_id),
('EC ENGR 115A', 'Analog Electronic Circuits I', 4, 'Major', @ee_major_id),
('EC ENGR 121B', 'Principles of Semiconductor Device Design', 4, 'Major', @ee_major_id),
('EC ENGR 132A', 'Introduction to Communication Systems', 4, 'Major', @ee_major_id),
('EC ENGR 133A', 'Applied Numerical Computing', 4, 'Major', @ee_major_id),
('EC ENGR 141', 'Principles of Feedback Control', 4, 'Major', @ee_major_id),
('EC ENGR 170A', 'Principles of Photonics', 4, 'Major', @ee_major_id);
SET FOREIGN_KEY_CHECKS = 1;