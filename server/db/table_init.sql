
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    balance INT,
    auth0Id TEXT
);

CREATE TABLE IF NOT EXISTS event (
    id SERIAL PRIMARY KEY,
    eventName TEXT,
    timeOccur TEXT,
    balance INTEGER,
    CONSTRAINT creatorId FOREIGN KEY(id) REFERENCES users(id)
);


CREATE TABLE IF NOT EXISTS payment_request (
    id SERIAL PRIMARY KEY,
    event TEXT,
    amount INTEGER,
    creator TEXT
);

CREATE TABLE IF NOT EXISTS friendlist (
    id SERIAL PRIMARY KEY,
    CONSTRAINT userId FOREIGN KEY (id) REFERENCES users(id),
    CONSTRAINT eventId FOREIGN KEY (id) REFERENCES event(id)
) ;


CREATE TABLE IF NOT EXISTS bills (
    id SERIAL PRIMARY KEY,
    description TEXT,
    amount INTEGER,
    CONSTRAINT creatorId FOREIGN KEY(id) REFERENCES users(id),
    CONSTRAINT eventId FOREIGN KEY(id) REFERENCES event(id)
)
