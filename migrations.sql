CREATE DATABASE fete;
\c fete;
CREATE TABLE users (id SERIAL PRIMARY KEY, full_name varchar(255), email varchar(255), username varchar(255), password_salt varchar(255), password_hash varchar(255));
INSERT INTO users (full_name, email, username, password_salt, password_hash)
VALUES (Brad Bolander, bolanderbrad@gmail.com, bolanderbrad, abc123, abc123);
VALUES (Isaac Bueno, isaacmabueno@gmail.com, isaacmabueno, abc123, abc123);
