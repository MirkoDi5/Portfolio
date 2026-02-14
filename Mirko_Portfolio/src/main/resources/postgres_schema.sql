DROP TABLE IF EXISTS projects;

CREATE TABLE projects (
                          id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                          project_id VARCHAR(255),
                          name VARCHAR(255) NOT NULL,
                          description VARCHAR(1000),
                          link VARCHAR(255),
                          prod_link VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS skills (
                                      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                      skill_id VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    level VARCHAR(1000)
    );

CREATE TABLE IF NOT EXISTS works (
                                     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                     work_id VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    work_name VARCHAR(1000),
    time VARCHAR(1000),
    description VARCHAR(255)
    );

CREATE TABLE IF NOT EXISTS education (
                                         id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                         education_id VARCHAR(255),
    school_name VARCHAR(255) NOT NULL,
    program VARCHAR(1000),
    time VARCHAR(255)
    );



-- Drop table if it exists
DROP TABLE IF EXISTS testimony;

-- Create table
CREATE TABLE testimony (
                           id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                           user_id VARCHAR(255) NOT NULL,
                           first_name VARCHAR(255) NOT NULL,
                           last_name VARCHAR(255),
                           comment TEXT,
                           rating INTEGER,
                           created_at TIMESTAMP DEFAULT NOW(),
                           status VARCHAR(50) DEFAULT 'PENDING'
);


DROP TABLE IF EXISTS contacts;

CREATE TABLE contacts (
                          id BIGSERIAL PRIMARY KEY,
                          name VARCHAR(255) NOT NULL,
                          last_name VARCHAR(255),
                          email VARCHAR(255),
                          comment TEXT
);
