-- Projects table for H2
CREATE TABLE IF NOT EXISTS projects (
                                        id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                        project_id VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000)
    );

-- Sample data

