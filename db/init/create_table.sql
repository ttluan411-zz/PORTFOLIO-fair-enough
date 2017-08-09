-- DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    givenName TEXT,
    familyName TEXT,
    email TEXT,
    profileName TEXT,
    auth0Id TEXT
);
-- DROP TABLE IF EXISTS event CASCADE;
CREATE TABLE IF NOT EXISTS event (
    id SERIAL PRIMARY KEY,
    eventName TEXT,
    eventTime TEXT,
    expense INTEGER,
    average INTEGER,
    eventBalance INTEGER,
    CONSTRAINT creatorId FOREIGN KEY(id) REFERENCES users(id)
);
-- DROP TABLE IF EXISTS balanceSheet CASCADE;
CREATE TABLE IF NOT EXISTS balanceSheet (
    id SERIAL PRIMARY KEY,
    userBalance INTEGER
);
-- DROP TABLE IF EXISTS payment_request CASCADE;
CREATE TABLE IF NOT EXISTS payment_request (
    id SERIAL PRIMARY KEY,
    event TEXT,
    amount INTEGER,
    creator TEXT
);
-- DROP TABLE IF EXISTS friendlist CASCADE;
CREATE TABLE IF NOT EXISTS friendlist (
    id SERIAL PRIMARY KEY,
    CONSTRAINT userId FOREIGN KEY (id) REFERENCES users(id),
    CONSTRAINT eventId FOREIGN KEY (id) REFERENCES event(id)
);

-- DROP TABLE IF EXISTS bills CASCADE;
CREATE TABLE IF NOT EXISTS bills (
    id SERIAL PRIMARY KEY,
    description TEXT,
    amount INTEGER,
    CONSTRAINT creatorId FOREIGN KEY(id) REFERENCES users(id),
    CONSTRAINT eventId FOREIGN KEY(id) REFERENCES event(id)
);


-- CREATE TABLE "users" (
-- 	"userId" serial NOT NULL,
-- 	"givenName" TEXT NOT NULL,
-- 	"familyName" serial NOT NULL,
-- 	"email" TEXT NOT NULL,
-- 	"profileName" serial NOT NULL,
-- 	"authId" TEXT NOT NULL,
-- 	"userBalance" integer NOT NULL,
-- 	CONSTRAINT users_pk PRIMARY KEY ("userId")
-- ) WITH (
--   OIDS=FALSE
-- );
--
--
--
-- CREATE TABLE "event" (
-- 	"event_id" serial NOT NULL,
-- 	"eventName" serial NOT NULL,
-- 	"eventTime" serial NOT NULL,
-- 	"totalExpense" integer NOT NULL,
-- 	"averagePerPax" serial NOT NULL,
-- 	"headCount" integer NOT NULL,
-- 	CONSTRAINT event_pk PRIMARY KEY ("event_id")
-- ) WITH (
--   OIDS=FALSE
-- );
--
--
--
-- CREATE TABLE "bills" (
-- 	"bill_id" serial NOT NULL,
-- 	"creatorId" serial NOT NULL,
-- 	"event_id" TIMESTAMP NOT NULL,
-- 	"amount" integer NOT NULL,
-- 	"createTime" TIMESTAMP NOT NULL,
-- 	CONSTRAINT bills_pk PRIMARY KEY ("bill_id")
-- ) WITH (
--   OIDS=FALSE
-- );
--
--
--
-- CREATE TABLE "attendees" (
-- 	"userId" integer NOT NULL,
-- 	"amountPaid" integer NOT NULL,
-- 	"amountOwe" integer NOT NULL,
-- 	"hasToPay" BOOLEAN NOT NULL,
-- 	"event_id" integer NOT NULL
-- ) WITH (
--   OIDS=FALSE
-- );
--
--
--
-- CREATE TABLE "attendees" (
-- 	"group_id" serial NOT NULL,
-- 	"event_id" integer NOT NULL,
-- 	"user_id" integer NOT NULL,
-- 	CONSTRAINT attendees_pk PRIMARY KEY ("group_id")
-- ) WITH (
--   OIDS=FALSE
-- );
--
--
--
--
--
-- ALTER TABLE "bills" ADD CONSTRAINT "bills_fk0" FOREIGN KEY ("creatorId") REFERENCES "users"("userId");
-- ALTER TABLE "bills" ADD CONSTRAINT "bills_fk1" FOREIGN KEY ("event_id") REFERENCES "event"("event_id");
--
-- ALTER TABLE "attendees" ADD CONSTRAINT "attendees_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
-- ALTER TABLE "attendees" ADD CONSTRAINT "attendees_fk1" FOREIGN KEY ("event_id") REFERENCES "event"("event_id");
--
-- ALTER TABLE "attendees" ADD CONSTRAINT "attendees_fk0" FOREIGN KEY ("event_id") REFERENCES "event"("event_id");
-- ALTER TABLE "attendees" ADD CONSTRAINT "attendees_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("userId");
