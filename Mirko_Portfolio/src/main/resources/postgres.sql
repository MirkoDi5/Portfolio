TRUNCATE TABLE projects RESTART IDENTITY;

INSERT INTO projects (project_id, name, description) VALUES
                                                         ('14545', 'ECP', 'Enterprise Content Platform for internal management.'),
                                                         ('14546', 'Portfolio Website', 'Personal portfolio website showcasing projects and skills.'),
                                                         ('14547', 'Task Manager', 'Web application for tracking and managing tasks.'),
                                                         ('14548', 'Blog CMS', 'Content management system built with PHP and MySQL.'),
                                                         ('14549', 'Weather App', 'Android app displaying weather forecasts using OpenWeather API.'),
                                                         ('14550', 'Game Hub', 'Unity-based game collection with multiple mini-games.'),
                                                         ('14551', 'Chat App', 'Real-time chat application using WebSocket and Spring Boot.');
