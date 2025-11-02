USE bruin_plan;

SET FOREIGN_KEY_CHECKS=0;

INSERT IGNORE INTO Majors (major_name)
VALUES ('Bioengineering');

SET @bioeng_major_id = (SELECT major_id FROM Majors WHERE major_name = 'Bioengineering');

TRUNCATE TABLE Courses;

INSERT INTO Courses (course_number, course_name, category, major_id) 
VALUES
-- 'Major' (Was 'Preparation for the Major')
('BIOENGR 10', 'Introduction to Bioengineering', 'Major', @bioeng_major_id),
('CHEM 20A', 'Chemical Structure', 'Major', @bioeng_major_id),
('CHEM 20B', 'Chemical Energetics and Change', 'Major', @bioeng_major_id),
('CHEM 20L', 'General Chemistry Laboratory', 'Major', @bioeng_major_id),
('CHEM 30A', 'Organic Chemistry I: Structure and Reactivity', 'Major', @bioeng_major_id),
('CHEM 30AL', 'General Chemistry Laboratory II', 'Major', @bioeng_major_id),
('CHEM 30B', 'Organic Chemistry II: Reactivity, Synthesis, and Spectroscopy', 'Major', @bioeng_major_id),
('C&EE M20', 'Introduction to Computer Programming with MATLAB', 'Major', @bioeng_major_id),
('COM SCI 31', 'Introduction to Computer Science I', 'Major', @bioeng_major_id),
('MECH&AE M20', 'Introduction to Computer Programming with MATLAB', 'Major', @bioeng_major_id),
('LIFESCI 7A', 'Cell and Molecular Biology', 'Major', @bioeng_major_id),
('LIFESCI 7C', 'Physiology and Human Biology', 'Major', @bioeng_major_id),
('MATH 31A', 'Differential and Integral Calculus', 'Major', @bioeng_major_id),
('MATH 31B', 'Integration and Infinite Series', 'Major', @bioeng_major_id),
('MATH 32A', 'Calculus of Several Variables', 'Major', @bioeng_major_id),
('MATH 32B', 'Calculus of Several Variables', 'Major', @bioeng_major_id),
('MATH 33A', 'Linear Algebra and Applications', 'Major', @bioeng_major_id),
('MATH 33B', 'Differential Equations', 'Major', @bioeng_major_id),
('PHYSICS 1A', 'Physics for Scientists and Engineers: Mechanics', 'Major', @bioeng_major_id),
('PHYSICS 1B', 'Physics for Scientists and Engineers: Oscillations, Waves, Electric and Magnetic Fields', 'Major', @bioeng_major_id),
('PHYSICS 1C', 'Physics for Scientists and Engineers: Electrodynamics, Optics, and Special Relativity', 'Major', @bioeng_major_id),
('PHYSICS 4AL', 'Physics Laboratory for Scientists and Engineers: Mechanics', 'Major', @bioeng_major_id),

-- 'Major' (Was 'Required Courses')
('BIOENGR 100', 'Bioengineering Fundamentals', 'Major', @bioeng_major_id),
('BIOENGR 110', 'Biotransport and Bioreaction Processes', 'Major', @bioeng_major_id),
('BIOENGR 120', 'Biomedical Transducers', 'Major', @bioeng_major_id),
('BIOENGR 122', 'Introduction to Medical Imaging', 'Major', @bioeng_major_id),
('BIOENGR 167L', 'Bioengineering Laboratory', 'Major', @bioeng_major_id),
('BIOENGR 175', 'Machine Learning and Data-Driven Modeling in Bioengineering', 'Major', @bioeng_major_id),
('BIOENGR 176', 'Principles of Biocompatibility', 'Major', @bioeng_major_id),
('BIOENGR 180', 'System Integration in Biology, Engineering, and Medicine I', 'Major', @bioeng_major_id),

-- 'Major' (Was 'Capstone Design')
('BIOENGR 177A', 'Bioengineering Capstone Design I', 'Major', @bioeng_major_id),
('BIOENGR 177B', 'Bioengineering Capstone Design II', 'Major', @bioeng_major_id),

-- 'Elective' (Was 'Major Field Electives')
('BIOENGR C101', 'Engineering Principles for Drug Delivery', 'Elective', @bioeng_major_id),
('BIOENGR C102', 'Human Physiological Systems for Bioengineering I', 'Elective', @bioeng_major_id),
('BIOENGR C104', 'Physical Chemistry of Biomacromolecules', 'Elective', @bioeng_major_id),
('BIOENGR C105', 'Engineering of Bioconjugates', 'Elective', @bioeng_major_id),
('BIOENGR C106', 'Topics in Bioelectricity for Bioengineers', 'Elective', @bioeng_major_id),
('BIOENGR C107', 'Polymer Chemistry for Bioengineers', 'Elective', @bioeng_major_id),
('BIOENGR 121', 'Introduction to Microcontrollers', 'Elective', @bioeng_major_id),
-- ('BIOENGR 122', 'Introduction to Medical Imaging', 'Elective', @bioeng_major_id),
('BIOENGR C131', 'Nanopore Sensing', 'Elective', @bioeng_major_id),
('BIOENGR 132', 'Nanogenerators for Bioengineering', 'Elective', @bioeng_major_id),
('BIOENGR C135', 'Orthopaedic Biomechanical Engineering', 'Elective', @bioeng_major_id),
('BIOENGR C139A', 'Biomolecular Materials Science I', 'Elective', @bioeng_major_id),
('BIOENGR C139B', 'Biomolecular Materials Science II', 'Elective', @bioeng_major_id),
('BIOENGR CM140', 'Introduction to Biomechanics', 'Elective', @bioeng_major_id),
('BIOENGR CM145', 'Molecular Biotechnology for Engineers', 'Elective', @bioeng_major_id),
('BIOENGR C147', 'Applied Tissue Engineering: Clinical and Industrial Perspective', 'Elective', @bioeng_major_id),
('BIOENGR M153', 'Introduction to Microscale and Nanoscale Manufacturing', 'Elective', @bioeng_major_id),
('BIOENGR C155', 'Fluid-Particle and Fluid-Structure Interactions in Microflows', 'Elective', @bioeng_major_id),
('BIOENGR 170', 'Cell Engineering and Laboratory', 'Elective', @bioeng_major_id),
('BIOENGR CM178', 'Introduction to Biomaterials', 'Elective', @bioeng_major_id),
('BIOENGR C179', 'Biomaterials-Tissue Interactions', 'Elective', @bioeng_major_id),
('BIOENGR 180L', 'System Integration in Biology, Engineering, and Medicine I Laboratory', 'Elective', @bioeng_major_id),
('BIOENGR M182', 'Dynamic Biosystem Modeling and Simulation Methodology', 'Elective', @bioeng_major_id),
('BIOENGR C183', 'Targeted Drug Delivery and Controlled Drug Release', 'Elective', @bioeng_major_id),
('BIOENGR C185', 'Introduction to Tissue Engineering', 'Elective', @bioeng_major_id),
('BIOENGR CM186', 'Computational Systems Biology: Modeling and Simulation of Biological Systems', 'Elective', @bioeng_major_id),
('BIOENGR CM187', 'Research Communication in Computational and Systems Biology', 'Elective', @bioeng_major_id),
('BIOENGR 199', 'Directed Research in Bioengineering', 'Elective', @bioeng_major_id);
