DROP TABLE IF EXISTS bills CASCADE;
CREATE TABLE IF NOT EXISTS bills (
    id SERIAL PRIMARY KEY,
    description TEXT,
    amount INTEGER,
    creatorId INTEGER, FOREIGN KEY(creatorId) REFERENCES users(id)
);
INSERT INTO bills 
( description, amount, creatorId) 
VALUES 
('Hotel', 100 , 1),
('Tacos', 50, 2),
('Gasoline', 30, 3)