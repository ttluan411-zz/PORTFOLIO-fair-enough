DROP TABLE IF EXISTS payment_request CASCADE;
CREATE TABLE IF NOT EXISTS payment_request (
    id SERIAL PRIMARY KEY,
    billId INTEGER,
    chargeeId INTEGER,
    amount INTEGER,
    creatorId INTEGER, FOREIGN KEY(creatorId) REFERENCES users(id)
);
INSERT INTO payment_request 
( billId, chargeeId, amount, creatorId) 
VALUES 
('Hotel', 100, false , 1),
('Tacos', 50, false, 2),
('Gasoline', 30, false, 3)
