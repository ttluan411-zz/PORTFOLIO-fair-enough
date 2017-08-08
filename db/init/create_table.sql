DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    givenName TEXT,
    familyName TEXT,
    email TEXT,
    profileName TEXT,
    auth0Id TEXT
);
DROP TABLE IF EXISTS event CASCADE;
CREATE TABLE IF NOT EXISTS event (
    id SERIAL PRIMARY KEY,
    eventName TEXT,
    eventTime TEXT,
    eventBalance INTEGER,
    CONSTRAINT creatorId FOREIGN KEY(id) REFERENCES users(id)
);
DROP TABLE IF EXISTS balanceSheet CASCADE;
CREATE TABLE IF NOT EXISTS balanceSheet (
    id SERIAL PRIMARY KEY,
    userBalance INTEGER

);
DROP TABLE IF EXISTS payment_request CASCADE;
CREATE TABLE IF NOT EXISTS payment_request (
    id SERIAL PRIMARY KEY,
    event TEXT,
    amount INTEGER,
    creator TEXT
);
DROP TABLE IF EXISTS friendlist CASCADE;
CREATE TABLE IF NOT EXISTS friendlist (
    id SERIAL PRIMARY KEY,
    CONSTRAINT userId FOREIGN KEY (id) REFERENCES users(id),
    CONSTRAINT eventId FOREIGN KEY (id) REFERENCES event(id)
);

DROP TABLE IF EXISTS bills CASCADE;
CREATE TABLE IF NOT EXISTS bills (
    id SERIAL PRIMARY KEY,
    description TEXT,
    amount INTEGER,
    CONSTRAINT creatorId FOREIGN KEY(id) REFERENCES users(id),
    CONSTRAINT eventId FOREIGN KEY(id) REFERENCES event(id)
);
