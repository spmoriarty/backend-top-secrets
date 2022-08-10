-- Use this file to define your SQL tables
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS secrets;

-- The SQL in this file will be executed when you run `npm run setup-db`
CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL
);


CREATE TABLE secrets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO secrets (
    title,
    description
)

VALUES 
('Luke Skywalker secret', 'he likes cookies'),
('Derppity', 'he  does not like cookies');




