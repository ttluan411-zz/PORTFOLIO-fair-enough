
-- DROP TABLE IF EXISTS balanceSheet CASCADE;
-- DROP TABLE IF EXISTS payment_request CASCADE;
-- DROP TABLE IF EXISTS friendlist CASCADE;
--
-- DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users (
	userId serial NOT NULL,
	givenName TEXT NOT NULL,
	familyName serial NOT NULL,
	email TEXT NOT NULL,
	profileName serial NOT NULL,
	picture TEXT,
	authId TEXT NOT NULL,
	userBalance integer NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY (userId)
) WITH (
  OIDS=FALSE
);


-- DROP TABLE IF EXISTS event CASCADE;
CREATE TABLE IF NOT EXISTS event (
	event_id serial NOT NULL,
	eventName serial NOT NULL,
	eventTime serial NOT NULL,
	Expense integer NOT NULL,
	averagePerPax serial NOT NULL,
	headCount integer NOT NULL,
	CONSTRAINT event_pk PRIMARY KEY (event_id)
) WITH (
  OIDS=FALSE
);


-- DROP TABLE IF EXISTS bills CASCADE;
CREATE TABLE IF NOT EXISTS bills (
	bill_id serial NOT NULL,
	creatorId serial NOT NULL,
	event_id integer NOT NULL,
	amount integer NOT NULL,
	createTime TIMESTAMP NOT NULL,
	billsName TEXT NOT NULL,
	CONSTRAINT bills_pk PRIMARY KEY (bill_id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE IF NOT EXISTS cashflow (
	userId integer NOT NULL,
	event_id integer NOT NULL,
	amountPaid integer NOT NULL,
	amountOwe integer NOT NULL,
	hasToPay BOOLEAN NOT NULL
) WITH (
  OIDS=FALSE
);


-- DROP TABLE IF EXISTS friend_group CASCADE;
CREATE TABLE IF NOT EXISTS friend_group (
	group_id serial NOT NULL,
	event_id integer NOT NULL,
	user_id integer NOT NULL,
	CONSTRAINT friend_group_pk PRIMARY KEY (group_id)
) WITH (
  OIDS=FALSE
);





ALTER TABLE bills ADD CONSTRAINT bills_fk0 FOREIGN KEY (creatorId) REFERENCES users(userId);
ALTER TABLE bills ADD CONSTRAINT bills_fk1 FOREIGN KEY (event_id) REFERENCES event(event_id);

ALTER TABLE cashflow ADD CONSTRAINT cashflow_fk0 FOREIGN KEY (userId) REFERENCES users(userId);
ALTER TABLE cashflow ADD CONSTRAINT cashflow_fk1 FOREIGN KEY (event_id) REFERENCES event(event_id);

ALTER TABLE friend_group ADD CONSTRAINT friend_group_fk0 FOREIGN KEY (event_id) REFERENCES event(event_id);
ALTER TABLE friend_group ADD CONSTRAINT friend_group_fk1 FOREIGN KEY (user_id) REFERENCES users(userId);
