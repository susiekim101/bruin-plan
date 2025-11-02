SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE Courses;
TRUNCATE TABLE Majors;

INSERT INTO Majors (major_name) VALUES ('Computer Engineering');
SET @ce_major_id = LAST_INSERT_ID();

INSERT INTO Majors (major_name) VALUES ('Computer Science');
SET @cs_major_id = LAST_INSERT_ID();

INSERT INTO Majors (major_name) VALUES ('Computer Science and Engineering');
SET @cse_major_id = LAST_INSERT_ID();


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
('COM SCI 130', 'Software Engineering', 4, 'Major', @cs_major_id),
('COM SCI 132', 'Compiler Construction', 4, 'Major', @cs_major_id),
('COM SCI 152B', 'Digital Design Project Laboratory', 4, 'Major', @cs_major_id),
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
-- Preparation for the Major (labeled as 'Major')
('BIOENGR 10', 'Introduction to Bioengineering', NULL, 'Major', @bioe_major_id),
('CHEM 20A', 'Chemical Structure', NULL, 'Major', @bioe_major_id),
('CHEM 20B', 'Chemical Energetics and Change', NULL, 'Major', @bioe_major_id),
('CHEM 20L', 'General Chemistry Laboratory', NULL, 'Major', @bioe_major_id),
('CHEM 30A', 'Organic Chemistry I: Structure and Reactivity', NULL, 'Major', @bioe_major_id),
('CHEM 30AL', 'General Chemistry Laboratory II', NULL, 'Major', @bioe_major_id),
('CHEM 30B', 'Organic Chemistry II: Reactivity, Synthesis, and Spectroscopy', NULL, 'Major', @bioe_major_id),
('C&EE M20', 'Introduction to Computer Programming with MATLAB', NULL, 'Major', @bioe_major_id),
('COM SCI 31', 'Introduction to Computer Science I', NULL, 'Major', @bioe_major_id),
('MECH&AE M20', 'Introduction to Computer Programming with MATLAB', NULL, 'Major', @bioe_major_id),
('LIFESCI 7A', 'Cell and Molecular Biology', NULL, 'Major', @bioe_major_id),
('LIFESCI 7C', 'Physiology and Human Biology', NULL, 'Major', @bioe_major_id),
('MATH 31A', 'Differential and Integral Calculus', NULL, 'Major', @bioe_major_id),
('MATH 31B', 'Integration and Infinite Series', NULL, 'Major', @bioe_major_id),
('MATH 32A', 'Calculus of Several Variables', NULL, 'Major', @bioe_major_id),
('MATH 32B', 'Calculus of Several Variables', NULL, 'Major', @bioe_major_id),
('MATH 33A', 'Linear Algebra and Applications', NULL, 'Major', @bioe_major_id),
('MATH 33B', 'Differential Equations', NULL, 'Major', @bioe_major_id),
('PHYSICS 1A', 'Physics for Scientists and Engineers: Mechanics', NULL, 'Major', @bioe_major_id),
('PHYSICS 1B', 'Physics for Scientists and Engineers: Oscillations, Waves, Electric and Magnetic Fields', NULL, 'Major', @bioe_major_id),
('PHYSICS 1C', 'Physics for Scientists and Engineers: Electrodynamics, Optics, and Special Relativity', NULL, 'Major', @bioe_major_id),
('PHYSICS 4AL', 'Physics Laboratory for Scientists and Engineers: Mechanics', NULL, 'Major', @bioe_major_id),

-- Required Courses (labeled as 'Major')
('BIOENGR 100', 'Bioengineering Fundamentals', NULL, 'Major', @bioe_major_id),
('BIOENGR 110', 'Biotransport and Bioreaction Processes', NULL, 'Major', @bioe_major_id),
('BIOENGR 120', 'Biomedical Transducers', NULL, 'Major', @bioe_major_id),
('BIOENGR 122', 'Introduction to Medical Imaging', NULL, 'Major', @bioe_major_id),
('BIOENGR 167L', 'Bioengineering Laboratory', NULL, 'Major', @bioe_major_id),
('BIOENGR 175', 'Machine Learning and Data-Driven Modeling in Bioengineering', NULL, 'Major', @bioe_major_id),
('BIOENGR 176', 'Principles of Biocompatibility', NULL, 'Major', @bioe_major_id),
('BIOENGR 180', 'System Integration in Biology, Engineering, and Medicine I', NULL, 'Major', @bioe_major_id),

-- Capstone Design (labeled as 'Major')
('BIOENGR 177A', 'Bioengineering Capstone Design I', NULL, 'Major', @bioe_major_id),
('BIOENGR 177B', 'Bioengineering Capstone Design II', NULL, 'Major', @bioe_major_id),

-- Major Field Electives (labeled as 'Elective')
('BIOENGR C101', 'Engineering Principles for Drug Delivery', NULL, 'Elective', @bioe_major_id),
('BIOENGR C102', 'Human Physiological Systems for Bioengineering I', NULL, 'Elective', @bioe_major_id),
('BIOENGR C104', 'Physical Chemistry of Biomacromolecules', NULL, 'Elective', @bioe_major_id),
('BIOENGR C105', 'Engineering of Bioconjugates', NULL, 'Elective', @bioe_major_id),
('BIOENGR C106', 'Topics in Bioelectricity for Bioengineers', NULL, 'Elective', @bioe_major_id),
('BIOENGR C107', 'Polymer Chemistry for Bioengineers', NULL, 'Elective', @bioe_major_id),
('BIOENGR 121', 'Introduction to Microcontrollers', NULL, 'Elective', @bioe_major_id),
('BIOENGR 122', 'Introduction to Medical Imaging', NULL, 'Elective', @bioe_major_id),
('BIOENGR C131', 'Nanopore Sensing', NULL, 'Elective', @bioe_major_id),
('BIOENGR 132', 'Nanogenerators for Bioengineering', NULL, 'Elective', @bioe_major_id),
('BIOENGR C135', 'Orthopaedic Biomechanical Engineering', NULL, 'Elective', @bioe_major_id),
('BIOENGR C139A', 'Biomolecular Materials Science I', NULL, 'Elective', @bioe_major_id),
('BIOENGR C139B', 'Biomolecular Materials Science II', NULL, 'Elective', @bioe_major_id),
('BIOENGR CM140', 'Introduction to Biomechanics', NULL, 'Elective', @bioe_major_id),
('BIOENGR CM145', 'Molecular Biotechnology for Engineers', NULL, 'Elective', @bioe_major_id),
('BIOENGR C147', 'Applied Tissue Engineering: Clinical and Industrial Perspective', NULL, 'Elective', @bioe_major_id),
('BIOENGR M153', 'Introduction to Microscale and Nanoscale Manufacturing', NULL, 'Elective', @bioe_major_id),
('BIOENGR C155', 'Fluid-Particle and Fluid-Structure Interactions in Microflows', NULL, 'Elective', @bioe_major_id),
('BIOENGR 170', 'Cell Engineering and Laboratory', NULL, 'Elective', @bioe_major_id),
('BIOENGR CM178', 'Introduction to Biomaterials', NULL, 'Elective', @bioe_major_id),
('BIOENGR C179', 'Biomaterials-Tissue Interactions', NULL, 'Elective', @bioe_major_id),
('BIOENGR 180L', 'System Integration in Biology, Engineering, and Medicine I Laboratory', NULL, 'Elective', @bioe_major_id),
('BIOENGR M182', 'Dynamic Biosystem Modeling and Simulation Methodology', NULL, 'Elective', @bioe_major_id),
('BIOENGR C183', 'Targeted Drug Delivery and Controlled Drug Release', NULL, 'Elective', @bioe_major_id),
('BIOENGR C185', 'Introduction to Tissue Engineering', NULL, 'Elective', @bioe_major_id),
('BIOENGR CM186', 'Computational Systems Biology: Modeling and Simulation of Biological Systems', NULL, 'Elective', @bioe_major_id),
('BIOENGR CM187', 'Research Communication in Computational and Systems Biology', NULL, 'Elective', @bioe_major_id),
('BIOENGR 199', 'Directed Research in Bioengineering', NULL, 'Elective', @bioe_major_id);

SET FOREIGN_KEY_CHECKS = 1;