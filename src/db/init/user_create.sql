DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    balance INT
    
);
INSERT INTO users ( name, email, balance ) VALUES ('Logan','logan@gmail.com' 0),('George','George@gmail.com', 0),('Im','Im@gmail.com', 0)