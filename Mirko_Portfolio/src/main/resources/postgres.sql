TRUNCATE TABLE projects RESTART IDENTITY;

INSERT INTO projects (project_id, name, description, link, prod_link) VALUES
                                                               ('14545', 'ECP (External Client Project)', 'DM Creations is a decoration website', 'https://github.com/Ayoub-Seddik/dm-creation', 'dm-creation.ca'),
                                                               ('14546', 'Portfolio Website', 'My Personal Portfolio of all my projects and skills gained throughout my school life', 'https://github.com/MirkoDi5/Portfolio', 'portfolio.ca'),
                                                               ('14547', 'IOT-Living-Home-System', 'This project is a complete IoT Smart Home Automation & Security System built around a Raspberry Pi that integrates multiple sensors, actuators, and cloud services to provide real-time monitoring, remote control, and automated security features. The Pi collects temperature, humidity, and motion data using a DHT22 sensor and PIR detector, controls devices such as LEDs, a servo motor, and a buzzer, and communicates with Adafruit IO through MQTT and REST for live dashboards and remote commands. All sensor readings are logged both locally (SQLite) and in a cloud PostgreSQL database (NeonDB), with automatic synchronization whenever the Pi regains internet connectivity. A Flask web application displays live data using Chart.js, shows historical trends retrieved from the cloud database, supports device control, and provides an interface for managing the home security system and viewing intrusion logs. Together, these components form a robust, modular, cloud-connected smart home platform.', 'https://github.com/DeanteMirijello/IOT-Living-Home-System', 'livingIotSystem.ca'),
                                                               ('14548', 'CPC (Champlain Pet Clinic)', 'An online pet clinic website created by Champlain College teachers and alumni', 'https://github.com/cgerard321/champlain_petclinic', 'PetClinic.ca');

TRUNCATE TABLE skills RESTART IDENTITY;

INSERT INTO skills (skill_id, name, level) VALUES
-- Frontend
('1', 'JavaScript', 'Advanced'),
('2', 'TypeScript', 'Intermediate'),
('3', 'React', 'Advanced'),
('4', 'Next.js', 'Intermediate'),
('5', 'HTML5', 'Advanced'),
('6', 'CSS3', 'Advanced'),
('7', 'Tailwind CSS', 'Advanced'),
('8', 'Bootstrap', 'Intermediate'),

-- Backend
('9', 'Node.js', 'Intermediate'),
('10', 'Express.js', 'Intermediate'),
('11', 'Spring Boot', 'Intermediate'),
('12', 'PHP', 'Intermediate'),

-- Databases
('13', 'PostgreSQL', 'Intermediate'),
('14', 'MongoDB', 'Intermediate'),
('15', 'MySQL', 'Intermediate'),
('16', 'Firebase', 'Beginner'),

-- Mobile / Desktop
('17', 'Android (Jetpack Compose)', 'Advanced'),
('18', 'Kotlin', 'Advanced'),
('19', 'Java', 'Advanced'),

-- DevOps / Tools
('20', 'Docker', 'Intermediate'),
('21', 'Git', 'Advanced'),
('22', 'GitHub Actions', 'Intermediate'),
('23', 'Linux', 'Intermediate'),

-- Game Dev / Other
('24', 'Unity', 'Intermediate'),
('25', 'C#', 'Intermediate'),
('26', 'Python', 'Intermediate'),
('27', 'REST APIs', 'Advanced'),
('28', 'Microservices', 'Intermediate');


TRUNCATE TABLE works RESTART IDENTITY;

INSERT INTO works (work_id, name, work_name, time, description) VALUES
                                                                    ('W1', 'Self-Employed', 'Full Stack Developer', '2024 - Present', 'Building web and mobile applications using Spring Boot, React, and PostgreSQL.'),
                                                                    ('W2', 'College Projects', 'Android Developer', '2023 - 2024', 'Developed Android apps using Kotlin and Jetpack Compose with MVVM architecture.'),
                                                                    ('W3', 'Personal Projects', 'Backend Developer', '2023', 'Created REST APIs using Spring Boot, PostgreSQL, Docker, and Microservices architecture.'),
                                                                    ('W4', 'Unity Indie Projects', 'Game Developer', '2022 - 2023', 'Built Unity turn-based battle games with C# and custom battle systems.'),
                                                                    ('W5', 'Dawson College', 'Student Programmer', '2021 - 2024', 'Completed software engineering coursework including web, mobile, and distributed systems projects.');


TRUNCATE TABLE education RESTART IDENTITY;

INSERT INTO education (education_id, school_name, program, time) VALUES
                                                                     ('E1', 'Dawson College', 'Computer Science Technology', '2021 - 2024'),
                                                                     ('E2', 'Self-Study', 'Full Stack Web Development', '2022 - Present'),
                                                                     ('E3', 'Online Courses', 'Android Development with Kotlin and Jetpack Compose', '2023 - 2024'),
                                                                     ('E4', 'Online Courses', 'Spring Boot & Microservices', '2023'),
                                                                     ('E5', 'Personal Learning', 'Game Development with Unity and C#', '2022 - 2023');

INSERT INTO testimony (user_id, first_name, last_name, comment, rating, created_at, status)
VALUES
    ('auth0|abc123', 'John', 'Doe', 'Mirko is an excellent developer...', 5, NOW(), 'APPROVED'),
    ('auth0|def456', 'Sarah', 'Smith', 'Great communication...', 5, NOW(), 'APPROVED'),
    ('auth0|ghi789', 'Michael', 'Brown', 'Delivered on time...', 4, NOW(), 'PENDING'),
    ('auth0|jkl012', 'Emily', 'Wilson', 'Very knowledgeable...', 5, NOW(), 'APPROVED'),
    ('auth0|mno345', 'Alex', 'Johnson', 'Strong problem-solving...', 4, NOW(), 'PENDING');


INSERT INTO contacts (name, last_name, email, comment)
VALUES
    ( 'John', 'Doe', 'john.doe@example.com', 'Interested in collaboration.'),
    ( 'Jane', 'Smith', 'jane.smith@example.com', 'Loved your portfolio website!'),
    ( 'Michael', 'Brown', 'michael.brown@example.com', 'Looking for backend development services.'),
    ('Emily', 'Davis', 'emily.davis@example.com', 'Question about your recent project.'),
    ( 'David', 'Wilson', 'david.wilson@example.com', 'Would like to schedule a meeting.');
