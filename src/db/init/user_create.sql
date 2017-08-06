DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    balance INT,
);
INSERT INTO users (name,balance) VALUES ('Logan', 0),('George', 0),('Im', 0)