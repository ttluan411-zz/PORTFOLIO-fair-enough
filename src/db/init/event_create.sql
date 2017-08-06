DROP TABLE IF EXISTS event CASCADE;
CREATE TABLE IF NOT EXISTS event (
    id SERIAL PRIMARY KEY,
    eventName TEXT,
    dateOccur TEXT,
    creatorId INTEGER, FOREIGN KEY(creatorId) REFERENCES users(id)
);
INSERT INTO event
( eventName, dateOccur, creatorId) 
VALUES 
('Moab Trip', 'Wednesday 08-01-17', 1),
('Dinner at BurgerKing', 'Wednesday 08-01-17', 2),
('Jeremy Birthday', 'Thursday 08-02-17, 3)